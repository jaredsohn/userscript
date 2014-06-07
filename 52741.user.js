// ==UserScript==
// @name           DS - Gruppenbearbeitenlinks
// @description    Fuegt Links zum Bearbeiten der Gruppenzugehörigkeit in die Kombiniertübersicht ein
// @include        http://de*.die-staemme.de/*screen=overview_villages&mode=combined*
// ==/UserScript==

var doc = getGameDoc();
var tabellen=doc.getElementsByTagName('table');
var vistabellen=new Array();
for(var zeilenNummer=0;zeilenNummer<tabellen.length;zeilenNummer++){
		if(tabellen[zeilenNummer].className=='vis'){vistabellen.push(tabellen[zeilenNummer]);}
}
var spaltenzahl=vistabellen[2].getElementsByTagName('th').length-1;

lastheader=vistabellen[2].getElementsByTagName('th')[spaltenzahl];
var newElement = document.createElement('th');
newElement.innerHTML="Gruppen";
lastheader.parentNode.insertBefore(newElement, lastheader.nextSibling);

zeilen=vistabellen[2].getElementsByTagName('tr');
for(var zeile=1;zeile<zeilen.length;zeile++){
	lastdata=zeilen[zeile].getElementsByTagName('td')[spaltenzahl];
	var newElement = document.createElement('td');
	var dorfid=zeilen[zeile].getElementsByTagName('span')[0].id.substr(6);
	newElement.innerHTML='<a href="javascript:popup_scroll(\'groups.php?&amp;mode=village&amp;village_id='+dorfid+'\', 300, 400);">&raquo; bearbeiten</a>' 
	lastdata.parentNode.insertBefore(newElement, lastdata.nextSibling);
}

function getGameDoc(){
	getdoc=window.document;
	if(!getdoc.URL.match("game.php")){
		for(zeilenNummer=0;zeilenNummer<window.frames.length;zeilenNummer++){
			if(window.frames[zeilenNummer].document.URL.match("game.php")){
				getdoc = window.frames[zeilenNummer].document;
			}
		}
	}
	return getdoc;
}//getGameDoc