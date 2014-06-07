// ==UserScript==
// @name          Universal Night
// @namespace     http://userstyles.org
// @description	  This one changes all webpages dark so you can see better at night, it also lets yo
// @author        aoikishu
// @homepage      http://userstyles.org/styles/18860
// @run-at document-start
// ==/UserScript==
(function() {
var css = "/* Made after understanding Liqube Night by Lqbe, Modified by aoikishu */ @namespace url(http://www.w3.org/1999/xhtml); /* change below from \"url-prefix\" to \"domain(\"website\")\" to use a specific website only */ * { background-color: #101010 !important; /* you can have a background-image by replaceing \"none\" with \"url(\"urlofpicture\")\" */ background-image: none !important; background-repeat: repeat !important; background-position: center !important; background-attachment: fixed !important; /* font-size: 16.00px; font-family: Verdana, Arial; */ color: #bbbbbb !important; } /* the links on the webpage */ a:link { color: #445588 !important; } a:visited { color: #445588 !important; } a:hover, a:active { color: #FFFFFF !important; } input[type=button], input[type=submit], input[type=reset] { background-color: #505050 !important; color: black !important; border-color: #202020 !important; } input[type=text], input[type=password], input[type=file] { background-color: black !important; color: #000000 !important; border-color: #202020 !important; border: 1px solid #505050; } /* add the div-id to have that area of the webpage has opacity; change opacity to 0 through 1; 0 is transparent, 1 is full color */ /* website order: userstyles.org(x4) */ #sidebar, #header-bar, #navigation, #style-show { background-color: transparent !important; opacity:0.4 !important; } /* same as above except the opacity is greater when hovered */ #sidebar:hover, #header-bar:hover, #navigation:hover, #style-show:hover { opacity:1 !important; }";
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
