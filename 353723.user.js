// ==UserScript==
// @name        Better Youtube
// @namespace   http://userscripts.org/users/570937
// @description Removes crap from youtube
// @include     *.youtube.com/*
// @version     1.6
// @grant       none
// ==/UserScript==

function contentEval(source) {
  if ('function' == typeof source) {
    source = '(' + source + ')();'
  }

  script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  document.body.appendChild(script);
  document.body.removeChild(script);
}

contentEval(run());

function run() {

loc = window.location.href;

if ((loc == "https://www.youtube.com/feed/subscriptions") || (loc == "https://www.youtube.com/feed/subscriptions#new") || (loc.indexOf("/user/") != -1) || (loc.indexOf("/channel/") != -1)) {
	sidebars = getElementsByClassName(document, "branded-page-v2-secondary-col");
	sidebarn = sidebars.length;
	for (i = 0; i < sidebarn; i++) {
		sidebar = sidebars[i];
		sidebar.parentNode.removeChild(sidebar);
	}
    centers = getElementsByClassName(document, "     yt-card    clearfix");
	centern = centers.length;
	for (i = 0; i < centern; i++) {
		center = centers[i];
		center.style.margin = "0px, 10px";
        center.style.width = "95%";
	}
} else if (loc.indexOf("watch?v") != -1) {
	desc = document.getElementById("watch7-content");
	desc.style.width = "900px";
	descWrapper = document.getElementById("content");
	descWrapper.style.minWidth = "900px";
	descWrapper.style.width = "900px";
	descWrapper.style.marginLeft = "155px";
	player = document.getElementById("player-api");
	player.style.width = "900px";
	player.style.height = "549px";
	player.style.marginLeft = "155px";
	playah = document.getElementById("player");
	playah.style.marginLeft = "0";
	related = document.getElementById("watch7-sidebar");
	related.parentNode.removeChild(related);
}

function getElementsByClassName(node,classname) {
	if (node.getElementsByClassName) {
		return node.getElementsByClassName(classname);
	} else {
		return (function getElementsByClass(searchClass,node) {
			if ( node == null )
			node = document;
			classElements = [],
			els = node.getElementsByTagName("*"),
			elsLen = els.length,
			pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;
			for (i = 0, j = 0; i < elsLen; i++) {
				if ( pattern.test(els[i].className) ) {
					classElements[j] = els[i];
					j++;
				}
			}
			return classElements;
		})(classname, node);
	}
}
}