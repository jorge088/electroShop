let products = []; //productos leidos desde el json
let cart = [];  //productos cargados en el carrito

const nav__menu = document.querySelector('.navBar__menu');
const btn__nav = document.querySelector('.btn__nav');

const navLogo = document.querySelector('.navBar__logo');

const btnNavProductos = document.querySelector('#btnNavProductos');
const btnNavSeleccionArgentina = document.querySelector('#btnNavSeleccionArgentina');
const btnNavLigaProfesional = document.querySelector('#btnNavLigaProfesional');
const btnNavPrimeraNacional = document.querySelector('#btnNavPrimeraNacional');
const btnNavTodosProductos = document.querySelector('#btnNavTodosProductos');

const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
searchInput.value = '';
const productNotFoundedAlert = document.querySelector('#productNotFoundedAlert');

const productsInformationTitle = document.querySelector('.productsInformation__title');
const productsInformationResults = document.querySelector('.productsInformation__results');

const productsInformation = document.querySelector('#productsInformation');
const productsContainer = document.querySelector('.productsContainer'); //contenedor de productos 
const templateContainerProducts = document.getElementById("template-containerProducts").content; //template para cargar los items en contenedor
const fragmentProduct = document.createDocumentFragment();//fragmento para guardar cada item y luego insertarlo en el contenedor

const cartView = document.querySelector('.cart');
const cartList = document.getElementById('cart__items'); //contenedor de productos en el carrito
const templateCartProducts = document.getElementById("template-CartProducts").content; //template para cargar los items en el carrito
const fragmentCart = document.createDocumentFragment();//fragmento para guardar cada item y luego insertarlo en el carrito
const cart__resume = document.querySelector('.cart__sideContainer__resume');
const productAddToast = document.querySelector('.productAddToast');
const cartProductsCounter = document.querySelector('.navBar__menu__btnCartMenu-counter');
const cartProductsCounterResponsive = document.querySelector('.navBar__btnCartResponsive-counter');

const btnFooterLigaProfesional = document.querySelector('#btnFooterLigaProfesional');
const btnFooterPrimeraNacional = document.querySelector('#btnFooterPrimeraNacional');
const btnFooterTodosProductos = document.querySelector('#btnFooterTodosProductos');
const btnFooterSeleccionArgentina = document.querySelector('#btnFooterSeleccionArgentina')
//Carruseles
const info = new Glider(document.querySelector('.informationCarousel__container__elements'), {//carrusel con imagenes
        duration: 2,
        draggable: true,
        dragVelocity: 1,
        rewind: true,
});

// const templateProducts = document.getElementById("template-carouselProducts").content; //template para cada producto item
//const carouselProductsElements = document.querySelector('.productsCarousel__container__elements')

document.addEventListener('DOMContentLoaded', () => { //Despues de cargarse el DOM
        addEventShowCart();
        fetchData();
        checkCartLocalStorage();
        carouselAutoScroll(info, 3500);
        cartProductsCounter.textContent = arrayLength(cart);
        cartProductsCounterResponsive.textContent = arrayLength(cart);
});

const arrayLength = (array) => {
        let count = 0;
        array.forEach(product => {

                if (product)
                        count += product.units;

        });
        return count;
}
navLogo.addEventListener('click', () => {
        if (nav__menu.classList.contains('show')) {
                nav__menu.classList.toggle('show');
                btn__nav.classList.toggle('active');
        }
        if(cartView.classList.contains('show'))
                cartView.classList.toggle('show')
})
//-----Eventos para btn de categorias en NAV
btnNavProductos.addEventListener('click',(e)=>{
        e.preventDefault();
        productsContainer.innerHTML = '';
        productsInformationTitle.textContent=`Descubrí nuestros productos`;
        productsInformationResults.textContent=``;
        loadRandomProductsToContainer(products);
        scrollTo(0,productsInformation.offsetTop);
});
btnNavSeleccionArgentina.addEventListener('click',(e)=>{
        e.preventDefault();
        let filter = filterProducts('Seleccion Argentina');
        if (nav__menu.classList.contains('show')) {
                nav__menu.classList.toggle('show');
                btn__nav.classList.toggle('active');
        }
        console.log(filter)
        productsInformationTitle.textContent=`Categoria: Selección Argentina`;
        productsInformationResults.textContent=`${ filter.length} Resultados`
        scrollTo(0,productsInformation.offsetTop);
        setTimeout(() => {
                loadContainerProducts(filter);
        }, 400)
});
btnNavLigaProfesional.addEventListener('click', (e) => {
        e.preventDefault();
        let filter = filterProducts('Liga Profesional');
        if (nav__menu.classList.contains('show')) {
                nav__menu.classList.toggle('show');
                btn__nav.classList.toggle('active');
        }
        console.log(filter)
        productsInformationTitle.textContent=`Categoria: Liga Profesional`;
        productsInformationResults.textContent=`${ filter.length} Resultados`
        scrollTo(0,productsInformation.offsetTop);
        setTimeout(() => {
                loadContainerProducts(filter);
        }, 400)
});

