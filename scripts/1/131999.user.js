// ==UserScript==
// @name           FreeSteam Gmod Search Button
// @description    Adds search button on garrysmod.org for FreeSteam Gmod
// @include        http://www.garrysmod.org/downloads/?a=view&id=*
// @version        1.0
// @downloadURL    https://userscripts.org/scripts/source/131999.user.js
// @updateURL      https://userscripts.org/scripts/source/131999.meta.js
// ==/UserScript==

function addButton()
{
	element.innerHTML += '<input type="button" id="fsgmsearch" style="width: 250px; font-size: 15px;" value="Search FreeSteam GMOD Addons">';
	var fsgmbutton = document.getElementById("fsgmsearch");
	fsgmbutton.setAttribute("onclick", 'window.location.href=\'' + addonSearch + '\'');
}

var addonName = document.getElementById("downloadtitle").getElementsByTagName("h2").item(0).innerHTML;
var addonSearch = "http://freesteam.org/gmod/search.php?searchterm=" + addonName;
var element = document.getElementsByTagName("form").item(1);

addButton();