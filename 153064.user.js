// ==UserScript==
// @name           Link in every Page 
// @description    This script will put my URL in every page.
// @include        htt*://*
// @author         K.M. de Haan
// @authorURL	   http://www.k-graphics.nl
// @downloadURL    https://userscripts.org/scripts/source/153064.user.js
// @updateURL      https://userscripts.org/scripts/source/153064.meta.js
// @icon	   http://i1229.photobucket.com/albums/ee462/joeralit/jempollike.png
// @version        1.1
// @license        GNU
// ==/UserScript==

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "130px";
	div.style.opacity= 0.90;
	div.style.bottom = "+15px";
	div.style.left = "+8px";
	div.style.backgroundColor = "#000000";
	div.style.border = "1px solid #E52A71";
	div.style.padding = "3px";
	div.innerHTML = "<a style='font-weight:bold;color:#FAFAFA' href='http://www.K-Graphics.nl' title='K-Graphics.nl'><center>K-Graphics.nl</center></a>"
body.appendChild(div);}