// ==UserScript==
// @name Buttons mit Links by RamR0D
// @namespace  buttons_with_links
// @description Erweitert Buttons in OGameansicht
// @include http://*.ogame.*/game/index.php?*page=*
// @version 1.2

// ==/UserScript==

//für RD - Unis

if (document.getElementById('menuTable') != null) {
	var LinkDiv = document.createElement('div');
	LinkDiv.id = 'LinkDiv';
	LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://gf2.geo.gfsrv.net/cdn1e/257d433f4744f1b98417ae997fbd99.gif" height="29" width="38"></span><a class="menubutton " href="http://www.oraiders.com/calculators.php" accesskey="" target="_blank"><span class="textlabel">oRaiders</span></a></li>';
	LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://gf2.geo.gfsrv.net/cdn1e/257d433f4744f1b98417ae997fbd99.gif" height="29" width="38"></span><a class="menubutton " href="http://owiki.de/Hauptseite" accesskey="" target="_blank"><span class="textlabel">oWiki</span></a></li>';
	LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://gf2.geo.gfsrv.net/cdn1e/257d433f4744f1b98417ae997fbd99.gif" height="29" width="38"></span><a class="menubutton " href="http://www.savekb.de/" accesskey="" target="_blank"><span class="textlabel">SaveKB</span></a></li>';
	LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://gf2.geo.gfsrv.net/cdn1e/257d433f4744f1b98417ae997fbd99.gif" height="29" width="38"></span><a class="menubutton " href="http://www.war-riders.de/" accesskey="" target="_blank"><span class="textlabel">War-Riders</span></a></li>';
	document.getElementById('menuTable').appendChild(LinkDiv);
}