btnNavPrimeraNacional.addEventListener('click', (e) => {
        e.preventDefault();
        let filter = filterProducts('Primera Nacional');
        if (nav__menu.classList.contains('show')) {
                nav__menu.classList.toggle('show');
                btn__nav.classList.toggle('active');
        }
        productsInformationTitle.textContent=`Categoria: Primera Nacional`;
        productsInformationResults.textContent=`${ filter.length} Resultados`
        scrollTo(0,productsInformation.offsetTop);
        setTimeout(() => {
                loadContainerProducts(filter);
        }, 400)
});

btnNavTodosProductos.addEventListener('click', (e) => {
        e.preventDefault();
        if (nav__menu.classList.contains('show')) {
                nav__menu.classList.toggle('show');
                btn__nav.classList.toggle('active');
        }
        productsInformationTitle.textContent=`Todos los productos`;
        productsInformationResults.textContent=`${ products.length} Resultados`
        scrollTo(0,productsInformation.offsetTop);
        setTimeout(() => {
                loadContainerProducts(products);
        }, 400)
});
btnFooterSeleccionArgentina.addEventListener("click",(e)=>{
        e.preventDefault();
        let filter = filterProducts('Seleccion Argentina');
        if (nav__menu.classList.contains('show')) {
                nav__menu.classList.toggle('show');
                btn__nav.classList.toggle('active');
        }
        productsInformationTitle.textContent=`Categoria: Seleccion Argentina`;
        productsInformationResults.textContent=`${ filter.length} Resultados`
        scrollTo(0,productsInformation.offsetTop);
        setTimeout(() => {
                loadContainerProducts(filter);
        }, 400)
});
btnFooterLigaProfesional.addEventListener('click', (e)=>{
        e.preventDefault();
        let filter = filterProducts('Liga Profesional');
        if (nav__menu.classList.contains('show')) {
                nav__menu.classList.toggle('show');
                btn__nav.classList.toggle('active');
        }
        productsInformationTitle.textContent=`Categoria: Liga Profesional`;
        productsInformationResults.textContent=`${ filter.length} Resultados`
        scrollTo(0,productsInformation.offsetTop);
        setTimeout(() => {
                loadContainerProducts(filter);
        }, 400)
});
btnFooterPrimeraNacional.addEventListener('click', (e) => {
        e.preventDefault();
        let filter = filterProducts('Primera Nacional');
        if (nav__menu.classList.contains('show')) {
                nav__menu.classList.toggle('show');
                btn__nav.classList.toggle('active');
        }
        productsInformationTitle.textContent=`Categoria: Primera Nacional`;
        productsInformationResults.textContent=`${ filter.length} Resultados`
        scrollTo(0,productsInformation.offsetTop);
        setTimeout(() => {
                loadContainerProducts(filter);
        }, 400)
});
btnFooterTodosProductos.addEventListener('click', (e) => {
        e.preventDefault();
        if (nav__menu.classList.contains('show')) {
                nav__menu.classList.toggle('show');
                btn__nav.classList.toggle('active');
        }
        productsInformationTitle.textContent=`Todos los productos`;
        productsInformationResults.textContent=`${ products.length} Resultados`
        scrollTo(0,productsInformation.offsetTop);
        setTimeout(() => {
                loadContainerProducts(products);
        }, 400)
});

//-----Muestra el menu del nav en dispositivos moviles
btn__nav.addEventListener('click', () => {
        nav__menu.classList.toggle('show');
        btn__nav.classList.toggle('active');
})


