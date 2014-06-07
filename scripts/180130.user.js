// ==UserScript==
// @name           GooglePlusFixer2
// @namespace      http://www.mircoweb.de/
// @include        http*://plus.google.com/u/0/*
// @exclude        https://mail.google.com/*
// @version        22.10.2013 / 2.1.1
// ==/UserScript==

var width=1000; // Change that to whatever you want

function f() {
    GM_addStyle('.ona, .Ypa {width:'+width+'px !important; padding-left:100px;}'); // Haupt-Container und einer drunter
	GM_addStyle('.Al {overflow:auto;}'); // Container von Text und Bild
	GM_addStyle('.Xx {width:'+(width/2-50)+'px; float:left;}'); // Posting-Text
	GM_addStyle('.yx {width:'+(width/2-50)+'px; float:right; margin-left:40px;}'); // Posting-Bild
	GM_addStyle('.cg {border:none;}'); // Posting-Bild
	GM_addStyle('yx img {margin:0px; width:'+(width/2-50)+'px;}'); // Posting-Bild   
	GM_addStyle('.Ct {font-size:16px;}'); // Größere Schrift für Postings
	GM_addStyle('.Msd {margin-left:-30px; background:none;}'); // Seitenleiste dauerhaft einblenden
	GM_addStyle('.uVd {background:none;}'); // Einträge der Seitenleiste ohne Hintergrund
	GM_addStyle('.SOb, .Hge {display:none;}'); // Unnötiges aus Seitenleiste ausblenden
	GM_addStyle('.U6a {position:fixed; bottom:5px; left:5px; z-index:999;}'); // Neuigkeiten-Box links unten
        GM_addStyle('.oDc {margin-left:-100px;}'); // "x neue"-Label
	};

if (document.location.href.indexOf("mail.google.com") == -1) { // Will otherwise also work on gmail. That's odd because I've @excluded it!
	f();
	}
