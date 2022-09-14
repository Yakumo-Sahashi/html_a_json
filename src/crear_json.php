<?php
    call_user_func('JSON::'.$_POST['funcion']);
    class JSON {
        static function crear_json () {
            $json_actual = $_POST['arreglo'];
            $nombre_archivo = 'JSON/'.$_POST['nombre_archivo'].".json";
            $archivo = fopen($nombre_archivo, "w+");
            if(fwrite($archivo, $json_actual)){
                echo json_encode(["1","Archivo JSON creado con exito!"]);
            }else {
                echo json_encode(["0","Error al procesar informacion!"]);
            }
            fclose($archivo);
        }
    }
?>