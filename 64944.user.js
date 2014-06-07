// ==UserScript==
// @name         PokeCommunity Signature Collapse
// @namespace    Branden Guess
// @description  Allows display toggle of user's signature on PokeCommunity.
// @source       http://userscripts.org/scripts/show/60027
// @identifier   http://userscripts.org/scripts/source/60027.user.js
// @include      */showthread.php*
// @include      */showpost.php*
// @version      1.0.1
// @date         2009-10-19
// @creator      Branden Guess
// ==/UserScript==


(function() {
	var nodes = document.evaluate(
		"//td/div/following::comment()[2]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	var thissign;

	for(var i=0; i<nodes.snapshotLength; i++) {
		if (nodes.snapshotItem(i).data==' sig ') {
			thissign = nodes.snapshotItem(i).nextSibling.nextSibling;
			thissign.style.display = 'none';
			var anchor = document.createElement("a");
			anchor.appendChild(document.createTextNode("[+]"));
			anchor.style.cursor = 'pointer';
			anchor.title = 'Click to expand signature';
			anchor.addEventListener('click', genHandler(thissign), false);
			thissign.parentNode.insertBefore(anchor, thissign.previousSibling);
		}
	}
})();


function genHandler(signode) {
	return (function(event) {
			if(signode.style.display == 'none') {
			  signode.removeAttribute('style');
			  this.firstChild.nodeValue=("[-]");
			  this.title = 'Click to collapse signature';
			 }
			else {
			  signode.style.display = 'none';
			  this.firstChild.nodeValue=("[+]");
			  this.title = 'Click to expand signature';
		}
	});
}
