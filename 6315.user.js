: 
// Wiener Linien Script
// version 0.1 !
// 2006-11-11
// Copyright (c) 2005, Christoph Klocker
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Wiener Linien
// @namespace     http://www.vedanova.org
// @description   Inputs default values for the vienna public transport. It's pretty annoying
// to insert always Vienna if you use the vienniese public transport inside vienna
// @include       http://efawww.wiennet.at/wien/index_de.htm
// ==/UserScript==

//Start: Stadt/Gemeinde
document.getElementsByName("place_origin")[0].value = "Wien";
// Straße/Hausnummer
document.getElementsByName("name_origin")[0].value = "Ausgangspunkt hier setzen";
// Ziel: Stadt/Gemeinde
document.getElementsByName("place_destination")[0].value = "Wien";
// set type to Straße/Hausnummer [1 auf 0 setzten wenn "Haltestelle" selektiert werden soll
document.getElementsByName("type_origin")[1].checked = true;
//set focus to destination
document.getElementsByName("name_destination")[0].focus();


