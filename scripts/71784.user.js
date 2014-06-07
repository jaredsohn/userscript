// ==UserScript==
// @name          Travian Timer Title
// @namespace     TravianTimerTitle
// @description   sets timers title to timer in minutes rounded up
// @include       http://*.travian.*/dorf1.php*
// @include       http://*.travian.*/dorf2.php*
// ==/UserScript==

function find(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function timeToMin( time ) {
	var a = time.split(":");
	var min = 0;
	min += parseInt(a[0], 10) * 60;
	min += parseInt(a[1], 10);
	min += parseInt(a[2], 10) > 0 ? 1 : 0;
	return min;
}

function main( ignore ) {

	var list = find("//span[contains(@id,'timer')]");
	
	for (var i=0; i<list.snapshotLength; ++i) {
		var node = list.snapshotItem(i);
		var min = timeToMin(node.textContent);
		//alert(node.textContent + ' = ' + min);
		node.title = min + ' minutes';
	}
}

window.addEventListener('load', function(e){ main(e); }, false);
