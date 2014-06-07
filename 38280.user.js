// ==UserScript==
// @name	Itamaram's CompactSea
// @namespace	http://itamaram.selfip.com:8621/CompactSea.user.js
// @description	Adds a link to the sea while in compact mode
// @include	http://*kingdomofloathing.com/compactmenu.php
// @include	http://127.0.0.1:60080/compactmenu.php
// ==/UserScript==

//find the dropdown menu
nav = document.forms.namedItem('navform2').getElementsByTagName('select')[0];
//create a new element
var sealink = document.createElement('option');
sealink.value = "oldman.php";
sealink.appendChild(document.createTextNode("An Old Man"));
//add the element to the dropdown menu
nav.appendChild(sealink);