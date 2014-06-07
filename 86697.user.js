// ==UserScript==
// @name           Arenabot
// @namespace      arenabot
// @description    Arenabot
// @include        http://world1.aquahaze.de/*
// ==/UserScript==


var protocol = window.location.protocol; /*		http:		*/
var host =  window.location.host;		/*		world1.aquahaze.de		*/
var path =  window.location.pathname;	/*		/game/game.php			*/

var url = protocol + "//" + host + path;
var action = "?action=";


/*	------------FOLGENDE FUNKTION NUR ZUM SPAß ZUM ZÄHLEN DER <p>-TAGS IM HTML-QUELLTEXT-------

function getAllParaElems()
{
  var allParas = document.getElementsByTagName("p");

  var num = allParas.length;

  alert("There are " + num + " <p> elements in this document");
}

--------ENDE DER FUNKTION----------------  */


if(location.href == url && window.location.search == "")
{
	setTimeout(function() {location.replace(url + action + "arena");}, 2000);
}
if(location.href != url && window.location.search == "?action=arena")
{	
	setTimeout(function() {location.replace(url + action + "arena&arenafight=true");}, 2000);
	setTimeout(function() {location.replace(url + action + "arena&arenafight=true");}, 2000);
}
if(location.href == url + action + "arena&arenafight=true")
{	

setTimeout(function() {location.replace(url + action + "attack");}, 2000);

}
