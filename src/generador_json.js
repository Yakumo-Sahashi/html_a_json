let arreglo = new Array();
let llaves =  new Array();

const extraer_keys = datos_key => {
    llaves = datos_key.split("<th>"); 
}

const generar_objeto = arreglo => {
    let objeto = '';
    for(let i = 1; i < arreglo.length; i++){
        objeto += `"${llaves[i].replace("</th>","").trim()}":"${arreglo[i].replace("</td>","").trim()}" ${((i+1)== arreglo.length ? '' : ',')}`;
    }
    return `{${objeto}}`;
}

const crear_arreglo =  () => {
    let tabla = document.getElementsByTagName("tr");
    for(let i = 0; i < tabla.length; i++){
        let contenido = tabla[i].innerHTML;
        if(i == 0) {
            extraer_keys(contenido);
        } else {
            contenido = contenido.split("<td>");
            arreglo.push(JSON.parse(generar_objeto(contenido)))
        }
    }
}

const generar = (archivo, contenido) => {
    let datos = new FormData();
    datos.append('arreglo', JSON.stringify(contenido));
    datos.append('nombre_archivo', `${archivo}`);
    datos.append('funcion', `crear_json`);
    fetch(`src/crear_json.php`, {
        method: `POST`,
        body: datos
    }).then(respuesta => respuesta.json())
    .then(respuesta => {
        if(respuesta[0] == 1){
            console.log(respuesta[1]);
        }else {
            console.log(respuesta[1]);
        }								
    }).catch(error => {
       console.log(error)
    });
}
crear_arreglo();
generar("actividades_apoyo",arreglo);