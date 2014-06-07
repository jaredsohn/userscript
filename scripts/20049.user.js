// ==UserScript==
// @name           JHunz's KOL Mall Price Sorter
// @namespace      hunsley@gmail.com
// @description    Sorts mall stores by item price
// @include        *kingdomofloathing.com/mallstore.php*
// @include        http://127.0.0.1:60*/mallstore.php*
// ==/UserScript==

//To sort by price descending, edit the order variable to be anything except "ascend" or blank

var node,s,i,textnodes,price,j,parent;

j=0;

var order = GM_getValue('order','UNDEFINED');
if (order=='UNDEFINED') {
	order='ascend';
	GM_setValue('order','ascend');
}

textnodes = document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

var priceArray = new Array(textnodes.snapshotLength);
var nodeArray = new Array(textnodes.snapshotLength);

for (i=0;i<textnodes.snapshotLength;i++) {
	node = textnodes.snapshotItem(i);
	s=node.data;
	if (s.match("^.* Meat$")) {
		price = parseInt(s.replace(' Meat','').replace(/,/g,''));

		priceArray[j] = '' + price + ';' + j;
		nodeArray[j] = node.parentNode.parentNode;
		j++;
		parent = node.parentNode.parentNode.parentNode;
		node.parentNode.parentNode.parentNode.removeChild(node.parentNode.parentNode);
	}
}

if (order=='ascend') {
	priceArray.sort(sortByPriceAscending);
}
else {
	priceArray.sort(sortByPriceDescending);
}

for (i=0;i<j;i++) {
	parent.appendChild(nodeArray[priceArray[i].split(';')[1]]);
}

function sortByPriceAscending(a, b) {
	return a.split(";")[0] - b.split(";")[0];
}
function sortByPriceDescending(a, b) {
	return b.split(";")[0] - a.split(";")[0];
}