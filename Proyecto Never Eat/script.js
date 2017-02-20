$(document).ready(function () {

	//Funciones para la política de cookies
	var visit = GetCookie("cookies_surestao");
    if (visit == 1){
        $('#overbox3').toggle();
    }

	$("#cerrarCookies").on("click", function () {
		var expire = new Date();
	    expire = new Date(expire.getTime() + 7776000000);
	    document.cookie = "cookies_surestao=aceptada; expires=" + expire;
	 
	    var visit = GetCookie("cookies_surestao");
	    if (visit == 1){
	        popbox3();
	    }
	});

	function GetCookie(name) {
	    var arg = name + "=";
	    var alen = arg.length;
	    var clen = document.cookie.length;
	    var i = 0;
	    while (i < clen) {
	        var j = i + alen;
	 
	        if (document.cookie.substring(i, j) == arg){
	            return "1";
	        }
	        i = document.cookie.indexOf(" ",i) + 1;
	        if (i == 0){
	            break;
	        }
	     }
	    return null;
	}
	 
	function popbox3() {
	    $('#overbox3').toggle();
	}
	//Fin de las funciones de la política de cookies

	//Funciones para hacer los modales de Inicio Sesión, Registro y Contacto
	$("#navHeader").hide();
	$("#msgBienvenida").hide();
	$("#botonCerrarSesion").hide();
	$("#nomUsuIni").val(localStorage.getItem("nomUsuario"));
	if (localStorage.getItem("nomUsuario") != undefined) {
		$("#recordar").attr("checked", true);
		$("#passIni").focus();
	}

	$(window).on("scroll", toogleMenus);

	toogleMenus();

	//Para que al hacer click en el botón de enviar se envíe el formulario en los 3 forms que tenemos
	$("#botonIni").on("click", function () {
		$("#formIni").submit();
	});

	$("#botonReg").on("click", function () {
		$("#formReg").submit();
	});

	$("#botonCont").on("click", function () {
		$("#formCont").submit();
	});

	$("#inicioSesion").on("click", function () {
		if (localStorage.getItem("nomUsuario") != undefined) {
			$("#passIni").focus();
		}
	});

	$("#registro").on("click", function () {
		$("#nom").focus();
	})

	//Función para Cerrar Sesión
	$("#botonCerrarSesion").on("click", function () {
		$("#msgBienvenida").hide();
		$("#botonCerrarSesion").hide();
  		$("#inicioSesion").show();
  		$("#registro").show();
	});

	// Para que el formulario se envíe con Enter en los 3 forms que tenemos
	$("#nomUsuIni, #passIni").on("keypress", function (e) {
		if (e.which == 13) {
			$("#formIni").submit();	
		}
	});

	$("#nom, #apellidos, #correo, #nomUsu, #pass1, #pass2").on("keypress", function (e) {
		if (e.which == 13) {
			$("#formReg").submit();	
		}
	});

	$("#nomCont, #correoCont, #comentario").on("keypress", function (e) {
		if (e.which == 13) {
			$("#formCont").submit();	
		}
	});

	//Función para comprobar que el formulario es correcto en Inicio Sesión
	$("#formIni").on("submit", function (e) {
		e.preventDefault();
		var error = "";

		$("#errorIni").html("");

		var nomUsu = $("#nomUsuIni").val();
		if (/^[;]$/.test(nomUsu)) {
			$("#errorIni").html("El nombre de usuario no puede contener ;");
			return false;
		}
		if (nomUsu == "") {
			$("#errorReg").html("El nombre no puede estar vacío");
			return false;	
		}

		var pass = $("#passIni").val();
		if (/^[;]$/.test(pass)) {
			$("#errorIni").html("La contraseña no puede contener ;");
			return false;
		}
		if (pass == "") {
			$("#errorReg").html("La contraseña no puede estar vacía");
			return false;	
		}

		$.post( "https://nevereat.tk/api.php?method=login", {username: nomUsu, password: pass}, function( data ) {
		  	if (data == "nook") {
		  		$("#errorIni").html("El usuario o la contraseña son incorrectos");
		  	}else{
		  		$("#modalInicio").modal("hide");
		  		$("#modalRegistro").modal("hide");
		  		$("#inicioSesion").hide();
		  		$("#registro").hide();
		  		var nombre = data.split(";");
		  		$("#msgBienvenida").html("Bienvenido, " + nombre[0] + " " + nombre[1]);
		  		$("#msgBienvenida").show();
		  		$("#botonCerrarSesion").show();
		  		$("#nomUsuIni").val("");
		  		$("#passIni").val("");
		  		if ($("#recordar").is(":checked")) {
		  			localStorage.setItem("nomUsuario", nomUsu);
		  		}
		  	}
		});
	});

	//Función para comprobar que el formulario es correcto en Registro
	$("#formReg").on("submit", function (e) {
		e.preventDefault();
		var error = "";

		$("#errorReg").html("");

		var nom = $("#nom").val();
		if (/^[;]$/.test(nom)) {
			$("#errorReg").html("El nombre no puede contener ;");
			return false;
		}
		if (nom == "") {
			$("#errorReg").html("El nombre no puede estar vacío");
			return false;	
		}

		var ape = $("#apellidos").val();
		if (/^[;]$/.test(ape)) {
			$("#errorReg").html("Los apellidos no pueden contener ;");
			return false;
		}
		if (ape == "") {
			$("#errorReg").html("Los apellidos no pueden estar vacíos");
			return false;	
		}

		var correo = $("#correo").val();
		if(!(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)?$/.test(correo)) ) {
			$("#errorReg").html("El correo no es válido");
			return false;
		}
		if (correo == "") {
			$("#errorReg").html("El correo no puede estar vacío");
			return false;	
		}

		var nomUsu = $("#nomUsu").val();
		if (/^[;]$/.test(nomUsu)) {
			$("#errorReg").html("El nombre de usuario no puede contener ;");;
			return false;
		}
		if (nomUsu == "") {
			$("#errorReg").html("El nombre de usuario no puede estar vacío");
			return false;	
		}

		var pass1 = $("#pass1").val();
		if (/^[;]$/.test(pass1)) {
			$("#errorReg").html("La contraseña no puede contener ;");
			return false;
		}
		if (pass1 == "") {
			$("#errorReg").html("La contraseña no puede estar vacía");
			return false;	
		}

		var pass2 = $("#pass2").val();
		if (/^[;]$/.test(pass2)) {
			$("#errorReg").html("La contraseña no puede contener ;");
			return false;
		}if (pass2 == "") {
			$("#errorReg").html("La contraseña no puede estar vacía");
			return false;	
		}

		if (pass1 != pass2) {
			$("#errorReg").html("Las contraseñas no coinciden");
			return false;
		}

		$.post( "https://nevereat.tk/api.php?method=register", {username: nomUsu, password: pass1, name: nom, surname: ape, mail: correo}, function( data ) {
		  	if (data == "nook") {
		  		$("#errorReg").html("El usuario o el correo son incorrectos");
		  	}else{
		  		$("#modalInicio").modal("hide");
		  		$("#modalRegistro").modal("hide");
		  		$("#inicioSesion").hide();
		  		$("#registro").hide();
		  		var nombre = data.split(";");
		  		$("#msgBienvenida").html("Bienvenido, " + nombre[0] + " " + nombre[1]);
		  		$("#msgBienvenida").show();
		  		$("#botonCerrarSesion").show();
		  		$("#nom").val("");
		  		$("#apellidos").val("");
		  		$("#correo").val("");
		  		$("#nomUsu").val("");
		  		$("#pass1").val("");
		  		$("#pass2").val("");
		  	}
		});
	});

	//Función para comprobar que el formulario es correcto en Contacto
	$("#formCont").on("submit", function (e) {
		e.preventDefault();

		$("#errorCont").html("");

		var nom = $("#nomCont").val();
		if (/^[;]$/.test(nomUsu)) {
			$("#errorCont").html("El nombre no puede contener ;");
			return false;
		}
		if (nom == "") {
			$("#errorReg").html("El nombre no puede estar vacío");
			return false;	
		}

		var correo = $("#correoCont").val();
		if(!(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)?$/.test(correo)) ) {
			$("#errorCont").html("El correo no es válido");
			return false;
		}
		if (correo == "") {
			$("#errorReg").html("El correo no puede estar vacío");
			return false;	
		}

		var areaTexto = $("#comentario").val().trim();
		if(areaTexto == "") {
			alert("El área de texto esta vacía");
			$("#errorCont").html("El área de texto esta vacía");
			return false;
		}

		$.post( "https://nevereat.tk/api.php?method=login", {name: nom, mail: correo, textArea: areaTexto}, function( data ) {
		  	if (data == "nook") {
		  		$("#errorCont").html("El nombre, el correo o el área de texto son incorrectos");
		  	}
		});
	});

	//Script para el contador de caracteres del textarea
    var text_max = 500;
    $('#textarea_feedback').html(text_max + ' caracteres restantes');

    $('#comentario').keyup(function() {
        var text_length = $('#comentario').val().length;
        var text_remaining = text_max - text_length;
        $('#textarea_feedback').html(text_remaining + ' caracteres restantes');
    });

	//Fin de las funciones para hacer los modales de Inicio Sesión, Registro y Contacto

	$("#botonAvisoLegal").on("click", function () {
		$("#botonAvisoLegal").tab("show");
		$('ul .active').each(function (i, item) {
			$(item).removeClass("active");
		});
	});

});

function toogleMenus () {
	var scroll = $("body").scrollTop();
	if (scroll > $("#navContentDiv").offset().top) {
		$("#navContent").hide();
		$("#navHeader").show();
	}else{
		$("#navContent").show();
		$("#navHeader").hide();
	}
}