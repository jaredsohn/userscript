// ==UserScript==
// @name           Disable YouTube Playlists
// @description    Disables playlists (and by extension auto-advance)
// @version		   0.8
// @include        http://youtube.com/watch?*
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch#*
// @include        http://*.youtube.com/watch#*
// ==/UserScript==

(function() {
	if (/[\?&]list=/i.test(document.location.href) && /[\?&]v=/i.test(document.location.href))  {
		var w = document.location.href.indexOf('watch');
		var q = document.location.href.substring(w + 6);
		var v = q.indexOf('v=');
		var s = q.substring(v);
		var e = s.indexOf('&') > 0 ? s.indexOf('&') : s.length;
		var r = s.substring(0, e);
		document.location.replace(document.location.href.replace(q, r));
		
		// For v2, detect and replace links instead of changing page
	}
})();