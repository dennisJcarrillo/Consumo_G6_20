const UrlAPI_GetAll = 'http://localhost:6006/reserva/getAll';
const UrlAPI_Insert = 'http://localhost:6006/reserva/insertar/:numero_reservacion';
const UrlAPI_GetReserva = 'http://localhost:6006/reserva/getOne/:numero_reservacion';
const UrlAPI_Update = 'http://localhost:6006/reserva/actualizar/:numero_reservacion';
const UrlAPI_Delete = 'http://localhost:6006/reserva/eliminar/:numero_reservacion';

$(document).ready(function(){
  cargarReservas();
});

//Peticiones AJAX a la API sobre la base de datos
function cargarReservas(){
  $.ajax({
    url: UrlAPI_GetAll,
    type: 'GET',
    dataType: 'JSON',
    success: function(res) {
      let reservas = res;
      let valores = '';
      //Recorremos el arreglo de reservas que nos devuelve la peticion
      for(i = 0; i < reservas.length; i++){
        valores += 
          '<tr>'
          +'<td>'+reservas[i].numero_reservacion+'</td>'
          +'<td>'+reservas[i].codigo_vuelo+'</td>'
          +'<td>'+reservas[i].codigo_pasajero+'</td>'
          +'<td>'+reservas[i].nombre_pasajero+'</td>'
          +'<td>'+reservas[i].ciudad_destino+'</td>'
          +'<td>'+reservas[i].fecha_vuelo+'</td>'
          +'<td>'+reservas[i].precio_vuelo+'</td>'
          +'<td>'
          +'<button id="btnEditar" class="btn btn-primary" onclick="cargarReserva('+reservas[i].numero_reservacion+')">Editar</button>'  
          +'<button id="btnEliminar" class="btn-eliminar btn btn-danger" onclick="EliminarReserva('+reservas[i].numero_reservacion+')">Eliminar</button>'
          +'</td>'
          +'</tr>';
          $('#DatosReserva').html(valores);
      }
    }
  });
}

function AgregarReserva() {
  let nuevaReserva = {
    numero_reservacion: $('#numero_Reservacion').val(),
    codigo_vuelo: $('#cod_Vuelo').val(),
    codigo_pasajero: $('#cod_Pasajero').val(),
    nombre_pasajero: $('#nombre_Pasajero').val(),
    ciudad_destino: $('#ciudad_Destino').val(),
    fecha_vuelo: $('#fecha_Vuelo').val(),
    precio_vuelo: $('#precio_Vuelo').val()
  };
  //Convertir objeto de datos a formato JSON
  let nuevaReservaJSON = JSON.stringify(nuevaReserva);
  $.ajax({
    url: UrlAPI_Insert,
    type: 'POST',
    data: nuevaReservaJSON,
    dataType: 'JSON',
    contentType: 'application/json',
    success: function(res){
      console.log(res);
      alert('Reserva ingresada de forma correcta!');
    },
    error: function(texError, errorThrow){
      alert('Error '+texError+' '+errorThrow);
    }
  });
}

function cargarReserva(p_numReservacion){
  let reservaActualizar = {
    numero_reservacion: p_numReservacion
  };
  let reservaActualizarJSON = JSON.stringify(reservaActualizar);
  $.ajax({
    url: UrlAPI_GetReserva,
    type: 'POST',
    data: reservaActualizarJSON,
    dataType: 'JSON',
    contentType: 'application/json',
    success: function(res){
      let Reserva = res;
      for(i = 0; i < Reserva.length; i++){
        $('#numero_Reservacion').val(Reserva[i].numero_reservacion);
        $('#cod_Vuelo').val(Reserva[i].codigo_vuelo);
        $('#cod_Pasajero').val(Reserva[i].codigo_pasajero);
        $('#nombre_Pasajero').val(Reserva[i].nombre_pasajero);
        $('#ciudad_Destino').val(Reserva[i].ciudad_destino);
        $('#fecha_Vuelo').val(Reserva[i].fecha_vuelo);
        $('#precio_Vuelo').val(Reserva[i].precio_vuelo);

        let btnActualizar = '<input type="submit" id="btnActualizar" value="Actualizar Reserva" class="btn btn-success" onclick="ActualizarReserva()">';
        let btnCancelar = '<input type="submit" id="btnCancelar" value="Cancelar" class="btn btn-danger" onclick="CancelarUpdate()"><hr>';
        $('#btnAgregarReserva').html(btnActualizar);
        $('#btnEliminarReserva').html(btnCancelar);
      }
    },
    error : function(textStatus, errorThrown){
      alert('Error '+ textStatus + errorThrown);
    }
  });
}

function ActualizarReserva(){
  let Reserva = {
    numero_reservacion: $('#numero_Reservacion').val(),
    codigo_vuelo: $('#cod_Vuelo').val(),
    codigo_pasajero: $('#cod_Pasajero').val(),
    nombre_pasajero: $('#nombre_Pasajero').val(),
    ciudad_destino: $('#ciudad_Destino').val(),
    fecha_vuelo: $('#fecha_Vuelo').val(),
    precio_vuelo: $('#precio_Vuelo').val()
  };
  let ReservaJSON = JSON.stringify(Reserva);
  $.ajax({
    url: UrlAPI_Update,
    type: 'PUT',
    data: ReservaJSON,
    dataType: 'JSON',
    contentType: 'application/json',
    success: function(res){
      console.log(res);
      alert('Reserva actualizada de forma correcta!');
    },
    error: function(texError, errorThrow){
      alert('Error '+texError+' '+errorThrow);
    }
  });
}

function EliminarReserva(p_numReservacion){
  let reservaEliminar = {
    numero_reservacion: p_numReservacion
  };
  let reservaEliminarJSON = JSON.stringify(reservaEliminar);
  $.ajax({
      url: UrlAPI_Delete,
      type: 'DELETE',
      data: reservaEliminarJSON,
      dataType: 'JSON',
      contentType: 'application/json',
      success: function(res){
        alert('Reserva '+reservaEliminar.numero_Reservacion+' eliminada correctamente!!');
      }
  });
  window.location.reload();
}
//Función para recargar la página de forma automatica donde se requiere, especificamente para el botón cancelar
function CancelarUpdate(){
  window.location.reload();
}