//-----Buscar producto
searchInput.addEventListener('keyup', (e) => {
        

        if (searchInput.value == 0) {
                if (productNotFoundedAlert.classList.contains('show'))//si el input está vacio, quita el cartel no encontrado
                        productNotFoundedAlert.classList.toggle('show');
                productsContainer.innerHTML = '';
                productsInformationTitle.textContent=`Descubrí nuestros productos`;
                productsInformationResults.textContent=``;
                        loadRandomProductsToContainer(products);
                        e.preventDefault();//evita recarga de pagina
                        scrollTo(0,productsInformation.offsetTop);


        }
});

searchForm.addEventListener('submit', (e) => {
        searchProduct(searchInput);
        e.preventDefault();//evita recarga de pagina
}, false);

const searchProduct = (searchInput) => {
        result = filterProducts(searchInput.value);

        if (result.length == 0) {
                if (!productNotFoundedAlert.classList.contains('show'))
                        productNotFoundedAlert.classList.toggle('show');//muestra cartel de no encontrado
        } else {
                if (nav__menu.classList.contains('show')) { //En dispositivo movil, cierra el menu del nav
                        nav__menu.classList.toggle('show');
                        btn__nav.classList.toggle('active');
                }
                if (productNotFoundedAlert.classList.contains('show'))//oculta el cartel de no encontrado, si estaba visible
                        productNotFoundedAlert.classList.toggle('show');
                
                productsInformationTitle.textContent=`Busqueda: ${searchInput.value}`;
                productsInformationResults.textContent=`${ result.length} Resultados`
                scrollTo(0,productsInformation.offsetTop);
                setTimeout(() => {
                        loadContainerProducts(resul);
                }, 400);
        }
}
//Filtrar productos
const filterProducts = (parameter) => {
        resul = products.filter(product =>
                product.category.toLowerCase().includes(parameter.toLowerCase())
        )
        return resul;
}


//-----Agrega eventos a los botones para mostrar y ocultar la vista del carrito
const addEventShowCart = () => {
        //evento para boton carrito en el nav bar.
        const btnCart = document.getElementById('btnCartView');
        btnCart.addEventListener('click', () => {
                cartView.classList.toggle('show');
        });

        //evento para cuando se haga click en el sector opaco se cierre la vista
        
        cartView.addEventListener('click', (e) => {
                if (e.target.classList.contains('cart')) {
                        cartView.classList.toggle('show');
                }
        });

        //evento para el boton cerrar, dentro de la vista del carrito
        const btnCloseCartView = document.querySelector('.cart__sideContainer__title__exit');
        btnCloseCartView.addEventListener('click', () => {
                cartView.classList.toggle('show');
        });

        //evento para boton carrito responsive del nav bar
        const btnCartViewResponsive = document.querySelector('#btnCartViewResponsive');
        btnCartViewResponsive.addEventListener('click', () => {
                cartView.classList.toggle('show');
        });
}

//-----Carrito en localstorage
const checkCartLocalStorage = () => {
        const cartStorage = localStorage.getItem('cart');
        if (cartStorage) {
                cart = JSON.parse(cartStorage);
                updateCartProductView()
        }
};


//-----Carrusel
const carouselAutoScroll = (slider, miliseconds) => {
        const slidesCount = slider.track.childElementCount;
        let slideTimeout = null;
        let nextIndex = 1;

        function slide() {
                slideTimeout = setTimeout(
                        function () {
                                if (nextIndex >= slidesCount) {
                                        nextIndex = 0;
                                }
                                slider.scrollItem(nextIndex++);
                        },
                        miliseconds
                );
        }
        slider.ele.addEventListener('glider-animated', function () {
                window.clearInterval(slideTimeout);
                slide();
        });
        slide();
}
//Limpia items en carrusel
const cleanCarousel = (carousel) => {
        const slidesCount = carousel.track.childElementCount;
        for (let i = 0; i < slidesCount; i++)
                carousel.removeItem(0);
        carousel.updateControls()
}


//-----Leer datos de archivo JSON
const fetchData = async () => {
        try {
                const res = await fetch(`./assets/products.json`);
                const data = await res.json();
                products = data; //almaceno los datos del archivo en un array
                loadRandomProductsToContainer(products);
        } catch (error) {
                console.log(error)
        }
}


