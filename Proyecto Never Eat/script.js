$(document).ready(function () {
	
	$("#navHeader").hide();

	$(window).on("scroll", toogleMenus);

	toogleMenus();

	$("#botonIni").on("click", function () {
		$("#formIni").submit();
	});

	// Para que el formulario se envíe con Enter
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

	$("#botonReg").on("click", function () {
		$("#formReg").submit();
	});

	$("#formIni").on("submit", function (e) {
		e.preventDefault();
		var nomUsu = $("#nomUsuIni").val();
		if (/^[;]$/.test(nomUsu)) {
			alert("El nombre de usuario no puede contener ;");
			return;
		}

		var pass = $("#passIni").val();
		if (/^[;]$/.test(pass)) {
			alert("La contraseña no puede contener ;");
			return;
		}

		$.post( "https://nevereat.tk/api.php?method=login", {username: nomUsu, password: pass}, function( data ) {
		  	if (data == "nook") {
		  		alert("El usuario o la contraseña no son correctos");
		  	}
		});
	});

	$("#formReg").on("submit", function (e) {
		e.preventDefault();
		var nom = $("#nom").val();
		if (/^[;]$/.test(nom)) {
			alert("El nombre no puede contener ;");
			return;
		}

		var ape = $("#apellidos").val();
		if (/^[;]$/.test(ape)) {
			alert("Los apellidos no pueden contener ;");
			return;
		}

		var correo = $("#correo").val();
		if(!(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/.test(correo)) ) {
			alert("El correo no es válido");
			return;
		}

		var nomUsu = $("#nomUsu").val();
		if (/^[;]$/.test(nomUsu)) {
			alert("El nombre de usuario no puede contener ;");
			return;
		}

		var pass1 = $("#pass1").val();
		var pass2 = $("#pass2").val();
		if (/^[;]$/.test(pass1)) {
			alert("La contraseña no puede contener ;");
			return;
		}

		if (pass1 != pass2) {
			alert("Las contraseñas no coinciden");
			return;
		}

		$.post( "https://nevereat.tk/api.php?method=login", {username: nomUsu, password: pass, name: nom, surname: ape, mail: correo}, function( data ) {
		  	if (data == "nook") {
		  		alert("El usuario o la contraseña no son correctos");
		  	}
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