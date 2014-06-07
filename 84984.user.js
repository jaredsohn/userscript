// ==UserScript==
// @name           Twilight Heroes Popup wiki links
// @namespace      http://www.lclerget.com
// @description    Adds wiki links to item popups in Twighlight Heroes
// @include        http://www.twilightheroes.com/popup.php*
// ==/UserScript==

var allBold, titleElement, itemName;
var wikiURL = '<a href="http://th.blandsauce.com/wiki/';
allBold = document.getElementsByTagName("b");
titleElement = allBold[0];
if (titleElement)
{
	itemName = titleElement.innerHTML;
	itemName = itemName.replace(/ /gi,"_");
	wikiURL = wikiURL + itemName + '" target="_blank">' + titleElement.innerHTML + '</a>';
	titleElement.innerHTML = wikiURL;
}
