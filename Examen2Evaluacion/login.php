<?php header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
// Generar un número aleatorio
srand((double)microtime()*1000000);
$numeroAleatorio = rand(0, 10);
// El script devuelve aleatoriamente 'si' o 'no' para que la aplicación
// cliente pueda comprobar los dos casos
echo ($numeroAleatorio % 2 == 0)? "si" : "no";
?>
