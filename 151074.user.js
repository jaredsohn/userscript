// ==UserScript==
// @name          KOL - Chat - Label THUD! Members
// @namespace     http://userstyles.org
// @description	  Labels the Mods in chat, and puts their name in the warnings and bans
// @author        Amanda Kerik - Remix By Journe
// @homepage      http://userscripts.org/scripts/show/61075
// @include       http://127.0.0.1/*
// @include       http://*kingdomofloathing.com/*
// ==/UserScript==
var css2632 = '/* A */' +
'/* Y */' +
'a[href="showplayer.php?who=700309"]:before, ' +
'a[href="showplayer.php?who=1436764"]:before, ' +
'a[href="showplayer.php?who=840337"]:before, ' +
'a[href="showplayer.php?who=408500"]:before, ' +
'a[href="showplayer.php?who=332346"]:before, ' +
'a[href="showplayer.php?who=114555"]:before, ' +
'a[href="showplayer.php?who=985943"]:before, ' +
'a[href="showplayer.php?who=351116"]:before, ' +
'a[href="showplayer.php?who=1242052"]:before, ' +
'a[href="showplayer.php?who=987816"]:before, ' +
'a[href="showplayer.php?who=1630015"]:before, ' +
'a[href="showplayer.php?who=455727"]:before, ' +
'a[href="showplayer.php?who=1669894"]:before, ' +
'a[href="showplayer.php?who=783016"]:before, ' +
'a[href="showplayer.php?who=568742"]:before, ' +
'a[href="showplayer.php?who=935132"]:before, ' +
'a[href="showplayer.php?who=1299850"]:before, ' +
'a[href="showplayer.php?who=574062"]:before, ' +
'a[href="showplayer.php?who=335703"]:before, ' +
'a[href="showplayer.php?who=1423009"]:before, ' +
'a[href="showplayer.php?who=352918"]:before, ' +
'a[href="showplayer.php?who=1406751"]:before, ' +
'a[href="showplayer.php?who=187145"]:before, ' +
'a[href="showplayer.php?who=1624833"]:before, ' +
'a[href="showplayer.php?who=92471"]:before, ' +
'/* Z */' +
'a[href="showplayer.php?who=621435"]:before' +
'{content: " (T) " !important; font-weight: bold !important; color: #c00 !important;}' +
'#ChatWindow font b a:before, #ChatWindow font b a:before, #ChatWindow b + i a:before {content: "" !important;}' 

+
'/* ------------ */' +
'/* Y */' +
'font b a[href="showplayer.php?who=700309"] font:after {content: " (Adrien)" !important;}' +
'font b a[href="showplayer.php?who=1436764"] font:after {content: " (BSMOLONEY)" !important;}' +
'font b a[href="showplayer.php?who=840337"] font:after {content: " (cowmanbob)" !important;}' +
'font b a[href="showplayer.php?who=408500"] font:after {content: " (Deo)" !important;}' +
'font b a[href="showplayer.php?who=332346"] font:after {content: " (Dotts)" !important;}' +
'font b a[href="showplayer.php?who=114555"] font:after {content: " (Dr_Obvious)" !important;}' +
'font b a[href="showplayer.php?who=985943"] font:after {content: " (efot)" !important;}' +
'font b a[href="showplayer.php?who=351116"] font:after {content: " (eusst)" !important;}' +
'font b a[href="showplayer.php?who=1242052"] font:after {content: " (evilmetaldork)" !important;}' +
'font b a[href="showplayer.php?who=987816"] font:after {content: " (Giguy00)" !important;}' +
'font b a[href="showplayer.php?who=1630015"] font:after {content: " (hideouspenguinboy)" !important;}' +
'font b a[href="showplayer.php?who=455727"] font:after {content: " (Honus Carbuncle)" !important;}' +
'font b a[href="showplayer.php?who=1669894"] font:after {content: " (iridescentFUZZ)" !important;}' +
'font b a[href="showplayer.php?who=783016"] font:after {content: " (jackal73)" !important;}' +
'font b a[href="showplayer.php?who=568742"] font:after {content: " (kevbob)" !important;}' +
'font b a[href="showplayer.php?who=935132"] font:after {content: " (King Stupid)" !important;}' +
'font b a[href="showplayer.php?who=1299850"] font:after {content: " (Kyta)" !important;}' +
'font b a[href="showplayer.php?who=574062"] font:after {content: " (LadyDelilah)" !important;}' +
'font b a[href="showplayer.php?who=1423009"] font:after {content: " (magikal muffin top)" !important;}' +
'font b a[href="showplayer.php?who=335703"] font:after {content: " (Nienor)" !important;}' +
'font b a[href="showplayer.php?who=352918"] font:after {content: " (PazSox)" !important;}' +
'font b a[href="showplayer.php?who=1406751"] font:after {content: " (scathdhuan)" !important;}' +
'font b a[href="showplayer.php?who=187145"] font:after {content: " (tomkitty)" !important;}' +
'font b a[href="showplayer.php?who=1624833"] font:after {content: " (weas)" !important;}' +
'font b a[href="showplayer.php?who=92471"] font:after {content: " (whomhead)" !important;}' +


'/* Z */' +
'font b a[href="showplayer.php?who=621435"] font:after {content: " (brightmeadow)" !important;}' +
'font[color="blue"] b a font[color="blue"]:after {content: "" !important;}';
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css2632);
} else if (typeof addStyle != "undefined") {
	addStyle(css2632);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css2632));
		heads[0].appendChild(node); 
	}
}