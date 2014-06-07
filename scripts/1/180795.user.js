// ==UserScript==
// @name        Wykopowa lista prawicy/nacjonalistów
// @description Zamienia kolor na brunatny przy wykopowych "prawicowcach", dodaje loga partii i organizacji prawicowych + efekt epatowania prawactwem.
// @include     http://*.wykop.pl/*
// @include     http://wykop.pl/*
// @version     2.3
// @run-at	document-end
// @updateURL   https://userscripts.org/scripts/source/180795.meta.js
// ==/UserScript==

//var prawica =;
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
	var new_color = "#6B4423";
	var prawica = {
'LibertyPrime': true, 'oneandonly': true, 'peter-kovac-948494': true, 'nikczemnySELER': true, 'AirCraft': true, 'Aleksander_Newski': true, 'Axelio': true, 'Opornik': true, 'eacki8': true, 'Insine': true, 'rafal-pajak': true, 'roykovsky': true, 'WilkBardzozly': true, 'Nielubiedrzew': true, 'Jam1911': true, 'EmmetBrown': true, 'daimos': true, 'Rumpertumski': true, 'aaadaaam': true, 'romo86': true, 'George_Patton': true, 'pikolo': true

                 }
	$('a[title^="profil"] img').each(function (i,el) {
		if (el.alt in  prawica)
		{
			var $el = $(el);
			var li = $el.closest('li');
			el.style['opacity'] = '0.66';
			el.parentNode.style['background'] = 'none repeat scroll 0 0 ' + new_color;
			var czas = li.find('time').get(0);
			czas.innerHTML = '(PRAWICA) ' + czas.innerHTML;
			li.find('header strong').get(0).style['color'] = new_color;
			czas.innerHTML =('<span style="background: url(http://dl.dropbox.com/u/85736209/emano.gif) no-repeat scroll 0% 0% transparent;">') + czas.innerHTML + ('</span><img src="http://i.imgur.com/9xjXmrM.png"> ');
		}
	}); 
}


function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "$(document).ready(" + callback.toString() + ");";
	document.body.appendChild(script);
};