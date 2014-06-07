// ==UserScript==
// @name          GMail Collapse Inbox Empty Space
// @version       0.1
// @description   Collapses the Gmail inbox empty vertical space when there are less than 9 messages in it. Useful when using Multiple Inboxes.
// @author 	  poussah, with code borrowed from mattconstantine and jbmarteau 
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// ==/UserScript==
(function() {

var css = "@namespace url(http://www.w3.org/1999/xhtml);         \
          .zs {display: none;}"

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