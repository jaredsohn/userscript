// ==UserScript==
// @name          DeviantART > remove the sub begger.
// @namespace     http://userstyles.org
// @description	  this is a simple little script that removes the subscription link that was added to dA. It' was created with the help of realillusions (http://realillusions.deviantart.com).
// @author        miksago
// @homepage      http://userstyles.org/style/show/1584
// @include       http://*.deviantart.com/*
// @include       https://*.deviantart.com/*
// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Remove the subscription link and one of the |'s */ #rockdock a[href=\"http://my.deviantart.com/services/#subscription\"] {width:0px!important; font-size:0px!important; margin-left:-10px!important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
	}
}
