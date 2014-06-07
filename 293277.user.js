// ==UserScript==
// @name				IM Website Shares Banner Remover
// @namespace			http://www.keavon.com/
// @description			Removes the Shares for Support Medals sticky banner from InterstellarMarines.com
// @include				http://*.interstellarmarines.com/*
// @include				http://interstellarmarines.com/*
// @version				1.0
// @downloadURL			http://userscripts.org/scripts/source/293277.user.js
// ==/UserScript==

var div = document.getElementById("notify-container");
if (div)
{
	div.parentNode.removeChild(div);
}
(function ()
{
	$('body[style="margin-top: 2.9em; "]').removeAttr("style");
})();