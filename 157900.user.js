// ==UserScript==
// @name        Lewaki
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
	var new_color = "pink";
	var zhanbieni = {
'relik39': true, 'ghostface': true, 'ginden': true, 'Ryzowy_Potwor': true, 'wolfik92': true, 'fir3fly': true, 'Lori': true, 'owocliczi': true, 'Ryu': true, 'Shaki': true, 'blubi_su': true, 'marcin-': true, 'OkejKomputer': true, 'Unknown__User': true, 'naczarak': true, 'Zielony_Kwadrat': true, 'introligat0r': true, 'The_Apostate': true, 'p5k8eh13': true, 'Three_Dee': true, 'ICame': true, 'NowyAteizm': true, 'Ginden': true
                 }
	$('a[title^="profil"] img').each(function (i,el) {
		if (el.alt in  zhanbieni)
		{
			var $el = $(el);
			var li = $el.closest('li');
			el.style['opacity'] = '0.66';
			el.parentNode.style['background'] = 'none repeat scroll 0 0 ' + new_color;
			var czas = li.find('time').get(0);
			czas.innerHTML = '(lewak) ' + czas.innerHTML;
			li.find('header strong').get(0).style['color'] = new_color;
		}
	}); 
}


function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "$(document).ready(" + callback.toString() + ");";
	document.body.appendChild(script);
};