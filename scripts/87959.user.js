// ==UserScript==
// @name          Schulterglatze - Fixierter Header
// @description	  fixiert den Header am oberen Bildschirmrand
// @author        schweinebagge
// @include       http://schulterglatze.tld/*
// @include       http://*schulterglatze.tld/*
// ==/UserScript==
(function() {
if (document.getElementById('smallProfil')) {
if (document.getElementById('status_box')) {
    var logout = 331;
} else {
    var logout = 577;
};
var css = "#header_content_1{\n        position:fixed;\n        z-index:6;\n}\n\n#header_content_2{\n        position:fixed;\n        z-index:6;\n}\n\n#header_content_3{\n        position:fixed;\n        z-index:6;\n}\n\n#header_content_4{\n        position:fixed;\n        z-index:6;\n}\n\n#header_content_5{\n        position:fixed;\n        z-index:6;\n}\n\n#header_content_6{\n        position:fixed;\n        z-index:6;\n}\n \n#final_header_content_1{\n        position:fixed;\n        z-index:6;\n}\n\n#final_header_content_2{\n        position:fixed;\n        z-index:6;\n}\n\n#final_header_content_3{\n        position:fixed;\n        z-index:6;\n}\n\n#final_header_content_4{\n        position:fixed;\n        z-index:6;\n}\n\n#final_header_content_5{\n        position:fixed;\n        z-index:6;\n}\n\n#final_header_content_6{\n        position:fixed;\n        z-index:6;\n}\n\n#final_header_content_7{\n        position:fixed;\n        z-index:6;\n}\n\n#final_header_content_8{\n        position:fixed;\n        z-index:6;\n}\n\n.logout{\n	margin: 6px 35px 0 " + logout + "px !important;\n}\n\n#content{\n	padding: 222px 0 5px 0 !important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
}
})();