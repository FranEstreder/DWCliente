$(document).ready(function () {

	$("#pregunta").hide();
	$("#album").hide();
	$("button").click(function () {
		$("#album").hide();
		$("#albumes").empty();
		$("#canciones").empty();
		$("#selector").html('<option value="none">Elige uno de estos</option>');
		$("#pregunta").show();
		var artista = $("#artista").val();
		var url = "https://api.spotify.com/v1/search?type=artist&query=" + artista;
		$.getJSON( url, {
			tags: "",
			tagmode: "any",
			format: "json"
		}, function( data ) {
			$.each( data.artists.items, function(i, item) {
				$( "<option>" + item.name + "</option>" ).attr( "value", item.id).appendTo("#selector");
			});
		});
	});
	
	$("#selector").change(function (event) {
		$("#albumes").empty();
		$("#canciones").empty();
		var artista = $("#artista").val();
		var idArtist = $("#selector").val();
		var url = "https://api.spotify.com/v1/artists/" + idArtist + "/albums";
		$("#album").show();
		$.getJSON( url, {
			tags: "",
			tagmode: "any",
			format: "json"
		}, function( data ) {
			$.each( data.items, function(i, item) {
				$( "<img>" ).attr({ "src": item.images[0].url, "id": item.id}).css({"width": "100px", "padding": "3px"}).appendTo("#albumes");
			});
		});
	});

	$("body").on("click", "img", function () {
		$("#canciones").empty();
		var imgEntera = $(this);
		var idAl = $(imgEntera).attr("id");
		var url = "https://api.spotify.com/v1/albums/" + idAl + "/tracks";
		$.getJSON( url, {
			tags: "",
			tagmode: "any",
			format: "json"
		}, function( data ) {
			$.each( data.items, function(i, item) {
				$( "<li></li>" ).html('<a href = "' + item.external_urls.spotify + '">' + item.name + '</a>').appendTo("#canciones");
			});
		});
	})

});