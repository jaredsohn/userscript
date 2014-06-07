// ==UserScript==
// @name            Del.icio.us  Clean and Blue
// @namespace  http://userstyles.org
// @description Clean style for Del.icio.us for those of us who love blue (based on Alex's script, http://userstyles.org/styles/5101)
// @author         Honest Ape
// @homepage   http://userstyles.org/
// @include       http://del.icio.us/*
// @include       https://del.icio.us/*
// @include       http://*.del.icio.us/*
// @include       https://*.del.icio.us/*
// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); * { font-family: tahoma !important; } .commands { position: relative !important; float:right !important; } .pop, .date { background: none !important; color: #ccc !important; text-decoration: none !important; } .post { border-bottom: 1px solid #F2F2F2 !important; } .post:hover { background: #f2f2f2 !important; } .desc {font-weight: bold !important; }   a {color: #2A7FFF!important; } a:link { text-decoration: none; color: #2A7FFF !important;  }a:visited { text-decoration: none; color: #103878 !important; }a:hover { text-decoration: none !important;color: #24A30B !important;  }a:active { text-decoration: none !important;color: #EF9B08 !important;  }.error, .important, .notice { color: #EF9B08 !important; } .sidebar-inner { background-color: #E5F1FF !important;} #infobar{background-color: #E5F1FF !important;}#fp-hotlist-title{background: #065FC4 !important;}.numbox{background: none !important;} #curated h3{background:#065FC4 !important;color:#ffffff !important;}#curated .linkmore a{color:#000000 !important;}";
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