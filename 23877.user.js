// ==UserScript==
// @name           Ikariam CR Converter
// @namespace      ikariCR
// @description    Ikariam CR Converter 
// @include        http://*ikariam.org/*detailedCombat*
// ==/UserScript==
//
//
//This is a script that removes images from combat reports, leaving only the text
//Copyright (C) 2008  nikitakit
//
//Licensed under GNU GPL version 3 or later <http://www.gnu.org/copyleft/gpl.html>
//
//


var x = document.getElementById("troopsReport").innerHTML;


//x=x.replace(/<td><\/td>/g, "");

x=x.replace(/<img src=\"skin\/characters\/military\/x40_y40\/y40_/g, "");
x=x.replace(/_faceright.gif\">/g, "");
x=x.replace(/<img src=\"skin\/layout\/icon-helmet.gif\">/g,"Units");
x=x.replace(/<img src=\"skin\/layout\/sword-icon-report.gif\">/g,"Attack");
x=x.replace(/<img src=\"skin\/layout\/shield-icon-report.gif\">/g,"Defense");
x=x.replace(/<img src=\"skin\/layout\/icon-endurance2.gif\" align=\"absmiddle\">/g,"Stamina");




document.getElementById("troopsReport").innerHTML = x
