const productosSuper = document.querySelector(".products")
const mostrarCarro = document.querySelector(".carro")
let carrito = [];
let total = 0;

function addToCart(id) {
  const index = carrito.findIndex(object => {
    return object.id === id;
  });
  
  // si el index es -1, entonces no se encontro el producto y lo agregamos al carrito. En caso de que el index no sea -1, entonces aumentamos 1 unidad del producto en el carro.
  if(index == -1) {
    const productIndex = products.findIndex(object => {
      return object.id === id;
    });
    let newProduct = products[productIndex]
    newProduct.quantity = 1
    carrito.push(newProduct)
    calcularTotal()
  } else {
    carrito[index].quantity += 1
    calcularTotal()
  }
}

function calcularTotal() {
  total = 0
  carrito.map(object => {
    total += object.quantity * object.price
  }) 
  // ahora vamos a imprimir el arreglo del carrito
mostrarCarro.innerHTML = `
<div class="basis-1/3">Item</div>
<div class="basis-1/3">Precio</div>
<div class="basis-1/3">Unidades</div> `

carrito.forEach((object) => {
  mostrarCarro.innerHTML += `
    
    <div class="basis-1/3 my-2"><img class=" w-10" src="${object.imgSrc}"></div>
    <div class="basis-1/3 my-2">$${object.price.toLocaleString('es-CL')}</div>
    <div class="basis-1/3 my-2">${object.quantity}</div>
  `
})
 mostrarCarro.innerHTML += `
 <div class="p-4 w-full text-right text-2xl font-bold">Total: $${total.toLocaleString('es-CL')}</div>
 `
}

// renderizar productos

function renderProducts() {
  products.forEach((product) => {
    productosSuper.innerHTML += `
    <div class="bg-blue-300 p-4 w-80">
      <!-- imagen -->
      <div>
        <img src="${product.imgSrc}" alt="${product.name}">
      </div>
      <!-- Info -->
      <div>
        <div class="text-2xl font-bold">${product.name}</div>
        <div class="text-xl font-bold">$${product.price.toLocaleString('es-CL')}</div>
        <div>Proteina aislada de suero de leche sabor Chocolate 5 libras.</div>
      </div>
      

          <div onclick="addToCart(${product.id})" class="flex flex-row justify-center mt-5 p-3 bg-blue-600">
            <img src="./img/icon-cart-white.svg" alt="">
            <button class="justify-center text-white ml-2"> Add to cart</button>
          </div>
        
      </div>
    </div>
    
    `
  })
}
renderProducts() 