//-----Cargar contenedor de productos
const loadRandomProductsToContainer = (data) => {
        let randomProducts = [];
        let randomNumbers = [];
        let i = 0;
        while (i < 12) {
                num = Math.floor(Math.random() * data.length);//numero random entre 0 y el tamaño del array 
                if (!randomNumbers.includes(num)) {
                        randomNumbers.push(num);
                        i++;
                        continue;
                }
        }
        randomNumbers.forEach(id => {
                randomProducts.push(data[id]);
        });
        loadContainerProducts(randomProducts);
}

const loadContainerProducts = (data) => {
        productsContainer.innerHTML = '';
        data.forEach(product => {
                templateContainerProducts.querySelectorAll('img')[0].setAttribute('src', `./assets/images/${product.imgFrontUrl}`);
                templateContainerProducts.querySelectorAll('img')[0].setAttribute('alt', `${product.name}`);
                templateContainerProducts.querySelectorAll('img')[1].setAttribute('src', `./assets/images/${product.imgBackUrl}`);
                templateContainerProducts.querySelectorAll('img')[1].setAttribute('alt', `${product.name}`);
                templateContainerProducts.querySelector('h3').textContent = `${product.name} ${product.year}`;
                templateContainerProducts.querySelector('p').textContent = `$${product.price}`;
                templateContainerProducts.querySelector('.productsContainer__item__button').dataset.id = product.id; //guardo en el button el id de ese producto

                const clone = templateContainerProducts.cloneNode(true);
                fragmentProduct.appendChild(clone);
        });
        productsContainer.appendChild(fragmentProduct);
}


//-----Eventos en btn Sumar al carrito-->
productsContainer.addEventListener("click", (e) => {
        addCart(e);
});

const addCart = e => {
        if (e.target.classList.contains('fa-cart-plus')) { //click en el icono
                setCart(e.target.parentElement.parentElement);
        } else {
                if (e.target.classList.contains('productsContainer__item__button')) { //click en el boton
                        setCart(e.target.parentElement);
                }
        }
        e.stopPropagation();
}

//Crea un objeto con los datos y lo agrega al array cart
const setCart = (object) => {
        const product = {
                id: object.querySelector('button').dataset.id,
                name: object.querySelector('h3').textContent,
                price: object.querySelector('p').textContent,
                img: object.querySelector('img').getAttribute('src'),
                units: 1
        }
        if (cart[product.id]) { //producto cargado, le aumento una unidad
                product.units = cart[product.id].units + 1;
        }
        cart[product.id] = { ...product }
        localStorage.setItem('cart', JSON.stringify(cart)); //actualiza localstorage
        updateCartProductView();
        cartProductsCounter.textContent = arrayLength(cart);
        cartProductsCounterResponsive.textContent = arrayLength(cart);
        if (!productAddToast.classList.contains('show')) {
                productAddToast.classList.toggle('show');
                setTimeout(() => {
                        productAddToast.classList.toggle('show');
                }, 1500)
        }



}


//----Actualiza la vista de productos en el carrito
function updateCartProductView() {
        let totalPrice = 0;
        cartList.innerHTML = '';
        cart.forEach(product => {
                if (product) {//si no es null
                        templateCartProducts.querySelector(".cart__sideContainer__items__item__main__name").textContent = product.name;
                        templateCartProducts.querySelector("img").setAttribute("src", `${product.img}`);
                        templateCartProducts.querySelector(".cart__sideContainer__items__item__description__units__number").textContent = product.units;
                        templateCartProducts.querySelector(".cart__sideContainer__items__item__description__price").textContent = `$${Number(product.price.slice(1)) * product.units}`;
                        templateCartProducts.querySelector(".cart__sideContainer__items__item__main__btnDelete").dataset.id = product.id;
                        templateCartProducts.querySelector(".cart__sideContainer__items__item__description__units__btn__add").dataset.id = product.id;
                        templateCartProducts.querySelector(".cart__sideContainer__items__item__description__units__btn__rest").dataset.id = product.id;

                        totalPrice += Number(product.price.slice(1)) * product.units; //quita el $ de product.price y lo transforma a number
                        const clone = templateCartProducts.cloneNode(true);
                        fragmentCart.appendChild(clone);
                }
        });
        cartList.appendChild(fragmentCart);

        cart__resume.innerHTML =
                `<div class="cart__sideContainer__resume__total">
                        <p>Total: $${totalPrice} </p>
                </div>`;
}


