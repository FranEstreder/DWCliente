// Tipo de restaurante seleccionado
var selectedType = "";
var loaded = true;
var ubicacionOriginal;

$(document).ready(function () {
    $('#loading').hide();

    $(window).on('popstate', historyToggle);
    $(window).on('forward', historyToggle);
    

    $('[href="#search"]').hide();
    $('#searchTop').click(function () {
        buscarSitios($('#inputSearchTop').val());
    });

    $('#searchBottom').click(function () {
        buscarSitios($('#inputSearchBottom').val());
    });

    $('#inputSearchTop').on('keypress', function (e) {
		// Si se ha apretado Enter
		if (e.which == 13) {
			buscarSitios($('#inputSearchTop').val());
		}
	});

    $('#inputSearchBottom').on('keypress', function (e) {
		// Si se ha apretado Enter
		if (e.which == 13) {
			buscarSitios($('#inputSearchBottom').val());
		}
	});
});

// Comprobamos que está hecha la función para combertir numeros a radianes y si no, la creamos
if(typeof Number.prototype.toRadians == 'undefined')
    Number.prototype.toRadians = function() {
        return this * Math.PI / 180;
    }

// Obtenemos la posición del navegador y medimos la distancia con todas las ciudades del archivo JSON
navigator.geolocation.getCurrentPosition(function(position) {
        
    $.getJSON({
    url: "provincias.json",
    success: function (data) {
        ubicacionOriginal = { lat: position.coords.latitude, lon: position.coords.longitude };
        var distancias = new Array();
        for (var provincia in data)
        {
            var distancia = calcularDistancia({ lat: position.coords.latitude, lon: position.coords.longitude }, { lat: data[provincia].lat, lon: data[provincia].lon })
            distancias.push({ dis: distancia, nom: provincia });
        }
        distancias.sort(function (a,b) {
            return -(a.dis - b.dis);
        });
        localStorage.setItem("pos", distancias[0].nom);

        if (location.hash == "#home" ||location.hash == "#avisoLegal")
        {
            $('[href="' + location.hash +'"]').tab('show');
            $('title').html('Never Eat - ' + $($('[href="' + location.hash +'"]')[0]).html())
            $('ul .active').each(function (i, item) {
                $(item).removeClass("active");
            });
        }
        else if (location.hash != "")
        {
            obtenerSitios(location.hash.substring(1),distancias[0].nom);
        }
    }
    });
});

// Petición a la API de Yelp para que nos diga los restaurantes de un tipo en un sitio determinado
function obtenerSitios (tipoComida, nombreProvincia) 
{
    $('#loading').show();
    selectedType = tipoComida;
    if (sessionStorage.getItem(tipoComida) != null)
    {
        placesCallback(sessionStorage.getItem(tipoComida));
    }
    else 
    {
        $.post({
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            url: 'https://nevereat.tk/api.php?method=places',
            data: { tipo: tipoComida, provincia: nombreProvincia},
            success: placesCallback
        });
    }
}

function buscarSitios (busqueda) {
    $('#loading').show();
    selectedType = "search";
    $.post({
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        url: 'https://nevereat.tk/api.php?method=search',
        data: { query: busqueda, provincia: localStorage.getItem('pos')},
        success: placesCallback
    });

}

// Respuesta de los establecimientos en un sitio determinado
function placesCallback (results)
{
    if (selectedType == "search")
    {
        $('.nav-tabs a[href="#inicio"]').tab('show');

        if ($('#search').length)
        {
            $('#search ul').remove();

            var html = '<ul class="list-group">';
            results = JSON.parse(results);
            sessionStorage.setItem(selectedType, JSON.stringify(results));
            
            for (var bussines of results.businesses)
                html += '<li class="list-group-item"><img style="float:left;" src="'+bussines.image_url+'"></img><div style="margin-left: 110px;"><a target="_blank" href="'+bussines.url+'"><p>'+bussines.name+'</p></a><a href="tel:'+bussines.phone+'"><p>'+bussines.display_phone+'</p></a><img src="'+bussines.rating_img_url+'"></img><p>'+bussines.location.address[0]+', '+bussines.location.city+'</p></div></li>';
            html += '</ul>';

            $('#search').append(html);
        }
        
        $('[href="#search"]').show();
    }

    if (!$('#' + selectedType).length)
    {
        var html = '<div id="'+selectedType+'" class="tab-pane fade"><ul class="list-group">';
        results = JSON.parse(results);
        sessionStorage.setItem(selectedType, JSON.stringify(results));
        
        for (var bussines of results.businesses)
        {
            var distancia = calcularDistancia(ubicacionOriginal, {lat: bussines.location.coordinate.latitude, lon: bussines.location.coordinate.longitude});

            var segundos = distancia/0.027;
            var minutos = 0;

            while (segundos > 59)
            {
                segundos -= 60;
                minutos++;
            }

            var horas = 0;

            while (minutos > 59)
            {
                minutos -= 60;
                horas++;
            }

            var tiempo = "";

            html += '<li class="list-group-item"><img style="float:left;" src="'+bussines.image_url+'"></img><div style="margin-left: 110px;"><a target="_blank" href="'+bussines.url+'"><p>'+bussines.name+'</p></a><a href="tel:'+bussines.phone+'"><p>'+bussines.display_phone+'</p></a><img src="'+bussines.rating_img_url+'"></img><p>'+bussines.location.address[0]+', '+bussines.location.city+'</p><p>Distancia: '+Math.floor(distancia)+' km aprox.</p><p>Tiempo de entrega aproximando: '+horas+' horas, '+minutos+' minutos, '+Math.floor(segundos)+' segundos</p></div></li>';

        }
        html += '</ul></div>';

        $('.tab-content').append(html);
    }
    loaded = true;
    $('#loading').hide();
    $('.nav-tabs a[href="#' + selectedType +'"]').tab('show');
    $('title').html('Never Eat - ' + $($('.nav-tabs a[href="#' + selectedType +'"]')[0]).html())
    

}

function historyToggle() {

    if (location.hash == "#home" ||location.hash == "#avisoLegal")
    {
        $('[href="' + location.hash +'"]').tab('show');
        $('title').html('Never Eat - ' + $($('[href="' + location.hash +'"]')[0]).html())
        $('ul .active').each(function (i, item) {
			$(item).removeClass("active");
		});
    }
    else if (location.hash != "")
    {
        obtenerSitios(location.hash.substring(1),localStorage.getItem('pos'));
    }
}


// Utils
// función que calcula la distancia entre 2 coordenadas
function calcularDistancia(pos1, pos2){
    var R = 6371; // Radio del planeta tierra en km
    var phi1 = pos1.lat.toRadians();
    var phi2 = pos2.lat.toRadians();
    var deltaphi = (pos2.lat-pos1.lat).toRadians();
    var deltalambda = (pos2.lon-pos1.lon).toRadians();

    var a = Math.sin(deltaphi/2) * Math.sin(deltaphi/2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltalambda/2) * Math.sin(deltalambda/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c
    return d;
}
