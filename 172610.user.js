// ==UserScript==
// @name        Użytkownicy z blipa
// @author	Feanir na bazie skryptu Wiceps
// @description Osoby, które wpisały na blipa ponad 1000 postów i przeniosły konto
// @include     http://*.wykop.pl/*
// @version     0.1
// @run-at        document-start
// ==/UserScript==



function main (){

var nicki = ['Anks', 'bobiko', 'yourapple', 'luki122', 'firefox', 'spoilertv', 'szpro', 'motylkowa', 'rocktechnika', 'bratbud', 'futomaki', 'afekt', 'dariusrock', 'centrumpr', 'shigella-deshige', 'brzezinski', 'EmiyaShirou', 'Vizirek', 'emotek', 'pogodailza', 'emayef', 'mariposanegra', 'ChrisVW', 'jabberwocky_blip', 'ewcikson', 'jennavain', 'pastelka', 'Arcania', 'brandthedwarf', 'blotosmetek', 'mkarweta', 'wariag', 'pawelyaho', 'roaring', 'maluminse', 'catnip', 'drau', 'dianur', 'divide', 'refresh', 'pan-audytor', 'radekj', 'hateppl', 'adam44', 'osael', 'uczimoo', 'koRnac', 'kaeska', 'kiciwzyci'];

$.each(nicki, function(i,v){
	$('a[href*="'+v+'"][title*="'+v+'"]').css({'color':'purple' !important});

	$('h2.x-big').filter(function(){
		if($(this).html().indexOf(''+v+'')!=-1){
			$(this).css({'color':'purple' !important});
         $('span.bg1').css({'backgroundColor':'purple' !important});
         $('span.bg2').css({'backgroundColor':'purple' !important});
         $('span.bg0').css({'backgroundColor':'purple' !important});
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