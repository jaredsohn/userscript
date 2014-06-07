// ==UserScript==
// @name	Autocomplete Always On
// ==/UserScript==

function main(doc) {
	//alert('document found');
	var allforms = doc.getElementsByTagName('form');
	var oAttr;
	var oNodeSnapshot = doc.evaluate('//@autocomplete', doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < oNodeSnapshot.snapshotLength; i++) {
		//alert('input found');
		oAttr = oNodeSnapshot.snapshotItem(i);
		oAttr.nodeValue = 'on';
	}
	for (var x = 0; x < allforms.length; x++) {
		//alert('form found');
		if (allforms[x].addEventListener) {
			allforms[x].addEventListener('submit', function() {
				//alert('submitted');
				main(doc);
			}, false);
		} else if (allforms[x].attachEvent) {
			allforms[x].attachEvent('onsubmit', function() {
				//alert('submitted');
				main(doc);
			});
		}
	}
	var iframes = doc.getElementsByTagName('iframe');
	recurse(iframes);
	var frames = doc.getElementsByTagName('frame');
	recurse(frames);
}
function recurse(framegroup) {
	for (var j = 0; j < framegroup.length; j++) {
		var framedoc = false;
		if (framegroup[j].contentDocument)
			framedoc = framegroup[j].contentDocument;
		else if (framegroup[j].contentWindow)
			framedoc = framegroup[j].contentWindow.document;
		else if (framegroup[j].document)
			framedoc = framegroup[j].document;
		if (framedoc)
			main(framedoc);
	}
}
main(document);
