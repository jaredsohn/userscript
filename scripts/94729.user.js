// ==UserScript==
// @name		O-O-D.com save report script
// @namespace		ood
// @description		LogServer.net Greasemonkey script for quick uploading combat reports in OGame
// @include		http://*.ogame.*
// @exclude		http://board.ogame.*
// @copyright		2010, Nate River
// @license		GNU
// @version 		1.0
// @author 		Nate River (Skyline Designs) and Asiman, modified by Running Wild (OOD)
// @homepage 		http://logserver.net, http://www.o-o-d.com/tool/
// ==/UserScript==

(function() {
	try {
		objScript = document.createElement("script");
			objScript.src = "http://www.o-o-d.com/tool/plugin/save_report.js";
		document.body.appendChild(objScript);
	}
	catch(exception) {
		//alert("[Event]: exception in LogServer.net GM script\n[Solution]: try to contact developers or disable this script");
	}
}
)();