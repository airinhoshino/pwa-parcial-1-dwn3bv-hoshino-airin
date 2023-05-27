class Producto {
  id;
  nombre;
  descripcion;
  precio;
  imagen;
  altimagen;
  categoria;
  infoextra;

  constructor(
    id,
    nombre,
    descripcion,
    precio,
    imagen,
    altimagen,
    categoria,
    infoextra
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagen = imagen;
    this.altimagen = altimagen;
    this.categoria = categoria;
    this.infoextra = infoextra;
  }

  //Método para crear los productos en el HTML como cards.
  mostrarProducto() {
    let divProducto = document.createElement("div");
    divProducto.className = "card";

    let img = document.createElement("img");
    img.className = "card-img";
    img.setAttribute("src", `${this.imagen}`);
    img.setAttribute("alt", `${this.altimagen}`);
    let categoriaProducto = document.createElement("span");
    categoriaProducto.className = "card-category";
    categoriaProducto.innerText = `${this.categoria}`;
    divProducto.append(categoriaProducto);
    divProducto.append(img);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let botonDetalleProducto = document.createElement("button");
    botonDetalleProducto.className = "fa-solid fa-circle-info btn btn-secondary";
    botonDetalleProducto.innerText = "";
    botonDetalleProducto.setAttribute("data-bs-toggle", "modal");
    botonDetalleProducto.setAttribute("data-bs-target", "#exampleModal");
    botonDetalleProducto.setAttribute(
      "onclick",
      `mostrarModalDetalle(${this.id})`
    );
    cardBody.append(botonDetalleProducto);

    let nombreProducto = document.createElement("h3");
    nombreProducto.className = "card-title";
    nombreProducto.innerText = `${this.nombre}`;
    cardBody.append(nombreProducto);

    let precioProdcuto = document.createElement("p");
    precioProdcuto.className = "card-price";
    precioProdcuto.innerText = `$ ${this.precio}`;
    cardBody.append(precioProdcuto);


    let descripcionProducto = document.createElement("p");
    descripcionProducto.className = "card-text";
    descripcionProducto.innerText = `${this.descripcion}`;
    cardBody.append(descripcionProducto);


    let botonCompraProdcuto = document.createElement("button");
    botonCompraProdcuto.className = "btn btn-primary addCart";
    botonCompraProdcuto.innerText = "Agregar al carrito";
    botonCompraProdcuto.setAttribute("onclick", `agregarAlCarrito(${this.id})`);
    cardBody.append(botonCompraProdcuto);


    divProducto.append(cardBody);

    return divProducto;
  }

  //Método para imprimir el modal del detalle del producto
  imprimirModal(producto){

    let divModal = document.createElement("div");
    divModal.className = "modal";

    let divModalContainer = document.createElement("div");
    divModalContainer.className = "modal-container";

    let divModalImage = document.createElement("div");
    divModalImage.className = "modal-img";

    let imgProducto = document.createElement("img");
    imgProducto.className = "img";
    imgProducto.setAttribute("src",`${producto.imagen}`);
    imgProducto.setAttribute("alt",`${producto.altimagen}`);
    divModalImage.append(imgProducto);

    divModalContainer.append(divModalImage);

    let divModalContent = document.createElement("div");
    divModalContent.className = "modal-content";

    let tituloDetalle = document.createElement("h3");
    tituloDetalle.className = "modal-title";
    tituloDetalle.innerText = `${producto.nombre}`;
    divModalContent.append(tituloDetalle);

    let productoDescripcionCorta = document.createElement("p");
    productoDescripcionCorta.className = "modal-description";
    productoDescripcionCorta.innerText = `${producto.descripcion}`;
    divModalContent.append(productoDescripcionCorta);

    let productoInfoExtra = document.createElement("p");
    productoInfoExtra.className = "modal-long-description";
    productoInfoExtra.innerText = `${producto.infoextra}`;
    divModalContent.append(productoInfoExtra);


    let precioProductoPrecio = document.createElement("p");
    precioProductoPrecio.className = "modal-price";
    precioProductoPrecio.innerText = `$ ${producto.precio}`;
    divModalContent.append(precioProductoPrecio);

    let botonCompraCardBody = document.createElement("button");
    botonCompraCardBody.className = "btn btn-primary";
    botonCompraCardBody.innerText = "Agregar al carrito";
    botonCompraCardBody.setAttribute("onclick",`agregarAlCarrito(${this.id})`);


    let botonCerrarCard = document.createElement("button");
    botonCerrarCard.className = "fa-regular fa-circle-xmark btn btn-secondary";
    botonCerrarCard.innerText = "";


    divModalContainer.append(botonCerrarCard);
    botonCerrarCard.addEventListener ("click", (e) => {

      const target = e.target; //para guardar quién disparó el evento
      divModal.remove();
  });

    divModalContent.append(botonCompraCardBody);
    divModalContent.append(botonCerrarCard);

    divModalContainer.append(divModalContent);

    divModal.append(divModalContainer);

    return divModal;

  }
}

