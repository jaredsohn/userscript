// ==UserScript==
// @name		Magic 3.54/6.36
// @description		Randomly refreshes Magic Shop in the interval specified under "Constants" until an item listed under "Autograb and Refresh" appears, which is then autograbbed.
// @include		http://*.neopets.*/objects.phtml?type=shop&obj_type=2
// @include		http://*.neopets.*/objects.phtml?obj_type=2&type=shop
// Made by DX and CH
// ==/UserScript==

/* Constants */
var randNumMin = 3.54; // Set the minimum value that can be generated for randNum
var randNumMax = 6.36; // Set the maximum value that can be generated for randNum
var randNumSpan = (randNumMax - randNumMin) + 1; // Finds the difference between refreshMin and refreshMax
var randNum = Math.floor(Math.random() * randNumSpan) + randNumMin; // Randomly generates a number between randNumMin and randNumMax
var bellCurveTime = 0.04*(Math.pow((randNum-3.881),3))+4.214; // Uses randNum to generate a time, in seconds; the average of these numbers is 4.214 seconds; graph (or substitute randNumMin & randNumMax for x in) f(x)=0.04*(x−3.881)^3+4.214 in the domain of randNumMin<=x<=randNumMax to find the range of time in seconds
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
function miscellaneous() { // adds additional capabilities to the script
	{alert("RS!")} // creates a popup to alert the user that an item in the list below was autograbbed
}

/* End of Functions */

