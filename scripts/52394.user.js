// ==UserScript==
// @name		Tyrannian Petpets 4.147/5.243
// @description		Randomly refreshes Ice Crystal Shop in the interval specified under "Constants" until an item listed under "Autograb and Refresh" appears, which is then autograbbed.
// @include		http://www.neopets.com/objects.phtml?type=shop&obj_type=44
// @include		http://www.neopets.com/objects.phtml?obj_type=44&type=shop
// Made by DX and CH
// ==/UserScript==

/* Constants */
var randNumMin = 4.147; // Set the minimum value that can be generated for randNum
var randNumMax = 5.243; // Set the maximum value that can be generated for randNum
var randNumSpan = (randNumMax - randNumMin) + 1; // Finds the difference between refreshMin and refreshMax
var randNum = Math.floor(Math.random() * randNumSpan) + randNumMin; // Randomly generates a number between randNumMin and randNumMax
var bellCurveTime = 0.04*(Math.pow((randNum-3.881),3))+4.214; // Uses randNum to generate a time, in seconds; the average of these numbers is 4.214 seconds; graph (or substitute randNumMin & randNumMax for x in) f(x)=0.04*(xâˆ’3.881)^3+4.214 in the domain of randNumMin<=x<=randNumMax to find the range of time in seconds
var randTimeMS = bellCurveTime * 1000; // Convert bellCurveTime into milliseconds to be used at the end of this script
/* End of Constants */

/* Functions */
function autograb() { // autograbs item (if the item is listed)
	if (item.snapshotLength > 0) {
		item = item.snapshotItem(0);
		selectedlink = item.previousSibling.previousSibling;
		window.location = selectedlink;
	}
}
function alarm() { // plays a sound when a listed item appears
	alarmDiv = document.createElement("div");
	alarmDiv.innerHTML = "<embed src=\"http://www.liquidenjoyment.com/stuff/hobonickelget.swf\" autostart=true hidden=true>";
	pbDiv = document.getElementById("contentContainer");
	document.body.insertBefore(alarmDiv, pbDiv);
}
function popup() { // adds additional capabilities to the script
	{alert("RS!")} // creates a popup to alert the user that an item in the list below was autograbbed
}
/* End of Functions */

/* Autograb and Refresh */
if (document.body.innerHTML.indexOf('<DO NOT REMOVE') != -1) {
	var item = document.evaluate('//b[. = "DO NOT REMOVE"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	autograb();
	popup();
	return;
}
// Tyrannian Petpets
else if (document.body.innerHTML.indexOf('Skree') != -1) { 
	var item = document.evaluate('//b[. = "Skree"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Gathow') != -1) { 
	var item = document.evaluate('//b[. = "Gathow"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Ownow') != -1) { 
	var item = document.evaluate('//b[. = "Ownow"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Rock') != -1) { 
	var item = document.evaluate('//b[. = "Rock"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Woolypapith') != -1) { 
	var item = document.evaluate('//b[. = "Woolypapith"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Krawk') != -1) { 
	var item = document.evaluate('//b[. = "Krawk"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}


// End of Tyrannian Petpets Shop Items
// Randomly Refresh
else {
	window.setTimeout(function(){window.location.reload();}, randTimeMS)
};
// End of Randomly Refresh
/* End of Autograb and Refresh */

