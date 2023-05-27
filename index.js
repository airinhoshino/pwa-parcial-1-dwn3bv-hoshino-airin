"use strict";

window.addEventListener('DOMContentLoaded', function () {
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js');
  }
})

//Creo un array de productos para luego mostrar dinámicamente
let productos = [
  {
    id: 1,
    nombre: "Box Regalo",
    descripcion: "Ideal para regalar una primera experiencia",
    precio: 1000,
    imagen: "img/boxregalo.webp",
    altimagen: "boxregalo",
    categoria: "Kit",
    infoextra: "Manzanilla y cedrón",
  },
  {
    id: 2,
    nombre: "Libro Blends",
    descripcion: "Un libro con todos los beneficios de las hierbas",
    precio: 1500,
    imagen: "img/librote.webp",
    altimagen: "libroblends",
    categoria: "Accesorios",
    infoextra: "Editorial Ateneo",
  },
  {
    id: 3,
    nombre: "Matcha Box",
    descripcion: "Kit ideal para disfrutar los beneficios del matcha",
    precio: 2000,
    imagen: "img/matchabox.webp",
    altimagen: "matchabox",
    categoria: "Kit",
    infoextra: "Origen Indonesia",
  },
  {
    id: 4,
    nombre: "Matcha Kit",
    descripcion: "Descubrí los fascinantes beneficios del matcha",
    precio: 2500,
    imagen: "img/matchakit.webp",
    altimagen: "matchakit",
    categoria: "Accesorios",
    infoextra: "Calidad ISO",
  },
  {
    id: 5,
    nombre: "Mega Box",
    descripcion: "Una hermosa caja para guardar todos tus blends",
    precio: 3000,
    imagen: "img/megabox.webp",
    altimagen: "altimagen5",
    categoria: "Blends",
    infoextra: "12 Sabores",
  },
  {
    id: 6,
    nombre: "Saquitos Surtidos",
    descripcion: "Un surtido para que pruebes todos los sabores",
    precio: 3500,
    imagen: "img/saquitos.webp",
    altimagen: "saquitoste",
    categoria: "Blends",
    infoextra: "10 sobres",
  },
];

//Defino variables para agarrar el html e ir completándolos
let sectionProducto = document.querySelector("#productos");
let carritoDeCompras = new Carrito();
let cantidadDeProductos = document.querySelector("#monstrarCantidad");
let tuTotalCantidad = document.querySelector("#tuTotalCantidad");

//Función para mostrar los productos. Se mostrarán como cards.
function mostrarProductos(arrayProducto) {
  arrayProducto.forEach((p) => {
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
  });
}

//Función para agregar los productos al carrito. FALTA MODAL.
function agregarAlCarrito(idProducto) {
  let productoArray = productos[idProducto - 1]; //Se le resta 1 al id xq los array cuentan desde 0
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
  carritoDeCompras.agregarProducto(producto); //Agrego un producto al carrito
  cantidadDeProductos.innerText = carritoDeCompras.cantidadDeProductos();
  tuTotalCantidad.innerText = carritoDeCompras.cantidadDeProductos();

  // let contenedorItemProducto = document.querySelector("#contenedorItemCarrito");

  // let misProductos = carritoDeCompras.devolverProductos();
  // contenedorItemProducto.replaceChildren();
  totalCompra();
  // misProductos.forEach(element => {
  //     contenedorItemProducto.append(carritoDeCompras.mostrarCardProducto(element));
  // });
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

//Evento para Filtro de categorías
document.querySelector("select").addEventListener("change", (e) => {
  /* Guardo el option elegido */
  let categoria = e.target.value;

  let filtrado = productos.filter((producto) =>
    producto.categoria.includes(categoria)
  );
  console.log(filtrado);
});

mostrarProductos(productos);
