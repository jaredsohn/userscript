// ==UserScript==
// @name           Repubblica.it Refresh Stopper and Toolbar Remover
// @namespace      http://www.martufone.info/gm
// @description    It stops repubblica.it page refresh and remove social toolbar. To be used with Meta Refresh Blocker and Javascript Settimeout Refresh Blocker (20120729)
// @include        http*repubblica.it*
// ==/UserScript==

(function(){
	if (/repubblica.it/.test(window.location.href)) {
		if (unsafeWindow && unsafeWindow.$ && unsafeWindow.$.fn && unsafeWindow.$.fn.ready) {
			unsafeWindow.$.fn.ready = function() {} // remove social toolbar
		}
		if (unsafeWindow && unsafeWindow.Refresh) {
			unsafeWindow.Refresh.prototype.run = function() {} // disable page refresh
		}
		if (unsafeWindow) { // remove social toolbar
			unsafeWindow.RenderSocial = {
				__noSuchMethod__ : function(id, args) {}
			}
		}
	}
})();