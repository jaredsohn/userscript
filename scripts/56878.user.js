// ==UserScript==
// @name          GMail Clean Rows
// @version       0.1
// @description   Cleans up the email rows by removing the "unstarred icons", "grippy handles", and row borders. Increases row height by just a tad.
// @author 	      mconstantine, inspired by jbmarteau 
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml);         \
                                                                 \
    /* remove the row border and give them a tad more space */   \
    .DulQLd {                                                    \
      border-bottom: none !important;                            \
      height: 3.5ex !important;                                  \
    }                                                            \
                                                                 \
    /* remove the ugly grippy thing */                           \
    td.yUGic-PTfAse {                                            \
      background: transparent !important;                        \
    }                                                            \
                                                                 \
    /* remove the star from unstarred rows */                    \
    .zG {background: transparent !important;}"

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