// ==UserScript==
// @name          IconBuffet: My Icons Restyled
// @namespace     http://userstyles.org
// @description	  Restyled page for My Icons to save space & organize things better
// @author        bjendrick
// @homepage      http://userstyles.org/styles/3849
// @include       http://iconbuffet.com/*
// @include       https://iconbuffet.com/*
// @include       http://*.iconbuffet.com/*
// @include       https://*.iconbuffet.com/*
// ==/UserScript==
var css = "/* * IconBuffet: My Icons Restyled * * Author : Benjamin Jendrick * : Timely Database Solutions Â© 2007 * Created : October 19, 2007 * Updated : January 6, 2008 * Version : 1.4 * Website : http://www.timelydbs.com/scripts/ * Description : Restyled page for My Icons to save space & organize things better. * : (includes all subdomains) * Usage : Use with Stylish Firefox extension (http://userstyles.org/) or copy to your Firefox userContent.css file * Notes : Reduced icon size to 16x16, and font size to fit into one row. */ @namespace url(http://www.w3.org/1999/xhtml); #vip-status { display: none !important; } #about-me-content h3 { display: none !important; } .preview-sm { background: none !important; margin: 0 !important; width: 55px !important; height: 60px !important; } .preview-sm div { background: none !important; } .preview-sm div a { font-size: 6pt; } .profile #icons { background: none !important; } .preview-sm img { padding-top: 0px !important; } .preview-sm a img { width: 16px; height: 16px; } .profile #icons.setheight { height: 0px !important; } h3#t-blogs { display: none !important; } .profile .blogs { clear: both !important; } h3#t-thebox { background: none !important; } h3 { padding-bottom: 0px !important; } h3.title { height: 0 !important; padding-bottom: 0px !important; } #points-total { background: #F04A00 none !important; height: 40px !important; } .mybank p { display: none !important; } #t-mybank { display: none !important; } #t-badges { display: none !important; } #t-friends { display: none !important; } #t-trades { display: none !important; } #footer ul { display: none !important; } #footer .about { display: none !important; } #wrapper { padding-bottom: 0px !important; }";
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