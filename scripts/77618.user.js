// ==UserScript==
// @name           Skreemr Link Fix
// @namespace      http://userscripts.org/users/67379
// @description    Adds MP3 links to skreemr.org search results
// @include        http://skreemr.org/results.jsp*
// @include        http://skreemr.org/link.jsp*
// ==/UserScript==

function OnBody() {
//	try {
	// onload doesn't work, and sometimes this is null.
	if (!document.body) {
//		GM_log('client document.body null, trying again in a short while.');
		setTimeout(OnBody, 200);
		return;
	}
	
	var flashvars = document.evaluate(
		"//object[@data='audio/player.swf']/param[@name='FlashVars']",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var foundats = document.evaluate(
		"//div[contains(.,'Found at:')]",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < flashvars.snapshotLength; i++) {
		var fvar = flashvars.snapshotItem(i).value,
			newelm = document.createElement('a'),
			oldelm = foundats.snapshotItem(i);
		newelm.href = decodeURIComponent(fvar.split('soundFile=')[1]);
		newelm.innerHTML = 'Link to MP3';
		oldelm.parentNode.replaceChild(newelm, oldelm);
	}
	
//	} catch (e) { alert(e); }
}
OnBody();
