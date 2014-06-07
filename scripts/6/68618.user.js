// ==UserScript==
// @name           XP dev banner remover
// @namespace      xpdev
// @description    Removes banner from xpdev
// @author		 loige
// @version	 	 1.0
// @include        http://www.xp-dev.com/*
// ==/UserScript==

(function() {

var cent = document.getElementsByClassName("center");
for(var i = 0; i < cent.length; i ++)
{
	if(cent[i].previousElementSibling.tagName == "SCRIPT")
		 cent[i].style.display = "none";
}



})();