// ==UserScript==
// @name           podglądacz pro
// @namespace      localhost
// @include        http://www.fotka.pl/konto_podgladacz.php*
// @copyright	   bozar
// @version        1.0.0
// ==/UserScript==

GM_registerMenuCommand("Poglądacz Pro: ustaw miasto", function(){
	var m = prompt("Wprowadź jedno lub kilka miast, z których odiwedziny chcesz wyróżnić\nNazwy miast oddziel od siebie pionową kreską, np. Łódź|Zgierz|Pabianice");
	if(m.length > 0) GM_setValue("podglądaczPro", m);
});

////////////////////////
var MIASTO = GM_getValue("podglądaczPro");
////////////////////////


// krócej się nie dało :)
var $ = unsafeWindow.$;
$("tbody:eq(1)").find("td>a").each(function(){
	if($(this).text().match(MIASTO)){
		$(this).parent().prev().css({backgroundImage: "url(http://i42.tinypic.com/16jki7d.jpg)", backgroundPosition: "right", backgroundRepeat: "no-repeat"});
	}
});