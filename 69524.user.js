// ==UserScript==
// @name	Buzz Comments Hider
// @version	0.48
// @description Hides comments in Buzz.
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @include        http://*.mail.google.com/*
// @include        https://*.mail.google.com/*
// @contributor 2009+, ElasticThreads (http://elasticthreads.tumblr.com/)
// ==/UserScript==

var hal = (function(){	
	var css=".H2{display:none !important;}";
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
})();
window.setTimeout(hal, 4000);
