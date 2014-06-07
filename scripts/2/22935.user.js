// ==UserScript==
// @name           Terrarium Scale
// @namespace      hunsley@gmail.com
// @description    Total terrarium weight is conveniently displayed.
// @include        *kingdomofloathing.com/familiar.php*
// ==/UserScript==

var sum=0,weight,textnodes,node,s,i,addToNode;

textnodes = document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (i=0;i<textnodes.snapshotLength;i++) {
	node = textnodes.snapshotItem(i);
	s=node.data;

	if(s.match(/[0-9]+-pound /)) {
		var weight = parseInt(s.split("-pound")[0].replace(/[^0-9]/g,''));
		if (weight > 0) {
			sum += weight;
		}
	}
	else if (s.match(/contains the following creatures/)) {
		addToNode = node;
	}
}
//alert("total weight is "+sum); 

addToNode.textContent = 'Your ' + sum + "-pound " + addToNode.textContent.split('Your ')[1];