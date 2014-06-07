// ==UserScript==
// @name           OGame Redesign: Fix coordinates links
// @namespace      userscripts.org
// @description    Fix coordinates links so that they can be opened in a new tab
// @version		   1.2
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function() {
	var unsafe = window;
	try {unsafe = unsafeWindow} catch (e) {}

	if ( !unsafe.$ && document.location.href.indexOf('game/index.php?page=showmessage') == -1 ) return;

	function RewriteGalaxyUrls()
	{
		try {
			var session = unsafe.session || document.location.href.match(/session=([a-z0-9]+)/i)[1];
			var base = document.location.href.split('?')[0];
			if (!session || !base) return;

			var urls = document.evaluate(
				'//A[contains(@href,"javascript:showGalaxy")]',
				document,
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null)

			for (var i=0; i<urls.snapshotLength; i++) {
				var url = urls.snapshotItem(i);

				coords = url.href.match(/showGalaxy\((\d{1,2}),\s*(\d{1,3}),\s*(\d{1,2})\)/i);
				if (!coords) continue;

				url.href = base + '?page=galaxy&galaxy='+coords[1]+'&system='+coords[2]+'&position='+coords[3]+'&session='+session;
			}
		}
		catch (e) { GM_log(e) }
	}
	
	try {
		if ( document.location.href.indexOf('game/index.php?page=message') > -1 ) {
			document.getElementById('section2').addEventListener(
				'DOMNodeInserted',
				function (e) {
					if (e && e.target.tagName == 'FORM')
					RewriteGalaxyUrls();
				},
				false);
		}
		else if ( document.location.href.indexOf('game/index.php?page=search') > -1 ) {
			document.getElementById('ajaxContent').addEventListener(
				'DOMNodeInserted',
				function (e) {
					if (e && e.target.className == 'searchresults')
					RewriteGalaxyUrls();
				},
				false);
		}
		else
			RewriteGalaxyUrls();
	}
	catch (e) {}

}) ()