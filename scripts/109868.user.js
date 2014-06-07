// ==UserScript==
// @name          Face Book Dark
// @namespace     http://userstyles.org
// @description	  This style is lightly inspired by Facebook Style (Dark)
// @include       http://www.facebook.*/* 
// @include       http://apps.facebook.com/*/*
// ==/UserScript==
(function() {
var css = "body{\n	background: #333 !important\n}\n\n#pagelet_navigation{\n	-moz-border-radius: 20px !important;\n	-moz-box-shadow: inset 0 0 3px 2px #666, 1px 1px 5px #222 !important;\n	-webkit-border-radius: 80px !important;\n	-webkit-box-shadow: 1px 1px 5px #222 !important;\n	background: #00ff00 !important;\n	background: -moz-linear-gradient(top, #eee, #fefefe) !important;\n	background: -webkit-gradient(linear, top, bottom, from(#eee), to(#fefefe)) !important;\n	border-radius: 20px !important;\n	box-shadow: inset 0 0 3px 2px #666, 1px 1px 5px #222 !important;\n	margin: 5px 5px !important;\n	padding: 10px 0 10px 10px !important;\n	width: 145px !important\n}\n\n#headNav{\n	background: #000000;\nant;\n}\n\na{\n}\n\n#pagelet_ego_pane,#pagelet_eventbox{\n	display:none\n}\n\n#content{\n	-moz-border-radius: 15px !important;\n	-moz-box-shadow: 0 0 5px 2px #111 !important;\n	-webkit-border-radius: 15px !important;\n	-webkit-box-shadow: 0 0 5px 2px #111 !important;\n	background: #111 !important;\n	background: -moz-linear-gradient(top, #111, #222) !important;\n	background: -webkit-gradient(linear, top, bottom, from(#111), to(#222)) !important;\n	border-radius: 20px !important;\n	border: 1px solid #222;\n	box-shadow: 0 0 5px 2px #111 !important;\n	margin: 5px 0 0 -5px !important;\n	padding:0px 10px 0px 10px;\n	width: 970px !important\n}";
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