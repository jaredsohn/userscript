// ==UserScript==
// @name        Wykopowa lista hańby
// @description Zamienia avaty ludzi z listy hańby
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
	var new_color = "saddlebrown";
	var zhanbieni = {
'Andr3v': true, 'anonim1133': true, 'Aqwart': true, 'Blaskun': true, 'Destr0': true, 'DuPont': true, 'Farquart': true, 'filipchg': true, 'fir3fly': true, 'ghostface': true, 'Ginden': true, 'histeryk_13': true, 'innuendoPL': true, 'John112': true, 'Johny_Locke': true, 'John_Finn': true, 'jrs2': true, 'Kamill': true, 'mq1': true, 'mqs': true, 'NapalInTheMorning': true, 'RageKage': true, 'Ragnarokk': true, 'relik39': true, 'Ryu': true, 'Ryzowy_Potwor': true, 'Shaki': true, 'Smookie': true, 'sn4tch': true, 'stekelenburg2': true, 'Supercoolljuk2': true, 'szczepqs': true, 'tmb28': true, 'Tym': true, 'Unknown__user': true, 'wielooczek': true, 'WOiOwnik': true, 'wolfik92': true, 'Yahoo_': true
                 }
	$('a[title^="profil"] img').each(function (i,el) {
		if (el.alt in  zhanbieni)
		{
			var $el = $(el);
			var li = $el.closest('li');
			el.style['opacity'] = '0.66';
			el.parentNode.style['background'] = 'none repeat scroll 0 0 ' + new_color;
			var czas = li.find('time').get(0);
			czas.innerHTML = '(lewak z neuropy) ' + czas.innerHTML;
			li.find('header strong').get(0).style['color'] = new_color;
		}
	}); 
}


function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "$(document).ready(" + callback.toString() + ");";
	document.body.appendChild(script);
};