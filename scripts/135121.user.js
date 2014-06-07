// ==UserScript==
// @name	Tumblr Disable Autoplay
// @namespace	http://makaze-kanra.tumblr.com/
// @version	1.0.1
// @description	Replaces any autoplaying Billy players with non-autoplaying ones.
// @match	*://*.tumblr.com/*
// ==/UserScript==

var autoPlay,
i = 0;

if (document.getElementsByTagName('embed')[0] != null) {
	for (i = 0; i < document.getElementsByTagName('embed').length; i++) {
		autoPlay = document.getElementsByTagName('embed')[i];
		if (autoPlay.src.match(/autoplay=true/gi)) {
			autoPlay.src = autoPlay.src.replace(/autoplay=true/gi, 'autoplay=false');
			autoPlay.style.display = 'none';
			autoPlay.style.display = 'block';
		}
	}
}