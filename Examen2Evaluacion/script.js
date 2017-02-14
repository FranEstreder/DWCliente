if (window.XMLHttpRequest) {
	var	xhr = new XMLHttpRequest();
}else if(ActiveXObject("Microsoft.XMLHTTP")){
	var xhr = ActiveXObject("Microsoft.XMLHTTP");
}

onload = function () {
	if (window.XMLHttpRequest) {
		var	xhr = new XMLHttpRequest();
	}else if(ActiveXObject("Microsoft.XMLHTTP")){
		var xhr = ActiveXObject("Microsoft.XMLHTTP");
	}

	var ayudaEnlace = document.getElementsByTagName('a')[0];
	ayudaEnlace.onclick = pideAyuda;

	function pideAyuda(e){
		e.preventDefault();
		xhr.addEventListener("readystatechange", pideAyuda2);
		xhr.open('GET', 'ayuda.txt', true);
		xhr.send();
	}

	function pideAyuda2() {
		if (xhr.status == 200 && xhr.readyState == 4){
	        ayuda.innerHTML = xhr.responseText;
	    }else if (xhr.status != 200 && xhr.readyState != 4){
	        ayuda.innerHTML = "Error " + xhr.status;
	        ayuda.innerHTML += ": " + xhr.statusText;
	        ayuda.innerHTML += "<br>" + xhr.getAllResponseHeaders();
	    }
	}

	var formulario = document.forms[0];
	formulario.onsubmit = function(e){

		e.preventDefault();

		if (window.XMLHttpRequest) {
			var	xhr = new XMLHttpRequest();
		}else if(ActiveXObject("Microsoft.XMLHTTP")){
			var xhr = ActiveXObject("Microsoft.XMLHTTP");
		}

		xhr.addEventListener("readystatechange", pideLogin);
		xhr.open("GET", "login.php", true);
		xhr.send();

		function pideLogin() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if (xhr.responseText == "si") {
					resultado.innerHTML = "El nombre de usuario está registrado";
					imagenes();
				}else if (xhr.responseText == "no") {
					resultado.innerHTML = "El nombre de usuario no está registrado. Deberá darse de alta";
				}
			}else if (xhr.status != 200 && xhr.readyState != 4){
		        resultado.innerHTML = "Error " + xhr.status;
		        resultado.innerHTML += ": " + xhr.statusText;
		        resultado.innerHTML += "<br>" + xhr.getAllResponseHeaders();
	    	}
		}

		function imagenes() {
			$.getJSON( "homeLogado1.json", function( data ) { 
				console.log(data);
				$.each( data.fotos, function(i, item) {
					// console.log(item);
					$("<img>").attr({"src": item.foto, "alt": item.titulo}).appendTo("#contenido");
				});
			});
		}

		errores.innerHTML = "";

	    var email = document.getElementById("user");
	    if ( ! (/^\w+([\.\-\+]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,4})+$/.test(email.value)) ){
    		email.style.border = "1px solid red";
    		email.style.outline = "none";
    		errores.innerHTML += "El email es incorrecto.<br>";
	    }else{
	    	email.style.border = "1px solid black";
    		email.style.outline = "initial";
	    }

	    var pass = document.getElementById("pass");
	    if ( ! (/\w{6,8}/.test(pass.value)) ){ 
    		pass.style.border = "1px solid red";
    		pass.style.outline = "none";
	    	errores.innerHTML += "La contraseña es incorrecta.<br>";
	    }else{
	    	pass.style.border = "1px solid black";
    		pass.style.outline = "initial";
	    }

	}

}