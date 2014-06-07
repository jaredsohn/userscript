// ==UserScript==
// @name          Akustik Mail
// @include       http://www.jappy.de/user/--KaTasTroqhaL
// ==/UserScript==


var SOUND_SRC = "http://metallica.gaddy.de/emailp.wav"; 
var VOLUME = "100";
function xpath(query) {
	return document.evaluate(query, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
var imgs = xpath("//IMG");
for (var i = 0; i < imgs.snapshotLength-1; i++) {
	var img = imgs.snapshotItem(i);
	if (document.body.textContent.indexOf("ungelesene") != -1) {
		body = document.getElementsByTagName("body")[0];	
		var emb = document.createElement("embed");
		emb.src = SOUND_SRC;
		emb.setAttribute("autostart", "true");
		emb.setAttribute("loop", "false");
		emb.setAttribute("hidden", "true");
		emb.setAttribute("volume", VOLUME);
		body.appendChild(emb);
		return;
	}
}