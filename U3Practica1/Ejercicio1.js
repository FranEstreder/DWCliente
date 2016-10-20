var palabras;
var ventana;

function contarPalabaras(){
	palabras = formulario.textarea.value.split(" ");
	console.log(palabras);
	ventana = window.open("", "", "width=500,height=300");
	ventana.document.write('<meta charset="utf-8">');
	primeraPalabra();
	ultimaPalabra();
	palabraLarga();
	palabraCorta();
	ordenAlfabetico();
	numeroTotal();
}

function primeraPalabra(){
	ventana.document.write('<p><b>Primera palabra: </b>' + palabras[0] + '</p>');
}

function ultimaPalabra(){
	ventana.document.write('<p><b>Última palabra: </b>' + palabras[palabras.length - 1] + '</p>');
}

function palabraLarga(){
	var maximo = 0;
	var posMax = 0;
	for (var i = 0; i < palabras.length; i++) {
		if (palabras[i].length > maximo) {
			maximo = palabras[i].length;
			posMax = i;
		}
	}
	ventana.document.write('<p><b>Palabra más larga: </b>' + palabras[posMax] + '</p>');
}

function palabraCorta(){
	var minimo = 100;
	var posMin = 0;
	for (var i = 0; i < palabras.length; i++) {
		if (palabras[i].length < minimo) {
			minimo = palabras[i].length;
			posMin = i;
		}
	}
	ventana.document.write('<p><b>Palabra más corta: </b>' + palabras[posMin] + '</p>');
}

function ordenAlfabetico(){
	palabras = palabras.sort();
	ventana.document.write('<p><b>Listado de palabras por orden alfabético: </b>' + palabras + '</p>');
}

function numeroTotal(){
	ventana.document.write('<p><b>Número total de palabras: </b>' + palabras.length + '</p>');
}