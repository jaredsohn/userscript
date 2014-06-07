// ==UserScript==
// @name			Runaway Google
// @namespace		http://tokyo.fffff.at/
// @description		Let's play tag with search results
// @include			http://www.google.tld/search?*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function() {

var ol = $(".g:first").parent();

ol.css("min-width",ol.width());
ol.css("min-height",ol.height());

$(".g").each(function(){
	$(this).css("top",$(this).offset().top);
	$(this).css("left",$(this).offset().left);
	$(this).css("min-width",$(this).width());
	$(this).css("min-height",$(this).height());
});

$(".g").css("position","absolute");

$(".g").mouseenter(function () {
	var scale = 300;
	var angle = 2*Math.PI*Math.random();
	$(this).animate({
		top: $(this).offset().top+scale*Math.sin(angle),
		left: $(this).offset().left+scale*Math.cos(angle)
	}, 200);
});

})();