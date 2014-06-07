// ==UserScript==
// @name           Ikariam No Down
// @version        0.1
// @namespace      NoDown
// @description    prevent building destruction - MUST be the very first script in GreaseMonkey
// @include        http://s*.ikariam.*/*position=*
// @include        http://s*.ikariam.*/*abolishColony*
// @history        0.1 Initial release
// ==/UserScript==

var elem;
elem = document.getElementById("buildingUpgrade");
if (elem) { 
	elem = elem.getElementsByTagName("a")[2];
	elem.href='';
	elem.parentNode.removeChild(elem);
}; // no downgrade allowed

elem = document.getElementById("abolishColony");
if (elem) { 
	elem = elem.getElementsByTagName("input")[0].parentNode;
	elem.parentNode.removeChild(elem);
}; // no ablolish colony allowed
