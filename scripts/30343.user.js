// Paint it White
// version 3.1
// 2008-07-21
// Copyright (c) 2008, Ran Yaniv Hartstein
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Paint it White", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Paint it White
// @author          Ran Yaniv Hartstein <http://ranh.co.il/>
// @namespace       http://www.brunotorres.net/greasemonkey/
// @description     Paints Nana10 a shoothing White
// @include         http://*nana10.co.il*
// @exclude         http://israblog.nana10.co.il*
// ==/UserScript==

var css = "@namespace url(http://www.w3.org/1999/xhtml); body { background: #fff url('http://images.nana.co.il/sitefiles/nana10-launch/grad.png') no-repeat top right !important; } .mainBackground, #headerBlock, #contentBlock, .MainDiv, #footerBlock, .lingulaHeaderText { background: transparent !important; } div.logo img { display: none; } div.logo a { display: block; width: 211px; height: 73px; background-image:  url('http://images.nana.co.il/sitefiles/nana10-launch/nana10_transparent.png'); } .TopSearchImageDivContainer { border: 1px solid #8E8D89; } a.TopSearchLink { text-indent: -1000em; } img[src=\"http:\/\/f.nau.co.il/partner48/Common/Images/radio_on.gif\"] { background-image:  url('http://images.nana.co.il/sitefiles/nana10-launch/radio_on_white.png'); }  #sectionLeftNavBar { background-color: #4D4D4D; } table#BodyTable td[style=\"padding-top: 8px; padding-bottom: 12px; text-align: right;\"] { padding-top: 0px !important; } td[style=\"padding-top: 15px; padding-right: 20px; padding-bottom: 10px;\"] { display: none; } span#BodyContent b { display: none; } span#BodyContent p b { display: inline; } span#Body div[style=\"overflow: hidden;\"] { margin-top: -8px !important; } span#Body td[style=\"padding-right: 20px;\"] { padding-right: 10px !important; } tr[style=\"padding-top: 12px; padding-bottom: 8px;\"] td[colspan=\"2\"] table { margin-top: 16px; margin-bottom: 12px; } .colarityCover div[style=\"float: right; width: 60px; padding-right: 5px;\"] {  width: 134px !important; background-color: #4D4D4D; padding: 12px 3px !important;} div.TopSearchHeader[style=\"padding: 30px 0px 0px 26px; height: 100%; float: left; display: inline;\"] img { display: none } div.TopSearchHeader[style=\"padding: 30px 0px 0px 26px; height: 100%; float: left; display: inline;\"] { width: 106px; height: 28px !important; background: url('http://images.nana.co.il/sitefiles/nana10-launch/beta-white.png') 16px 33px no-repeat; }";
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
