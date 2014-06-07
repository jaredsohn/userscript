// ==UserScript==
// @name           facebook&twitter paylaşma
// @version        1
// @namespace      thedewil
// @include        http://www.itusozluk.com/*
// ==/UserScript==

	var cBoxes=document.getElementsByName('shareonfb');
	var cBoxes=document.getElementsByName('shareontwit');

	for (var i=0; i < cBoxes.length; i++) 
    if (cBoxes[i].type=="checkbox") 
			cBoxes[i].checked=false;
