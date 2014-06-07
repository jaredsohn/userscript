// ==UserScript==
// @name          Google Ponies
// @namespace     http://userstyles.org
// @description	  Version 1.71
// @author        netMASA
// @homepage      http://userstyles.org/styles/50088
// @include       http://www.google.com/*
// @include       https://www.google.com/*
// @include       http://*.www.google.com/*
// @include       https://*.www.google.com/*
// @include       http://google.com/*
// @include       https://google.com/*
// @include       http://*.google.com/*
// @include       https://*.google.com/*
// @include       http://google.co.uk/*
// @include       https://google.co.uk/*
// @include       http://*.google.co.uk/*
// @include       https://*.google.co.uk/*
// @include       http://google.ca/*
// @include       https://google.ca/*
// @include       http://*.google.ca/*
// @include       https://*.google.ca/*
// @include       http://google.de/*
// @include       https://google.de/*
// @include       http://*.google.de/*
// @include       https://*.google.de/*
// @include       http://google.es/*
// @include       https://google.es/*
// @include       http://*.google.es/*
// @include       https://*.google.es/*
// @include       http://google.com.au/*
// @include       https://google.com.au/*
// @include       http://*.google.com.au/*
// @include       https://*.google.com.au/*
// @include       http://google.fr/*
// @include       https://google.fr/*
// @include       http://*.google.fr/*
// @include       https://*.google.fr/*
// @include       http://google.it/*
// @include       https://google.it/*
// @include       http://*.google.it/*
// @include       https://*.google.it/*
// @include       http://google.co.jp/*
// @include       https://google.co.jp/*
// @include       http://*.google.co.jp/*
// @include       https://*.google.co.jp/*
// @include       http://google.ru/*
// @include       https://google.ru/*
// @include       http://*.google.ru/*
// @include       https://*.google.ru/*
// @include       http://google.ar/*
// @include       https://google.ar/*
// @include       http://*.google.ar/*
// @include       https://*.google.ar/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#hplogo, #gbqlw img\n  { 	\n    height: 0 !important;\n    width: 0 !important;\n    display: none !important;\n  }\n\n  \n  #gbqlw.gbes\n  {\n    padding-top: 20px !important;\n  }\n\n  #gbqlw\n  {\n    width: 113px !important;\n    height: 50px !important;\n    font-size: 0 !important;\n    margin-left: 25px !important;\n    margin-top: -5px !important;\n    padding-right: 65px !important;\n    padding-top: 25px !important;\n    background: url(http://i.imgur.com/0KZr1.png) no-repeat left top !important;\n  }\n\n  #gbqfw\n  {\n     margin-left: 50px !important;\n  }\n\n  .gbqfh #gbql, #gbql\n  {\n     display: none !important;\n  }\n\n  #body[class=\"ctr-p\"]\n  { \n    background: url(http://i.imgur.com/s1oE0.png) no-repeat center top !important;\n    background-size: contain !important;\n  }";
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
