// Icono de tienda:
const btnCart = document.querySelector('.container-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

const comidas = [
    {
        pastasMenu: [
            { nombre: "Penne Rigate", precio: 1200, imagen: "./img/main-header.avif"},
            { nombre: "Tagliatonne", precio: 1600, imagen: "./img/Receta-tagliatelle-nido-bolonesa_1419468083_114036678_1200x675.jpg"},
            { nombre: "Ravioles", precio: 2000, imagen:"./img/ravioles_22512_orig.jpg"},
            { nombre: "Canelones", precio: 2500, imagen:"./img/canelones_de_carne_y_de_verdura_crop1655391645186.jpg_530079780.webp"}
        ]
    },
    {
        pizzaMenu: [
            { nombre: "Muzzarela", precio: 3000, imagen: "./img/pizza_de_mozzarella.jpg"},
            { nombre: "Napolitana", precio: 3100, imagen: "./img/pizza_napolitana_especial.jpg"},
            { nombre: "Parmesano", precio: 3600, imagen:"./img/pizza_4_quesos.jpg"},
            { nombre: "Rucula", precio: 3100, imagen:"./img/pizza-de-rucula-con-jamon-crudo-1.jpg.webp"}
        ]
    },
    {
        hamburguesaMenu: [
            { nombre: "Onion Cheese", precio: 4200, imagen: "./img/onion.jpg"},
            { nombre: "Monstruosa", precio: 7200, imagen: "./img/hamburguesa-grande-queso-tocino_777078-84709.avif"},
            { nombre: "Triple Cheese", precio: 4600, imagen:"./img/triplecheese.jpg"},
            { nombre: "Paro cardiaco", precio: 5500, imagen:"./img/ParoCardiaco.jpg"}
        ]
    },
    {
        carneMenu: [
            { nombre: "Asado", precio: 4000, imagen: "./img/asado.jpg"},
            { nombre: "Chinchulines", precio: 1500, imagen: "./img/chinchu.jpg" },
            { nombre: "Choripan", precio: 2300, imagen:"./img/chorizos.jpg"},
            { nombre: "Matambre a la pizza", precio: 5000, imagen:"./img/matambre-a-la-pizza-a-la-parrilla-receta-salsa-locosxlaparrilla-1.jpg"}
        ]
    },
	{
		bebidasMenu: [
		{ nombre: "Coca-Cola", precio: 1100, imagen: "./img/2.webp"},
		{ nombre: "Fanta", precio: 1000, imagen: "./img/c00b72_e2bf95e004124aafb4debc97a8d6d02e~mv2.webp"},
		{ nombre: "Sprite", precio: 1100, imagen: "./img/download.jpg"},
		{ nombre: "Paso de los toros", precio: 1000, imagen: "./img/Paso-de-los-Toros-pomelo-350-V-L.jpg"}
		]
	}
	
];

// Array para el carrito
let allProducts = [];

// Función para pintar los productos en el HTML
function pintarProductos(menu) {
    const contenedor = document.getElementById("productos");

    menu.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <figure>
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </figure>
            <div class="textCard">
                <h3>${producto.nombre}</h3>
                <p class="price">$${producto.precio}</p>
                <button type="button" class="btn-add-cart">Pedir</button>
            </div>
        `;
        
        contenedor.appendChild(card);
    });
}

comidas.forEach(categoria => {
    Object.values(categoria).forEach(menu => {
        pintarProductos(menu, Object.keys(categoria)[0]);
    });
});

// Event listener para agregar productos al carrito
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add-cart')) {
        const infoProduct = e.target.parentElement;
        const productName = infoProduct.querySelector('h3').textContent;
        const productPrice = infoProduct.querySelector('.price').textContent;

        const producto = {
            quantity: 1,
            title: productName,
            price: productPrice,
        };

        const existIndex = allProducts.findIndex((product) => product.title === producto.title);
        if (existIndex !== -1) {
            allProducts[existIndex].quantity++; // Incrementamos la cantidad del producto existente
        } else {
            allProducts.push(producto); // Agregamos el producto al carrito
        }

        showHTML();
        guardarProductosEnLocalStorage(); // Guardar en el Local Storage
    }
});

// Event listener para eliminar productos del carrito
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        const productElement = e.target.closest('.cart-product');
        const title = productElement.querySelector('.titulo-producto-carrito').textContent;
        
        // Filtrar el producto a eliminar del arreglo allProducts
        allProducts = allProducts.filter(product => product.title !== title);

        showHTML(); // Actualizar la interfaz de usuario
        guardarProductosEnLocalStorage(); // Guardar en el Local Storage
    }
});

// Función para mostrar los productos en el carrito
const showHTML = () => {
    const cartEmpty = document.querySelector('.cart-empty');
    const rowProduct = document.querySelector('.row-product');
    const cartTotal = document.querySelector('.cart-total');
    const valorTotal = document.querySelector('.total-pagar');
    const countProducts = document.querySelector('.container-quantity');

    if (!allProducts.length) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }
    
    rowProduct.innerHTML = ""; // Limpiar el contenido existente

    let total = 0;
    let totalProductos = 0;

    allProducts.forEach(productos => {
        const containerProductos = document.createElement('div');
        containerProductos.classList.add('cart-product');

        // Multiplico la cantidad por el precio de cada producto 
        total += parseInt(productos.quantity * productos.price.slice(1));
        totalProductos += productos.quantity;

        containerProductos.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${productos.quantity}</span>
                <p class="titulo-producto-carrito">${productos.title}</p>
                <span class="precio-producto-carrito">${productos.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

        rowProduct.append(containerProductos); // Agregar al carrito
    });

    valorTotal.innerHTML = `$${total}`;
    countProducts.innerHTML = totalProductos;
};

// local storage para productos del carrito


const guardarProductosEnLocalStorage = () => {
    localStorage.setItem('carritoProductos', JSON.stringify(allProducts));
};

const cargarProductosDesdeLocalStorage = () => {
    const productosGuardados = localStorage.getItem('carritoProductos');
    if (productosGuardados) {
        allProducts = JSON.parse(productosGuardados);
        showHTML(); // Actualizar la interfaz de usuario con los productos cargados
    }
};

document.addEventListener('DOMContentLoaded', cargarProductosDesdeLocalStorage);