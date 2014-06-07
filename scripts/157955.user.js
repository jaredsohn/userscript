// ==UserScript==
// @name        Wykopowa lista prawackich manipulatorów
// @description Zamienia kolor na ciemnofioletowy przy prawakach. Przerobka Wykopoczty/ZhanbionychPrzezZakopywanie.
// @include     http://*.wykop.pl/*
// @include     http://wykop.pl/*
// @version     1.2
// @run-at	document-end
// ==/UserScript==

//var prawak =;
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
	var prawak = {
'Axelio': true, 'gav': true, 'cameel': true, 'mohairberetka': true, 'Cymes': true, 'czlapka': true, 'mateuszo': true, 'Adam787': true, 'iryss': true, 'nordland85': true, 'GeraltRedhammer': true, 'Derpin': true, 'jasiulec': true, 'zgon': true, 'topazy': true, 'Broken': true, 'siwymaka': true, 'gumbrew': true, 'LibertyPrime': true, 'masej': true, 'Ned': true, 'masskillah': true, 'dyktek': true, 'T3R3XD3MAG': true, 'RT_NR': true, 'Telesphoros': true, 'xyz15': true, 'MassiveObserver': true

                 }
	$('a[title^="profil"] img').each(function (i,el) {
		if (el.alt in  prawak)
		{
			var $el = $(el);
			var li = $el.closest('li');
			el.style['opacity'] = '0.66';
			el.parentNode.style['background'] = 'none repeat scroll 0 0 ' + new_color;
			var czas = li.find('time').get(0);
			czas.innerHTML = '(PRAWAK) ' + czas.innerHTML;
			li.find('header strong').get(0).style['color'] = new_color;
		}
	}); 
}


function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "$(document).ready(" + callback.toString() + ");";
	document.body.appendChild(script);
};