//-----Modificar productos en carrito
cartList.addEventListener('click', (e) => {
        cartProductsModify(e);
});

const cartProductsModify = (e) => {
        //Aumentar unidades
        if (e.target.classList.contains('fa-plus')) { //click en icono
                plusProductCart(e.target.parentElement.dataset.id);
        } else {
                if (e.target.classList.contains('cart__sideContainer__items__item__description__units__btn__add')) { //click en boton
                        plusProductCart(e.target.dataset.id);
                }
        }

        //Disminuir unidades
        if (e.target.classList.contains('fa-minus')) { //click en icono
                minusProductCart(e.target.parentElement.dataset.id);
        } else {
                if (e.target.classList.contains('cart__sideContainer__items__item__description__units__btn__rest')) {//click en boton
                        minusProductCart(e.target.dataset.id);
                }
        }

        //Eliminar producto 
        if (e.target.classList.contains('fa-trash')) {//click en icono
                deleteProductCart(e.target.parentElement.dataset.id);
        } else {
                if (e.target.classList.contains('cart__sideContainer__items__item__main__btnDelete')) {//click en boton
                        deleteProductCart(e.target.dataset.id);
                }
        }
        cartProductsCounter.textContent = arrayLength(cart);
        cartProductsCounterResponsive.textContent = arrayLength(cart);
        e.stopPropagation();
};

const plusProductCart = (id) => {
        const product = cart[id];
        product.units++;
        cart[id] = { ...product };
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartProductView();
};

const minusProductCart = (id) => {
        const product = cart[id];
        product.units--;
        if (product.units === 0) {
                delete cart[id];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartProductView();
};

const deleteProductCart = (id) => {
        delete cart[id];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartProductView();
}


// //Carga en el carrusel 12 productos de la lista
// const loadRandomProductsToCarousel = (data) => {
//         let randomProducts = [];
//         for (let i = 0; i < 12; i++) {
//                 index = Math.floor(Math.random() * data.length);
//                 if (randomProducts[index]) {
//                         if (index != data.length - 1) {
//                                 index++;
//                         }
//                 }
//                 randomProducts[index] = { ...data[index] }


//         }
//         cleanCarousel(carouselProducts)
//         loadCarouselProducts(randomProducts);
// }


// //Carga carrusel de productos con elementos en un array
// const loadCarouselProducts = (data) => {
//         data.forEach(product => {
//                 templateProducts.querySelectorAll('img')[0].setAttribute('src', `./assets/images/${product.imgFrontUrl}`);
//                 templateProducts.querySelectorAll('img')[1].setAttribute('src', `./assets/images/${product.imgBackUrl}`);
//                 templateProducts.querySelector('h3').textContent = `${product.name} ${product.year}`;
//                 templateProducts.querySelector('p').textContent = `$${product.price}`;
//                 templateProducts.querySelector('.productsCarousel__container__elements__item__button').dataset.id = product.id; //guardo en el button el id de ese producto

//                 const clone = templateProducts.cloneNode(true);
//                 carouselProducts.addItem(clone);
//         })
// }



// //captura los clicks para agregar un producto al carrito
// carouselProductsElements.addEventListener("click", (e) => {
//         addCart(e);
// });


// const carouselProducts = new Glider(document.querySelector('.productsCarousel__container__elements'), {
//         exactWidth: true,
//         itemWidth: 180,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         duration: 2,
//         rewind: true,   //llega al final y vuelva al principio
//         arrows: {
//                 prev: '.carousel__before',
//                 next: '.carousel__next'
//         },
//         responsive: [
//                 {
//                         breakpoint: 575, //>=575px
//                         settings: {
//                                 itemWidth: 180,
//                                 slidesToShow: 3,
//                                 dots: '.carousel__indicadores',
//                                 rewind: true,
//                         }
//                 }, {
//                         breakpoint: 800,
//                         settings: {
//                                 itemWidth: 200,
//                                 slidesToShow: 6,
//                                 dots: '.carousel__indicadores',
//                                 rewind: true,
//                         }
//                 }
//         ]
// });