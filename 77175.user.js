// ==UserScript==
// @name          lolzoominforofl
// @description	  lolzoominforofl
// @include       http://public.zoominfo.com/search*
// ==/UserScript==

function selectNodes(doc, context, xpath) {
	var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var result = new Array( nodes.snapshotLength );
	
	for (var x=0; x<result.length; x++) {
		result[x] = nodes.snapshotItem(x);
	}
	
	return result;
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function removeElement(el) {
	el.parentNode.removeChild(el);
}

var links = selectNodes(document, document.body, "//A[contains(@id, 'p_')]");
var personIdRegex = new RegExp('p_([\d]+)');

for(var i in links) {
	try {
		var link = links[i];
		var newLink = document.createElement('a');
		newLink.href = 'http://www.zoominfo.com/Search/ReferencesView.aspx?PersonID='+ link.id.substring(2, link.id.length);
		newLink.innerHTML = 'Click to view Profile';
		
		insertAfter(link, newLink);
		
		removeElement(link);
	} catch(e) {
		console.log(e);
	}
}

var tds = selectNodes(document, document.body, "//td[contains(@class, 'personName')]");
for(var j in tds) {
	removeElement(tds[j]);
}