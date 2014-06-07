// ==UserScript==
// @name          douban dark
// @namespace     http://userscript.org
// @description	  douban dark
// @author        chez
// @homepage      http://userscripts.org/scripts/source/34622.user.js
// @include       http://www.douban.com/*
// @include       https://www.douban.com/*
// @include       http://*.www.douban.com/*
// @include       https://*.www.douban.com/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); body {background: #6d6d6d url(http://i3.6.cn/cvbnm/29/33/18/45bbd9c8b282c1488a43ad0202b6061f.jpg) repeat fixed 0 0 !important;}#maxw, #max_campus {border: 6px solid #5d5d5d !important; -moz-border-radius: 20px !important;}#max_campus {width: 720px !important;}#max_campus .fdiv{margin-left:10px !important; margin-right: 10px !important; margin-bottom: 2px !important;}#campus_header img {margin-left: 3px !important;}#campus_header {-moz-border-radius-topleft: 20px !important; -moz-border-radius-topright: 20px !important;}#max_campus ol {list-style-image: url(http://i3.6.cn/cvbnm/ed/55/d8/a9929f6d2b300ffe769b24bfa27f8ddb.jpg) !important; margin-bottom: 20px !important;}#max_campus ol li {margin-left: 30px !important;}#searbar img,#header img, h3 img, h3 img:hover{border: none !important;}a img:hover {opacity: 0.5 !important;}a{outline: none !important;}a:active{color: #EB9000 !important;}.fdiv, .obs_oneline dt{height: auto !important;}#subnav{padding: 0 5px 0 2px !important;}.thispage{color: #EB9000;}";
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
