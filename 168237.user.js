// ==UserScript==
// @name		sgh deklaracje
// @description 	liczba zapisanych w deklaracjach na sgh
// @version     0.01
// @include	https://dziekanat.sgh.waw.pl/wd_nowy/*
// ==/UserScript==
//
$("#strona_gl table:last").before('<br /><a id="pokazstan">pokaz ilosc zapisanych na przedmioty</a>');
$("#pokazstan").click(function(){
var addr = 'https://dziekanat.sgh.waw.pl/wd_nowy/deklaracje_ilosc_zapisanych.php?sygnatura=';
$("#strona_gl table:last tr")
.each(
function(idx, elem){
	var tr = $(elem);
	if(tr.attr('id') == undefined){
		var sig = tr.find("a").first().text();
		if(sig != ""){
		$.get(addr + '"' + sig + '"', function(data){
			jdata = $.parseHTML(data);
			var j=jdata.length-1;
			var found = false;
			for(;j>=0;j--){if(/table/.test(jdata[j].outerHTML)){found = true; break;}}
			if(!found) return;
			var table = $(jdata[j]);
			var txt = $("tr:last td:last b",$(jdata[j])).text();
			tr.append("<td>"+txt+"</td>");
		});
		}
	}
});
});



