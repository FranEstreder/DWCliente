if (window.XMLHttpRequest) {
	var	xhr = new XMLHttpRequest();
}else if(ActiveXObject("Microsoft.XMLHTTP")){
	var xhr = ActiveXObject("Microsoft.XMLHTTP");
}

onload = function () {
	xhr.addEventListener("readystatechange", cambioSelector1);
	xhr.open('GET', 'https://swapi.co/api/?format=json', true);
	xhr.send();
	selector1.onchange = usoSelector1;
	selector2.onchange = usoSelector2;
}

function cambioSelector1() {
	if (xhr.readyState == 4 && xhr.status == 200) {
		resultado.innerHTML = '';
		var objeto = JSON.parse(xhr.responseText);
		// console.log("Hola");
		// console.log(xhr.responseText);
		// console.log(objeto);

		for (var obj in objeto) {
			// console.log(obj);
			var opcion = document.createElement("option");
			opcion.setAttribute("value", obj);
			opcion.innerText = obj;
			selector1.appendChild(opcion);
		}

	}else if (xhr.readyState == 4 && xhr.status != 200) {
		var str = "Se ha producido el error: " + xhr.status;
		str += "\n " + xhr.statusText;
		str += "\n Más información: ";
		str += "\n" + xhr.getAllResponseHeaders();
		alert(str);
	}
}

function usoSelector1() {
	xhr.removeEventListener("readystatechange", cambioSelector1);
	xhr.addEventListener("readystatechange", cambioSelector2);
	var valor = selector1.value;
	if (valor != "none") {
		xhr.open('GET', 'https://swapi.co/api/' + valor + '/?format=json', true);
		xhr.send();
	}
}

var vehiculos = new Array();

function cambioSelector2() {
	if (xhr.readyState == 4 && xhr.status == 200) {
		resultado.innerHTML = '';
		selector2.innerHTML = '<option value="none" selected="selected">Elige una opción</option>';
		var objeto = JSON.parse(xhr.responseText);
		// console.log("Hola");
		// console.log(xhr.responseText);
		// console.log(objeto);
		var aux = objeto.results;

		for (var i = 0; i < aux.length; i++) {
			// console.log(aux[i]);
			var opcion = document.createElement("option");
			if (aux[i].name) { 
				opcion.setAttribute("value", i + 1);
				opcion.innerText = aux[i].name;
			}else if(aux[i].title){
				opcion.setAttribute("value", i + 1);
				opcion.innerText = aux[i].title;
			}
			selector2.appendChild(opcion);
		}

		vehiculos = objeto;

	}else if (xhr.readyState == 4 && xhr.status != 200) {
		var str = "Se ha producido el error: " + xhr.status;
		str += "\n " + xhr.statusText;
		str += "\n Más información: ";
		str += "\n" + xhr.getAllResponseHeaders();
		alert(str);
	}
}

function usoSelector2() {
	xhr.removeEventListener("readystatechange", cambioSelector2);
	var valor = selector2.value;
	if (valor != "none") {
		var categoria = selector1.value;
		cambioResultado();
	}
}

function cambioResultado() {
	resultado.innerHTML = '';
	var objeto = vehiculos.results;
	// console.log("Hola");
	// console.log(xhr.responseText);
	// console.log(objeto);

	for (var obj in objeto[selector2.value - 1]) {
		if (!(/^http/).test(objeto[selector2.value - 1][obj])) {
			// console.log(obj);
			var opcion = document.createElement("p");
			opcion.innerText = obj + ": " + objeto[selector2.value - 1][obj];
			resultado.appendChild(opcion);
		}
	}
	
}
