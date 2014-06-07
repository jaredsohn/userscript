// ==UserScript==
// @name           Hidezilla
// @namespace      http://songbirdnest.com
// @description    Hide bird-specific stuff in Songbird's bugzilla (for Nesties)
// @include        http://bugzilla.songbirdnest.com/show_bug.cgi?*
// @include        http://bugzilla.songbirdnest.com/process_bug.cgi*
// ==/UserScript==

(function() {

	// this script hides any elements selected by the following
	// XPath expressions:
	var selectors = [
		"//select[@id='rep_platform']/ancestor::tr[1]",
		"//select[@id='op_sys']/ancestor::tr[1]",
		"//select[@id='bug_severity']/ancestor::tr[1]",
		"//input[@id='alias']/ancestor::tr[1]",
		"//input[@id='status_whiteboard']/ancestor::tr[1]",
		"//label[@for='work_time']/ancestor::table[1]",
		"//legend[text()='Flags']/ancestor::fieldset[1]"
	];

	for (var i = 0; i < selectors.length; i++) {
		var nodes = document.evaluate(
			selectors[i], 
			document, 
			null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		GM_log("selector '" + selectors[i] + "' returned " + nodes.snapshotLength + " node(s)");
		for (var j = 0; j < nodes.snapshotLength; j++) {
		  var node = nodes.snapshotItem(j);
		  node.style.display = 'none';
		}
	}

})();
