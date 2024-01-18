
window.addEventListener('load', function () {
   
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');

    // eventos a los botones
    botonesAgregar.forEach((boton, index) => {
        boton.addEventListener('click', function () {
            // información del producto
            const producto = {
                nombre: `Producto ${index + 1}`,
                precio: parseFloat(this.parentElement.querySelector('.cuotas p:last-child').textContent),
            };

            // Agregar producto al carrito
            carrito.push(producto);

            // Guardar el carrito en el localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));

            // Actualizar cantidad carrito
            actualizarCantidadCarrito();

            console.log(`Producto ${index + 1} agregado al carrito`);
        });
    });

    // Función actualizar la cantidad 
    function actualizarCantidadCarrito() {
        const cantidadCarrito = document.getElementById('cantidad');
        cantidadCarrito.textContent = carrito.length;
    }

    actualizarCantidadCarrito();
});