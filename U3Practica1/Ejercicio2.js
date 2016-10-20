var alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var letra = "";

function palabrasAzar(){
	letra = alfabeto[Math.floor((Math.random() * alfabeto.length))];

	var formulario = 
		'<form name="formulario">' + 
			'<h1>Manipular Arrays</h1>' + 
			'<div><b>Introduce algunas palabras que empiecen por: ' + letra + '</b></div>' + 
			'<textarea name="textarea"></textarea>' + 
			'<button onclick="contarPalabaras()">Aceptar</button>' + 
		'</form>';
	document.write(formulario);
}

var palabras;
var ventana;
var contador = 0;
var fallos = new Array();

function contarPalabaras(){
	palabras = formulario.textarea.value.split(" ");
	console.log(palabras);
	ventana = window.open("", "", "width=500,height=300");
	ventana.document.write('<meta charset="utf-8">');
	for (var i = 0; i < palabras.length; i++) {
		console.log(palabras[i].charAt(0));
		if (palabras[i].charAt(0) == letra) {
			contador++;
		}
		else{
			fallos.push(palabras[i]);
		}
	}
	if (contador != 0 && contador == palabras.length) {
		ventana.document.write('<p><b>¡Has ganado! ¡Tienes ' + contador + ' puntos!</b></p>');	
	}
	else {
		ventana.document.write('<p><b>¡Has perdido! Tiene unos cuantos errores:</b></p>');
		errores();
	}
}

function errores(){
	for (var i = 0; i < fallos.length; i++) {
		ventana.document.write(fallos[i] + ' ');
	}
}