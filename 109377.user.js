// ==UserScript==
// @name           DeviantART - Open Selected
// @author         Dwoo
// @version        2013-06-21
// @namespace      http://userscripts.org/scripts/show/109377
// @description    Adds a button in the message center to open all selected deviations in tabs.
// @include        http://www.deviantart.com/messages/*
// ==/UserScript==

(function () {

var button;
var chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

function evalNodes(path, context) {
	return document.evaluate(path, ((context == null)?document:context), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function evalNode(path, context) {
	return evalNodes(path, context).snapshotItem(0);
}

function openSelected() {
	var nodes = evalNodes('.//div[contains(@class, "mcbox-sel")]/div/div/span/span[1]/a');
	for (var i = 0; node = nodes.snapshotItem(i); i++) {
		if (!chrome) {
			window.open(node.href);
		} else {
			var evt = document.createEvent('MouseEvents');
			evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null);
			node.dispatchEvent(evt);
		}
	}
}

function update() {
	var t = this.textContent.replace('Remove', 'Open');
	button.innerHTML = t;
	if (t.length == 5) {
		if (!button.classList.contains('disabledbutton')) {
			button.classList.add('disabledbutton');
		}
	}
	else {
		button.classList.remove('disabledbutton');
	}
}

function addButton() {
	if (!document.getElementById('openS')) {
		var bar = evalNode('//div[@class="mczone" and contains(./h2, "Deviations")]//td[@class="f td-sr"]/a[3]');
		if (!bar) {
			return;
		}

		var remove = evalNode('//div[@class="mczone" and contains(./h2, "Deviations")]//a[contains(@class, "removebutton")]');
		button = remove.cloneNode(true);
		button.classList.remove('removebutton');
		button.setAttribute('onclick', 'return false;');
		button.setAttribute('id', 'openS');
		button.innerHTML = button.innerHTML.replace('Remove', 'Open');
		bar.parentNode.setAttribute('style', 'width: 500px !important;');
		bar.parentNode.insertBefore(button, bar);
		button.addEventListener('click', openSelected, false);
		remove.firstChild.addEventListener('DOMCharacterDataModified', update, false);
	}
	else {
		button = document.getElementById('openS');
	}
}

setTimeout(addButton, 300);

var right = evalNode('//div[@class="messages-right"]');
if (right) {
	right.addEventListener('DOMNodeInserted', addButton, false);
}

})();