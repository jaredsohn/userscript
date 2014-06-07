// ==UserScript==
// @name          Bare Twitter 
// @namespace     http://userstyles.org
// @description	  This style hide Twitter header, footer and user background, leaving only content, meta-data and actions (and right hand column). Also force links to open in same window/tab (target self).
// @author        Sylvain Carle - derived from Jmtucu Twitter 90%
//
// @homepage      http://afroginthevalley.com/
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @include       http://*.twitter.com/*
// @include       https://*.twitter.com/*
// @include       http://twitter.com*
// @include       http://twitter.com/home
// ==/UserScript==

(function() {

var css = "body {\nbackground:none; !important ;}\n#footer {display:none;}\n#accessibility {display:none;}\n#header {display:none;}";
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

// this part is also available seperatly as "Target Always Self"
// http://userscripts.org/scripts/show/59248

var hrefs = document.getElementsByTagName('a');
for (i=0; i<hrefs.length; i++)
{
  hrefs[i].target = '_self';
}

})();
