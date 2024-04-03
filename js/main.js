// Icono de tienda:
const btnCart = document.querySelector('.container-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const btnPagar = document.querySelector('.btn-pagar')

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

// JSON para el array de objetos:
function obtenerDatos() {
    return new Promise((resolve, reject) => {
        fetch('json/comidas.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

obtenerDatos()
    .then((comidas) => {
        comidas.forEach(categoria => {
            Object.values(categoria).forEach(menu => {
                pintarProductos(menu);
            });
        });
    })
    .catch((error) => {
        console.log(error);
    });


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
            allProducts[existIndex].quantity++; // Incremente la cantidad del producto existente
        } else {
            allProducts.push(producto); // Agregue el producto al carrito
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

        showHTML();
        guardarProductosEnLocalStorage(); 
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
    
    rowProduct.innerHTML = ""; 

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

        rowProduct.append(containerProductos); 
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
        showHTML(); 
    }
};

document.addEventListener('DOMContentLoaded', cargarProductosDesdeLocalStorage);

// Pedir comida con libreria

btnPagar.addEventListener('click', ()=>{
    Swal.fire({
        title: "Tu pedido sera enviado en breve",
        width: 600,
        padding: "3em",
        color: "black",
        background: "#fff url(/images/trees.png)",
        backdrop: `
        rgba(0, 0, 0, 0.37)
          url("./img/giphy.gif")
          center top
          no-repeat
        `,
        confirmButtonColor: '#d1914b'
      }); 
})






