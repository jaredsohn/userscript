// ==UserScript==
// @name           xKiv-metro-itemfilter
// @namespace      xKiv
// @include        http://www.metroplexity.com/inventory.php*
// ==/UserScript==

var cells = document.evaluate(".//form/table/tbody/tr/td[@width='30%']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var cc = cells.snapshotLength;
if (cc ==0) {
	// try 3-column layout
	cells = document.evaluate(".//form/table/tbody/tr/td[@width='20%']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	cc = cells.snapshotLength;
}
if (cc >0 ) {
	var ftbls = document.evaluate(".//form/table",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); 
	var ftbl = ftbls.snapshotItem(0);

	var newPane = document.createElement('div');
	newPane.id = 'xKiv-clicker';
	var strHTML = '<center>Item filter: <input type="text" name="xkiv-itemfilter" id="xkiv-itemfilter"></input>&nbsp;<button onclick="return false;" id="xkiv-filterclearbutton" >Clear</button></center>';
	newPane.innerHTML = strHTML;

	ftbl.parentNode.insertBefore(newPane,ftbl);
	var ifEl = document.getElementById('xkiv-itemfilter');
	var ifClearEl = document.getElementById('xkiv-filterclearbutton');

(function() {
	var currentval=ifEl.value.toLowerCase();
	function blurFun() {
		var j;
		var needsToKeep = ifEl.value.toLowerCase();
		if (currentval == needsToKeep) {
			// don't bother
			return;
		}
		currentval = needsToKeep;
		for (j = 0; j < cc; j++) {
			var z = cells.snapshotItem(j);
			var y = z.innerHTML.toLowerCase();
			if (y.indexOf(needsToKeep)>-1) {
				z.style.display='table-cell';
				z.nextSibling.style.display='table-cell';
			} else {
				z.style.display='none';
				z.nextSibling.style.display='none';
			}
		}
	}

	ifEl.addEventListener('keyup', function() { blurFun(); } , false);
	ifClearEl.addEventListener('click', function() { ifEl.value=''; blurFun(); } , false);
})();
}


