// ==UserScript==
// @name           Travian - Remove logo
// @namespace      http://userscripts.org/scripts/show/88533
// @include 	http://*.travian*.*/*.php*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude	http://*.travian*.*/log*.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*
// @exclude 	*.css
// @exclude 	*.js

// ==/UserScript==

// Move page up
var bodyElements, bodyElement;
bodyElements = document.getElementsByTagName('body');
for (var i = 0; i < bodyElements.length; i++) {
    bodyElement = bodyElements[i];    
    
		bodyElement.style.marginTop = '-100px';
}

// Remove background
GM_addStyle("div#dynamic_header { background: url(''); background-color: #CCCCCC; }");

// Remove footer
var footer = document.getElementById('footer');
footer.style.display = 'none';

// Feel free to improve :)