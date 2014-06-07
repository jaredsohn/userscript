// ==UserScript==
// @name           GayRomeo & The Right to Rightclick ;-)
// @namespace      http://gr-tools.justlep.net/
// @description    Re-enables the rightclick on user pictures in gallery + single view

// @_include       /https?://(www\.(gay|planet)romeo.com|83\.98\.143\.20)/.*/pix/popup\.php.*/
// @include       *://*.gayromeo.com/*/pix/popup.php*
// @include       *://*.planetromeo.com/*/pix/popup.php*
// @include       *://83.98.143.20/*/pix/popup.php*

// @_include       /https?://(www\.(gay|planet)romeo.com|83\.98\.143\.20)/.*mainpage\.php\?set=.*/
// @include       *://*.gayromeo.com/*mainpage.php?set=*
// @include       *://*.planetromeo.com/*mainpage.php?set=*
// @include       *://83.98.143.20m/*mainpage.php?set=*

// @_include       /https?://(www\.(gay|planet)romeo.com|83\.98\.143\.20)/.*auswertung/album/.*/
// @include       *://*.gayromeo.com/*auswertung/album/*
// @include       *://*.planetromeo.com/*auswertung/album/*
// @include       *://83.98.143.20/*auswertung/album/*

// @version $Revision: 1.3.1 $
// @author LeP <gr-tools@justlep.net>
// ==/UserScript==
/**
 * If you like this script, you may want to check the GR-Tools as well ;-)
 * http://userscripts.org/scripts/show/33184
 */
(function() {
	var w = top.wrappedJSObject || top,
		fs = w.frames,
		ds = [w.document];
	
	if (fs.length) {
		for (var i=fs.length-1; i>=0; i--) {
			var d = fs[i].document,
				img = d.getElementById('picture');
			ds.push(d);
			if (img) ds.push(img);
		}
	}
	for (var i=ds.length-1; i>=0; i--) {
		var o = ds[i];
		o.onmousedown = null;
		o.ondragstart = null;
		o.oncontextmenu = null;
	}
})();