// ==UserScript==
// @name          Gray CN User Theme
// @namespace     
// @description	  A new different gray theme
// @author        letub
// @homepage      
// @include       http://www.cybernations.net/*
// @include       https://www.cybernations.net/*
// @include       http://*.www.cybernations.net/*
// @include       https://*.www.cybernations.net/*
// ==/UserScript==
(function() {
var css = "/* * Gray CN  * * Author : letub * Created : April 5th, 2009 * Website : http://www.cybernations.net/ * Description : Modifies the colors, logos, and font * Usage : Use with Greasemonkey * */ @namespace url(http://www.w3.org/1999/xhtml); body{ background:#999 url(http://img.photobucket.com/albums/v469/Cope/CNgreasemonkeyBanner.pngno-repeat center top !important; padding-top:75px !important } table, tbody, td, tr{ background:#999 !important; color:#000 !important; font-family:\"Lucida Console\",\"Courier New\",Courier,Arial,Helvetica !important } table, #table17, #table28{ border:none !important } b{ font-weight:normal !important } i{ font-style:normal !important } ::selection{ background:#000 !important; color:#999 !important } ::-moz-selection{ background:#000 !important; color:#999 !important } /* Sidebar */ #table17, #table28{ background:#999 !important } #table17 img, #table28 img, #table33 img, #table50 img{ display:none !important } p font b{ color:#000 !important; text-transform:uppercase !important } /* Tabs */ .shadetabs li a{ background-color:#999 !important; background-image:none !important } .shadetabs li a:hover{ background-color:#00f !important; color:#fff !important } /* Main */ td img{ background:#fff !important } tr td b font{ color:#000 !important; text-transform:uppercase !important } input, option, select, textarea{ background:#999 !important; color:#000 !important; font-family:\"Lucida Console\",\"Courier New\",Courier,Arial,Helvetica !important } option a:hover{ background:#000 !important; color:#999 !important } textarea{ font-size:11px !important } .buttons{ color:#00f !important; font-weight:bold !important; letter-spacing:1px !important; padding:5px 10px !important } .buttons:hover{ background:#00f !important; color:#fff !important } /* Links */ a{ color:#00f !important; cursor:pointer !important; outline:none !important; text-decoration:none !important } /* Remove ads */ b img, iframe, #table25, #table51, #table54{ display:none !important; visibility:hidden !important; width:0 !important } /* End */";
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
