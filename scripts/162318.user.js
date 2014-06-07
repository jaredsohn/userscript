// ==UserScript==
// @name        	Tribalwars snel links
// @namespace   	http://userscripts.org/users/507493
// @description 	Links in de statusbar
// @include     	http://*tribalwars.nl/game.php?*
// @version     	1
// ==/UserScript==

if(document.loaded) 
{
	LoadLinks();
} 
else 
{
    if (window.addEventListener) window.addEventListener('load', LoadLinks, false);
	else window.attachEvent('onload', LoadLinks);
}

function LoadLinks()
{
    var villageId = document.URL.match("village=" + "(.*?)" + "&")[1];
	var footer = document.getElementById("footer_left").innerHTML;

	document.getElementById("footer_left").innerHTML = footer + 
		"  -  <img src='http://cdn2.tribalwars.net/graphic/buildings/main.png'><a href='/game.php?village=" + villageId + "&screen=main'>Hoofdgebouw</a></img>" +
		"  -  <img src='http://cdn2.tribalwars.net/graphic/buildings/barracks.png'><a href='/game.php?village=" + villageId + "&screen=train'>Rekruteren</a></img>" + 
		"  -  <img src='http://cdn2.tribalwars.net/graphic/buildings/place.png'><a href='/game.php?village=" + villageId + "&screen=place'>Verzamelplaats</a></img>";
}