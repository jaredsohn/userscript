// ==UserScript==
// @name          AOL Reader Wide
// @icon        http://i.imgur.com/N9xDdCf.png
// @require    http://usocheckup.dune.net/173255.js
// @downloadURL		https://userscripts.org/scripts/source/173255.user.js
// @updateURL		https://userscripts.org/scripts/source/173255.meta.js
// @version		2013.10.15
// @namespace     http://userstyles.org
// @description	  wide feed, less of wasting padding, default colors
// @author        BskyB
// @homepage      http://userstyles.org/styles/90510
// @include       http://reader.aol.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#reader-container {\n    margin-right: 0px !important;\n    margin-top: 0px !important;\n}\n.article-item-full .article-content {\n    width: auto !important;\n}\n.header, .article-header, .article-tags, .reader-ad-container {\n    display: none !important;\n}\n.nav{\n    top: -10px !important;\n}\n.article-body img.img-block {\n    text-align: center !important;\n}\n.article-author {\n    max-width: 660px !important;\n}\n.article-body img, .article-item-full .article-content, .article-item-view .article-content {\n    max-width: 100% !important;\n}\n.feed-header{\n    top:-15px !important;\n    height: 37px !important;\n    right: 0px !important;\n}\n.article-list {\n    margin-top: 10px !important;\n}\n.article-title {\n    margin-bottom: 0px !important;\n}\nimg.img-block {\n    margin: auto !important;\n}\n.article-body iframe  {\nmax-width: 640px !important;\n    min-height: 360px !important;\n}\n@-moz-document url-prefix(\"http://reader.aol.com/\") {\n#reader-container {\n    margin-right: 0px !important;\n    margin-top: 0px !important;\n}\n.article-item-full .article-content {\n    width: auto !important;\n}\n.header, .article-header, .article-tags{\n    display: none !important;\n}\n.nav{\n    top: -10px !important;\n}\n.article-body img.img-block {\n    text-align: center !important;\n}\n.article-author {\n    max-width: 660px !important;\n}\n.article-body img {\n    max-width: 100% !important;\n}\n.feed-header{\n    top:-15px !important;\n    height: 37px !important;\n    right: 0px !important;\n}\n.article-list {\n    margin-top: 10px !important;\n}\n.article-title {\n    margin-bottom: 0px !important;\n}\nimg.img-block {\n    margin: auto !important;\n}\n.article-body iframe  {\nmax-width: 640px !important;\n    min-height: 360px !important;\n}\n.article-item-read .article-content .article-title a {\ncolor: rgb(119, 119, 119) !important;\n}\n.article-title a {\nfont-family: \"Helvetica Neue\",Helvetica,Arial,sans-serif !important;\nfont-weight: 500 !important;\ntext-rendering: optimizelegibility !important;\nletter-spacing: -0.04em !important;\nfont-size: 24px !important;\nline-height: 28px !important;\ncolor: rgb(40, 40, 40) !important;\n}\n}";
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