// ==UserScript==
// @name           d2jsFilter
// @namespace      jspfil
// @description    Filter
// @include       http://forums.d2jsp.org/index.php?showforum=*
// ==/UserScript==

function ge(_1) { return document.getElementById(_1); }
function gE(_1, _2) { return _1.getElementsByTagName(_2); }
function ce(_1) { return document.createElement(_1); }
function ac(_1, _2) { _1.appendChild(_2); }
function iH(_1, _2) { _1.innerHTML = _2; }

var nodes = document.evaluate(
    '/html/body/div[4]',
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	linkParent = nodes.snapshotItem(0);

	var filterBox = ce("span");
	var filterInput = ce("input");
	
	filterInput.size = 20;
	filterInput.id = 'goonFilterInput';
	filterInput.type = 'text';
	filterBox.appendChild(filterInput);
	
	filterInput.addEventListener("keyup", updateGFilter, false);

	linkParent.insertBefore(filterBox, linkParent.nextChild);


function updateGFilter() {
	
	var forumRows =  document.evaluate( '/html/body/fieldset/table/tbody/tr/td[2]/a',
	    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var fText = ge("goonFilterInput").value;
	var fRe = new RegExp ( fText, "i");
	
	for (var i = 0; i < forumRows.snapshotLength; i++) {
	
	    thisRow = forumRows.snapshotItem(i);
		
		if (fText.length > 0 && thisRow.innerHTML.toString().search(fRe) == -1)
			thisRow.parentNode.parentNode.style.display = "none";
		else
			thisRow.parentNode.parentNode.style.display = "";
	}

}