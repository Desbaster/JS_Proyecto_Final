let valorDolar;

$( document ).ready(function() {
    $.ajax({
        method: "GET",
        url:  'https://dolarsi.com/api/api.php?type=valoresprincipales',
        data: 'JSON',
        success: (respuesta) => {
            valorDolar = 'El valor de compra del ' + respuesta[0].casa.nombre + ' para la compra hoy es (' + respuesta[0].casa.compra
            + '), el valor de venta es (' + respuesta[0].casa.venta +')';
            $("#dolar").append (valorDolar);
        }
    });
});

// Array de los Datos ingresados por el usuario
let datos = [];

$("#tabla").hide();
$("#insertarResultados").hide();

//Evento de escucha para el boton de ingresar datos del usuario
document.getElementById('formulario').addEventListener('submit', almacenarDatos);

//funcion para almacenar los datos de las inputs ingresadas por el usuario
function almacenarDatos(e) {
    let nombre = document.getElementById('nombre').value;
    let tipo = document.getElementById('tipo').value;
    let monto = Number(document.getElementById('monto').value);
    
    //objeto para listar los datos
    let dato = {
    nombre,
    tipo,
    monto,
    };

    //condicionales para ingresar los datos
    if (nombre == '' || monto == '' || (tipo != 'Ingreso' && tipo != 'Gasto')){
        $(".error").show(500);
        return;
    }
    $(".error").hide(500);
    
    //grabar en localStorage 
    if(localStorage.getItem('datos') === null) {
        datos.push(dato);
        localStorage.setItem('datos', JSON.stringify(datos));
    } else {
        let datos = JSON.parse(localStorage.getItem('datos'));
        datos.push(dato);
        localStorage.setItem('datos', JSON.stringify(datos));
    }

    IngresarDatos();
    $("#tabla").hide().fadeIn(400);
    $("#insertarResultados").hide().fadeIn(400);
    //resetear el formulario
    document.getElementById('formulario').reset();
    e.preventDefault();
}

//funcion para eliminar una fila a traves del nombre
function eliminar(nombre) {
    let datos = JSON.parse(localStorage.getItem('datos'));
    for (let i = 0; i < datos.length; i++) {
        if(datos[i].nombre == nombre) {
            datos.splice(i, 1);
            $("#tabla").fadeOut(50);
            $("#insertarResultados").fadeOut(50);
        }
    }
    localStorage.setItem('datos', JSON.stringify(datos));
    IngresarDatos();
}

//funcion para ingresar los datos en el HTML (tabla)
function IngresarDatos() {
    let datos = JSON.parse(localStorage.getItem('datos'));
    let datosView = document.getElementById('insertarDatos');
    datosView.innerHTML = '';
    for (let i = 0; i < datos.length; i++) {
        let nombre = datos[i].nombre;
        let tipo = datos[i].tipo;
        let monto = datos[i].monto;
    
        datosView.innerHTML += 
        `<tr>
            <th scope="col">${i+1}</th>
            <th scope="col">${nombre}</th>
            <th scope="col">${tipo}</th>
            <th scope="col">${monto} $</th>
            <th scope="col">
                <button onclick="eliminar('${nombre}')" class="btn btn-danger">X</button>
            </th>
        </tr>`;
        $("#insertarResultados").fadeIn('slow');
        $("#tabla").fadeIn('slow');
    }
    actualizarTotales();

    function actualizarTotales() {
        let total = 0;
        let ingresos = 0;
        let gastos = 0;
        let datos = JSON.parse(localStorage.getItem('datos'));
        let insertarResultados = document.getElementById('insertarResultados');
        for(d of datos) {
            if(d.tipo == "Ingreso"){ 
            total = parseInt(total) + parseInt(d.monto);
            ingresos = parseInt(ingresos) + parseInt(d.monto);
            } else {
                // caso d.tipo = gastos
                total = parseInt(total)  - parseInt(d.monto);
                gastos = parseInt(gastos) + parseInt(d.monto);
            }
        }
        // mostrar montos
        insertarResultados.innerHTML = 
        `<div id="totalesJs" class="row">
            <div  class="col-12">
                <h2 class="text-center">Total</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 text-center">
                <p class="titulo">Ingresos</p>
            </div>
            <div class="col-md-6 text-center">
                <p class="titulo">Gastos</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 text-center">
                <p id="ingresosJs">${ingresos} $</p>
            </div>
            <div class="col-md-6 text-center">
                <p id="gastosJs">${gastos} $</p>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h2  class="text-center">Total= <span id="total">${total} $</span> </h2>
            </div>
        </div>`
        if (total > 0){
            $("#total").css("color", "#008000b3");
        }else if (total < 0) {
            $("#total").css("color", "#ff0000b3");
        }
    }
}

IngresarDatos();