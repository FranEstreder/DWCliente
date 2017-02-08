$(document).ready(function () {
	var url = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
	$("button").click(function () {
		$("#resultado").empty();
		var tag = $("#selector").val();
		var caja = $("#caja").val();
		if (caja != "") {
			tag = caja;
		}
		for (var i = 0; i < 10; i++) {
			$( "<img>" ).attr( "src", "ajax-loader.gif").addClass("gif").css({padding: "3px"}).appendTo("#resultado");
		}
		$.getJSON( url, {
			tags: tag,
			tagmode: "any",
			format: "json"
		}, function( data ) {
			$("#caja").val("");
			$.each( data.items, function(i, item) {
				$(".gif").remove();
				$( "<img>" ).attr( "src", item.media.m).css({width: "100px", height: "100px", padding: "3px"}).appendTo("#resultado");
				if( i === 9 ) { 
					return false;
				}
			});
		});
	});
});
