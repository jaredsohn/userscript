// ==UserScript==
// @name           xKiv-metro-gangsalvage
// @namespace      xKiv
// @include        http://www.metroplexity.com/inventory.php?switch=gangstash
// @include        http://www.metroplexity.com/inventory.php?switch=salvage
// ==/UserScript==

var cells = document.evaluate(".//form/table/tbody/tr/td",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var cc = cells.snapshotLength;

var keepInputs = document.getElementsByName("keep");
var keepInput = keepInputs[0];

var itRE = /^.*\(([0-9]*)\)$/;

function blurFun() {
	var j;
	var needsToKeep = + keepInput.value;
	for (j = 0; j < cc; j++) {
		var z = cells.snapshotItem(j);
		var y = z.innerHTML;
		var res = itRE.exec(y);
		if (res == null)
			continue;
		var hasOfItem = +res[1];
		if (needsToKeep >= hasOfItem) {
			z.style.display='none';
		} else {
			z.style.display='table-cell';
		}
	}
}


keepInput.addEventListener('blur', function() { blurFun(); } , false);

