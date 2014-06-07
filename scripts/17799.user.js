// ==UserScript==
// @name           JHunz's KOL Price Colorizer
// @namespace      hunsley@gmail.com
// @description    Colors mall store prices depending on price thresholds.
// @include        *kingdomofloathing.com/mallstore.php*
// @include        http://127.0.0.1:60*/mallstore.php*
// ==/UserScript==

// Version 1.0	12/27/07	Whipped up quick for this thread: http://forums.kingdomofloathing.com:8080/vb/showthread.php?t=145685

var node,s,thresholdArray,thresholds,i,textnodes,price,color,colors,colorArray;

//First run
thresholdArray = GM_getValue('thresholds','UNDEFINED');
if (thresholdArray == 'UNDEFINED') {
	thresholdArray = '1000;10000;100000;1000000;10000000';
	GM_setValue('thresholds',thresholdArray);
}
colorArray = GM_getValue('colors','UNDEFINED');
if (colorArray == 'UNDEFINED') {
	colorArray = '#336633;#00FF55;#D9D900;#FF8800;#FF6666;#FF0000';
	GM_setValue('colors',colorArray);
}

thresholds = thresholdArray.split(";");
colors = colorArray.split(";");

textnodes = document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (i=0;i<textnodes.snapshotLength;i++) {
	node = textnodes.snapshotItem(i);
	s=node.data;
	if (s.match("^.* Meat$")) {
		price = parseInt(s.replace(' Meat','').replace(/,/g,''));

		if (price > parseInt(thresholds[4])) {
			color=colors[5];
		}
		else if (price > parseInt(thresholds[3])) {
			color=colors[4];
		}
		else if (price > parseInt(thresholds[2])) {
			color=colors[3];
		}
		else if (price > parseInt(thresholds[1])) {
			color=colors[2];
		}
		else if (price > parseInt(thresholds[0])) {
			color=colors[1];
		}
		else {	
			color=colors[0];
		}

		node.parentNode.style.color=color;
	}
}