let proyectoData = {
    Productos: {
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
        ]
    },

    productosEnCarro: [],
    ticket: 'Producto     Talle      Precio      Cantidad       Subtotal \n',
    total: 0
};

// Mostrar información al usuario usando el DOM
let mensajeElement = document.getElementById('mensaje');
let productosLista = document.getElementById('productos-lista');
let tallesLista = document.getElementById('talles-lista');
let inputContainer = document.getElementById('inputContainer');
let carroElement = document.getElementById('carro');

// Inicializar la lista de productos
for (let producto in proyectoData.Productos) {
    let optionElement = document.createElement('option');
    optionElement.value = producto;
    optionElement.text = producto;
    productosLista.appendChild(optionElement);
}

productosLista.addEventListener('change', () => {
    LugarProducto = productosLista.value;  
    handleProductoSeleccionado(LugarProducto);
});


tallesLista.addEventListener('change', () => {
    mostrarMensaje(`Ha seleccionado el talle: ${tallesLista.value}`);
    // Mostrar el precio correspondiente al producto y talle seleccionados
    let precioProducto = obtenerPrecio(productosLista.value.toLowerCase(), tallesLista.value);
    mostrarPrecio(precioProducto);
});

function handleProductoSeleccionado(producto) {
    mostrarTalles(proyectoData.Productos[producto]);
}

function mostrarTalles(array) {
    // Limpiar la lista de talles
    tallesLista.innerHTML = '';

    // Mostrar opciones de talles
    array.forEach(item => {
        let optionElement = document.createElement('option');
        optionElement.value = item.Talles;
        optionElement.text = item.Talles;
        tallesLista.appendChild(optionElement);
    });

    mostrarMensaje('Seleccione un talle:');
}

function mostrarMensaje(mensaje) {
    mensajeElement.innerHTML = mensaje;
}

// Función para mostrar el precio correspondiente al producto y talle seleccionados
function mostrarPrecio(precio) {
    mensajeElement.innerHTML = `Precio: $${precio.toFixed(3)}`;
}

// Función para obtener la entrada del usuario utilizando DOM en lugar de prompt
function obtenerInput(promptText) {
    return new Promise(resolve => {
        crearBoton('Agregar al carro', () => {
            console.log('Botón clickeado');
            resolve(productosLista.value); // Pasa el valor del producto seleccionado
            inputContainer.innerHTML = '';  // Limpiar el contenedor después de obtener el valor
        });
    });
}



function crearBoton(texto, callback) {
    let botonElement = document.createElement('button');
    botonElement.innerText = texto;
    botonElement.addEventListener('click', callback);
    inputContainer.innerHTML = '';
    inputContainer.appendChild(botonElement);
}

function mostrarProductosEnCarro(producto, talle, cantidad, precio) {
    // Agregar información del producto al array
    proyectoData.productosEnCarro.push({
        producto: producto,
        talle: talle,
        cantidad: cantidad,
        precio: precio,
    });

    // Actualizar la lista de productos seleccionados en el HTML
    actualizarListaProductosSeleccionados();
}


// Mostrar los productos en el carro
actualizarCuadroResumen();


function actualizarCuadroResumen() {
    // Obtener el contenedor de la lista de productos seleccionados
    let listaProductosSeleccionados = document.getElementById('lista-productos-seleccionados');

    // Limpiar el contenido actual
    listaProductosSeleccionados.innerHTML = '<h2>Productos Seleccionados</h2>';

    // Crear un nuevo elemento para cada producto en el carro
    proyectoData.productosEnCarro.forEach(producto => {
        let productoElement = document.createElement('div');
        productoElement.innerText = `${producto.producto} - Talle: ${producto.talle} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio.toFixed(3)}`;
        listaProductosSeleccionados.appendChild(productoElement);
    });
}


async function interactuarConUsuario() {
    let continuar = 'si';

    do {
        let LugarProducto;

        while (!LugarProducto) {
            await obtenerInput("Seleccione un producto:");
        }

        handleProductoSeleccionado(LugarProducto);

        let talleIngresado;

        while (true) {
            talleIngresado = (await obtenerInput("Seleccione un talle:")).toUpperCase();
            if (talleIngresado) {
                break;
            } else {
                mostrarMensaje("Talle no válido. Por favor, seleccione un talle.");
            }
        }

        mostrarMensaje(`Ha seleccionado el talle: ${talleIngresado}`);

        // Mostrar el precio correspondiente al producto y talle seleccionados
        let precioProducto = obtenerPrecio(LugarProducto.toLowerCase(), talleIngresado);
        mostrarPrecio(precioProducto);

        let cantidadDeItems;

        while (isNaN(cantidadDeItems) || cantidadDeItems <= 0) {
            cantidadDeItems = parseFloat(await obtenerInput(`¿Cuántos "${LugarProducto}" desea comprar? `));

            if (isNaN(cantidadDeItems) || cantidadDeItems <= 0) {
                mostrarMensaje('Por favor, ingrese una cantidad válida mayor que cero.');
            }
        }

        // Mostrar la información en el carro
        mostrarProductosEnCarro(LugarProducto, talleIngresado, cantidadDeItems, precioProducto);

        let subtotal = precioProducto * cantidadDeItems;
        let fila = `${LugarProducto.padEnd(15)}${talleIngresado.padEnd(8)}${precioProducto.toString().padEnd(13)}${cantidadDeItems.toString().padEnd(12)}$${subtotal.toFixed(3)}\n`;
        proyectoData.ticket = proyectoData.ticket + fila;
        proyectoData.total += subtotal;

        continuar = await obtenerInput('¿Desea volver a cargar otro item? (si/no)').toLowerCase();
    } while (continuar === 'si');

    proyectoData.ticket = proyectoData.ticket + `Total a pagar: $${proyectoData.total}`;
    mensajeElement.innerHTML = proyectoData.ticket;
    mostrarMensaje(`Gracias por visitarnos!. Saludos`);

    localStorage.setItem('productosEnCarro', JSON.stringify(proyectoData.productosEnCarro));
    actualizarCuadroResumen();
}

// Función para obtener el precio correspondiente al producto y talle seleccionados
function obtenerPrecio(producto, talle) {
    switch (producto) {
        case 'remeras':
            return proyectoData.Productos.Remeras.find(item => item.Talles === talle).Precio;
        case 'shorts':
            return proyectoData.Productos.Shorts.find(item => item.Talles === talle).Precio;
        case 'zapatos':
            return proyectoData.Productos.Zapatos.find(item => item.Talles === talle).Precio;
        case 'gorras':
            return proyectoData.Productos.Gorras.find(item => item.Talles === talle).Precio;
        default:
            return 0;
    }
}

// Función para actualizar la lista de productos seleccionados en el HTML
function actualizarListaProductosSeleccionados() {
    // Obtener el contenedor de la lista de productos seleccionados
    let listaProductosSeleccionados = document.getElementById('lista-productos-seleccionados');

    // Limpiar el contenido actual
    listaProductosSeleccionados.innerHTML = '<h2>Productos Seleccionados</h2>';

    // Crear un nuevo elemento para cada producto en el carro
    proyectoData.productosEnCarro.forEach(producto => {
        let productoElement = document.createElement('div');
        productoElement.innerText = `${producto.producto} - Talle: ${producto.talle} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio.toFixed(3)}`;
        listaProductosSeleccionados.appendChild(productoElement);
    });
}

interactuarConUsuario();