// ==UserScript==
// @name           Hemnet HideThem
// @namespace      http://userscripts.org/scripts/show/80384
// @description    Helps avoid looking at the same flats over and over again, by 'hiding' selected flats in the "Bildvy" mode.
// @include        http://www.hemnet.se/*
// ==/UserScript==

function hideButton(flatId) {
	var button = document.createElement('button');
	button.addEventListener('click', function() {hide(button,flatId);}, false);
	txt = document.createTextNode('hide');
	button.appendChild(txt);
	return button;
}

function showButton(flatId) {
	var button = document.createElement('button');
	button.addEventListener('click', function() {show(button,flatId);}, false);
	txt = document.createTextNode('show');
	button.appendChild(txt);
	return button;
}

function hide(button,flatId) {
    GM_setValue(flatId,1);
	button.parentNode.parentNode.parentNode.style.opacity="0.2";
    button.parentNode.appendChild(showButton(flatId));
	button.parentNode.removeChild(button);
	
};

function show(button,flatId) {
    GM_deleteValue(flatId);
	button.parentNode.parentNode.parentNode.style.opacity="1";
    button.parentNode.appendChild(hideButton(flatId));
	button.parentNode.removeChild(button);
};

var links = document.evaluate("//*[@class='knapp oppna-lank resultat-handelser']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).wrappedJSObject;

for (var i=0;i<=links.snapshotLength;i++) {
    var link = links.snapshotItem(i);
    var flatId = link.getAttribute('href').split('beskrivning/')[1].split('?')[0];
	
	var button;
	
    if (GM_getValue(flatId)==1) {
        link.parentNode.parentNode.parentNode.style.opacity="0.2";
		button = showButton(flatId);
    }
	else {
		button = hideButton(flatId);
	}
	
	link.parentNode.appendChild(button);
}
