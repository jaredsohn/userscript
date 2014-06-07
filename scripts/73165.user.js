// ==UserScript==
// @name           Direkt Krieg/Buendnissverlinker auf Bandenprofil Pennergame alle Games by Boggler
// @namespace      Boggler @ Pennerhack ( visit:http://pennerhack.de.tc/ )
// @description    Auf Bandenprofilen werden 2 Links erstellt um die Bande als Feind/Freund hinzuzufuegen 
// @license		 Creative Commons by-nc-sa
// @include        */profil/bande:*/
// @include 	     */gang/pact/*
// ==/UserScript==


// Farbeinstellungen
var position = 'absolute';
var top = '400';
//var bottom = '50';
var right = '650';
//var left = '50';
var fontsize = 'x-small';
var radius = '20';
var sichtbar = '';
var border = '1px solid #000000';
var bgcolor = '#313131';

//Auf der Buendnisseite...
//Buendnis einfuegen
if(document.location.href.indexOf('buendnisname=')>0){

var buendnisname = document.location.href.split('buendnisname=') [1];
var feld = document.getElementById('f_name');

document.getElementsByTagName('option')[1].selsected = true;

feld.value = buendnisname;


}

//Feind einfuegen
if(document.location.href.indexOf('feindname=')>0){

var feindname = document.location.href.split('feindname=') [1];
var feld = document.getElementById('f_name');

feld.value = feindname;

}




//Auf der Bandenseite...
if(document.location.href.indexOf('/profil/bande:')>0){

var body = document.getElementsByTagName('body')[0];

//Name
var bandenname = body.innerHTML.split('src="/headline/')[1].split('/')[0];

//Buttons hinzufuegen
body.innerHTML += '<span style="position:'+position+';top:'+top+'px;right:'+right+'px;font-size:'+fontsize+';"><input type="button" id="freund" value="Als B&uuml;ndnispartner hinzuf&uuml;gen"><br><br><input type="button" id="feind" value="Als Feind hinzuf&uuml;gen"></span>';

//Buendnis Button
document.getElementById('freund').addEventListener('click', function freund(){

document.location.href = 'http://'+document.location.hostname+'/gang/pact/?buendnisname='+bandenname;

},false);



//Krieg Button
document.getElementById('feind').addEventListener('click', function feind(){

document.location.href = 'http://'+document.location.hostname+'/gang/pact/?feindname='+bandenname;

},false);

}
