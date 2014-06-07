// ==UserScript==
// @name DS - Punkte- und Bashverlauf
// @namespace none
// @include http://de*.die-staemme.de/game.php?*village=*&screen=info_ally*&id=*
// @include http://de*.die-staemme.de/game.php?*village=*&screen=info_player*&id=*
// ==/UserScript==

var urls = getHref();

if (document.location.href.match(/screen=info_ally/)) {
	chartAlly();
	bashAlly();
}

if (document.location.href.match(/screen=info_player/)) {
	
	chartPlayer();
	bashPlayer();
	
	/* Den Spielserver ermitteln */
	var server = location.host.split(".")[0];

	/* ID des Spielers ermitteln */
	var ID = urls.match(/screen=info_player\&id=(\d+)/)[1];

	/* Die URL erzeugen */
	var url = "http://www.dsreal.de/index.php?tool=akte&mode=player&world=" + server + "&id=" + ID;

	/* Den Link einsetzen */
	var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	var row = document.createElement("tr");
	tab.appendChild(row);

	var cell = document.createElement("td");
	cell.colSpan = "2";
	row.appendChild(cell);

	var link = document.createElement("a");
	link.href = url;
	link.target = "_blank";
	link.innerHTML = "&raquo; DSReal-Akte";
	cell.appendChild(link);
	cell.innerHTML += " (externe Seite)";
}

function chartAlly() {
	var f=document;
	var i,l,m,s,td,tr,img,a;
	var srv=0;
	try {
		srv=urls.match(/de(\d+)\D*\.die-staemme\./)[1];
	} catch (e) {
		return;
	}
	for (i=0;i<f.links.length;i++) {
	l=f.links[i];
		if (parseHref(l.href).search(/village=[0-9]+&screen=info_member&id=([0-9]+)/) > -1) {
			m=parseHref(l.href).match(/village=[0-9]+&screen=info_member&id=([0-9]+)/)[1];

			s=l.parentNode.parentNode;

			tr=f.createElement('tr');
			td=f.createElement('td');
			td.colSpan=2;
			a=f.createElement('a');
			a.target='dsreal';
			a.href='http://www.dsreal.de/index.php?tool=akte&mode=ally&world=de'+srv+'&id='+m;
			img=f.createElement('img');
			img.src='http://www.dsreal.de/chart/chart.php?id='+m+'&world=de'+srv+'&mode=ally';
			a.appendChild(img);

			td.appendChild(a);
			tr.appendChild(td);
			s.parentNode.insertBefore(tr,s);

			break;
		}
	}

}

function bashAlly() {
var f=document;
var i,l,m,s,td,tr,img,a;
var srv=0;
try {
srv=f.location.href.match(/de(\d+)\D*\.die-staemme\./)[1];
} catch (e) {
return;
}
for (i=0;i<f.links.length;i++) {
l=f.links[i];
if (parseHref(l.href).search(/village=[0-9]+&screen=info_member&id=([0-9]+)/) > -1) {
m=parseHref(l.href).match(/village=[0-9]+&screen=info_member&id=([0-9]+)/)[1];
s=l.parentNode.parentNode;

tr=f.createElement('tr');
td=f.createElement('td');
td.colSpan=2;
a=f.createElement('a');
a.target='dsreal';
a.href='http://www.dsreal.de/index.php?tool=akte&mode=ally_conquer&world=de'+srv+'&id='+m;
img=f.createElement('img');
img.src='http://www.dsreal.de/chart/bash_chart.php?id='+m+'&world=de'+srv+'&mode=ally&art=all';
a.appendChild(img);

td.appendChild(a);
tr.appendChild(td);
s.parentNode.insertBefore(tr,s);

break;
}
}
}

function bashPlayer() {
var f=document;
var i,l,m,s,td,tr,img,a;
var srv=0;
try {
srv=urls.match(/de(\d+)\D*\.die-staemme\./)[1];
} catch (e) {
return;
}
for (i=0;i<f.links.length;i++) {
l=f.links[i];
if (parseHref(l.href).search(/village=[0-9]+&screen=mail&mode=new&player=([0-9]+)/) > -1) {
m=parseHref(l.href).match(/village=[0-9]+&screen=mail&mode=new&player=([0-9]+)/)[1];
s=l.parentNode.parentNode;

tr=f.createElement('tr');
td=f.createElement('td');
td.colSpan=2;
a=f.createElement('a');
a.target='dsreal';
a.href='http://www.dsreal.de/index.php?tool=akte&mode=player_conquer&world=de'+srv+'&id='+m;
img=f.createElement('img');
img.src='http://www.dsreal.de/chart/bash_chart.php?id='+m+'&world=de'+srv+'&mode=player&art=all';
a.appendChild(img);

td.appendChild(a);
tr.appendChild(td);
s.parentNode.insertBefore(tr,s);

break;
}
}

}

function chartPlayer() {
	var f=document;
	var i,l,m,s,td,tr,img,a;
	var srv=0;
	try {
		srv=urls.match(/de(\d+)\D*\.die-staemme\./)[1];
	} catch (e) {
		return;
	}
	for (i=0;i<f.links.length;i++) {
		l=f.links[i];
		if (parseHref(l.href).search(/village=[0-9]+&screen=mail&mode=new&player=([0-9]+)/) > -1) {
			m=parseHref(l.href).match(/village=[0-9]+&screen=mail&mode=new&player=([0-9]+)/)[1];
			s=l.parentNode.parentNode;
			tr=f.createElement('tr');
			td=f.createElement('td');
			td.colSpan=2;
			a=f.createElement('a');
			a.target='dsreal';
			a.href='http://www.dsreal.de/index.php?tool=akte&mode=player&world=de'+srv+'&id='+m;
			img=f.createElement('img');
			img.src='http://www.dsreal.de/chart/chart.php?id='+m+'&world=de'+srv+'&mode=player';
			a.appendChild(img);
			td.appendChild(a);
			tr.appendChild(td);
			s.parentNode.insertBefore(tr,s);
			break;
		}
	}
}

function getHref(){
	var parameter = ["village","screen","mode","view","id","target","EDI"];
	var link = document.location.href.split("?")[1].split("&");
	var link2 = eval({});
	for (var i=0; i<link.length;i++){
		link2[link[i].split("=")[0]]=link[i].split("=")[1];
	}
	link = document.location.href.split("?")[0]+"?";
	for (var i=0; i<parameter.length;i++){
		link += parseText(parameter[i] + "=" + link2[parameter[i]]+"&");
	}
	return (link.substring(0,link.length-1));
}

function parseHref(linku){
	var parameter = ["village","screen","mode","view","id","target","EDI","player"];
	var link = (linku.split("?").length>1) ? linku.split("?")[1].split("&") : linku.split("?")[0].split("&");
	var link2 = eval({});
	for (var i=0; i<link.length;i++){
		link2[link[i].split("=")[0]]=link[i].split("=")[1];
	}
	link = (linku.split("?").length>1) ? linku.split("?")[0]+"?" : "";
	for (var i=0; i<parameter.length;i++){
		link += parseText(parameter[i] + "=" + link2[parameter[i]]+"&");
	}
	return (link.substring(0,link.length-1));
}

function parseText(text){
	if (text.match(/undefined/)){
		return "";
	}
	return text;
}