class Carrito {
  productos;

  constructor() {
    this.productos = [];
  }

  agregarProducto(producto) {
    this.productos.push(producto);
  }

  devolverProductos() {
    return this.productos;
  }

  cantidadDeProductos() {
    return this.productos.length;
  }

  quitarProductoDelCarrito(idProducto) {
    let producto = null;

    this.productos.forEach((element) => {
      if (element.id == idProducto) {
        producto = element;
      }
    });

    this.productos.splice(this.productos.indexOf(producto), 1);
  }

  mostrarPrecioTotalDeLaCompra() {
    let total = 0;
    this.productos.forEach((p) => {
      total += p.precio;
    });
    return total;
  }

  quitarTodosLosProducto() {
    this.productos = [];
  }

  // mostrarCardProducto(p) {
  //   //este es el div del card

  //   var divContenedorProducto = document.createElement("div");
  //   divContenedorProducto.className = "row rounded-3 mb-2 mx-5";

  //   //este es el div de la imagen
  //   let divContenedorImagen = document.createElement("div");
  //   divContenedorImagen.className = "col-2 my-2 align-self-center";

  //   //esta imagen va dentro del div card
  //   let imgCardPrducto = document.createElement("img");
  //   imgCardPrducto.className = "card-img-top img-fluid";
  //   imgCardPrducto.setAttribute("src", `${p.imagen}`);
  //   imgCardPrducto.setAttribute("alt", `${p.altimagen}`);

  //   //este es el div del card
  //   let divDescript = document.createElement("div");
  //   divDescript.className = "col-10 d-flex flex-column px-5";

  //   //boton de compra del producto
  //   let botonEliminarProducto = document.createElement("button");
  //   botonEliminarProducto.className =
  //     "btn align-self-end p-2 pt-3";
  //   botonEliminarProducto.setAttribute(
  //     "onclick",
  //     `quitarProductoDelCarrito(${p.id}, this) `
  //   );
  //   botonEliminarProducto.innerHTML = `
  //     <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  //       <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
  //     </svg>
  //     `;

  //   let tituloCardBody = document.createElement("h3");
  //   tituloCardBody.className = "card-title fs-4 fw-bold";
  //   tituloCardBody.innerText = `${p.nombre}`;

  //   //precio del producto
  //   let precioCardBody = document.createElement("p");
  //   precioCardBody.className = "fs-3 fw-semibold pb-3";
  //   precioCardBody.innerText = `${p.precio}`;

  //   divDescript.append(botonEliminarProducto);
  //   divDescript.append(tituloCardBody);
  //   divDescript.append(precioCardBody);

  //   divContenedorImagen.append(imgCardPrducto);

  //   divContenedorProducto.append(divContenedorImagen);

  //   divContenedorProducto.append(divDescript);
  //   return divContenedorProducto;
  // }
}
