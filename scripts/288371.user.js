// ==UserScript==
// @name        Lista Hanby - "Wykopoczta VI"
// @namespace	http://userscripts.org/scripts/show/288362
// @author	Wiceps, aktualizacja: Ganymedes
// @description Osoby, które zapisały się do Wykopoczty i nie wyslały paczki do innego uczestnika.
// @include     http://*.wykop.pl/*
// @downloadURL	https://userscripts.org/scripts/source/288362.user.js
// @updateURL	https://userscripts.org/scripts/source/288362.meta.js
// @version     1.00
// ==/UserScript==


function main (){

var nicki = ['100cash', 'acysiel', 'DAbr0z', 'damietoo', 'Drill', 'duffman', 
'elgruby', 'emtei', 'enyn6', 'fiLord', 'hidden', 'hilemz', 'infernos', 
'j3th', 'japko', 'k__d', 'Kicam', 'kielonek', 'kijana', 'komornikzmc',
'komputer11', 'KredaFreda', 'LegalnaMarihuana', 'marcio15', 'matijass', 
'mini_', 'mlodyinaiwny', 'NameMaciek', 'noisy', 'onlyangel', 'Ozzy85',
'PLAN_B', 'polok20', 'Porazka_Sezonu', 'pottymouth', 'pozdro_techno', 
'rbk17', 'reebot', 'scapegoat', 'Sevven', 'Sindarin', 'Skippermaxx', 
'spidero', 'styroslaw', 'sysiut', 'thomasho', 'tomatow', 'verzz', 
'Wakizasheez', 'womabo', 'xbonio', 'yave', 'zioomek', 'zoru'];

$.each(nicki, function(i,v){
	$('a[href*="'+v+'"][title*="'+v+'"]').css({'text-decoration':'line-through', 'color':'purple'});

	$('h2.x-big').filter(function(){
		if($(this).html().indexOf(''+v+'')!=-1){
			$(this).css({'text-decoration':'line-through', 'color':'purple'});
         $('span.bg1').css({'backgroundColor':'purple'});
         $('span.bg2').css({'backgroundColor':'purple'});
         $('span.bg0').css({'backgroundColor':'purple'});
		}

	});
});
}

if (typeof $ == 'undefined') {
	if (typeof unsafeWindow !== 'undefined' && unsafeWindow.jQuery) {
		var $ = unsafeWindow.jQuery;
		$(document).ready(main);
	} else {
		addJQuery(main);
	}
} else {
	$(document).ready(main);
}

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);