// ==UserScript==
// @name           GayRomeo & The Right to Rightclick ;-)
// @namespace      http://gr-tools.justlep.net/
// @description    Re-enables the rightclick on user pictures in gallery + single view
// @include        http*://www.gayromeo.com/*/pix/popup.php*
// @include        http*://www.gayromeo.com*mainpage.php?set=*
// @include        http*://www.gayromeo.com*auswertung/album/*
// @include        http*://www.planetromeo.com/*/pix/popup.php*
// @include        http*://www.planetromeo.com*mainpage.php?set=*
// @include        http*://www.planetromeo.com*auswertung/album/*
// @include        http*://83.98.143.20/*/pix/popup.php*
// @include        http*://83.98.143.20/*mainpage.php?set=*
// @include        http*://83.98.143.20/*auswertung/album/*
// @version $Revision: 1.3 $
// @author LeP <gr-tools@justlep.net>
// ==/UserScript==

/**
 * If you like this script, you may want to check the GR-Tools as well ;-)
 * http://userscripts.org/scripts/show/33184
 */

(function() {
	var w = top.wrappedJSObject,
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
