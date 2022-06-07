// Variables
let cantidadProductos
let opcionDePago
let precioProducto
let subtotal = 0
let montoTotal
let ventas = []
let precioPorProducto = []
let nroDeCuotas

const IVA = 0.21

function inicioFin() {
    let inicio = confirm("Desea realizar una compra?")
    if (inicio) {
        cantidadProductos = prompt("cuantos productos va a comprar")
        productos(cantidadProductos)
        pago()
    } else {
        alert("Adios!")
    }
}

inicioFin()

// Validación de datos ingresados por usuario
function validacionDeDatos(numero) {
    // Verifica que se ingrese un valor y/o corrige si tiene "," o "."
    while (isNaN(numero) || numero == undefined || numero == null) {
        numero = prompt("Por favor verifique el numero y vuelva a ingresarlo")
            // Verifica si el numero ingresado fue con coma o punto
        if (numero.includes(",")) {
            console.log(true)
                // Cambia la coma por punto para poder realiza operaciones matematicas
            x = numero.replace(",", ".")
            numero = x

        }
    }
    return
}



function productos(cantidadProductos) {
    // Ejecuta función
    validacionDeDatos(cantidadProductos)
    for (i = 0; i < cantidadProductos; i++) {
        let articulo = 1
            // Acumulador para mostrar en pantalla
        articulo += i
        precioProducto = prompt("Igrese el precio del aerticulo Nro." + articulo)
            // Validad el prompt de precios
        validacionDeDatos(precioProducto)
            //Con esto al final se podria imprimir un resumen [Work in progress]
        precioPorProducto.push(precioProducto)
        subtotal = subtotal + parseFloat(precioProducto)

    }

    return subtotal
}


//Enfucnión  de la selección del ussuario busca interes
function masterCardVisa(nroDeCuotas) {
    debugger
    switch (nroDeCuotas) {
        case "2":
            interes = 0.038
            break
        case "6":
            interes = 0.039
            break
        case "12":
            interes = 0.042
            break
        case "18":
            interes = 0.044
            break
        case "24":
            interes = 0.054
            break
        default:
            interes = 0.054
            break
    }
    totalAPagar(subtotal, nroDeCuotas)
    return interes
}


function metodoDePago(nroDeCuotas) {
    nroDeCuotas = prompt("¿En cuantas cuotas desea pagar su compra?")
    validacionDeDatos(nroDeCuotas)
    if (
        nroDeCuotas == 2 ||
        nroDeCuotas == 6 ||
        nroDeCuotas == 12 ||
        nroDeCuotas == 18 ||
        nroDeCuotas == 24
    ) {
        masterCardVisa(nroDeCuotas)
    }

    return nroDeCuotas
}

function totalAPagar(subtotal, nroDeCuotas) {

    subtotal = subtotal / nroDeCuotas
    subtotal = subtotal * (1 + interes)
    montoTotal = (subtotal * (1 + IVA)).toFixed(2)
    let confirmacion = confirm("¿Desea continuar?")
    if (confirmacion) {
        console.log("Ud deberá realizar ", nroDeCuotas, " pago(s) de: ", montoTotal, " IVA incluido")
        console.log("Los precios de los productos vendidos fueron")
        console.table(precioProducto)
    } else {
        alert("gracias, feliz dia")
    }
    return
}


function pago() {
    opcionDePago = confirm("¿Paga de contado?")
    if (opcionDePago) {
        nroDeCuotas = 1
        interes = 0
        totalAPagar(subtotal, nroDeCuotas)

    } else {
        metodoDePago(nroDeCuotas)

    }
    let reinicio = confirm("¿Desea Realizar otra compra?")
    if (reinicio) {
        inicioFin()
    } else {
        alert("Adios!")
    }
}