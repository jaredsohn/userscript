// ==UserScript==
// @name        WL
// @description Zmienia kolor nicka
// @include     http://*.wykop.pl/*
// @include     http://wykop.pl/*
// @version     1.4566
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
	var new_color = "";
	var zhanbieni = {
'NormanStansfield': true, 'iniekcja': true, 'Kozzi': true, 'bardzospokojnyczlowiek': true, 'Wiceps': true, 

'acardul': true, 'parachutes': true, 'kolorowy_jelonek': true, 'kontra': true, 'ufoporno': true, 'edytq': true, 'wielkanoc': true, 'kravjec': true, 'piciek': true, 'dziabarakus': true, 'footix': true
                 }
	$('a[title^="profil"] img').each(function (i,el) {
		if (el.alt in  zhanbieni)
		{
			var $el = $(el);
			var li = $el.closest('li');
			el.style['opacity'] = '0.66';
			el.parentNode.style['background'] = 'none repeat scroll 0 0 ' + new_color;
			var czas = li.find('time').get(0);
			czas.innerHTML = '(achtungi i karaczikeny) ' + czas.innerHTML;
			li.find('header strong').get(0).style['color'] = new_color;
		}
	}); 
}


function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "$(document).ready(" + callback.toString() + ");";
	document.body.appendChild(script);
};