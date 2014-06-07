// ==UserScript==
// @name		Plushie Rser 3.33/5.55
// @description		Randomly refreshes Plushie Palace in the interval specified under "Constants" until an item listed under "Autobuy and Refresh" appears, which is autograbbed.
// @include		http://www.neopets.com/objects.phtml?type=shop&obj_type=98
// @include		http://www.neopets.com/objects.phtml?obj_type=98&type=shop
// Made by DX and CH
// ==/UserScript==

/* Constants */
var refreshMin = 3.33; // Set the minimum amount of time in seconds for a refresh interval
var refreshMax = 5.55; // Set the maximum amount of time in seconds for a refresh interval
var randSpan = (refreshMax - refreshMin) + 1; // Finds the number of seconds between refreshMin and refreshMax
var randTime = Math.floor(Math.random() * randSpan) + refreshMin; // Randomly generates a number between refreshMin and refreshMax
var randTimeMS = randTime * 1000; // Convert randTime into milliseconds to be used at the bottom of this script
/* End of Constants */

/* Functions */
function alarm() { // plays a sound when a listed item appears
	alarmDiv = document.createElement("div");
	alarmDiv.innerHTML = "<embed src=\"http://www.liquidenjoyment.com/stuff/hobonickelget.swf\" autostart=true hidden=true>";
	pbDiv = document.getElementById("contentContainer");
	document.body.insertBefore(alarmDiv, pbDiv);
}
function popup() { // adds additional capabilities to the script
	{alert("RS!")} // creates a popup to alert the user that an item in the list below was autobought/autograbbed
}
function autobuy() {
	if (item.snapshotLength > 0) {
		item = item.snapshotItem(0);
		selectedlink = item.previousSibling.previousSibling;
		window.location = selectedlink;
	}
}
/* End of Functions */

/* Autobuy and Refresh */
if (document.body.innerHTML.indexOf('<DO NOT REMOVE') != -1) {
	var item = document.evaluate('//b[. = "DO NOT REMOVE"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	popup();
	return;
}
// Plushie Shop Items
else if (document.body.innerHTML.indexOf('Magical Blue Krawk Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Magical Blue Krawk Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Magical Red Krawk Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Magical Red Krawk Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Darkest Faerie Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Darkest Faerie Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('MSPP Plushie') != -1) { 
	var item = document.evaluate('//b[. = "MSPP Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Fish Negg Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Fish Negg Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Doglefox Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Blue Doglefox Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Ghost Evil Fuzzle') != -1) { 
	var item = document.evaluate('//b[. = "Ghost Evil Fuzzle"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('White Ixi Plushie') != -1) { 
	var item = document.evaluate('//b[. = "White Ixi Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Dusk Kougra Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Dusk Kougra Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Dark Faerie Doll') != -1) { 
	var item = document.evaluate('//b[. = "Dark Faerie Doll"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Baby Bruce Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Baby Bruce Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Bat Thing Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Bat Thing Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Rainbow Grundo Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Rainbow Grundo Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Light Faerie Doll') != -1) { 
	var item = document.evaluate('//b[. = "Light Faerie Doll"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Blizzard Kougra Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Blizzard Kougra Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Guradian of Fire Magic Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Lost Desert Quiguki"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Zafara Double Agent Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Zafara Double Agent Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Monoceraptor Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Monoceraptor Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Bowe Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Bowe Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Grey Mynci Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Grey Mynci Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Sidney Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Sidney Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Royal Boy Ixi Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Royal Boy Ixi Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Magical Ghost Marshmallows Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Magical Ghost Marshmallows Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Archmagus of Roo Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Archmagus of Roo Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Insane Evil Fuzzle') != -1) { 
	var item = document.evaluate('//b[. = "Insane Evil Fuzzle"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Glyme Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Glyme Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Fire Eyrie Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Fire Eyrie Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Black Wadjet Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Black Wadjet Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('King Skarl Plushie') != -1) { 
	var item = document.evaluate('//b[. = "King Skarl Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Spotted Koi Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Spotted Koi Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Plushie Poogle Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Plushie Poogle Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Magical Purple Blumaroo Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Magical Purple Blumaroo Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Magical Fire Lupe Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Magical Fire Lupe Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Ghost Ogrin Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Ghost Ogrin Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Galem Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Galem Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Frozen Lizard Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Frozen Lizard Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Christmas Korbat Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Christmas Korbat Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Frost Lizard Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Frost Lizard Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Swamp Lupe Neoquest Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Swamp Lupe Neoquest Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Faerie Korbat Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Faerie Korbat Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Desert Cobrall Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Desert Cobrall Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Denethrir Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Denethrir Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Zombie Flotsam Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Zombie Flotsam Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Halloween Blumaroo Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Halloween Blumaroo Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('The Masked Intruder Plushie') != -1) { 
	var item = document.evaluate('//b[. = "The Masked Intruder Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Orange Draik Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Orange Draik Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Mutant Shoyru Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Mutant Shoyru Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Magical Rainbow Aisha Plushie') != -1) { 
	var item = document.evaluate('//b[. = "Magical Rainbow Aisha Plushie"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autobuy();
	alarm();
	popup();
	return;
}


// End Plushie Shop Items
// Randomly Refresh
else {
	window.setTimeout(function(){window.location.reload();}, randTimeMS)
};
// End of Randomly Refresh
/* End of Autobuy and Refresh */

