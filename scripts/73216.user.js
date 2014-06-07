// ==UserScript==
// @name          4Chan AwesomeFace
// @namespace     http://userstyles.org
// @description	  A style closely based on the desu~ style by dmnkn1ght.  Meant to be used with the Firefox Persona "LOLFace" (as pictured in the screenshot).
// @author        ForcedMeme
// @homepage      http://userstyles.org/styles/22633
// ==/UserScript==
(function() {
var css = "";
css += "@namespace url(http://www.w3.org/1999/xhtml);";
if (false || (document.domain == "boards.4chan.org" || document.domain.substring(document.domain.indexOf(".boards.4chan.org") + 1) == "boards.4chan.org"))
	css += "body[bgcolor] {\nbackground-color:#C4CCDF !important;\nbackground-image:url(http://img510.imageshack.us/img510/3364/gll2.jpg) !important;\nbackground-position: right bottom !important;\nbackground-repeat:no-repeat !important;\nbackground-attachment:fixed !important\n}\n.postblock, .pages {\nbackground-color: #7F9FFB !important;\n}\n.pages, .reply, .replyhl {\n-moz-border-radius-bottomright: 8px !important;\n-moz-border-radius-topright: 8px !important;\n-moz-border-radius-topleft: 8px !important;\n-moz-border-radius-bottomleft: 8px !important;\n}\n.replyhl{\nbackground-color: #FBC0DF !important;\n}\n.reply {\nbackground-color: #9AB4FA !important;\n}\n.reply, .replyhl {\nborder: 1px solid #000000 !important;\nbackground-image:url() !important;\nbackground-position: left !important;\nbackground-repeat: no-repeat !important;\nbackground-attachment: fixed !important;\n\ncolor: #000000 !important;\n}\n.unkfunc{\ncolor: #1b5b1b !important;\n}\n.postername, .commentpostername {\nbackground: inherit;\ncolor: #72261a !important;\nfont-weight: 800 !important;\n}\nDIV[class=\"4chan_ext_thread\"] > BLOCKQUOTE {\nmax-width:800px !important\n}";
css += "TABLE[class=\"4chan_ext_reply\"] {\nmax-width:1100px !important\n}";
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
