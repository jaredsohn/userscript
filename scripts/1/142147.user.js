// ==UserScript==
// @name          Dark Waves - Tumblr Login
// @namespace     http://userstyles.org
// @description	  Tumblr Login Display. 
// @author        KoalaTea
// @homepage      http://userstyles.org/styles/61094
// @include       https://www.tumblr.com/login*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".startpage{\nbackground-color: #0a0a0a; \nbackground-image: url(http://static.tumblr.com/xwroret/hJ9lzgo49/tumblr_waves_dark_400.png) !important; \nbackground-repeat: repeat !important; \nbackground-attachment: fixed !important; \nbackground-position: center; \n}\n\n.sign_up {\nbackground-color: #555 !important;\n}\n\n*{font-family: Georgia, Times New Roman, Serif !important; font-style:italic !important; text-shadow:none !important; border:0px !important} \n\na, a:visited{color:#666 !important} \n\na:hover{color:#333 !important} \n\nlabel{color:#666 !important} \n\n.input_wrapper{opacity:0.5 !important} \n\na.login{opacity:0.3 !important; color:#fff !important} \n\nbutton{opacity:0.6 !important; color:#fff !important} \nbutton:hover{opacity:0.8 !important; color:#fff !important} \n\n.logo {\nheight: 0 !important;\n	width: 0 !important;\n	padding-left: 440px !important;\n	padding-top: 100px !important;\n	background: url(http://i42.tinypic.com/2hrkh9y.png) no-repeat !important; }";
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