// ==UserScript==
// @name Defeat the Daily Heil
// @namespace http://www.a-i-media.co.uk/dailyheilsucks
// @description On any Facebook page rewrites a Daily Fail link as a Google search, so you can hopefully find the same article and avoid giving any traffic to the Daily Mail scum
// @include http://www.facebook.com/*
// @include https://www.facebook.com/*
// @version 1.0.4
// ==/UserScript==

function stripit(links) {
	for (var i=0; i<links.length; i++) {
		var link=links[i];
		if (link.href.indexOf("/DailyMail")>-1) {
			link.href="http://www.shouldireadthedailymail.com/";
			link.removeAttribute("onclick");
			link.removeAttribute("data-hovercard");
		}
		if ((link.href.indexOf("dailymail.co.uk")>-1)) {
			link.removeAttribute("onclick");
			link.removeAttribute("onmouseover");
			if (link.text=="link") link.href="http://www.shouldireadthedailymail.com/"; else {
				if (link.text=="") link.href="http://www.shouldireadthedailymail.com/"; else {
					var headlineFinish = link.text.indexOf("dailymail");
					if (link.text.indexOf("www.")>-1) headlineFinish = link.text.indexOf("www.");
					var headline = link.text.substr(0,headlineFinish);
					var query = headline.replace(/\W+/g,"%20");
					link.href = "http://www.google.com/#q="+query+"%20-dailymail.co.uk";
				}
			}
		}
	}
}

stripit(document.links);
document.addEventListener('DOMNodeInserted',
function(e) {
    var src=e.target;
    if (src.nodeType==1) stripit(src.getElementsByTagName("a"));
    return true;
},
false);