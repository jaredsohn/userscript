// ==UserScript==
// @name          Top Gear Wide
// @icon        http://i.imgur.com/huV8qIh.png
// @namespace     http://userstyles.org
// @description	  wider articles, less spam on the sides
// @author        BskyB
// @version	2013.09.7
// @homepage      http://userstyles.org/styles/85326
// @require    http://usocheckup.dune.net/170159.js
// @downloadURL		https://userscripts.org/scripts/source/170159.user.js
// @updateURL		https://userscripts.org/scripts/source/170159.meta.js
// @include       http://topgear.com/*
// @include       https://topgear.com/*
// @include       http://*.topgear.com/*
// @include       https://*.topgear.com/*
// @grant       GM_getValue
// @grant       GM_log
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==
function vresize() {
	var items = document.evaluate("//img[contains(@src, '&Width=245&Height=145')]", document, null, 6, null),
		regex = /&Width=245&Height=145/;
	for(var i=0, item, s; (item=items.snapshotItem(i)); i++) {
		if(regex.test((s = item.src))) item.setAttribute("src", s.replace(regex, ""));
	}
}
vresize();
window.addEventListener("DOMNodeInserted", vresize, false);
function resize() {
	var items = document.evaluate("//img[contains(@src, '&Width=615&Height=347')]", document, null, 6, null),
		regex = /&Width=615&Height=347/;
	for(var i=0, item, s; (item=items.snapshotItem(i)); i++) {
		if(regex.test((s = item.src))) item.setAttribute("src", s.replace(regex, ""));
	}
}
resize();
window.addEventListener("DOMNodeInserted", resize, false);
function sresize() {
	var items = document.evaluate("//img[contains(@src, '&Width=350&Height=197')]", document, null, 6, null),
		regex = /&Width=350&Height=197/;
	for(var i=0, item, s; (item=items.snapshotItem(i)); i++) {
		if(regex.test((s = item.src))) item.setAttribute("src", s.replace(regex, ""));
	}
}
sresize();
window.addEventListener("DOMNodeInserted", sresize, false);
function tresize() {
	var items = document.evaluate("//img[contains(@src, '&Width=240&Height=140')]", document, null, 6, null),
		regex = /&Width=240&Height=140/;
	for(var i=0, item, s; (item=items.snapshotItem(i)); i++) {
		if(regex.test((s = item.src))) item.setAttribute("src", s.replace(regex, ""));
	}
}
tresize();
window.addEventListener("DOMNodeInserted", tresize, false);
function uresize() {
	var items = document.evaluate("//img[contains(@src, '&Width=140&Height=80')]", document, null, 6, null),
		regex = /&Width=140&Height=80/;
	for(var i=0, item, s; (item=items.snapshotItem(i)); i++) {
		if(regex.test((s = item.src))) item.setAttribute("src", s.replace(regex, ""));
	}
}
uresize();
window.addEventListener("DOMNodeInserted", uresize, false);
(function() {
var css = "#tgheader {\n    background: none !important;\n    }\n#article-body p, .article p, .summary-text p {\nfont-size: 14px !important;\n}\n.article, #page-content, #mainContent, #thumbnail-container, #pagination {\nwidth: 943px !important;\n}\n#page-content {\nmargin-left: 10px !important;\n}\n.copy, .series-content, .series-content ul li, .select-series {\nwidth: 913px !important;\n}\n.select-series ul {\nwidth: 713px !important;\n}\n.thumbnails {\nwidth: 100% !important;\nheight: 88px !important;\n}\n.pagination {\nwidth: 100% !important;\nheight: 23px !important;\n}\nimg.article-leader-img, #gallery, #MainImageCarousel, img.main-image {\nwidth: 100% !important;\nheight: 100% !important;\n}\n.gallery {\nwidth: 100% !important;\nheight: 660px !important;\n}\n#mainContent .gallery {\nwidth: 100% !important;\nheight: 100% !important;\npadding-top: 0px !important;\n}\n#mainContent .gallery .slideshow {\npadding-top: 0px !important;\n}\n.slideshow img {\nwidth: 100% !important;\nheight: 100% !important;\ntop: 0px !important;\n}\n.slideshow {\nwidth: 100% !important;\nheight: 532px !important;\n}\n#banner, #cars-for-sale-home, #twttrHubFrame, #twttrHubFrameSecure, #title, .post-comments, #social-like, #tgComments_loginPanel, #cplat-userComments, #wrc-promo, #mpu, #bannerInner, #at15s, .promo, #qb_feedback_frame, #cookie-policy-container, #sidebar, #share-it, #bbcw-footer, .site-info, #comments, #site-search, #site-title, #user-bar, #social-networks, .social-networks, #tray, .aside, #taboola-div, #related-content {\ndisplay: none !important;\n}\n#new-today .details {\nwidth: 28% !important;\nfloat: left !important;\npadding-left: 10px !important;\n}\n.post-details {\nwidth: 472px !important;\nfloat: right !important;\n}\n#video-player, #myExperience {\nwidth: 855px !important;\nheight: 480px !important;\nmargin-top: -10px !important;\n}\n.BrightcoveExperience, iframe {\nwidth: 935px !important;\nheight: 574px !important;\n}\n#new-today img {\nwidth: 70% !important;\nheight: 70% !important;\nfloat:left !important;\n}\n#additional .featured {\nfloat: left !important;\nwidth: 442px !important;\n}\n#additional .featured li .thumb img {\nfloat: left !important;\nwidth: 442px !important;\nheight: 100% !important;\ndisplay: block !important;\n}\n#additional .featured li .thumb {\nfloat: left !important;\nwidth: 442px !important;\ndisplay: block !important;\n}\n#additional .featured li {\nfloat: left !important;\nwidth: 442px !important;\n\ndisplay: block !important;\n}\n#additional .featured li .desc {\nfloat: left !important;\nwidth: 442px !important;\ndisplay: block !important;\n}\n#additional .featured li h4 {\nmargin-top: 115px !important;\nfloat: left !important;\nwidth: 442px !important;\ndisplay: block !important;\n}\n#additional .featured li dl, #additional .featured li .comments {\nfloat: left !important;\ndisplay: block !important;\n}\n#additional .recent .info {\nwidth: 490px  !important;\nfloat:right !important;\n}\n#additional .recent li {\nwidth: 500px  !important;\nfloat:left !important;\n}\n#additional .recent {\nwidth: 500px  !important;\nfloat:left !important;\n}\n#additional .recent li .image {\nfloat:left !important;\nwidth: 490px  !important;\n}\n#additional .recent li .image a img {\nwidth: 490px  !important;\nheight: 100% !important;\n}\n.post .post-image img, #latest-post .post-image img {\nwidth: 460px  !important;\nheight: 100% !important;\n}\n#additional p {\npadding-top: 10px !important;\n}\n#videos-head {\nbackground: rgb(255, 255, 255) !important;\nheight: 710px !important;\n}\n#video-description, #related-videos {\nfloat:left !important;\nposition: relative !important;\ntop: 494px !important;\n}\n#related-videos {\nheight: 145px !important;\n}\nimg.hero-img {\nwidth: 90% !important;\nheight: 90% !important;\n}\n#tabs {\n    background-color: rgb(255, 255, 255) !important;\n    width: 574px !important;\n    }";
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