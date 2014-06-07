// ==UserScript==
// @name          I ITM'ed when it looked GOOD
// @namespace     http://userstyles.org
// @description	  No more RED - and now WIDER!!
// @author        Mickstah
// @homepage      http://userstyles.org/styles/31404
// @include       http://inthemix.com.au/*
// @include       https://inthemix.com.au/*
// @include       http://*.inthemix.com.au/*
// @include       https://*.inthemix.com.au/*
// ==/UserScript==
(function() {
var css = "#site {\nwidth:auto !important;\nmargin: 0 0px !important;\n}\n\nbody#forum-display .grouping {\nwidth:73%!important;\n}\n#forums-listing .forum .forum-title h3 a {\nbackground-color:#FF981F !important;\n}\n#forums-listing .forum .forum-title h3 a:hover {\nbackground-color:#333333 !important;\n\n}\n#breakout-key #key-contains-new p {\nbackground-color:#FF981F!important;\n}\n#thread-title h3 {\ncolor:#666666 !important;\n}\n.post .post-user-name a {\ncolor:#333333 !important;\n}\n.post .post-message-content {\npadding:10px 20px 10px 15px !important;\n}\n#threadslist .thread-details h3 a {\ncolor:#666666 !important;\n}\n#threadslist .thread-details h3 a:hover {\ncolor:#FE4938 !important;\n}\n#threadslist .thread-details h3.thread-new-post {\ncolor:#000000 !important;\n}";
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
