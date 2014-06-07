// ==UserScript==
// @name          Paly Voice Ticker Shower
// @namespace     http://voice.paly.net
// @description   Shows all messages displayed by the ticker at once!
// @include       http://voice.paly.net/*
// ==/UserScript==

var tickerArray = document.evaluate("//span[@class='field-content']", document, null, 6, null),
	aggregateString = "";

if (tickerArray.snapshotLength > 0) {	
	for (var i=0; i<tickerArray.snapshotLength; i++) {
		var tickerText = tickerArray.snapshotItem(i);
		aggregateString += "- " + tickerText.textContent + "\n";
	}
										
	var rootOfAllEvil = document.evaluate("//div[@class='panel-pane']", document, null, 0, null).iterateNext();
	var wrapper = document.createElement("div");
	wrapper.style.fontSize = '85%';
	wrapper.style.textAlign = 'left';
	wrapper.style.paddingLeft = '10px';
	wrapper.innerText = aggregateString;
										
	if (rootOfAllEvil) {
		rootOfAllEvil.parentNode.replaceChild(wrapper, rootOfAllEvil);
	}
}