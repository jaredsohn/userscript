// ==UserScript==
// @name          Facebook: Make external links direct
// @namespace     http://userscripts.org/scripts/show/72901
// @description   Bypass Facebook's tracking for external links. (Updates for new content while scrolling.)
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// @author        Fredrik Bränström
// @version       1.0
// ==/UserScript==

(function(){

var cleanLinks = function(e){
        if (e) { // On DOM insertions, event is specified
          // Only act when new items roll in
          if (e.target.id && e.target.id != "mainContainer") return;
        }

	var links = document.getElementsByTagName('a');
	for(var i=links.length; i--;) {
		var a = links[i];
		if(a.href.substring(0, 32) == 'http://www.facebook.com/l.php?u=') {
			a.href = unescape(unescape(a.href.substring(32).split('&')[0]));
		}
                var external = a.href && (a.href != "#") && (a.href.substring(0, 24) != 'http://www.facebook.com/') && !a.accesskey;

                if (external) {
                  if(a.getAttribute('onmousedown')) {
                    a.removeAttribute('onmousedown');
                  }
                  if(a.getAttribute('onclick')) {
                    a.removeAttribute('onclick');
                  }
                  if(a.getAttribute('target')) {
                    a.removeAttribute('target');
                  }
                }
	}
};

cleanLinks();

// Fix anything added later
document.addEventListener("DOMNodeInserted", cleanLinks, false);

})();
