// ==UserScript==
// @name           Shoutbox immer da mit Mousover effekt fÃ¼r pennergame 4.0 alle Games
// @description    Zeigt die Shotbox an sobals man mit der maus rueber geht fuer alle Games
// @include        http://*serserionline.com*
// @include        http://*clodogame.fr*
// @include        http://*mendigogame.es*
// @include        http://*pennergame.de*
// @include        http://*dossergame.co.uk*
// @include        http://*menelgame.pl*
// @include        http://*bumrise.com*
// @include        http://*pennergame.de*
// @exclude        */gang/*
// ==/UserScript==
// ===========================================================================

//Linkadressen fuer Hamburg
var url = document.location.href;
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var sig = 'http://inodes.pennergame.de/de_DE/signaturen/';
}
//Linkadressen fuer Berlin
if (url.indexOf("berlin")>=0) {
var link = "http://berlin.pennergame.de"
var sig = 'http://inodes.pennergame.de/bl_DE/signaturen/';
}
//Linkadressen fuer Muenchen
if (url.indexOf("http://muenchen.pennergame")>=0) {
var link = "http://muenchen.pennergame.de"
var sig = 'http://inodes.pennergame.de/mu_DE/signaturen/';
}

//Linkadressen fuer Dossergame
if (url.indexOf("dossergame")>=0) {
var link = "http://www.dossergame.co.uk"
var sig = 'http://inodes.dossergame.co.uk/en_EN/signaturen/';
}
//Linkadressen fuer Menelgame
if (url.indexOf("menelgame")>=0) {
var link = "http://www.menelgame.pl"
var sig = 'http://inodes.clodogame.fr/pl_PL/signaturen/';
}
//Linkadressen fuer Clodogame
if (url.indexOf("clodogame")>=0) {
var link = "http://www.clodogame.fr"
var sig = 'http://inodes.clodogame.fr/fr_FR/signaturen/';
}
//Linkadressen fuer Mendigogame
if (url.indexOf("mendigogame")>=0) {
var link = "http://www.mendigogame.es"
var sig = 'http://inodes.mendigogame.es/es_ES/signaturen/';
}
//Linkadressen fuer Serserionline
if (url.indexOf("serserionline")>=0) {
var link = "http://www.serserionline.com"
var sig = 'http://inodes.pennergame.de/tr_TR/signaturen/';
}
//Linkadressen fuer Bumrise
if (url.indexOf("bumrise")>=0) {
var link = "http://www.bumrise.com"
var sig = 'http://inodes.pennergame.de/us_EN/signaturen/';
}

var version="0.1";
var displayedflag = 0;

unsafeWindow.displaywiki = function() {
	if(displayedflag == 0) {
		document.getElementById("wikiframe").innerHTML = '<iframe width="600"   height="100%" src="'+link+'/gang/" style="margin-left:2px;"></iframe>';
		displayedflag = 1;
	}
}

unsafeWindow.showwiki = function() {
	if(document.getElementById("wikibar").style.left == "-1000px")
	{
		document.getElementById("wikibar").style.left = "0px;"
	}
	document.getElementById("wikibar").style.left = "0px;"
}

unsafeWindow.hidewiki = function() {
	document.getElementById("wikibar").style.left = "-1000"
}

vwikibar = document.createElement("div");
vwikibar.setAttribute("id", "wikibar");

var body = document.getElementsByTagName("body");

body[0].appendChild(vwikibar);


var wkHTML = '<div id="wikitab" onmouseover="showwiki()" onclick="hidewiki()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style="color:yellow;line-height: 35px; font-size: 15px; font-weight: bold;width:1000px;position:absolute;top:0px;left:0px;height:30px;background:url();">'
	+ '<a style="border-bottom:1px green dotted; color: #542C0F;" href="http://www.pennerhack.foren-city.de">Bastis Page</a></div>'
	+ '<div id="wikiframe" style="position:absolute;top:30px;bottom:3px;left:4px;" onmouseover="displaywiki()">Die Shoutbox wird geladen</div>'
	+ '<div style="width:100px;position:absolute;bottom:0px;left:0px;height:3px;background:url();background-repeat:no-repeat;"></div>';

GM_addStyle("#wikibar { background:url(http://pennertips.bplaced.net/filemanager/Bilder/Pennergame/fondo negro.gif); padding-top:33px; width:600px; position:fixed; left:-1015px; top:0px; bottom:50px; border:10px blue solid; z-index:50;");
GM_addStyle("#wikibar:hover { left:0px; }");
GM_addStyle("#wikitab { background:url(http://i35.tinypic.com/2d2j8ns.png); width:26px; height:220px; position:absolute; right:-440px; top:0px; } ");
GM_addStyle("#wikitab:hover { cursor: pointer; } ");

document.getElementById("wikibar").innerHTML = wkHTML;

// Copyright (c) by basti1012 @ Pennerhack ( visit: http://www.pennerhack.de.tc )
// Dieses Werk ist durch eine Creative Commons by-nc-sa Lizenz geschuetzt.
// Bearbeiten oder Vervielfaeltigen ist nur nach Absrache mit dem Autor gestattet.
// Bei Nichtbeachtung werden rechtliche Schritte eingeleitet.

