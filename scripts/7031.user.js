// ==UserScript==
// @name           Access wickedweasel.com full size images easier
// @description    Access images of beautiful sexy women on wickedweasel.com directly, instead of in a popup window that closes when you click inside it.
// @include        http://galleries.wickedweasel.com/models/*/*
// @include        http://galleries.wickedweasel.com/contributors/*/*
// ==/UserScript==

(function() {
	var links = get("//td/a/img");
	var c, i;

	for(i=0; i<links.snapshotLength; i++){
		c = links.snapshotItem(i);
		if( c.src.indexOf("thumbs") > -1) {
			c.href = c.src.replace("thumbs/", "");
			c.parentNode.href = c.href;
			c.parentNode.removeAttribute("onclick");
		}
	}

	// xpath function
	function get(query) {
		return document.evaluate(
			query,
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null
		);
	}

})();

