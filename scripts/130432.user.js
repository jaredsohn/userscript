// ==UserScript==
// @name          whimsical soul - tumblr login page
// @namespace     http://userstyles.org
// @description	  changes the login page of tumblr
// @author        raspberrypie.info
// @homepage      http://userstyles.org/styles/60992
// @include       https://www.tumblr.com/login*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".startpage{\nbackground-image:url('http://i.imgur.com/wME0l.jpg') !important;\n\nbackground-repeat:repeat !important;\n\nbackground-attachment:fixed !important;\n\nbackground-color:#513660 !important;\n\nbackground-position:top right\n\n\n}\n\n*{font-family: Garamond, Baskerville, Serif !important; font-style:italic !important; text-shadow:none !important; border:0px !important}\n\n\n\na, a:visited{color:#666 !important}\n\na:hover{color:#333 !important}\nlabel{color:#fff !important}\n.input_wrapper{opacity:0.5 !important}\ninput{}\na.login{opacity:0.3 !important; color:#fff !important}\nbutton{opacity:0.6 !important; color:#fff !important}\nbutton:hover{opacity:0.8 !important; color:#fff !important}\n\n.logo {\n\nheight: 0 !important;\n\n	width: 0 !important;\n\n	\n\n	padding-left: 440px !important;\n\n	padding-top: 180px !important;\n\n	background: url(http://i.imgur.com/hJSMZ.png) no-repeat !important;\n\n\n\n}";
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

