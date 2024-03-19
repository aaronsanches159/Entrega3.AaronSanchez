// Icono de tienda:

const btnCart = document.querySelector('.container-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});


// 

const cartInfo = document.querySelector('.cart-product')
const rowProduct = document.querySelector('.row-product')

// lista de contenedores de productos
const items = document.querySelector('.container-items')

// pago y cantidad del producto
const valorTotal = document.querySelector('.total-pagar')

const countProducts = document.querySelector ('.container-quantity')

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');



let allProducts=[]

items.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add-cart')) {
        const infoProduct = e.target.parentElement;
        const producto = {
            quantity: 1,
            title: infoProduct.querySelector('h3').textContent,
            price: infoProduct.querySelector('p').textContent,
        };

        const existIndex = allProducts.findIndex((product) => product.title === producto.title);
        if (existIndex !== -1) {
            allProducts[existIndex].quantity++; // Incrementamos la cantidad del producto existente
        } else {
            allProducts.push(producto); // Agregamos el producto al carrito
        }

        showHTML();
    }
});

rowProduct.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        const productElement = e.target.closest('.cart-product');
        const title = productElement.querySelector('.titulo-producto-carrito').textContent;
        
        // Filtrar el producto a eliminar del arreglo allProducts
        allProducts = allProducts.filter(product => product.title !== title);

        showHTML(); // Actualizar la interfaz de usuario
    }
});


const showHTML = () =>{

	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}
	
	rowProduct.innerHTML = "" // Para que no se multiplique

	let total = 0;
	let totalProductos= 0;

	allProducts.forEach(productos =>{
		const containerProductos = document.createElement ('div') //creamos un div
		containerProductos.classList.add('cart-product'); //le ponemos una clase


		// lo ponemos en el html
		containerProductos.innerHTML= ` 

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
		`

		rowProduct.append(containerProductos); //con esto lo pintamos
		
		// Multiplico la cantidad por el precio de cada producto 
		total = 
			total + parseInt(productos.quantity * productos.price.slice(1))
		totalProductos = totalProductos + productos.quantity
	})


	valorTotal.innerHTML = `$${total}`
	countProducts.innerHTML = totalProductos


}