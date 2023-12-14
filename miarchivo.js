    const SI = 'si';
    const NO = 'no';

    let nombreUsuario;
    let nombrePrenda;
    let talle;
    let precio;
    let cantidadDePagos;
    let cantidadDeItems;
    let total = 0;
    let fila;
    let continuar;
    let ticket = 'Producto     Talle        Precio      Cantidad        Subtotal \n';

    // Expresión que solo contiene letras:
    let regex = /^[a-zA-Z]+$/;  

    nombreUsuario = prompt('Sea bienvenido al carrito de compras de la tienda,\nIngrese su nombre: ');

    // Verifica si el imput tiene solo letras y si no es vacio
    while (!/^[a-zA-Z]+$/.test(nombreUsuario) || nombreUsuario.trim() === '') {
        nombreUsuario = prompt('Por favor, ingrese su nombre:');
        if (!/^[a-zA-Z]+$/.test(nombreUsuario) || nombreUsuario.trim() === '') {
            alert('Nombre no válido. Por favor, ingresa solo letras y asegúrate de no dejarlo vacío.');
        }
    }

    console.log('¡Hola, ' + nombreUsuario + '!');

    do {
        nombrePrenda = prompt(`${nombreUsuario}, por favor, agregue el nombre del item que desea comprar\nNombre de la prenda: `);
        while (!/^[a-zA-Z]+$/.test(nombrePrenda) || nombrePrenda.trim() === '') {
            nombrePrenda = prompt('Por favor, ingrese el nombre de la prenda:');
            if (!/^[a-zA-Z]+$/.test(nombrePrenda) || nombrePrenda.trim() === '') {
                alert('El nombre de prenda no es válido. Por favor, ingresa solo letras y asegúrase de no dejarlo vacío.');
            }
        }

        talle = +prompt('Ingrese el talle de la prenda: ');
        while (isNaN(talle)) {
            alert('Por favor, ingrese solo números para el talle.');
            talle = +prompt('Ingrese el talle de la prenda: ');
        }
        console.log('El talle ingresado es: ' + talle);

        precio = +prompt(`Ingrese el precio de ${nombrePrenda}: `);
        while (isNaN(precio)) {
            alert('Por favor, ingrese solo números para el precio.');
            precio = +prompt(`Ingrese el precio de ${nombrePrenda}: `);
        }

        cantidadDeItems = +prompt(`¿Cuántos ${nombrePrenda} desea comprar? `);
        while (isNaN(cantidadDeItems)) {
            alert('Por favor, ingrese solo números para la cantidad de items.');
            cantidadDeItems = +prompt(`¿Cuántos ${nombrePrenda} desea comprar? `);
        }

        fila = `${nombrePrenda.padEnd(15)}${talle.toString().padEnd(8)}${precio.toString().padEnd(13)}${cantidadDeItems.toString().padEnd(12)}$${(cantidadDeItems * precio).toFixed(3)}\n`;
        ticket = ticket + fila;
        total = total + precio * cantidadDeItems;

        continuar = prompt('¿Desea volver a cargar otro item? (si/no)').toLowerCase();
    } while (continuar === SI);

    ticket = ticket + `Total a pagar: $${total}`;
    alert(ticket);
    alert(`Gracias por visitarnos ${nombreUsuario}!. Saludos`);
