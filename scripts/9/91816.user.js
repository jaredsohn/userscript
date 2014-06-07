// ==UserScript==

// @name		NEW Html Grooveshark Hide Ad-Bar

// @namespace		http://userscripts.org/users/65373

// @description		Hides sidebar in html version of Grooveshark

// @version		3.0

// @include	        http://listen.grooveshark.com/*

// ==/UserScript==


document.getElementById("capitalPane").style.display='none';
document.body.style.width += 1460 + 'px';