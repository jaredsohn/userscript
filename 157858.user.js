// ==UserScript==
// @name        Wykopowa Lista Hańby 2014
// @description Zamienia kolor na purpurowy chujków co nie wysłali paczki
// @include     http://*.wykop.pl/*
// @include     http://wykop.pl/*
// @version     1.99
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

    '100cash': true, 
    'acysiel': true, 
    'DAbr0z': true, 
    'damietoo': true, 
    'Drill': true, 
    'duffman': true, 
    'elgruby': true, 
    'emtei': true, 
    'enyn6': true, 
    'fiLord': true, 
    'hidden': true, 
    'hilemz': true, 
    'infernos': true, 
    'j3th': true, 
    'japko': true, 
    'k__d': true, 
    'Kicam': true, 
    'kielonek': true, 
    'kijana': true, 
    'komornikzmc': true, 
    'komputer11': true, 
    'KredaFreda': true, 
    'LegalnaMarihuana': true, 
    'marcio15': true, 
    'matijass': true, 
    'mini_on': true, 
    'mlodyinaiwny': true, 
    'NameMaciek': true, 
    'noisy': true, 
    'onlyangel': true, 
    'Ozzy85': true, 
    'PLAN_B': true, 
    'polok20': true, 
    'Porazka_Sezonu': true, 
    'pottymouth': true, 
    'pozdro_techno': true, 
    'rbk17': true, 
    'reebot': true, 
    'scapegoat': true, 
    'Sevven': true, 
    'Sindarin': true, 
    'Skippermaxx': true, 
    'spidero': true, 
    'styroslaw': true, 
    'sysiut': true, 
    'thomasho': true, 
    'tomatow': true, 
    'verzz': true, 
    'Wakizasheez': true, 
    'womabo': true, 
    'xbonio': true, 
    'yave': true, 
    'zioomek': true, 
    'zoru': true

                 }
	$('a[title^="profil"] img').each(function (i,el) {
		if (el.alt in  zhanbieni)
		{
			var $el = $(el);
			var li = $el.closest('li');
			el.style['opacity'] = '0.66';
			el.parentNode.style['background'] = 'none repeat scroll 0 0 ' + new_color;
			var czas = li.find('time').get(0);
			czas.innerHTML = '(nie wyslal paczki) ' + czas.innerHTML;
			li.find('header strong').get(0).style['color'] = new_color;
		}
	}); 
}


function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "$(document).ready(" + callback.toString() + ");";
	document.body.appendChild(script);
};