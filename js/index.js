const btnCart = document.querySelector('.containerIcon');
const containerCartProducts = document.querySelector('.contenedorProductos');

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden');
});


const cartInfo = document.querySelector('.carritoProductos');
const rowProduct = document.querySelector('.columnaProductos');

// Contenedor general
const productsList = document.querySelector('.contenedorGeneral');

// Variable de arreglos de Productos
let allProducts = [];

const valorTotal = document.querySelector('.pagoTotal');

const countProducts = document.querySelector('#contadorProductos');

const cartEmpty = document.querySelector('.carritoVacio');
const cartTotal = document.querySelector('.totalCarrito');

productsList.addEventListener('click', e => {
	if (e.target.classList.contains('agregarCarrito')) {
		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h3').textContent,
			price: product.querySelector('h4').textContent,
		};

		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		showHTML();
	}
});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('iconoEliminar')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}
});

// Funcion para mostrar y ocultar HTML
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('oculto');
		rowProduct.classList.add('oculto');
		cartTotal.classList.add('oculto');
	} else {
		cartEmpty.classList.add('oculto');
		rowProduct.classList.remove('oculto');
		cartTotal.classList.remove('oculto');
	}

	// Reiniciar columna de productos
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('carritoProductos');

		containerProduct.innerHTML = `
		<div class="informacionProductos flex justify-between flex-1 text-4xl border-b-2 border-gray-200 py-3">
		<span class="cantidadProductos ">${product.quantity}</span>
		  <p class="tituloCarrito">${product.title}</p>
		  <span class="precioCarrito mx-3 font-semibold">${product.price}</span>
		  <i class="bi bi-x-lg text-4xl relative iconoEliminar"></i>
	  	</div>
        `;

		rowProduct.append(containerProduct);

		total =
			total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
};
