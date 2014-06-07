// ==UserScript==
// @name        Wykopowa elita
// @description Zamienia kolor przy elitarnych użytkownikach
// @include     http://*.wykop.pl/*
// @include     http://wykop.pl/*
// @version     1.0
// @run-at	document-end
// ==/UserScript==

//var elita =;
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
	var new_color = "#C4A600";
	var elita = {
'Andr3v': true, 'anonim1133': true, 'Aqwart': true, 'Blaskun': true, 'Destr0': true, 'DuPont': true, 'Dutch': true, 'FilipChG': true, 'fir3fly': true, 'ghostface': true, 'Ginden': true, 'histeryk_13': true, 'InnuendoPL': true, 'john112': true, 'jrs2': true, 'Kamill': true, 'mq1': true, 'MQs': true, 'NapalInTheMorning': true, 'RageKage': true, 'Ragnarokk': true, 'relik39': true, 'Ryu': true, 'Ryzowy_potwor': true, 'Shaki': true, 'Smookie': true, 'sn4tch': true, 'stekelenburg2': true, 'Supercoolljuk2': true, 'Szczepqs': true, 'tmb28': true, 'Tym': true, 'Unknown_user': true, 'wielooczek': true, 'Woiownik': true, 'wolfik92': true, 'Yahoo_': true, 'Czajna_seczen': true, 'ostr': true, 'Farrahan': true, 'oxygen88': true, 'John_Finn': true, 'Johny_Locke': true
                 }
	$('a[title^="profil"] img').each(function (i,el) {
		if (el.alt in  elita)
		{
			var $el = $(el);
			var li = $el.closest('li');
			el.style['opacity'] = '0.86';
			el.parentNode.style['background'] = 'none repeat scroll 0 0 ' + new_color;
			var czas = li.find('time').get(0);
			czas.innerHTML = '(Jaszczur) ' + czas.innerHTML;
			li.find('header strong').get(0).style['color'] = new_color;
		}
	}); 
}


function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "$(document).ready(" + callback.toString() + ");";
	document.body.appendChild(script);
};