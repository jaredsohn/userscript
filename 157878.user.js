// ==UserScript==
// @name        Wykopowa lista lewakow
// @description Zamienia kolor na ciemnofioletowy przy lewakach. Przerobka Wykopoczty/ZhanbionychPrzezZakopywanie.
// @include     http://*.wykop.pl/*
// @include     http://wykop.pl/*
// @version     1.2
// @run-at	document-end
// ==/UserScript==

//var lewak =;
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
	var lewak = {
'Blaskun': true, 'ghostface': true, 'Ginden': true, 'Andr3v': true, 'Ryzowy_Potwor': true, 'wolfik92': true, 'fir3fly': true, 'Destr0': true, 'mq1': true, 'Aqwart': true, 'anonim1133': true, 'Farrahan': true, 'Ryu': true, 'DuPont': true, 'Farquart': true, 'FilipChG': true, 'histeryk_13': true, 'innuendoPL': true, 'John112': true, 'Johny_Locke': true, 'John_Finn': true, 'jrs2': true, 'Kamill': true, 'mq1': true, 'MQs': true, 'NapallnTheMorning': true, 'RageKage': true, 'Ragnarokk': true, 'relik39': true, 'Shaki': true, 'Smookie': true, 'sn4tch': true, 'stekelenburg2': true, 'Supercoolljuk2': true, 'szczepqs': true, 'tmb28': true, 'Tym': true, 'Unknown__user': true, 'wielooczek': true, 'WOiOwnik': true, 'Yahoo_': true, 'Dutch': true, 'FilipChG': true, 'oxygen88': true, 'Czajna_Seczen': true, 'Derp': true, 'The_Apostate': true, 'knysha': true, 'ciepol': true, 'ostr': true, 'stefan_pompka': true, 'Shepard': true, 'siema_andrzej': true    

                 }
	$('a[title^="profil"] img').each(function (i,el) {
		if (el.alt in  lewak)
		{
			var $el = $(el);
			var li = $el.closest('li');
			el.style['opacity'] = '0.66';
			el.parentNode.style['background'] = 'none repeat scroll 0 0 ' + new_color;
			var czas = li.find('time').get(0);
			czas.innerHTML = '(LEWAK) ' + czas.innerHTML;
			li.find('header strong').get(0).style['color'] = new_color;
		}
	}); 
}


function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "$(document).ready(" + callback.toString() + ");";
	document.body.appendChild(script);
};