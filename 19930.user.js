// ==UserScript==
// @name          deviantART Message Center (devWatch)
// @namespace     http://userstyles.org
// @description	  Transforms the deviantART message center.
// @author        kle0012
// @include       http://my.deviantart.com/devwatch/*
// @include       http://my.deviantart.com/messages/*
// @include       http://my.deviantart.com/notes/*
// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); .subsection, .subsection h3 { background:#EAF2EE !important; -moz-border-radius-topright: 1em !important; -moz-border-radius-topleft: 1em !important; -moz-border-radius-bottomright: 1em !important; -moz-border-radius-bottomleft: 1em !important; } .button { background:#B9D0CA !important; border:none !important; } #content { border:none !important;  -moz-border-radius-topright: 1em !important; -moz-border-radius-topleft: 1em !important; -moz-border-radius-bottomright: 1em !important; -moz-border-radius-bottomleft: 1em !important; } #nav-east { display:none !important; background:#FFFFFF; } .button { background:#FFFFFF; } .body { background-color:#6A7872  important; } .dev-thumbnails { border:none !important; background:#EAF2EE !important; margin-top:-10px; margin-bottom:-20px; } .stream { border:none !important; background:#EAF2EE !important; margin-top:-10px; margin-bottom:-20px; }  .output-primary { width:100% !important; }  .tabbar { background:#EAF2EE; }  .tabbar strong, .tabbar a { border:none !important; background:#EAF2EE !important; color:#1983CB !important; font-size:16px !important; font-weight: bold !important; }  .tabbar a:hover { text-decoration:underline !important; } .tabbar strong { color:#000000 !important; } .alt-head { background:#EAF2EE !important; border:none !important; -moz-border-radius-topright: 1em !important;  -moz-border-radius-topleft: 1em !important; padding:1em; } .section-foot { background:#EAF2EE !important; border:none !important; } .section-foot a { background:#EAF2EE !important; border:none !important;} .section-foot a:hover { background:#FFFFFF !important; border:none !important; } .read { border:none !important; background:#EAF2EE !important; -moz-border-radius-bottomright: 1em !important; -moz-border-radius-bottomleft: 1em !important; } .tabbar a:hover, .tabbar a:active { color:#1983CB; background:#EAF2EE; text-decoration:underline; } .section-foot { margin-top:-6px !important; } .container .section-foot { margin-top:20px !important; }  #message-center .subsection { border-style:none !important; }   #message-center .subsection .float-holder { background:#EAF2EE !important; border-style:none;  }  #message-center { background:#D5E3DF !important; border:none; -moz-border-radius-bottomright: 1em !important; -moz-border-radius-bottomleft: 1em !important; }  #message-center .subsection h3 { border-bottom-style:none !important; background:#EAF2EE !important; font-family:arial !important; color:#666666 !important; -moz-border-radius-topright: 1em !important; -moz-border-radius-topleft: 1em !important; -moz-border-radius-bottomright: 0em !important; -moz-border-radius-bottomleft: 0em !important; }  #message-center .subsection h3 a { color:#1983CB !important; }  #message-center .subsection h3 img { display:none !important; }  #message-center .subsection .float-holder { -moz-border-radius-bottomright: 1em; -moz-border-radius-bottomleft: 1em; }  #subsection-head-m { background:#EAF2EE !important; }  #subsection-head-c { background:#EAF2EE !important; }  .beacon .first { background:#EAF2EE !important; }";

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
}