// ==UserScript==
// @name       ThePirateBay.se auto reroute
// @namespace  TPB
// @version    1.0
// @description  reroutes you to labaia.ws instead of thepiratebay.se
// @match      *thepiratebay.*/*
// @copyright  2012+, You
// ==/UserScript==
//+++++++++++++++++++|--------|++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//===================|--NOTE--|========================================================
//+++++++++++++++++++|--------|++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// If you need this to work on other sites as well, just add 
// "// @match *THESITE's URL/*" without the "" below the already existing "// @match"
//+++++++++++++++++++|------------|++++++++++++++++++++++++++++++++++++++++++++++++++++
//===================|--END NOTE--|====================================================
//+++++++++++++++++++|------------|++++++++++++++++++++++++++++++++++++++++++++++++++++

var a= document.URL.split("//")[1].split("/")[0];
document.URL.split(a)[1];
document.location="http://labaia.ws" + document.URL.split(a)[1];