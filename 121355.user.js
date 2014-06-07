// ==UserScript==
// @name           xkiv-th-inventoryfilter
// @namespace      xKiv
// @include        *.twilightheroes.com/wear.php*
// @include        *.twilightheroes.com/use.php*
// ==/UserScript==

var cells = document.evaluate(".//html/body//font/table/tbody/tr/td[@width='50%']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var cc = cells.snapshotLength;
if (cc >0 ) {
	var ftbls = document.evaluate(".//html/body//font/table",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); 
	var ftbl = ftbls.snapshotItem(0);

	var newPane = document.createElement('div');
	newPane.id = 'xKiv-clicker';
	var strHTML = '<center>Item filter: <input type="text" name="xkiv-itemfilter" id="xkiv-itemfilter"></input>&nbsp;<button onclick="return false;" id="xkiv-filterclearbutton" >Clear</button>&nbsp;<button onclick="return false;" id="xkiv-filterhidebutton">Hide Unusable</button></center>';
	newPane.innerHTML = strHTML;

	ftbl.parentNode.insertBefore(newPane,ftbl);
	var ifEl = document.getElementById('xkiv-itemfilter');
	var ifClearEl = document.getElementById('xkiv-filterclearbutton');
	var ifHideEl = document.getElementById('xkiv-filterhidebutton');

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
			var ps = z.previousSibling;
			while (ps.nodeType != 1) {
				ps= ps.previousSibling;
			}
			if (y.indexOf(needsToKeep)>-1) {
				z.style.display='table-cell';
				ps.style.display='table-cell';
			} else {
				z.style.display='none';
				ps.style.display='none';
			}
		}
	}

	function hideFun() {
		var hideCells = document.evaluate(".//html/body/font/table/tbody/tr/td[.//del]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		var hh = hideCells.snapshotLength;
		var j;
		for (j = 0; j < hh; j++) {
			var z = hideCells.snapshotItem(j);
			var y = z.innerHTML.toLowerCase();
			var ps = z.previousSibling;
			while (ps.nodeType != 1) {
				ps= ps.previousSibling;
			}
			z.style.display='none';
			ps.style.display='none';
		}
	}
	ifEl.addEventListener('keyup', function() { blurFun(); } , false);
	ifClearEl.addEventListener('click', function() { ifEl.value=''; blurFun(); } , false);
	ifHideEl.addEventListener('click', function() { hideFun(); } , false);
})();
}


