"use strict";

//Verifico que se inicialice y cargue el DOM
window.addEventListener('DOMContentLoaded', function () {
  console.log ("prueba de carga de DOM");
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js');
  }
})


//Defino variables para agarrar el html e ir completándolos
let sectionProducto = document.querySelector("#productos");
let carritoDeCompras = new Carrito();
let cantidadDeProductos = document.querySelector("#monstrarCantidad");
let tuTotalCantidad = document.querySelector("#tuTotalCantidad");
let eventoInstalar;
let botonInstalar = document.getElementById('botonInstalar');
let divInstalar = document.getElementById('instalacion');


function mostrarProductos () {
  fetch('productos.json')
  .then(respuesta => respuesta.json())
  .then(json => {

    json.forEach ((p) => {
      let producto = new Producto(
    p.id,
    p.nombre,
    p.descripcion,
    p.precio,
    p.imagen,
    p.altimagen,
    p.categoria,
    p.infoextra
    
      );
      sectionProducto.append(producto.mostrarProducto());

    }
    
    );

  })
}


function agregarAlCarrito(idProducto) {
  fetch('productos.json')
  .then(respuesta => respuesta.json())
  .then(json => {

  let productoArray = json[idProducto - 1]; //Se le resta 1 al id xq los array cuentan desde 0
  let producto = new Producto(  
    productoArray.id,
    productoArray.nombre,
    productoArray.descripcion,
    productoArray.precio,
    productoArray.imagen,
    productoArray.altimagen,
    productoArray.categoria,
    productoArray.infoextra
  );
  carritoDeCompras.agregarProducto(json); //Agrego un producto al carrito
  cantidadDeProductos.innerText = carritoDeCompras.cantidadDeProductos();
  tuTotalCantidad.innerText = carritoDeCompras.cantidadDeProductos();

  totalCompra();

})
}



function totalCompra() {
  let tuTotal = document.querySelector(".tuTotal");
  tuTotal.innerText = carritoDeCompras.mostrarPrecioTotalDeLaCompra();
}


function mostrarModalDetalle(idProd){
    let producto = null;

    productos.forEach(element => {
      if (element.id == idProd){
        producto = element;
      }
    });
    let productoObject = new Producto(producto.id, producto.nombre, producto.descripcion, producto.precio, producto.imagen, producto.categoria, producto.infoextra);
    document.querySelector("#contenedorModal").replaceChildren();
    document.querySelector("#contenedorModal").append(productoObject.imprimirModal(producto));
}

mostrarProductos(productos);

vaciarCarrito.addEventListener('click', () => {
  carritoDeCompras = new Carrito();
  cantidadDeProductos.innerText = 0;
  tuTotalCantidad.innerText = 0;
})

function instalarApp() {
  if (eventoInstalar) {
      eventoInstalar.prompt();
      eventoInstalar.userChoice
          .then(respuesta => {
              if (respuesta.outcome == 'accepted') {
                  console.log('El usuario acepto instalar la app');
                  divInstalar.style.display = 'none';
              } else {
                  console.log('El usuario no acepto instalar la app');
              }
          })
  }
}

function mostrarBtnInstalar() {
  if (botonInstalar != undefined) {
      divInstalar.style.display = 'block';
      botonInstalar.addEventListener('click', instalarApp)
  }
}

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  eventoInstalar = e;
  mostrarBtnInstalar();
})
