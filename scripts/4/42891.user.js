// ==UserScript==
// @name           Experts Exchange
// @namespace      http://ttam.org/code/show/ee
// @description    Cleans up EE pages
// @include        http://*.experts-exchange.com/*
// ==/UserScript==


(function() {
	
var ss=document.createElement("style");
ss.type = "text/css";
ss.innerHTML = ".sectionFour, a.startFreeTrial, .blurredAnswer, .relatedSolutionsContainer{display:none !important;}";
document.getElementsByTagName("head")[0].appendChild(ss);
	
})();