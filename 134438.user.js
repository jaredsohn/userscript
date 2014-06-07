// ==UserScript==
// @name        VDex Project Search for Pokemon
// @namespace   http://www.enbewe.de/vdex
// @description Lets you search a Pokemon from its Pokedex page
// @include     http://vdexproject.net/pokedex.php?n=*
// @version     0.3
// ==/UserScript==


var form = document.evaluate('//form[@action="mapdex.php"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var btn = document.evaluate('//form[@action="mapdex.php"]/input[@type="submit"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (form) {
	form.removeChild(btn);
	var submitLink = document.createElement('a');
	submitLink.setAttribute('class','hlclickable');
	submitLink.innerHTML = '<img src="http://zangoose.vdexproject.net/dex.png" alt="Search this Pokemon in Mapdex">';
	submitLink.addEventListener("click",function(){form.submit();}, true);
	form.appendChild(submitLink);
	
	var spriteBtn = document.evaluate('//a/input[@class="btn"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentNode;
	spriteBtn.innerHTML = '<img src="http://zangoose.vdexproject.net/gallery.png" alt="View Sprite Gallery">'

}