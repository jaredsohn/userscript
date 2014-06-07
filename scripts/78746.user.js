// ==UserScript==
// @name           Pokec.sk - Ads Remover
// @namespace      Pokec.sk, nove, sklo, azet, skin, template, stare, dizajn, redizajn, styl, reklama
// @require        http://sizzlemctwizzle.com/updater.php?id=78746
// @include        http://www-pokec.azet.sk/2/*
// @include        http://www-pokec.azet.sk/miestnost/*
// @include        http://pokec.azet.sk/*
// @include        http://rpx.azet.sk/index.phtml?i9=*
// @include        http://rpx.azet.sk/?i9=*
// @include        http://pokec.azet.sk/sluzby/rp/*
// @date           2010-06-12
// @author         MerlinSVK
// @version        1.3
// ==/UserScript==


(function() {
var css = 	"#frameBnr,#topBanner .topBanner iframe {visibility:hidden !important;}"+
		"#radio_expres {visibility:hidden !important;}"+
		".css_reklama160x600 .css_reklamavpravo, #c_fotoalbumy_uvod .css_reklama300x300 .css_reklamavpravo,.css_reklama300x300 .css_reklamaomne, .css_reklamavlavo300, .c_brandbb { visibility:hidden !important;}"+
		".c_reklama .c_objekt,#advert {display:none !important;}";

var url = document.URL;
    if (url.search(/^http:\/\/www-pokec.azet.sk\//) != -1) closeTopBanner();
	
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