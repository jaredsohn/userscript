// ==UserScript==
// @name          Drama-Addict Cleanner
// @namespace  http://diveintogreasemonkey.org/download
// @description   Remove Drama-Addict's banners
// @version        1.0.20091214.00
// @author         @ds2kGTS
// @include        http://drama-addict.com/*
// @exclude        http://drama-addict.com/webboard/*
// ==/UserScript==

/************************************************
* Resize content block to 100% width
************************************************/
(function() {
var css = ".content {\n    width: 100% !important;\n  }\n  .sidebar1, .Header, .Header-png, .Header-jpeg {\n    height: 0px !important; min-height: 0px !important; \n  }";
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

/************************************************
* Remove Ads at footer part
************************************************/
var footerAds = document.getElementsByTagName("Table");
footerAds[0].innerHTML = " ";


/************************************************
* Remove sidebar
************************************************/
var docDivElements = document.getElementsByTagName("div");

for (var iEle in docDivElements){
	if (docDivElements[iEle].className.toString() == "sidebar1"){
		docDivElements[iEle].innerHTML = " ";
	}
}