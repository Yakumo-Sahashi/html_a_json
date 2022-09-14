"use strict";

var arreglo = new Array();
var llaves = new Array();

var extraer_keys = function extraer_keys(datos_key) {
  llaves = datos_key.split("<th>");
};

var generar_objeto = function generar_objeto(arreglo) {
  var objeto = '';

  for (var i = 1; i < arreglo.length; i++) {
    objeto += "\"".concat(llaves[i].replace("</th>", "").trim(), "\":\"").concat(arreglo[i].replace("</td>", "").trim(), "\" ").concat(i + 1 == arreglo.length ? '' : ',');
  }

  return "{".concat(objeto, "}");
};

var crear_arreglo = function crear_arreglo() {
  var tabla = document.getElementsByTagName("tr");

  for (var i = 0; i < tabla.length; i++) {
    var contenido = tabla[i].innerHTML;

    if (i == 0) {
      extraer_keys(contenido);
    } else {
      contenido = contenido.split("<td>");
      arreglo.push(JSON.parse(generar_objeto(contenido)));
    }
  }
};

var generar = function generar(archivo, contenido) {
  var datos = new FormData();
  datos.append('arreglo', JSON.stringify(contenido));
  datos.append('nombre_archivo', "".concat(archivo));
  datos.append('funcion', "crear_json");
  fetch("src/crear_json.php", {
    method: "POST",
    body: datos
  }).then(function (respuesta) {
    return respuesta.json();
  }).then(function (respuesta) {
    if (respuesta[0] == 1) {
      console.log(respuesta[1]);
    } else {
      console.log(respuesta[1]);
    }
  })["catch"](function (error) {
    console.log(error);
  });
};

crear_arreglo();
generar("actividades_apoyo", arreglo);