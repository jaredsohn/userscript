// ==UserScript==
// @name        Lista Hańby - "Wykopoczta 5"
// @namespace	http://userscripts.org/scripts/show/169342
// @author	Wiceps
// @description Osoby, które zapisały się do Wykopoczty i nie wysłały paczki do innego uczestnika.
// @include     http://*.wykop.pl/*
// @downloadURL	https://userscripts.org/scripts/source/169342.user.js
// @updateURL	https://userscripts.org/scripts/source/169342.meta.js
// @version     1.08
// ==/UserScript==



function main (){

var nicki = ['Nexiu', 'gtk90', 'zawszespoko', 'nokio', 'geometria', 'Radus', 'kozio23', 
'gerkemateusz', 'Bugiii', 'Eshirael', 'gdziemojimbuspiatka', 'exohm', 'oczkers', 'paffnucy', 
'trueno2', 'thirtyseconds', 'Szczypiornista666', 'Colo99', 'notavailable', 'delbana', 'cimathel', 
'picofrico', 'dziadu90', 'markret', 'koters', 'NamalowanyPrzezSmutek', 'Elrok', 
'Czerwony_Krokodyl', 'ann_onim', 'Raych', 'Mcmaker', 'lol2x', 'martin-marti', 'kroy', 'Nodun',
 'mariusz83wach', 'katius', 'martin87pl', 'ratuj_bobry', 'Tomasz_T', 'observethe', 'gadu-gadu', 'blisher'];

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