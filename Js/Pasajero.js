const UrlAPI_GetAll = 'http://localhost:6006/pasajero/getAll';
const UrlAPI_Insert = 'http://localhost:6006/pasajero/insertar/:codigo_pasajero';
const UrlAPI_GetPasajero = 'http://localhost:6006/pasajero/getOne/:codigo_pasajero';
const UrlAPI_Update = 'http://localhost:6006/pasajero/actualizar/:codigo_pasajero';
const UrlAPI_Delete = 'http://localhost:6006/pasajero/eliminar/:codigo_pasajero';

$(document).ready(function(){
  cargarPasajeros();
});

//Peticiones AJAX a la API sobre la base de datos
function cargarPasajeros(){
  $.ajax({
    url: UrlAPI_GetAll,
    type: 'GET',
    dataType: 'JSON',
    success: function(res) {
      let pasajeros = res;
      let valores = '';
      //Recorremos el arreglo de pasajeros que nos devuelve la peticion
      for(i = 0; i < pasajeros.length; i++){
        valores += 
          '<tr>'
          +'<td>'+pasajeros[i].codigo_pasajero+'</td>'
          +'<td>'+pasajeros[i].nombres+'</td>'
          +'<td>'+pasajeros[i].apellidos+'</td>'
          +'<td>'+pasajeros[i].fecha_registro+'</td>'
          +'<td>'+pasajeros[i].nacionalidad+'</td>'
          +'<td>'+pasajeros[i].numero_telefonico+'</td>'
          +'<td>'+pasajeros[i].email+'</td>'
          +'<td>'
          +'<button id="btnEditar" class="btn btn-primary" onclick="cargarPasajero('+pasajeros[i].codigo_pasajero+')">Editar</button>'  
          +'<button id="btnEliminar" class="btn-eliminar btn btn-danger" onclick="EliminarPasajero('+pasajeros[i].codigo_pasajero+')">Eliminar</button>'
          +'</td>'
          +'</tr>';
          $('#DatosPasajero').html(valores);
      }
    }
  });
}

function AgregarPasajero() {
  let nuevoPasajero = {
    codigo_pasajero: $('#cod_Pasajero').val(),
    nombres: $('#nombres_Pasajero').val(),
    apellidos: $('#apellidos_Pasajero').val(),
    fecha_registro: $('#fecha_Registro').val(),
    nacionalidad: $('#nacionalidad_Pasajero').val(),
    numero_telefonico: $('#telefono_Pasajero').val(),
    email: $('#email_Pasajero').val()
  };
  //Convertir objeto de datos a formato JSON
  let nuevoPasajeroJSON = JSON.stringify(nuevoPasajero);
  $.ajax({
    url: UrlAPI_Insert,
    type: 'POST',
    data: nuevoPasajeroJSON,
    dataType: 'JSON',
    contentType: 'application/json',
    success: function(res){
      console.log(res);
      //alert('Pasajero ingresado de forma exitosa!');
    },
    error: function(texError, errorThrow){
      //alert('Error '+texError+' '+errorThrow);
    }
  });

  if (success = true) {
    alert('Pasajero '+nuevoPasajero.codigo_pasajero+' ingresado correctamente');
  }else {
    alert('Error '+textError+' '+errorThrow)
  }
}

function cargarPasajero(p_codPasajero){
  let pasajeroActualizar = {
    codigo_pasajero: p_codPasajero
  };
  let pasajeroActualizarJSON = JSON.stringify(pasajeroActualizar);
  $.ajax({
    url: UrlAPI_GetPasajero,
    type: 'POST',
    data: pasajeroActualizarJSON,
    dataType: 'JSON',
    contentType: 'application/json',
    success: function(res){
      let Pasajero = res;
      for(i = 0; i < Pasajero.length; i++){
        $('#cod_Pasajero').val(Pasajero[i].codigo_pasajero);
        $('#nombres_Pasajero').val(Pasajero[i].nombres);
        $('#apellidos_Pasajero').val(Pasajero[i].apellidos);
        $('#fecha_Registro').val(Pasajero[i].fecha_registro);
        $('#nacionalidad_Pasajero').val(Pasajero[i].nacionalidad);
        $('#telefono_Pasajero').val(Pasajero[i].numero_telefonico);
        $('#email_Pasajero').val(Pasajero[i].email);

        let btnActualizar = '<input type="submit" id="btnActualizar" value="Actualizar Pasajero" class="btn btn-success" onclick="ActualizarPasajero()">';
        let btnCancelar = '<input type="submit" id="btnCancelar" value="Cancelar" class="btn btn-danger" onclick="CancelarUpdate()"><hr>';
        $('#btnAgregarPasajero').html(btnActualizar);
        $('#btnEliminarPasajero').html(btnCancelar);
      }
    },
    error : function(textStatus, errorThrown){
      alert('Error '+ textStatus + errorThrown);
    }
  });
}

function ActualizarPasajero(){
  let Pasajero = {
    codigo_pasajero: $('#cod_Pasajero').val(),
    nombres: $('#nombres_Pasajero').val(),
    apellidos: $('#apellidos_Pasajero').val(),
    fecha_registro: $('#fecha_Registro').val(),
    nacionalidad: $('#nacionalidad_Pasajero').val(),
    numero_telefonico: $('#telefono_Pasajero').val(),
    email: $('#email_Pasajero').val()
  };
  let PasajeroJSON = JSON.stringify(Pasajero);
  $.ajax({
    url: UrlAPI_Update,
    type: 'PUT',
    data: PasajeroJSON,
    dataType: 'JSON',
    contentType: 'application/json',
    success: function(res){
      console.log(res);
      //alert('Pasajero actualizado de forma exitosa!');
    },
    error: function(texError, errorThrow){
      //alert('Error '+texError+' '+errorThrow);
    }
  });
  alert('Pasajero '+Pasajero.codigo_pasajero+' actualizado correctamente');

}

function EliminarPasajero(p_codPasajero){
  let pasajeroEliminar = {
    codigo_pasajero: p_codPasajero
  };
  let pasajeroEliminarJSON = JSON.stringify(pasajeroEliminar);
  $.ajax({
      url: UrlAPI_Delete,
      type: 'DELETE',
      data: pasajeroEliminarJSON,
      dataType: 'JSON',
      contentType: 'application/json',
      success: function(res){
        alert('Pasajero '+pasajeroEliminar.codigo_pasajero+' eliminado correctamente!!');
      }
  });
  alert('Pasajero '+pasajeroEliminar.codigo_pasajero+' eliminado correctamente');
  window.location.reload();
}
//Función para recargar la página de forma automatica donde se requier, especificamente para el botón cancelar
function CancelarUpdate(){
  window.location.reload();
}