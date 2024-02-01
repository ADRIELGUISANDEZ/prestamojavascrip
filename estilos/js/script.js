window.addEventListener("load", function () {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function actualizarCantidadCarrito() {
    const cantidadCarritoElement = document.getElementById("cantidadCarrito");
    if (cantidadCarritoElement) {
      cantidadCarritoElement.textContent = carrito.length;
    }
  }
    // Calcular el total del carrito
    function calcularTotalCarrito() {
        let total = 0;
        carrito.forEach(producto => {
            total += producto.cantidad * producto.precio;
        });
        return total;
    }
  function mostrarProductosEnCarrito() {
    const carritoContainer = document.querySelector(".carrito-prestamos");
    const totalCarritoElement = document.getElementById('total');
    carritoContainer.innerHTML = "";

    const productosAgrupados = {};

    carrito.forEach((producto) => {
      if (!productosAgrupados[producto.nombre]) {
        productosAgrupados[producto.nombre] = {
          ...producto,
          cantidad: 0, 
        };
      }
      productosAgrupados[producto.nombre].cantidad += 1;
    });
    Object.values(productosAgrupados).forEach((productoAgrupado) => {
      const productoDiv = document.createElement("div");
      productoDiv.classList.add("carrito-prestamo");

      productoDiv.innerHTML = `
            <img class="carrito-prestamo-imagen" src="${
              productoAgrupado.imagen
            }" alt="${productoAgrupado.nombre}">
            <div class="carrito-prestamo-titulo">
                <small>Nombre</small>
                <h3>${productoAgrupado.nombre}</h3>
            </div>
            <div class="carrito-prestamo-cantidad">
                <small>Cantidad</small>
                <p>${productoAgrupado.cantidad}</p>
            </div>
            <div class="carrito-prestamo-preciocuota">
                <small>Precio Cuota</small>
                <p>${productoAgrupado.precio}</p>
            </div>
            <div class="carrito-prestamo-preciocuota-subtotal">
                <small>Subtotal Cuota</small>
                <p>${productoAgrupado.cantidad * productoAgrupado.precio}</p>
            </div>
            <button class="carrito-prestamo-eliminar" data-producto="${
              productoAgrupado.nombre
            }">Borrar</button>
            `;

      carritoContainer.appendChild(productoDiv);

      productoDiv
        .querySelector(".carrito-prestamo-eliminar")
        .addEventListener("click", function () {
          eliminarProductoDelCarrito(productoAgrupado.nombre);
          mostrarProductosEnCarrito();
          actualizarTotalCarrito();
        });
    });
    
        // Actualiza el total del carrito
        actualizarTotalCarrito();
  }
  function actualizarTotalCarrito() {
    const totalCarritoElement = document.getElementById('total');
    if (totalCarritoElement) {
        const total = calcularTotalCarrito();
        totalCarritoElement.textContent = total;
    }
}

  function eliminarProductoDelCarrito(nombreProducto) {
    carrito = carrito.filter((producto) => producto.nombre !== nombreProducto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCantidadCarrito();
  }

  actualizarCantidadCarrito();

  const productos = [
    { nombre: "Préstamo 200 mil", precio: 50000, imagen: "./img/200.png" },
    { nombre: "Préstamo 300 mil", precio: 75000, imagen: "./img/300.png" },
    { nombre: "Préstamo 400 mil", precio: 100000, imagen: "./img/400.png" },
  ];

  const medio = document.getElementById("medio");

  productos.forEach((producto, index) => {
    const divProducto = document.createElement("div");
    divProducto.classList.add("gris-1");

    divProducto.innerHTML = `
            <img class="gris" src="${producto.imagen}" alt="${producto.nombre}" />
            <div class="cuotas">
                <p>Cuota</p>
                <p>$${producto.precio}</p>
            </div>
            <button class="agregar-carrito" data-nombre="${producto.nombre}" data-precio="${producto.precio}" data-imagen="${producto.imagen}">Agregar Carrito</button>
        `;

    divProducto
      .querySelector(".agregar-carrito")
      .addEventListener("click", function () {
        const productoCarrito = {
          nombre: this.dataset.nombre,
          precio: parseFloat(this.dataset.precio),
          imagen: this.dataset.imagen,
          cantidad: 1,
        };

        carrito.push(productoCarrito);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCantidadCarrito();
        
    Swal.fire({
        title: "Préstamo Agregado",
        text: "Agregado al Carrito",
        icon: "success",
        confirmButtonText: "Aceptar",
        iconColor: "grey",
      });


        if (window.location.href.includes("carrito.html")) {
          mostrarProductosEnCarrito();
          actualizarTotalCarrito();
        }
      });

    medio.appendChild(divProducto);
  });

  if (window.location.href.includes("carrito.html")) {
    mostrarProductosEnCarrito();
    actualizarTotalCarrito();

  }
  function actualizarCantidadCarrito() {
    const cantidadCarrito = document.getElementById('cantidadCarrito');
    if (cantidadCarrito) {
        cantidadCarrito.textContent = carrito.length;
    }
}

actualizarCantidadCarrito();
    // Vaciar el carrito
    function vaciarCarrito() {
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarProductosEnCarrito();
        actualizarCantidadCarrito();
    }

    // Solicitar los préstamos
    function solicitarPrestamos() {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar cantidad en el carrito y el total 
    actualizarCantidadCarrito();
    actualizarTotalCarrito();
    

    // Limpiar productos 
    mostrarProductosEnCarrito();
    
    alert('Los préstamos fueron solicitados');
    }

    // botón Vaciar Carrito
    document.getElementById('vaciarCarrito').addEventListener('click', vaciarCarrito);

    // botón Solicitar Ahora
    document.getElementById('solicitarAhora').addEventListener('click', solicitarPrestamos);



});

