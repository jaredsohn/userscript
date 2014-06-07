// ==UserScript==
// @name        rrextras
// @namespace   es.phoneixs.greasmonkey.rrextras
// @description Add (for now) a little glow for avatars in the forum dependent of level of the user of Radio Rivendell forum.
// @include     http://www.radiorivendell.com/forum/*
// @version     1
// @grant       none
// ==/UserScript==

var re = new RegExp(".*Level ([0-9]+).*"); // To extract the level from text.
var arInputs = document.getElementsByClassName("post-poster"); // To start searching for info.

for (var i = 0; i < arInputs.length; i++) {
	var elmInput = arInputs[i];

	var snapResults = document.evaluate("./div[@class='post-user']/div[@class='poster-info']/p/span[2]", elmInput, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	if (snapResults) { // If it have a level.
	
		var lvl = re.exec(snapResults.textContent)[1]; // Only get the level.

		snapResults = document.evaluate("./div[@class='post-user']/div[@class='avatar']/div/a/img", elmInput, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (snapResults) { // Set the shadow around img if it have one.
			if (lvl >= 10 && lvl < 20) {
				snapResults.style.boxShadow = "0 0 1em brown";
			} else if (lvl >= 20 && lvl < 30) {
				snapResults.style.boxShadow = "0 0 1em silver";
			} else if (lvl >= 30 ) {
				snapResults.style.boxShadow = "0 0 1em gold";
			}
		}
	}
}


