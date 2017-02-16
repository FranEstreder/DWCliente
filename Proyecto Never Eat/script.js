$(document).ready(function () {
	
	$("#navHeader").hide();

	$(window).on("scroll", toogleMenus);

	toogleMenus();

});

function toogleMenus () {
	var scroll = $("body").scrollTop();
	if (scroll >= $("#navContentDiv").offset().top) {
		$("#navContent").hide();
		$("#navHeader").show();
	}else{
		$("#navContent").show();
		$("#navHeader").hide();
	}
}