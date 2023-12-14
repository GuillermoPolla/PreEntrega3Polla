let proyectoData = {
    SI: 'si',
    NO: 'no',
    ticket: 'Producto     Talle      Precio      Cantidad       Subtotal \n',
    total: 0,
    Productos: ['Remeras', 'Shorts', 'Zapatos', 'Gorras'],
    Remeras: [
        { Talles: 'S', Precio: 10 },
        { Talles: 'M', Precio: 14 },
        { Talles: 'L', Precio: 18 }
    ],
    Shorts: [
        { Talles: 'S', Precio: 8 },
        { Talles: 'M', Precio: 10 },
        { Talles: 'L', Precio: 12 }
    ],
    Zapatos: [
        { Talles: '35-38', Precio: 15 },
        { Talles: '38-41', Precio: 17 },
        { Talles: '41-45', Precio: 20 }
    ],
    Gorras: [
        { Talles: 'S', Precio: 4 },
        { Talles: 'M', Precio: 5 },
        { Talles: 'L', Precio: 6 }
    ],
    cadenaArray: ''
};
// Guardar en localStorage
localStorage.setItem('proyectoData', JSON.stringify(proyectoData));

// Recuperar desde localStorage
let proyectoDataRecuperado = JSON.parse(localStorage.getItem('proyectoData'));





// Convertir el array a una cadena usando join
let cadenaArray = Productos.join(', ');

// Mostrar la cadena en un alert
alert('Productos:\n' + cadenaArray);

do {
    let LugarProducto;
    let productoValido = false;
    while (!productoValido) {
        LugarProducto = prompt("Ingrese el producto que desea comprar");

        switch (LugarProducto.toLowerCase()) {
            case 'remeras':
                alert(generarTabla(Remeras));
                productoValido = true;
                break;
            case 'shorts':
                alert(generarTabla(Shorts));
                productoValido = true;
                break;
            case 'zapatos':
                alert(generarTabla(Zapatos));
                productoValido = true;
                break;
            case 'gorras':
                alert(generarTabla(Gorras));
                productoValido = true;
                break;
            default:
                alert(`Lo siento, el producto "${LugarProducto}" no está en la lista de productos.`);
                break;
        }
    }
    // Solicitar al usuario que ingrese el talle hasta que sea válido
    let talleIngresado;
    while (true) {
        talleIngresado = prompt("Ingrese el talle (S, M o L):").toUpperCase();
        if (talleIngresado === 'S' || talleIngresado === 'M' || talleIngresado === 'L') {
            // Valor válido, salir del bucle
            break;
        } else {
            alert("Talle no válido. Por favor, ingrese S, M o L.");
        }
    }
    // Ahora puedes utilizar la variable talleIngresado según sea necesario.
    alert(`Ha seleccionado el talle: ${talleIngresado}`);

    cantidadDeItems = +prompt(`¿Cuántos "${LugarProducto}" desea comprar? `);
    while (isNaN(cantidadDeItems)) {
        alert('Por favor, ingrese solo números para la cantidad de items.');
        cantidadDeItems = +prompt(`¿Que cantidad de ${LugarProducto} desea comprar? `);
    }

    let precioProducto = 0;
    switch (LugarProducto.toLowerCase()) {
        case 'remeras':
            precioProducto = Remeras.find(item => item.Talles === talleIngresado).Precio;
            break;
        case 'shorts':
            precioProducto = Shorts.find(item => item.Talles === talleIngresado).Precio;
            break;
        case 'zapatos':
            precioProducto = Zapatos.find(item => item.Talles === talleIngresado).Precio;
            break;
        case 'gorras':
            precioProducto = Gorras.find(item => item.Talles === talleIngresado).Precio;
            break;
    }
    // Calcular el subtotal y agregar al ticket
    let subtotal = precioProducto * cantidadDeItems;
    let fila = `${LugarProducto.padEnd(15)}${talleIngresado.padEnd(8)}${precioProducto.toString().padEnd(13)}${cantidadDeItems.toString().padEnd(12)}$${subtotal.toFixed(3)}\n`;
    ticket = ticket + fila;
    // Actualizar el total
    total += subtotal;

    continuar = prompt('¿Desea volver a cargar otro item? (si/no)').toLowerCase();
} while (continuar === SI);



ticket = ticket + `Total a pagar: $${total}`;
alert(ticket);
alert(`Gracias por visitarnos!. Saludos`);

