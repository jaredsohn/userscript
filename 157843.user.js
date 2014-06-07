// ==UserScript==
// @name        Wykopowa lista neuropy
// @description Zamienia kolor przy zakopywaczach, podjebałem kogoś skrypt który był używany do wypokpoczty i zmienilem tylko nicki 
// @include     http://*.wykop.pl/*
// @include     http://wykop.pl/*
// @version     99.69
// @run-at	document-end
// ==/UserScript==

//var zhanbieni =;
if (typeof $ == 'undefined') {
	if (unsafeWindow.jQuery) {
		var $ = unsafeWindow.jQuery;
		$(document).ready(maine_functione);
	} else {
		addJQuery(maine_functione);
	}
} else {
	$(document).ready(maine_functione);
}
function maine_functione()
{
	var new_color = "darkviolet";
	var zhanbieni = {
'jasiulec': true, 'ghostface': true, 'ginden': true, 'Andr3v': true, 'Ryzowy_Potwor': true, 'wolfik92': true, 'fir3fly': true, 'Destr0': true, 'mq1': true, 'Aqwart': true, 'anonim1133': true
                 }
	$('a[title^="profil"] img').each(function (i,el) {
		if (el.alt in  zhanbieni)
		{
			var $el = $(el);
			var li = $el.closest('li');
			el.style['opacity'] = '0.66';
			el.parentNode.style['background'] = 'none repeat scroll 0 0 ' + new_color;
			var czas = li.find('time').get(0);
			czas.innerHTML = '(zakopywacz) ' + czas.innerHTML;
			li.find('header strong').get(0).style['color'] = new_color;
		}
	}); 
}


function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "$(document).ready(" + callback.toString() + ");";
	document.body.appendChild(script);
};