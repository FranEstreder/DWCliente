var Cron = new Object();
var wind = undefined;

Cron.reiniciar = function () {
	clearInterval(Cron.timer);
	wind.document.body.innerHTML = "<h1>00:00:00</h1>";
}

Cron.empezar = function () {
	if (wind == undefined)
		wind = window.open("","Cronómetro", "width=600,height=250");
	else if (wind.document == undefined)
		wind = window.open("","Cronómetro", "width=600,height=250");
	Cron.inicio = new Date();
	Cron.timer = setInterval (Cron.contar, 100);
}

Cron.contar = function () {
	if (wind.document == undefined){
		wind = undefined;
		return;
	}
	var now = new Date();
	var date = new Date((now.getTime() - Cron.inicio.getTime()));
	var hours = Cron.formatear(date.getHours() -1);
	var minutes = Cron.formatear(date.getMinutes());
	var seconds = Cron.formatear(date.getSeconds());
	wind.document.body.innerHTML =  hours + ":" + minutes + ":" + seconds;
}

Cron.formatear = function (numero) {
	if (numero < 10)
		return "0" + numero;
	else
		return numero;
}