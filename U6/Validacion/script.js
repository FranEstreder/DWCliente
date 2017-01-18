onload=function () {

	var captchaNum = Math.floor((Math.random() * 8999) + 1000);
	ncap.innerHTML = captchaNum;

	var formulario = document.forms[0];
	formulario.onsubmit = function(){

		var err = document.getElementsByClassName('errores')[0];
	    var errList = "";
	    var ret = true;

		var nom = document.getElementsByName('nombre')[0].value;
	    if (nom == null || nom.length == 0 || !(/^\S+$/.test(nom))){
	    	if (ret) {
	    		formulario.nombre.focus();
	    		formulario.nombre.style.border = "1px solid red";
	    		formulario.nombre.style.outline = "none";
	    	}
	        errList += "El nombre es erróneo <br/>"
	        ret = false;
    	}

    	var apellidos = document.getElementsByName('apellidos')[0].value;
	    if (apellidos == null || apellidos.length == 0 || !(/^\S+[\s?\S+]*$/.test(apellidos))){
	    	if (ret) {
	    		formulario.apellidos.focus();
	    		formulario.apellidos.style.border = "1px solid red";
	    		formulario.apellidos.style.outline = "none";
	    	}
	      	ret = false;
	      	errList += "Hay un error en los apellidos <br/>";
    	}

    	if (apellidos == nom) {
    		ret = false;
    		errList += "El nombre y los apellidos coinciden <br/>";
    	}

	    var edad = document.getElementsByName('edad')[0].value;
	    if ( isNaN(edad)){
	    	if (ret) {
	    		formulario.edad.focus();
	    		formulario.edad.style.border = "1px solid red";
	    		formulario.edad.style.outline = "none";
	    	}
	      	errList += "La edad es errónea <br/>"
	      	ret = false;
	    }else if (edad < 18){
	    	if (ret) {
	    		formulario.edad.focus();
	    		formulario.edad.style.border = "1px solid red";
	    		formulario.edad.style.outline = "none";
	    	}
	      	errList += "Debe ser mayor de edad para inscribirse <br/>"
	      	ret = false;
	    }

	    var email = document.getElementsByName("email")[0].value;
	    if ( ! (/^\w+([\.\-\+]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,4})+$/.test(email)) ){
	    	if (ret) {
	    		formulario.email.focus();
	    		formulario.email.style.border = "1px solid red";
	    		formulario.email.style.outline = "none";
	    	}
	      	errList += "El email es incorrecto <br/>";
	      	ret = false;
	    }

	    var dni = document.getElementsByName("dni")[0].value;
		var letras = ['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E','T'];
		if( !(/^\d{8}[A-Z]|[a-z]$/.test(dni)) ){ 
			if (ret) {
	    		formulario.dni.focus();
	    		formulario.dni.style.border = "1px solid red";
	    		formulario.dni.style.outline = "none";
	    	}
			ret = false; 
			errList += "El DNI no es correcto <br/>";
			console.log("Comprobación dni");
		} else if(dni.charAt(8) != letras[(dni.substring(0, 8))%23]){ 
			if (ret) {
	    		formulario.dni.focus();
	    		formulario.dni.style.border = "1px solid red";
	    		formulario.dni.style.outline = "none";
	    	}
			ret = false; 
			errList += "El DNI no es correcto <br/>";
			console.log("Comprobación dni");
		}
		
		// validar las condiciones
		if (condiciones.checked == false) {
			if (ret) {
	    		condiciones.focus();
	    		condiciones.style.border = "1px solid red";
	    		condiciones.style.outline = "none";
	    	}
			errList += "Debes aceptar las condiciones <br/>";
	      	ret = false;
	      	console.log("Comprobación condiciones");
		}

		var captchaUsu = captcha.value;
		if (captchaNum != captchaUsu) {
			if (ret) {
	    		captcha.focus();
	    		captcha.style.border = "1px solid red";
	    		captcha.style.outline = "none";
	    	}
			errList += "El captcha no coincide <br/>";
			ret = false;
			console.log("Comprobación captcha");
		}

		if (ret){
	      	errList = "Tu petición se ha enviado correctamente";
	      	err.style.color="green";
	    }else{
	      	err.style.color="red";
	    }

	    err.innerHTML = errList;
	    return ret;

	}

}