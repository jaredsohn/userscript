// ==UserScript==
// @name       Colour change 
// @version    0.1
// @description  Changes Text/Username/Rolls/other colors on FJ
// @include       http://funnyjunk.com/*
// @include       https://funnyjunk.com/*
// @include       http://*.funnyjunk.com/*
// @include       https://*.funnyjunk.com/*
// @run-at        document-start
// ==/UserScript==

(function() {
    var css =  "#commentsList .com .t a,#commentsList_mp .t a{color:#00ff33!important;}#commentsList .com .t a:hover,#commentsList_mp .t a:hover{text-decoration:underline;} \n#commentsList .com .t,#commentsList_mp .com .t{padding-right:100px!important;padding:2px 0;color:#05f;font-size:12px;overflow:hidden;line-height:1.2em;} \nspan.roll{color:#88ff88}\n#commentsList a,#postsList a{color:#D4AF37;text-decoration:none;}#commentsList .uName,#postsList{color:#ff0000 !important}\n.greenLight{color:#FF00FF!important;}.greenTags{color:#8cca0a;}.grey{color:#8A8A8A;} .redlight {color:#FFEF00}\n.greenLight{color:#FF00FF!important;}.com\n.greenLight{color:#FF00FF!important;}.greenTags{color:#8cca0a;}.grey{color:#8A8A8A;} .redlight{color:#B57EDC}"

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
