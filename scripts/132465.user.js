// ==UserScript==
// @name         vBulletin - Signature Collapse
// @namespace    http://userscripts.org/people/5587
// @description  Allows display toggle of user's signature on vBulletin- and phpBB-forums.
// @source       http://userscripts.org/scripts/show/60027
// @identifier   http://userscripts.org/scripts/source/60027.user.js
// @include      */showthread.php*
// @include      */showpost.php*
// @include      */viewtopic.php*
// @version      1.0.5
// @date         2012-05-04
// @creator      Arne Dieckmann (aka "Mithrandir"), updated by trademark.designs
// ==/UserScript==


(function() {
	var nodes = document.evaluate(
		"//td/div/following::comment()[.=' sig ']|//div[@class='signaturecontainer']|//div[@class='signature']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	var thissign;

	for(var i=0; i<nodes.snapshotLength; i++) {
		// vBulletin 3.x
		if (nodes.snapshotItem(i).data == ' sig ') {
			thissign = nodes.snapshotItem(i).nextSibling.nextSibling;
			thissign.style.display = 'none';
			var anchor = document.createElement("a");
			anchor.appendChild(document.createTextNode("[+]"));
			anchor.style.cursor = 'pointer';
			anchor.title = 'Click to expand signature';
			anchor.addEventListener('click', genHandler(thissign), false);
			thissign.parentNode.insertBefore(anchor, thissign.previousSibling);
		// vBulletin 4.x (signaturecontainer) or phpBB v3 (signature)
		} else {
			if (nodes.snapshotItem(i).className == "signaturecontainer" || nodes.snapshotItem(i).className == "signature") {
				thissign = nodes.snapshotItem(i);
				thissign.style.display = 'none';
				var anchor = document.createElement("a");
				anchor.appendChild(document.createTextNode("[+]"));
				anchor.style.cursor = 'pointer';
				anchor.title = 'Click to expand signature';
				anchor.addEventListener('click', genHandler(thissign), false);
				thissign.parentNode.insertBefore(anchor, thissign);
			}
		}
	}
})();


function genHandler(signode) {
	return (function(event) {
			if(signode.style.display == 'none') {
			  signode.style.display = 'block';
			  this.firstChild.innerHTML = "[-]";
			  this.title = 'Click to collapse signature';
			 }
			else {
			  signode.style.display = 'none';
			  this.firstChild.innerHTML = "[+]";
			  this.title = 'Click to expand signature';
		}
	});
}