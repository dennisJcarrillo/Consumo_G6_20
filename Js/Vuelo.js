
//REALIZADO POR CARLOS ARIEL GARCIA GARCIA

var UrlApiGetAll = 'http://localhost:6006/vuelo/getall';
var UrlApiInsert = 'http://localhost:6006/vuelo/insertar/:codigo_vuelo';
var UrlApiGetOne = 'http://localhost:6006/vuelo/getone/:codigo_vuelo';
var UrlApiUpdate ='http://localhost:6006/vuelo/actualizar/:codigo_vuelo';
var UrlApiDelete = 'http://localhost:6006/vuelo/eliminar/:codigo_vuelo';

$(document).ready(function () {
    CargarVuelos();
});

function CargarVuelos() {
    $.ajax({
        url: UrlApiGetAll,
        type: 'GET',
        datatype:'JSON',
        success: function (reponse) {
            var MiItems = reponse;
            var Valores = '';

            for (i = 0; i < MiItems.length; i++) {
                Valores += 
                            '<tr>'+
                            '<td>'+ MiItems[i].codigo_vuelo +'</td>'+
                            '<td>'+ MiItems[i].ciudad_origen +'</td>'+
                            '<td>'+ MiItems[i].ciudad_destino +'</td>'+
                            '<td>'+ MiItems[i].fecha_vuelo +'</td>'+
                            '<td>'+ MiItems[i].cantidad_pasajeros +'</td>'+
                            '<td>'+ MiItems[i].tipo_avion +'</td>'+
                            '<td>'+ MiItems[i].distancia +'</td>'+
                            '<td >'+
                                '<button id="btneditar" class="btn btn-primary" onclick="CargarVuelo('+ MiItems[i].codigo_vuelo +')">Editar</button>'+
                            '</td>'+
                            '<td >'+
                                '<button id="btnborrar" class="btn btn-danger" onclick="BorrarVuelo('+ MiItems[i].codigo_vuelo +', location.reload())">Borrar</button>'+ 
                            '</td>'+
                            '</tr>';
                            $('#DataVuelos').html(Valores);
            }
        }
    });
}

function AgregarVuelo() {
    var datosVuelo = {
        codigo_vuelo:$('#codVuelo').val(),
        ciudad_origen:$('#ciudOrigen').val(),
        ciudad_destino:$('#ciudDestino').val(),
        fecha_vuelo:$('#Fecha').val(),
        cantidad_pasajeros:$('#cantPasajeros').val(),
        tipo_avion:$('#tipoAvion').val(),
        distancia:$('#Distancia').val()
    };

    var datosVueloJson = JSON.stringify(datosVuelo);

    $.ajax({
        url:UrlApiInsert,
        type:'POST',
        data:datosVueloJson,
        datatype:'JSON',
        contentType:'application/json',
        success:function (reponse) {
            console.log(reponse);
            alert('Vuelo ingresado correctamente');
        },
        error:function (textError, errorThrow) {
            alert('Error '+textError+' '+errorThrow)
        }
    });

}

function CargarVuelo(p_codigo_vuelo) {
    
    var datosVuelo = {
        codigo_vuelo:p_codigo_vuelo
    };

    var datosVueloJson = JSON.stringify(datosVuelo);

    $.ajax({
        url:UrlApiGetOne,
        type:'POST',
        data:datosVueloJson,
        datatype:'JSON',
        contentType:'application/json',
        success:function (reponse) {
            var MiItems = reponse;
            for (i = 0; i < MiItems.length; i++) {
                $('#codVuelo').val(MiItems[i].codigo_vuelo);
                $('#ciudOrigen').val(MiItems[i].ciudad_origen);
                $('#ciudDestino').val(MiItems[i].ciudad_destino);
                $('#Fecha').val(MiItems[i].fecha_vuelo);
                $('#cantPasajeros').val(MiItems[i].cantidad_pasajeros);
                $('#tipoAvion').val(MiItems[i].tipo_avion);
                $('#Distancia').val(MiItems[i].distancia);

                var btnActualizar = '<input type="submit" value="Actualizar vuelo" class="btn btn-primary" id="btnAgregar" onclick="ActualizarVuelo('+ MiItems[i].codigo_vuelo +')" value="Actualizar Vuelo">';

                $('#btnAgregarVuelo').html(btnActualizar);
            }
        }
    })
}

function ActualizarVuelo(p_codigo_vuelo) {
    var datosVuelo = {
        codigo_vuelo:p_codigo_vuelo,
        ciudad_origen:$('#ciudOrigen').val(),
        ciudad_destino:$('#ciudDestino').val(),
        fecha_vuelo:$('#Fecha').val(),
        cantidad_pasajeros:$('#cantPasajeros').val(),
        tipo_avion:$('#tipoAvion').val(),
        distancia:$('#Distancia').val()
    };

    var datosVueloJson = JSON.stringify(datosVuelo);

    $.ajax({
        url:UrlApiUpdate,
        type:'PUT',
        data:datosVueloJson,
        datatype:'JSON',
        contentType:'application/json',
        success:function (reponse) {
            var MiItems = reponse;
            for (i = 0; i < MiItems.length; i++) {
                $('#codVuelo').val(MiItems[i].codigo_vuelo);
                $('#ciudOrigen').val(MiItems[i].ciudad_origen);
                $('#ciudDestino').val(MiItems[i].ciudad_destino);
                $('#Fecha').val(MiItems[i].fecha_vuelo);
                $('#cantPasajeros').val(MiItems[i].cantidad_pasajeros);
                $('#tipoAvion').val(MiItems[i].tipo_avion);
                $('#Distancia').val(MiItems[i].distancia);

                var btnActualizar = '<input type="submit" value="Actualizar vuelo" class="btn btn-primary" id="btnAgregar" onclick="ActualizarVuelo('+ MiItems[i].codigo_vuelo +')">';

                $('#btnAgregarVuelo').html(btnActualizar);

                alert('Pasajero actualizado de forma exitosa!')
                
            }
            
            
        },
        error: function(texError, errorThrow){
            alert('Error '+texError+' '+errorThrow);
          }
    })
}

function BorrarVuelo(p_codigo_vuelo) {
    var datosVuelo = {
        codigo_vuelo:p_codigo_vuelo
    };

    var datosVueloJson = JSON.stringify(datosVuelo);

    $.ajax({
        url:UrlApiDelete,
        type:'DELETE',
        data:datosVueloJson,
        datatype:'JSON',
        contentType:'application/json',

        success: function(res){
            alert('Pasajero '+pasajeroEliminar.codigo_pasajero+' eliminado correctamente!!');
          }
    })
}
