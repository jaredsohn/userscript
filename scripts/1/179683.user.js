// ==UserScript==
// @name           Partis Izgled Fix (Chrome, Opera Next)
// @version        1.2
// @description    Popravi razne napake, ki se pojavljajo v brskalniku Chrome in Opera Next
// @author         NoBody
// @include        *.partis.si/uporabnik/*
// @include        *.partis.si/profil/prikazi/*
// @include        *.partis.si/skupnost/forum
// @include        *.partis.si/forums/*
// @include        *.partis.si/topics/*
// @include        *.partis.si/profil/zaznamki
// @updateURL	   http://userscripts.org/scripts/source/179683.user.js
// ==/UserScript==

var localpath = window.location.pathname;
var profil1 = new RegExp("/uporabnik/*");
var profil2 = new RegExp("/profil/prikazi/*")
var forum1 = new RegExp("/forums/*")
var forum2 = new RegExp("/topics/*")

if(profil1.test(localpath) || profil2.test(localpath) || localpath == "/profil/zaznamki") {
	document.getElementsByClassName("ltoolbar")[0].style.height="auto";
	document.getElementsByClassName("masterfoot")[0].remove();
}

if(forum1.test(localpath) || forum2.test(localpath) || localpath == "/skupnost/forum") {
	document.getElementsByClassName("newz")[0].style.height="50px";
	document.getElementsByClassName("newztit2")[0].style.margin="25px 0 0 0";
}