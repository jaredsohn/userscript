// ==UserScript==
// @name          Jake English
// @namespace     http://userstyles.org
// @description	  You know that kid that caused an ovary explosion
// @author        ==>
// @homepage      http://userstyles.org/styles/56302
// @include       https://www.tumblr.com/login*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".startpage{\n\n\n\n\n\n\n\nbackground-image:url('http://s3.amazonaws.com/data.tumblr.com/tumblr_luj12mgGYp1qf4eupo1_1280.png?AWSAccessKeyId=AKIAJ6IHWSU3BX3X7X3Q&Expires=1321313056&Signature=lCvNsG3QnvN1p9AO9H%2FEZ8FFE4A%3D') !important;\n\n\n\n\nbackground-size:;\n\n\n\nbackground-attachment: left !important;\n\n\n\nbackground-color:#000000 !important;\n\n\n\nbackground-position:top right\n\n\n}\n\n\n*{font-family: Jenkins v2.0 !important; font-style:normal !important; text-shadow:none !important; border:0px !important,}\n\n\n\na, a:visited{color:#666 !important}\n\n\n\na:hover{color:#333 !important}\n\n\n.input_wrapper{opacity:0.8 !important}\n\n\na.login{opacity:1 !important; color:#000000!important}\n\n\nbutton{opacity:1 !important; color:#00000 !important}\n\n\n\nbutton:hover{opacity:0.8 !important; color:#fff !important}";
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