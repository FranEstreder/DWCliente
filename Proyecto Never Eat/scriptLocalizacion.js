// Tipo de restaurante seleccionado
var selectedType = "";

// Comprobamos que está hecha la función para combertir numeros a radianes y si no, la creamos
if(typeof Number.prototype.toRadians == 'undefined')
    Number.prototype.toRadians = function() {
        return this * Math.PI / 180;
    }

// Obtenemos la posición del navegador y medimos la distancia con todas las ciudades del archivo JSON
//if (localStorage.getItem("pos") == null) //ToDo: Descomentar esto
navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);
    
    $.getJSON({
    url: "provincias.json",
    success: function (data) {
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
    }
    });
});

// Petición a la API de Yelp para que nos diga los restaurantes de un tipo en un sitio determinado siempre y cuando
// No esté guardado en el navegador
function obtenerSitios (tipoComida, nombreProvincia) 
{
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

// Respuesta de los establecimientos en un sitio determinado
function placesCallback (results)
{
    if (!$('#' + selectedType).length)
    {
        

        var html = '<div id="'+selectedType+'" class="tab-pane fade"><ul class="list-group">';
        results = JSON.parse(results);
        sessionStorage.setItem(selectedType, JSON.stringify(results));
        
        for (var bussines of results.businesses)
            html += '<li class="list-group-item">'+bussines.name+'</li>';
        html += '</ul></div>';
        $('.tab-content').append(html);
    }
    $('.nav-tabs a[href="#' + selectedType +'"]').tab('show');
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
