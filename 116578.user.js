// ==UserScript==
// @name           filtr w szukaj
// @namespace      http://www.fotka.pl/profil/Bozar
// @include        http://www.fotka.pl/szukaj#r
// @include        http://www.fotka.pl/szukaj
// @version        1.0.1
// ==/UserScript==

var $ = unsafeWindow.$;

$(".sRInfo").each(function(){
	var regexp1 = /([A-Z][a-z]){3,}|([a-z][A-Z]){3,}|[xX]{3,}|[oO]{3,}/;
	var regexp2 = /1908|1910|sex|beybe|sweat|sweet|kissme/i;
	if($(this).text().match(regexp1) || $(this).text().match(regexp2)) {
		$(this).parent().css("opacity", "0.3");
    } 	
});