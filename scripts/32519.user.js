// ==UserScript==
// @name           Gmail Adds remover
// @namespace      maloglovets.net
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// @include        https://*.mail.google.com/*
// @include        http://*.mail.google.com/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* -------------------- remove ads --------------------- */ td.eWTfhb>div[class=\"XoqCub\"]>div[class=\"XoqCub\"]>div.XoqCub>* { display: none !important; } td.eWTfhb>div[class=\"XoqCub\"]>div[class=\"XoqCub\"]>div[class=\"XoqCub\"]>div.yMuNaf { display: block !important; } /* quick links */ td.eWTfhb>div[class=\"XoqCub\"]>div[class=\"XoqCub\"] div.yMuNaf { width: 100% !important; position: absolute !important; left: 0px !important; } td.eWTfhb>div[class=\"XoqCub\"]>div[class=\"XoqCub\"] div.yMuNaf div.OZly4d { padding: 0 !important; float: right !important; margin-right: 6px !important; } /* \"Turn off highlighting\" */ td.eWTfhb>div[class=\"XoqCub\"]>div[class=\"XoqCub\"] div.yMuNaf>div.OZly4d .njwqpb { background-color: transparent !important; } /* Quick Link button style ( Print All, New Window, etc ) */ td.eWTfhb>div[class=\"XoqCub\"]>div[class=\"XoqCub\"] div.yMuNaf span { padding: 0px 6px 1px 6px !important; border: 1px solid #C3D9FF !important; border-top-width: 0 !important; -moz-border-radius: 0 0 4px 4px !important; } td.eWTfhb>div[class=\"XoqCub\"]>div[class=\"XoqCub\"] div.yMuNaf span:hover { background-color: #C3D9FF !important; } td.eWTfhb>div[class=\"XoqCub\"]>div[class=\"XoqCub\"] div.yMuNaf span u { text-decoration: none !important; line-height: 13px !important; margin-top: 20px !important; } td.eWTfhb>div[class=\"XoqCub\"]>div[class=\"XoqCub\"] div.yMuNaf span img { display: none !important; } /* ---------- resize works ---------- */ h1.YfMhcb { margin-top: 5px !important; } td.eWTfhb>div { width: auto !important; padding-right: 5px !important; } /* \"show details\" fix (blue frame right-side) */ div[class=\"XoqCub rGOYzc\"] { margin-right: 10px !important; } table[class=\"PwUwPb XoqCub MMcQxe\"], table[class=\"PwUwPb XoqCub MMcQxe\"] div[class=\"XoqCub ice3Ad\"] { width: 100% !important; } div[class=\"Gi6zqd ccqOyd\"] { padding-right: 13px !important; } textarea.gV2Gwc { width: 100% !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
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
})();