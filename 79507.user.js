// ==UserScript==
// @name           	Kongregate Quick Links Remover
// @namespace     	http://matthewammann.com
// @description   	Removes the Quick Links bar above games to eliminate accidental mis-clicks
// @include        	http://www.kongregate.com/games/*
// @exclude         http://www.kongregate.com/games/*/*/*
// @author			Matthew Ammann
// @version			1.0
// @date 			06/18/10

// ==/UserScript==

 var links = document.getElementById("quicklinks");
 
 links.parentNode.removeChild(links);