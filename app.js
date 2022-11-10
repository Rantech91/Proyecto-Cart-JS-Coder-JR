const productosSuper = document.querySelector(".products");
const mostrarCarro = document.querySelector(".carro");
const carroToggle = document.querySelector(".carro-toggle");
const carroContainer = document.querySelector(".divcarro");
const itemCounter = document.querySelector(".item-number");

let carrito = [];
let total = 0;
let totalUnits = 0;

// LLAMAR A LA FUNCION GETCARROLOCAL AL CARGAR LA PAGINA//
const carroPromise = new Promise(() => {
  getCarroLocal();
}).then(calcularTotal());

fetch("https://dummyjson.com/quotes/random")
  .then((res) => res.json())
  .then((data) => {
    console.log(data.quote);
    document.querySelector(".quote").innerHTML = `
    <div><span class="italic">"${data.quote}"</span> - ${data.author}</div>
    
    `;
  });

// EVENT LISTENERS ///
carroToggle.addEventListener("click", () => {
  carroContainer.classList.toggle("hidden");
});

// funcion que agrega items al carro según su id. findIndex va a buscar si es que hay un object cuyo id sea igual al que estamos agregando con el boton.
function addToCart(id) {
  const index = carrito.findIndex((object) => {
    return object.id === id;
  });
  carroContainer.classList.remove("hidden");
  // si el index es -1, entonces no se encontro el producto y lo agregamos al carrito. findIndex va a evaluar si el ID del producto agregado coincide con un ID del array products, y lo va a retornar.
  if (index == -1) {
    const productIndex = products.findIndex((object) => {
      return object.id === id;
    });

    // se establece la variable newProduct cuya cantidad será 1 y luego se agregará al carrito. Finalmente se recalcula el total.
    let newProduct = products[productIndex];
    newProduct.quantity = 1;
    carrito.push(newProduct);
    calcularTotal();
    // En caso de que el index no sea -1, vamos a buscar el item del array "carrito" cuyo ID coincida con el agregado por el usuario para incrementarlo en +1 y luego se vuelve a calcular el total.
  } else {
    carrito[index].quantity += 1;
    calcularTotal();
  }
}

function alertPago() {
  alert("Simulador: El usuario es redirigido al portal de pago.");
}
// Esta funcion establece el total en 0, luego hace un mapeo de los object del array "carrito" para obtener la suma del total actualizado, para ello multiplica la cantidad de items por su precio.
function calcularTotal() {
  total = 0;
  carrito.map((object) => {
    total += object.quantity * object.price;
  });
  contarItems();
  guardarCarroLocal();

  // ahora vamos a inyectar el html que corresponde a la descripcion de los elementos de la lista de articulos.
  mostrarCarro.innerHTML = `
<div class="basis-1/3">Item</div>
<div class="basis-1/3">Precio</div>
<div class="basis-1/3">Unidades</div> `;

  // para cada elemento del array carrito vamos a generar una plantilla dinamica que incluya su img, precio local y cantidad. Ademas, agregamos un selector de decremento e incremento para modificar la cantidad.
  carrito.forEach((object) => {
    mostrarCarro.innerHTML += `
    
    <div class="basis-1/3 my-2"><img class=" w-10" src="${object.imgSrc}"></div>
    <div class="basis-1/3 my-2">$${object.price.toLocaleString("es-CL")}</div>
    <div class="flex flex-row basis-1/3 my-2 items-center">
      
    <i class="fa-solid fa-minus bg-white rounded-full p-1 mr-2" onclick="minus(${
      object.id
    })"></i>
  
      
      ${object.quantity}
      <i class="fa-solid fa-plus bg-white rounded-full p-1 ml-2" onclick="plus(${
        object.id
      })"></i>
    </div>
  `;
  });

  // Se muestra el total devuelto por la funcion calcularTotal()
  mostrarCarro.innerHTML += `
<div class="p-4 w-full text-right text-2xl font-bold">Total: $${total.toLocaleString(
    "es-CL"
  )}</div>
`;
}

// selectores de (-) y (+).
// const productIndex va ver si el producto esta o no en el carro.
function minus(id) {
  const productIndex = carrito.findIndex((object) => {
    return object.id === id;
  });
  // si al llamar la funcion minus la cantidad del producto es 1, se elimina el producto del array y se re-calcula el total.
  if (carrito[productIndex].quantity == 1) {
    carrito.splice(productIndex, 1);
    calcularTotal();
    // de lo contrario, se reduce la cantidad en -1 y se re-calcula el total.
  } else {
    carrito[productIndex].quantity--;
    calcularTotal();
  }
}
// la funcion plus(id) encuentra el id ingresado en el array e incrementa su cantidad en +1 para lugo re-calcular el total.
function plus(id) {
  const productIndex = carrito.findIndex((object) => {
    return object.id === id;
  });
  carrito[productIndex].quantity++;
  calcularTotal();
}

// mostrar los items que hay en el carro, cantidad.
// se crea la funcion contarItems() que establece totalUnits en 0, y luego mapea los elementos del carrito para obtener su cantidad y agregarla a totalUnits.
function contarItems() {
  totalUnits = 0;
  carrito.map((object) => {
    totalUnits += object.quantity;
  });

  itemCounter.innerHTML = `
  <div class="text-md">
  ${totalUnits}
</div>
`;
}

// Función guardarCarroLocal :

//Es una función que actualiza el carro LOCAL con los parámetros del array Carrito cada vez que se llama a la función calcularTotal()

function guardarCarroLocal() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function getCarroLocal() {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

// renderizar productos

function renderProducts() {
  products.forEach((product) => {
    productosSuper.innerHTML += `
    <div class="bg-blue-300 p-4 w-80 rounded-xl">
      <!-- imagen -->
      <div>
        <img class="rounded-xl" src="${product.imgSrc}" alt="${product.name}">
      </div>
      <!-- Info -->
      <div>
        <div class="text-2xl font-bold">${product.name}</div>
        <div class="text-xl font-bold">$${product.price.toLocaleString(
          "es-CL"
        )}</div>
        <div>${product.description}</div>
      </div>
      

          <div onclick="addToCart(${
            product.id
          })" class="flex flex-row justify-center mt-5 p-3 bg-blue-600 rounded-xl">
            <img src="./img/icon-cart-white.svg" alt="">
            <button class="justify-center text-white ml-2"> Add to cart</button>
          </div>
        
      </div>
    </div>
    
    `;
  });
}

function vaciarCarro() {
  carrito = [];
  calcularTotal();
}

renderProducts();
