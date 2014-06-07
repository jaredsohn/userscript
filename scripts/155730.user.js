// ==UserScript==
// @name        WowHead
// @namespace   z0fa.wowhead
// @description Aggiunge un collegamento a WowHead alle pagine http://eu.battle.net/wow/it/item/*
// @author 		z0fa
// @include		http://eu.battle.net/wow/it/item/*
// @version     1.1
// @run-at document-end
// ==/UserScript==
window.addEventListener('load',function() 
{
	document.getElementById("fansite-links").appendChild(document.createElement("br"));
	var url = document.createElement("a");
	url.setAttribute("href", "http://wowhead.com/item=" + window.location.href.replace("http://eu.battle.net/wow/it/item/",""));
	url.appendChild(document.createTextNode("Wowhead"));
	document.getElementById("fansite-links").appendChild(url);
},true);
