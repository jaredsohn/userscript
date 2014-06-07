// ==UserScript==
// @name          Tomshardware Wide
// @icon        http://i.imgur.com/8ObELTp.png
// @namespace     http://userstyles.org
// @description	  wider articles, less spam
// @author        BskyB
// @version	2013.11.29
// @homepage      http://userstyles.org/styles/85496
// @require    http://usocheckup.dune.net/170158.js
// @downloadURL		https://userscripts.org/scripts/source/170158.user.js
// @updateURL		https://userscripts.org/scripts/source/170158.meta.js
// @include       http://tomshardware.de/*
// @include       https://tomshardware.de/*
// @include       http://*.tomshardware.de/*
// @include       https://*.tomshardware.de/*
// @include       http://tomshardware.com/*
// @include       https://tomshardware.com/*
// @include       http://*.tomshardware.com/*
// @include       https://*.tomshardware.com/*
// @include       http://tomshardware.co.uk/*
// @include       https://tomshardware.co.uk/*
// @include       http://*.tomshardware.co.uk/*
// @include       https://*.tomshardware.co.uk/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".reviews .nav1 .item h2 a {\nwidth: 100% !important;\ndisplay: block !important;\nheight: 24px !important;\npadding: 5px 0px 0px 0px !important;\n}\n.tha .vglnk, .tha .vglnk:visited, .THA .vglnk, .THA .vglnk:visited {\n    color: rgb(51, 51, 51) !important;\n    text-decoration: none !important;\n}\n.tha .vglnk > span, .tha .vglnk:visited > span, .THA .vglnk > span, .THA .vglnk:visited > span {\n    border-bottom: none !important;\n    padding: 0px !important;\n}\n.reviews .nav1 .item {\n    padding: 0px 0px 0px 10px !important;\n    height: 29px !important;\n}\n.reviews .nav1 .item h2 {\n    display: inline-block !important;\n    width: 94% !important;\n    height: 100% !important;\n    padding: 0px !important;\n}\n#intelliTXT {\nfont-size: 14px !important;\n}\n.bomLz, .zonepub, .bomAd.nolinks, .line.dualPromo, .headerLogoContainer, .line.singlePromo, .subSection.listElm, .subSection.superCat, .rightCol, .basicRight, #formNewsLetters-block, .featuredOutbrainTH, .mod.outbrain, .mod.related {\ndisplay: none !important;\n}\n#internalMain, .leftCol {\nwidth: 970px !important;\n}\n.headBorderStr {\nwidth: 97% !important;\n}\n.headerContent.line {\n margin-top:-63px !important;\n   z-index: 1 !important;\n   box-shadow:0px 1px 10px rgba(100,100,100,0.3) !important;\n-webkit-transform: translateZ(0) !important;\n-webkit-transition:padding-top 0.2s !important;\n-moz-transform: translateZ(0) !important;\n-moz-transition:padding-top 0.2s !important;\nposition: absolute !important;\nleft: 550px !important;\n}\n.headerContent.line:hover, .headerContent.line:hover .hdBox {\npadding-top: 43px !important;\n}\n.result-list {\nmax-width: 1200px !important;\n}\n#userAccountPanel {\nposition: relative !important;\nleft: 50px !important;\nmargin-left: 190px !important;\n}\n#modUsrNotifications {\nposition: fixed !important;\n-webkit-transform: translateZ(0) !important;\n-webkit-transition:padding-top 0.2s !important;\n-moz-transform: translateZ(0) !important;\n-moz-transition:padding-top 0.2s !important;\n   box-shadow:0px 1px 10px rgba(100,100,100,0.3) !important;\n top: -15px !important; \n   z-index: 2 !important;\n}\n#modUsrNotifications:hover {\npadding-top: 45px !important;\n}\n.size2of5 {\nwidth: 60% !important;\n}";
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