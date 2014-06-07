// ==UserScript==
// @name           dA Birthday SearchBar1
// @namespace      http://www.w3.org/1999/xhtml
// @include        http://deviantart.com/*
// @include        https://deviantart.com/*
// @include        http://*.deviantart.com/*
// @include        https://*.deviantart.com/*
// ==/UserScript==
(function() {
var css = "/* name: no moar orange search bar version: 1.0 author: http://freaksville.deviantart.com/ created: 2 August 2008 */ @namespace url(http://www.w3.org/1999/xhtml); #searchCap { background:url(http://i38.tinypic.com/2inv3r.gif) no-repeat 0px -199px !important; position: absolute; top: 0px; left: -196px; z-index: 121; height: 22px; width: 20px; cursor: text; } #searchArea input.sleekSearchInput { background-color: #839788; background:url(http://i38.tinypic.com/2inv3r.gif) repeat-x 0px -291px !important; border: 0px; overflow: visible; width: 100%; height: 19px; margin: 0px; padding: 3px 0px 0px 15px; color: #350e1b !important; position: absolute; top: 0px; right: 174px; font:1.1em Verdana,sans-serif; z-index: 120; } #searchDropdown { background-color: #8fa599; background:url(http://i38.tinypic.com/2inv3r.gif) no-repeat 0px -222px !important; border: 0px; height: 20px; margin: 0px; width: 119px; position: absolute; top: 0px; right: 31px; color: #350e1b !important; text-align: left; font-size: 9pt; line-height: 1.5em; cursor: pointer; } #searchDropdown:hover { background:url(http://i38.tinypic.com/2inv3r.gif) no-repeat 0px -268px !important; } #searchButton {background-color:#8fa599;background:url(http://i38.tinypic.com/2inv3r.gif) no-repeat -138px -222px !important;border: 0px;width: 36px;height: 22px;margin: 0px;padding: 0px;position: absolute;top: 0px;right: 0px;cursor: pointer;} #searchButton:hover { background:url(http://i38.tinypic.com/2inv3r.gif) no-repeat -138px -268px !important; } #noTouch { position: absolute; width: 100%; height: 100%; top: 0px; left: 0px; z-index: 190; } #noTouch #searchDropdownOverlay { background:url(http://i38.tinypic.com/2inv3r.gif) no-repeat -1px -246px !important; border: 0px; border-bottom: 1px solid #000000; width: 138px; height: 20px; position: absolute; top: 71px; right: 55px; _right: 56px; cursor: pointer; } body.withad #noTouch #searchDropdownOverlay { top: 186px; } #noTouch #searchDropdownMenu {background:#8fa599 !important; border: 0px!important; border-top: 0px; width: 188px; position: absolute; top: 92px; right: 54px; _right: 56px; cursor: pointer; } body.withad #noTouch #searchDropdownMenu { top: 207px; } #noTouch #searchDropdownMenu div.sdmItem { color: #1f292a !important; font-size: 10pt; line-height: 20px; padding: 2px 5px 2px 5px;} #noTouch #searchDropdownMenu div.sdmItemHover { background-color: #667c70 !important; color: #FFFFFF !important; }";
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
