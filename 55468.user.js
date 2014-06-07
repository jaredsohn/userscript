// ==UserScript==
// @name           gocomic enabler
// @namespace      dfeng
// @include        http://www.gocomics.com/*
// ==/UserScript==

(function() {
  
  css = ".lightbox { display:none !important;}"
  
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