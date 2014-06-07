// ==UserScript==
// @name           Pennerhilfe.de - Plundereigenschaften auf den ersten Blick - Stuff attributes shown without popups
// @namespace      Pennerhilfe.de
// @description    Zeigt die Eigenschaften des Plunders unter dem Namen an. - Shows the stuff attributes under the stuff's name Lizenz: http://creativecommons.org/licenses/by-nc-sa/3.0/de/
// @include        http://*.pennergame.de/stock/plunder/*
// @include        http://pennergame.de/stock/plunder/*
// @include        http://*.dossergame.co.uk/stock/plunder/*
// @include        http://dossergame.co.uk/stock/plunder/*

// ==/UserScript==

var tabelle = document.getElementById('messageslist').getElementsByTagName('tr');
var suche = /craft/i;
if(suche.test(document.URL) == true){
	var ids = new Array();
	for( var tr = 1;tr < tabelle.length - 1;tr++){
		var ausdruck = /id="c_id" value="([0-9]+)"/;
		var blubb = ausdruck.exec (tabelle[tr].innerHTML);
		ids[tr-1] = RegExp.$1;
	}
}else{
	var ids_option = document.getElementById('f_plunder').getElementsByTagName('option');
	var ids = new Array();
	for( var tr = 0;tr < ids_option.length;tr++){
		ids[tr] = ids_option[tr].value;
	}
}
var bilder = document.getElementsByTagName('img');
for(var z = 0;z < bilder.length;z++){
	bilder[z].src = bilder[z].src.replace(/att\.gif$/, 'att.png').replace(/def\.gif$/, 'def.png').replace(/media\.dossergame\.co\.uk\/img\/def\.png$/, 'media.pennergame.de/img/def.png');
}
for(var i = 0;i < ids.length;i++){
	var id = ids[i];	
	var Plundertooltip = document.getElementById(id).innerHTML;
	
	var leiste = '';
	
	var eigenschaft = Plundertooltip.match(/<div id="item_stats">(.+)<\/div>/gi);
	if(eigenschaft){
		for (var x = 0; x < eigenschaft.length; x++){
			leiste += eigenschaft[x];
		}
	}
	var zweigenschaft = Plundertooltip.match(/<div id="item_add">(.+)<\/div>/gi);
	if(zweigenschaft){
		for (var y = 0; y < zweigenschaft.length; y++){
			leiste += zweigenschaft[y];
		}
	}
	tabelle[i+1].getElementsByTagName("td")[1].removeAttribute("onmouseover");
	tabelle[i+1].getElementsByTagName('td')[1].innerHTML += '<br/>'+leiste;
	var divs = tabelle[i+1].getElementsByTagName('td')[1].getElementsByTagName('div');
	if(divs){
		for(var j = 0; j < divs.length; j++){
			divs[j].style.display = 'inline-block';
		}
	}
}