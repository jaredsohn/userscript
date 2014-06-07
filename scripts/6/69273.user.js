// ==UserScript==
// @name           farmville large
// @namespace      http://userscripts.org
// @description    farmville big www.farmville.com
// @author         http://www.guia-facebook.com/
// @homepage       http://userscripts.org
// @include        http://*.farmville.com/*
// @include        https://*.farmville.com/*
// @copyright      http://www.guia-facebook.com/
// @version        1.9
// @license        free

// ==/UserScript==

//////////

var css = "@namespace url(http://www.w3.org/1999/xhtml); .left_col { display:none; } .main_col, iframe, object {width: 990px;} #flashOuterContainer, html, element.style {width: auto;} ul.nav {padding: 0 0 0 25px ;} .outer_wrapper {position: absolute; top 1px; left: 1px;}";

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
	}
}



	
vshoutbar = document.createElement("div");

vshoutbar.setAttribute("id", "shoutbar");

var body = document.getElementsByTagName("body");

body[0].appendChild(vshoutbar);

document.getElementById("shoutbar").innerHTML ='<div style="background-color:#FFFFFF; color:#542C0F;line-height: 14px; font-size: 12px; font-weight: bold;width:100px;position:absolute;top:0px;left:0px;height:43px;">'

	+ '<a target="_blank" style="color: #542C0F;" href="http://www.guia-facebook.com/">Blog</a><br><a target="_blank" style="color: #542C0F;" href="http://forum.guia-facebook.com/">Forum</a></div>'

	

