// ==UserScript==
// @name          Facepunch Improvement Script
// @namespace     http://userstyles.org
// @description	  This makes Facepunch look less shitty.
// @author        pawnstick & Metanoia
// @homepage      http://userstyles.org/styles/28660
// @include       http://www.facepunch.com/*
// @include       https://www.facepunch.com/*
// @include       http://*.www.facepunch.com/*
// @include       https://*.www.facepunch.com/*
// ==/UserScript==
(function() {
var css = "body{background:#2c2c2c !important;width:100% !important;font-family:Tahoma,sans-serif !important;margin:5px auto !important;}\na,a:visited{color:#c54041 !important;}\n.spacer{background:white;-moz-border-radius:6px;-moz-border-radius-bottomright:0;-moz-border-radius-bottomleft:0;-webkit-border-radius:6px;-webkit-border-bottom-right-radius:0;-webkit-border-bottom-left-radius:0;padding:6px !important;}\n.quote{color:white !important;border:1px solid #8f0001 !important;}\n.quote a{color:white !important;}\n.quote .information{background:#810000 !important;}\n.quote .message{background:#f16e6e !important;}\n.boxshadow{box-shadow:0 !important;}\n.alt1{background:#f7f7f7 !important;}\n.alt2{background:#eee !important;}\n#posts{margin-bottom:12px !important;}\n#posts .spacer{-moz-border-radius:0 !important;-webkit-border-radius:0 !important;padding:0 6px 0 6px !important;}\n#navbar{background:0 !important;border:0 !important;}\n.tborder{background:#a47071 !important;border:1px solid #f47071 !important;}\n.tcat,.vbmenu_control,.tfoot{background:#cd0102 !important;}\n.tcat a,.tfoot a{color:white !important;}\n#collapseobj_forumhome_activeusers a{color:#888 !important;}\n.postbitnew{background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAABCAIAAAB/kG/JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEZJREFUeNpi/H3rFsMgAUxMZGpkZKSC+bhlGXFJ4RLH6h6sijEEGYlTRrwVJDueJE+RHn2M5MUy2WmDQkBk0hoF9AIAAQYAh+IC/+EbF8oAAAAASUVORK5CYII%3D') !important;}\n.tfoot{-moz-border-radius:6px;}";
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
})();