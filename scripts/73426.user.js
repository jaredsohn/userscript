// ==UserScript==
// @name           WiWu-Warner und Wut-Warner 
// @namespace      by basti1012 (http://pennerhack.foren-city.de)
// @description    WiWu-Warner ,wUTENTFACHUNG man wird auf jeder Seite gewarnt das wiwu oder wut aktiv ist so kann man es nicht mehr verpaassen
// @include        http://*pennergame.de*
// @include        http://*menelgame.pl*
// @include        http://*clodogame.fr*
// @include        http://*mendigogame.es*
// @include        http://*dossergame.co.uk*
// @include        http://*serserionline.com*
// @include        http://*bumrise.com*
// @include        http://*bichionline.ru*
// @include        http://*pivetgame.com.br*
// @exclude       http://*board*
// @exclude       http://*redirect*
// @license		 Creative Commons by-nc-sa
// ==/UserScript==

// Farbeinstellungen
var position = 'fixed';
var top = '250';
//var bottom = '50';
var right = '500';
//var left = '50';
var fontsize = 'x-small';
var radius = '20';
var sichtbar = '';
var border = '1px solid #000000';
var bgcolor = '#313131';

//Linkadressen definieren
var url = document.location.href;
//Linkadressen fuer Hamburg
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

   GM_xmlhttpRequest({
      method: 'GET',
      url: ''+link+'/gang/',
      onload: function(responseDetails) {
         var content = responseDetails.responseText;
try{
        var warntext = content.split('<tr align="left" valign="top">')[2].split('<tr align="left" valign="top">')[0];
}catch(e){
var warntext = '';
}
var body = document.getElementsByTagName('body')[0];
body.innerHTML += '<div style="position:'+position+';top:'+top+'px;right:'+right+'px;">'+warntext+'</div>';

}});

// Copyright (c) by basti1012 @ Pennerhack ( visit: http://www.pennerhack.de.tc )
// Dieses Werk ist durch eine Creative Commons by-nc-sa Lizenz geschuetzt.
// Bearbeiten oder Vervielfaeltigen ist nur nach Absrache mit dem Autor gestattet.
// Bei Nichtbeachtung werden rechtliche Schritte eingeleitet.



