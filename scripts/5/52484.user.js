// ==UserScript==
// @name bastis Navileiste
// @namespace basti1012 www.penerhack.foren-city.de
// @description Fuegt eine neue navileiste ein wo man farbe und groesse einstellen kann Download,news,und ebay wurde entfernt und durch bande messages und plunder ersetzt
// @include *pennergame.de*
// @include *berlin.pennergame.de*
// @include *dossergame.co.uk*
// @include *menelgame.pl*
// ==/UserScript==

var schrieftgrosse = "110";
var krum = "white";

var div = document.getElementById('navigation');
var navi = div.getElementsByTagName('ul')[0];
navi.innerHTML =''
+'<li style="width: 85px;" ><a href="/overview/"> <span style=\"color: '+krum+'; font-size: '+schrieftgrosse+'%;\"><b> Uberssicht </b></span></a>' 
+'<li style="width: 85px;" ><a href="/skills/"> <span style=\"color: '+krum+'; font-size: '+schrieftgrosse+'%;\"><b>Skills </b></span></a>'
+'<li style="width: 85px;" ><a href="/activities/"> <span style=\"color: '+krum+'; font-size: '+schrieftgrosse+'%;\"><b>Aktion </b></span></a>'
+'<li style="width: 105px;" ><a href="/city/?noflash=True"> <span style=\"color: '+krum+'; font-size: '+schrieftgrosse+'%;\"><b>Stadt </b></span></a>'
+'<li style="width: 85px;" ><a href="/stock/"> <span style=\"color: '+krum+'; font-size: '+schrieftgrosse+'%;\"><b>Inventar</b> </span></a>' 
+'<li style="width: 85px;" ><a href="/fight/overview/"> <span style=\"color: '+krum+'; font-size: '+schrieftgrosse+'%;\"><b>Fights</b></span></a>'
+'<li style="width: 85px;" ><a href="/gang/"> <span style=\"color: '+krum+'; font-size: '+schrieftgrosse+'%;\"><b>Bande </b></span></a>'
+'<li style="width: 85px;" ><a href="/stock/plunder/"> <span style=\"color: '+krum+'; font-size: '+schrieftgrosse+'%;\"><b>Plunder</b></span></a>'
+'<li style="width: 55px;" ><a href="/messages/"> <span style=\"color: '+krum+'; font-size: '+schrieftgrosse+'%;\"><b>sms </b></span></a>';

//Copyright by basti1012