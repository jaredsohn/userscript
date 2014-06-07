// ==UserScript==
// @name          Facebook masking
// @version       0.2
// @description   To modify facebook layout to make it looks not like a facebook page
// @author 	      arithmandar
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==


(function() {
// CSS Style modification:
// 		- change the header blueBar's background to white, so that it is not that obvious
//		- trying to make the headerTinymanName more obvious
var css = "@namespace url(http://www.w3.org/1999/xhtml); #blueBar{background-color:#ffffff;min-width:981px;z-index:300; #headerTinymanName{color:black;font-weight:bold;line-height:29px}; }";

if (typeof FB_addStyle != "undefined") {
	FB_addStyle(css);
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

// Remove FB logo as it is too obvious
var pageLogo = document.getElementById('pageLogo');
if (pageLogo) {
	pageLogo.parentNode.removeChild(pageLogo);
}


})();