// ==UserScript==
// @name        WL
// @description Zmienia kolor nicka
// @include     http://*.wykop.pl/*
// @include     http://wykop.pl/*
// @version     1.03
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
	var new_color = "#2d78a7";
	var zhanbieni = {
'Logan00': true, 'iniekcja': true, 'Kozzi': true, 'vifon_pikantny': true, 'bardzospokojnyczlowiek': true, 'Wiceps': true, 'acardul': true, 'parachutes': true, 'Demand': true, 'zurawinowa': true, 'MistrzuYoda': true, 'kolorowy_jelonek': true, 'kontra': true
                 }
	$('a[title^="profil"] img').each(function (i,el) {
		if (el.alt in  zhanbieni)
		{
			var $el = $(el);
			var li = $el.closest('li');
			el.style['opacity'] = '0.66';
			el.parentNode.style['background'] = 'none repeat scroll 0 0 ' + new_color;
			var czas = li.find('time').get(0);
			czas.innerHTML = '(karacziken) ' + czas.innerHTML;
			li.find('header strong').get(0).style['color'] = new_color;
		}
	}); 
}


function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "$(document).ready(" + callback.toString() + ");";
	document.body.appendChild(script);
};