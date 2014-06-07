// ==UserScript==
// @name           Flickr groups larger image previews
// @namespace      http://not.existant
// @description    Flickr groups show medium size image previews.
// @version        0.2.2
// @include       http://flickr.com/groups/*/pool/*
// @include       https://flickr.com/groups/*/pool/*
// @include       http://*.flickr.com/groups/*/pool/*
// @include       https://*.flickr.com/groups/*/pool/*
// ==/UserScript==

(function() {
var css = ".HoldPhotos {padding-left: 0 !important;}\n.PoolList {width: 265px !important; height: 250px !important; margin-right: 0 !important;}\n.PoolList .pc_img {display: none !important; width: auto !important; height: auto !important;}\n.PoolList .pc_img[src$=\"_m.jpg\"] {display: inline !important;}";
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
		if (window.opera) {
			css += "html .PoolList {height: 255px !important;}";
		}
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node);		 
	}
}
})();

var allThumbs = document.getElementsByTagName('img');

for(var i=0; i < allThumbs.length; i++) {
        allThumbs[i].src = allThumbs[i].src.replace('_t.jpg','_m.jpg');
}
