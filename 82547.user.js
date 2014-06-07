// ==UserScript==
// @name           google search redirection remover 
// @namespace      http://www.enjoyfreeware.org/
// @description    remove redirection from google search result
// @include        *://www.google.com/
// @include        *://www.google.com/webhp*
// @include        *://www.google.com/*&q=*
// @include        *://www.google.com/*?q=*
// @include        *://www.google.com.hk/*&q=*
// @include        *://www.google.com.hk/*?q=*
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

// ==About==
// author: cyberscorpio
// Email: cyberscorpio@gmail.com
// site: http://www.enjoyfreeware.org/
//

function clean(container) {
	var as = container.getElementsByTagName('a');
	for (var i = 0, l = as.length; i < l; ++ i) {
		var a = as[i];
		if (a.hasAttribute('onmousedown')) {
			a.removeAttribute('onmousedown');
		}
	};
}

var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(m) {
		if (m.type === 'childList' && m.addedNodes !== null) {
			for (var i = 0; i < m.addedNodes.length; ++ i) {
				var n = m.addedNodes[i];
				if (n.id && n.id === 'ires') {
					clean(n);
				} else if (n.tagName == 'A') {
					if (n.hasAttribute('onmousedown')) {
						n.removeAttribute('onmousedown');
					}
				}
			}
		}
	});
});
window.addEventListener('DOMContentLoaded', function() {
	window.removeEventListener('DOMContentLoaded', arguments.callee, false);
	observer.observe(document.body, {childList: true, subtree: true});

	var ires = document.getElementById('ires');
	if (ires) {
		clean(ires);
	}
}, false);

window.addEventListener('unload', function() {
	window.removeEventListener('unload', arguments.callee, false);
	observer.disconnect();
}, false);
