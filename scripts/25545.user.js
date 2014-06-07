// ==UserScript==
// @name           Pierate's Custom Outfit De-Tagger
// @namespace      CustomLessOutfiter
// @description    Removes the "Custom" from the beginning of custom outfits and puts it in brackets at the end.
// @include        http://*.kingdomofloathing.com/inventory.php?which=2
// ==/UserScript==

var optionsList = document.getElementsByTagName('option');

for(var i = 0; i < optionsList.length; i++)
{
if (optionsList[i].innerHTML.indexOf('Custom:') != -1)
	{
		optionsList[i].innerHTML = optionsList[i].innerHTML.substring(8,optionsList[i].innerHTML.length);
		optionsList[i].innerHTML = optionsList[i].innerHTML + " (Custom)";
		
	}
}