/* Autograb and Refresh */
if (document.body.innerHTML.indexOf('<DO NOT REMOVE') != -1) {
	var item = document.evaluate('//b[. = "DO NOT REMOVE"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	miscellaneous();
	return;
}
// Magic Shop Items
else if (document.body.innerHTML.indexOf('Starry Grarrl Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Starry Grarrl Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Fire Grarrl Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Fire Grarrl Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Eyrie Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Eyrie Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Shadow Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Shadow Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Silver Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Silver Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Yurble Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Yurble Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Illusen Day Elixir') != -1) { 
	var item = document.evaluate('//b[. = "Illusen Day Elixir"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Aisha Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Aisha Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Pteri Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Pteri Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Pteri Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Pteri Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Scorchio Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Scorchio Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Purple Poogle Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Purple Poogle Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Striped Aisha Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Striped Aisha Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Aisha Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Aisha Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Rainbow Quiggle Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Rainbow Quiggle Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Scorchio Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Scorchio Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Striped Scorchio Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Striped Scorchio Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Grundo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Grundo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Kiko Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Kiko Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Cloud Gelert Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Cloud Gelert Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red JubJub Morphing potion') != -1) { 
	var item = document.evaluate('//b[. = "Red JubJub Morphing potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Meerca Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Meerca Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Silver Peophin Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Silver Peophin Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Moehog Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Moehog Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Chomby Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Chomby Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Chomby Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Chomby Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Lupe Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Lupe Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Lupe Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Lupe Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Skunk Mynci Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Skunk Mynci Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Kougra Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Kougra Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Spotted Blumaroo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Spotted Blumaroo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Striped Blumaroo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Striped Blumaroo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Purple Zafara Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Purple Zafara Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Disco Acara Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Disco Acara Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Flotsam Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Flotsam Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Purple Chia Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Purple Chia Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Poogle Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Poogle Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Poogle Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Poogle Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Jetsam Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Jetsam Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('White Grarrl Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "White Grarrl Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Elephante Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Elephante Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Elephante Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Elephante Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Krawk Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Krawk Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Spotted Grundo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Spotted Grundo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Cloud Grundo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Cloud Grundo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Tonu Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Tonu Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Tonu Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Tonu Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Ixi Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Ixi Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Ixi Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Ixi Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Ixi Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Ixi Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Rainbow Grarrl Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Rainbow Grarrl Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Eyrie Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Eyrie Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Eyrie Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Eyrie Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Spotted Scorchio Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Spotted Scorchio Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Gold Scorchio Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Gold Scorchio Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Checkered Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Checkered Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Gold Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Gold Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Pink Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Pink Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Rainbow Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Rainbow Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Speckled Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Speckled Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Spotted Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Spotted Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Starry Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Starry Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('White Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "White Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Yurble Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Yurble Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Yurble Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Yurble Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow JubJub Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow JubJub Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue JubJub Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue JubJub Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Island Acara Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Island Acara Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Cloud Acara Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Cloud Acara Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Tuskaninny Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Tuskaninny Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Tuskaninny Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Tuskaninny Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Peophin Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Peophin Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Ruki Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Ruki Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Ruki Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Ruki Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Ruki Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Ruki Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Brown Grundo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Brown Grundo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Rainbow Poogle Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Rainbow Poogle Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Cloud Pteri Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Cloud Pteri Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Starry Pteri Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Starry Pteri Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Flaming Torch') != -1) { 
	var item = document.evaluate('//b[. = "Flaming Torch"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Christmas Magic Hat') != -1) { 
	var item = document.evaluate('//b[. = "Christmas Magic Hat"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Pteri Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Pteri Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Peophin Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Peophin Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Strange Potion') != -1) { 
	var item = document.evaluate('//b[. = "Strange Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Korbat Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Korbat Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Spotted Pteri Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Spotted Pteri Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Pteri Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Pteri Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Kauvaras Potion') != -1) { 
	var item = document.evaluate('//b[. = "Kauvaras Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Skeith Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Skeith Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Nimmo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Nimmo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Kacheek Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Kacheek Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Cybunny Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Cybunny Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Lenny Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Lenny Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Cybunny Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Cybunny Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Skeith Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Skeith Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Kacheek Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Kacheek Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Kacheek Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Kacheek Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Kacheek Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Kacheek Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Halloween Blumaroo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Halloween Blumaroo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Blumaroo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Blumaroo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Quiggle Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Quiggle Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Kau Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Kau Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Kau Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Kau Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Grundo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Grundo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Wocky Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Wocky Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Fire Wocky Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Fire Wocky Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Kiko Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Kiko Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Faerie Usul Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Faerie Usul Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Usul Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Usul Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Striped Tuskaninny Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Striped Tuskaninny Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Strawberry Tuskaninny Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Strawberry Tuskaninny Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Gelert Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Gelert Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Uni Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Uni Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green JubJub Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green JubJub Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Bruce Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Bruce Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Christmas Bruce Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Christmas Bruce Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Meerca Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Meerca Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Kyrii Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Kyrii Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Kyrii Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Kyrii Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Purple Peophin Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Purple Peophin Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Peophin Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Peophin Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Peophin Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Peophin Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Moehog Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Moehog Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Purple Eyrie Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Purple Eyrie Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Eyrie Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Eyrie Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Acara Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Acara Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Quiggle Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Quiggle Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Acara Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Acara Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Purple Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Purple Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Lupe Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Lupe Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Lupe Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Lupe Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Purple Techo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Purple Techo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Techo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Techo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Moehog Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Moehog Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Moehog Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Moehog Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Kougra Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Kougra Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Kougra Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Kougra Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Kougra Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Kougra Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Mynci Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Mynci Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Mynci Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Mynci Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Mynci Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Mynci Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Mynci Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Mynci Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Koi Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Koi Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Koi Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Koi Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Koi Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Koi Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Christmas Koi Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Christmas Koi Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Koi Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Koi Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Blumaroo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Blumaroo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Blumaroo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Blumaroo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Blumaroo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Blumaroo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Zafara Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Zafara Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Zafara Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Zafara Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Starry Zafara Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Starry Zafara Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Zafara Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Zafara Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Zafara Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Zafara Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Nimmo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Nimmo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Nimmo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Nimmo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Nimmo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Nimmo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Fire Nimmo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Fire Nimmo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Striped Nimmo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Striped Nimmo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Kau Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Kau Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Kau Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Kau Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Striped Kau Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Striped Kau Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Halloween Kau Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Halloween Kau Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Acara Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Acara Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Fire Acara Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Fire Acara Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Acara Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Acara Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Checkered Acara Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Checkered Acara Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Desert Aisha Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Desert Aisha Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Desert Blumaroo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Desert Blumaroo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Flotsam Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Flotsam Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('White Flotsam Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "White Flotsam Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Flotsam Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Flotsam Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Skunk Flotsam Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Skunk Flotsam Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Split Flotsam Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Split Flotsam Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Striped Flotsam Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Striped Flotsam Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Chia Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Chia Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Chia Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Chia Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Chia Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Chia Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Chia Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Chia Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Striped Chia Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Striped Chia Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('White Chia Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "White Chia Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Split Chia Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Split Chia Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Desert Poogle Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Desert Poogle Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Poogle Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Poogle Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Poogle Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Poogle Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Striped Jetsam Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Striped Jetsam Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Spotted Jetsam Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Spotted Jetsam Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Jetsam Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Jetsam Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Jetsam Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Jetsam Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Jetsam Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Jetsam Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Techo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Techo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Techo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Techo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Techo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Techo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Grarrl Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Grarrl Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Grarrl Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Grarrl Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Grarrl Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Grarrl Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Grarrl Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Grarrl Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Striped Grarrl Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Striped Grarrl Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Skeith Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Skeith Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Skeith Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Skeith Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('White Skeith Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "White Skeith Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Striped Skeith Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Striped Skeith Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Cloud Elephante Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Cloud Elephante Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Elephante Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Elephante Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Elephante Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Elephante Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Christmas Korbat Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Christmas Korbat Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Korbat Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Korbat Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Korbat Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Korbat Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Korbat Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Korbat Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Rainbow Swirly Potion') != -1) { 
	var item = document.evaluate('//b[. = "Rainbow Swirly Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Buzz Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Buzz Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Buzz Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Buzz Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Buzz Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Buzz Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Buzz Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Buzz Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Skunk Buzz Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Skunk Buzz Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Krawk Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Krawk Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Krawk Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Krawk Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Krawk Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Krawk Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Starry Grundo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Starry Grundo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Purple Grundo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Purple Grundo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Tonu Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Tonu Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Purple Tonu Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Purple Tonu Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Tonu Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Tonu Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Draik Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Draik Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Draik Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Draik Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Draik Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Draik Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Draik Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Draik Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('White Ixi Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "White Ixi Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Island Ixi Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Island Ixi Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Cloud Ixi Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Cloud Ixi Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Ixi Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Ixi Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Brown Ixi Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Brown Ixi Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Fire Draik Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Fire Draik Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Ghost Draik Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Ghost Draik Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Purple Draik Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Purple Draik Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Christmas Pteri Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Christmas Pteri Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Christmas Blumaroo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Christmas Blumaroo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Christmas Chia Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Christmas Chia Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Christmas Kiko Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Christmas Kiko Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Christmas Grundo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Christmas Grundo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Christmas Kougra Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Christmas Kougra Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Christmas Scorchio Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Christmas Scorchio Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Plushie Chomby Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Plushie Chomby Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Plushie Flotsam Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Plushie Flotsam Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Plushie Bruce Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Plushie Bruce Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Plushie Grundo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Plushie Grundo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Cloud Lenny Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Cloud Lenny Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Lenny Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Lenny Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Lenny Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Lenny Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Lenny Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Lenny Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Plushie Scorchio Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Plushie Scorchio Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Plushie Buzz Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Plushie Buzz Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Plushie Aisha Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Plushie Aisha Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Plushie Kau Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Plushie Kau Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Island Blumaroo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Island Blumaroo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Island Kiko Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Island Kiko Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Island Uni Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Island Uni Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Island Gelert Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Island Gelert Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Electric Grarrl Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Electric Grarrl Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Darigan Eyrie Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Darigan Eyrie Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Fire Lupe Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Fire Lupe Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Fire Moehog Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Fire Moehog Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Fire Buzz Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Fire Buzz Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Fire Chia Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Fire Chia Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Brain Of Mirgle') != -1) { 
	var item = document.evaluate('//b[. = "Brain Of Mirgle"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Slorg Slime') != -1) { 
	var item = document.evaluate('//b[. = "Slorg Slime"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Eye Of Mortog') != -1) { 
	var item = document.evaluate('//b[. = "Eye Of Mortog"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Bloodberry Elixir') != -1) { 
	var item = document.evaluate('//b[. = "Bloodberry Elixir"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Plushie Jetsam Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Plushie Jetsam Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Plushie Cybunny Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Plushie Cybunny Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Plushie Korbat Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Plushie Korbat Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Cloud Scorchio Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Cloud Scorchio Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Starry Scorchio Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Starry Scorchio Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Cloud Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Cloud Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Disco Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Disco Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Ghost Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Ghost Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Island Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Island Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Striped Shoyru Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Striped Shoyru Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Water Faerie Bubbles') != -1) { 
	var item = document.evaluate('//b[. = "Water Faerie Bubbles"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Light Faerie Dust') != -1) { 
	var item = document.evaluate('//b[. = "Light Faerie Dust"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Yurble Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Yurble Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Rainbow JubJub Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Rainbow JubJub Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Island Jubjub Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Island Jubjub Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Halloween Nimmo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Halloween Nimmo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Spotted Nimmo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Spotted Nimmo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Starry Nimmo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Starry Nimmo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Island Nimmo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Island Nimmo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Pirate Wocky Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Pirate Wocky Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Wocky Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Wocky Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Wocky Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Wocky Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Wocky Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Wocky Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Rainbow Kau Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Rainbow Kau Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Starry Kau Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Starry Kau Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Spotted Kau Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Spotted Kau Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Baby Kau Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Baby Kau Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Ghost Acara Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Ghost Acara Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Faerie Acara Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Faerie Acara Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Tyrannian Flotsam Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Tyrannian Flotsam Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Rainbow Flotsam Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Rainbow Flotsam Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Spotted Flotsam Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Spotted Flotsam Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Tuskaninny Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Tuskaninny Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Tuskaninny Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Tuskaninny Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Fire Tuskaninny Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Fire Tuskaninny Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Plushie Tuskaninny Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Plushie Tuskaninny Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Shadow Skeith Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Shadow Skeith Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Plushie Skeith Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Plushie Skeith Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Island Skeith Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Island Skeith Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Fire Skeith Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Fire Skeith Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Baby Uni Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Baby Uni Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Baby Acara Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Baby Acara Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Baby Aisha Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Baby Aisha Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Baby Jetsam Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Baby Jetsam Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Baby Bruce Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Baby Bruce Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Fire Kiko Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Fire Kiko Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Ghost Kiko Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Ghost Kiko Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Plushie Kiko Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Plushie Kiko Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Kiko Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Kiko Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Kiko Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Kiko Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Shadow Blumaroo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Shadow Blumaroo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Faerie Blumaroo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Faerie Blumaroo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Fire Blumaroo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Fire Blumaroo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Snow Blumaroo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Snow Blumaroo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Starry Kacheek Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Starry Kacheek Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Pirate Kacheek Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Pirate Kacheek Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Fire Kacheek Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Fire Kacheek Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Disco Kacheek Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Disco Kacheek Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Island Peophin Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Island Peophin Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Ghost Peophin Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Ghost Peophin Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Shadow Peophin Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Shadow Peophin Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Shadow Ruki Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Shadow Ruki Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Faerie Grundo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Faerie Grundo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Darigan Grundo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Darigan Grundo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Island Grundo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Island Grundo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Halloween Techo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Halloween Techo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Plushie Techo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Plushie Techo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Island Techo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Island Techo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Snow Techo Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Snow Techo Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Faerie Poogle Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Faerie Poogle Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Pirate Poogle Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Pirate Poogle Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Checkered Poogle Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Checkered Poogle Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Snow Eyrie Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Snow Eyrie Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Pirate Eyrie Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Pirate Eyrie Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Starry Eyrie Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Starry Eyrie Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Island Eyrie Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Island Eyrie Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Halloween Grarrl Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Halloween Grarrl Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Cloud Grarrl Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Cloud Grarrl Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Grey Grarrl Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Grey Grarrl Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Bori Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Bori Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Green Bori Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Green Bori Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Bori Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Bori Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Bori Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Bori Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Glowing Korbat Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Glowing Korbat Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Ghost Korbat Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Ghost Korbat Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Island Korbat Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Island Korbat Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Maraquan Korbat Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Maraquan Korbat Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Purple Pteri Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Purple Pteri Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Fire Pteri Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Fire Pteri Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Cloud Bruce Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Cloud Bruce Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Faerie Bruce Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Faerie Bruce Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Fire Bruce Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Fire Bruce Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Snow Bruce Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Snow Bruce Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Island Bori Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Island Bori Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Snow Bori Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Snow Bori Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Fire Bori Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Fire Bori Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Yellow Gelert Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Yellow Gelert Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Red Gelert Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Red Gelert Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Blue Gelert Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Blue Gelert Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Maraquan Acara Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Maraquan Acara Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Maraquan Meerca Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Maraquan Meerca Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
else if (document.body.innerHTML.indexOf('Maraquan Mynci Morphing Potion') != -1) { 
	var item = document.evaluate('//b[. = "Maraquan Mynci Morphing Potion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	miscellaneous();
	return;
}
// End Magic Shop Items
// Randomly Refresh
else {
	window.setTimeout(function(){window.location.reload();}, randTimeMS)
};
// End of Randomly Refresh
/* End of Autograb and Refresh */

