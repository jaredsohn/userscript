// ==UserScript==
// @name           Pachi quickplay
// @namespace      Conster
// @include        http://*animecubed.com/billy/bvs/partyhouse-pachinkoplay.html
// ==/UserScript==


var m = 1000;
var electrum = parseInt(document.evaluate("//tr/td/b/font", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
		null).snapshotItem(0).textContent.substring(10));
var bronze = parseInt(document.evaluate("//tr/td/b/font[2]", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
		null).snapshotItem(0).textContent.substring(8));
var silver = parseInt(document.evaluate("//tr/td/b/font[3]", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
		null).snapshotItem(0).textContent.substring(8));
var gold = parseInt(document.evaluate("//tr/td/b/font[4]", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
		null).snapshotItem(0).textContent.substring(6));
var spendon1e = Math.min(electrum,m);	var spendon2e = Math.min(electrum,m);	var spendon3e = Math.min(electrum,m);
var spendon1b = Math.min(bronze,m);	var spendon2b = Math.min(bronze,m);	var spendon3b = Math.min(bronze,m);
var spendon1s = Math.min(silver,m);	var spendon2s = Math.min(silver,m);	var spendon3s = Math.min(silver,m);
var spendon1g = Math.min(gold,m);	var spendon2g = Math.min(gold,m);	var spendon3g = Math.min(gold,m);
var amountbox = document.evaluate("//input [@name='numdrop']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
amountbox.selected = true;
var stopatjackpot = document.evaluate("//input [@name='pachistopj']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var opens = document.evaluate("//font[@style='font-size: 12px;']", document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var pushthis = document.forms.namedItem("dropball");



function process_event(event) {
	if (event.keyCode == 66) {		//b for "Billy's Bucket"
		var sL = opens.snapshotLength;
		var leftopen = 0;	var rightopen = 0;
		for (var i = 0; i < sL; i++) {
			var t = opens.snapshotItem(i).textContent;
			if (t.indexOf("Open!") >= 0) {		//it's a lock
				if (t.indexOf("Left Lock") >= 0) {	//left lock
					leftopen = parseInt(t.substring(t.indexOf(":")+2));
				} else if (t.indexOf("Right Lock") >= 0) {	//right lock
					rightopen = parseInt(t.substring(t.indexOf(":")+2));
				}
			}
		}
		if (leftopen == 0) {		//focus on the left
			document.evaluate("//option [@value=1]",document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).selected = true;
			amountbox.value = spendon1g;
			stopatjackpot.checked = true;
			pushthis.wrappedJSObject.submit();
		} else if (rightopen == 0) {	//focus on the right
			document.evaluate("//option [@value=3]",document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).selected = true;
			stopatjackpot.checked = true;
			amountbox.value = spendon3g;
			pushthis.wrappedJSObject.submit();
		} else {
			spendon2g = Math.min(leftopen,rightopen);
			document.evaluate("//option [@value=2]",document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).selected = true;
			amountbox.value = spendon2g;
			stopatjackpot.checked = false;
			pushthis.wrappedJSObject.submit();
		}
	} else if (event.keyCode == 65) {	//a for slot 1
		document.evaluate("//option [@value=1]",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).selected = true;
		amountbox.value = spendon1g;
		stopatjackpot.checked = true;
		pushthis.wrappedJSObject.submit();
	} else if (event.keyCode == 68) {	//d for slot 3
		document.evaluate("//option [@value=3]",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).selected = true;
		amountbox.value = spendon3g;
		stopatjackpot.checked = true;
		pushthis.wrappedJSObject.submit();
	} else if (event.keyCode == 83) {	//s for slot 2
		document.evaluate("//option [@value=2]",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).selected = true;
		var cutoff = amountbox.value.length-1;
		if (amountbox.value.indexOf("s") != -1) {
			amountbox.value = amountbox.value.substring(0,cutoff);
		}
		stopatjackpot.checked = false;
		pushthis.wrappedJSObject.submit();		
	}
}

window.addEventListener("keyup", process_event, false);

