// ==UserScript==
// @name		Chocolate Factory Rser 
// @description		Randomly refreshes Chocolate Factory in the interval specified under "Constants" until an item listed under "Autograb and Refresh" appears, which is then autograbbed.
// @include		http://*.neopets.*/objects.phtml?type=shop&obj_type=14
// @include		http://*.neopets.*/objects.phtml?obj_type=14&type=shop
// Made by DX and CH
// ==/UserScript==

/* Constants */
var randNumMin = 4.311; // Set the minimum value that can be generated for randNum
var randNumMax = 6.855; // Set the maximum value that can be generated for randNum
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
function popup() { // adds additional capabilities to the script
	{alert("RS!")} // creates a popup to alert the user that an item in the list below was autograbbed
}
/* End of Functions */

/* Autograb and Refresh */
if (document.body.innerHTML.indexOf('<DO NOT REMOVE') != -1) {
	var item = document.evaluate('//b[. = "DO NOT REMOVE"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	popup();
	return;
}
// Chocolate Factory Items
else if (document.body.innerHTML.indexOf('Mint Chocolate Kacheek') != -1) { 
	var item = document.evaluate('//b[. = "Mint Chocolate Kacheek"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Dark Chocolate Poogle') != -1) { 
	var item = document.evaluate('//b[. = "Dark Chocolate Poogle"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Orange Chocolate Scorchio') != -1) { 
	var item = document.evaluate('//b[. = "Orange Chocolate Scorchio"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Juppiemint Bar') != -1) { 
	var item = document.evaluate('//b[. = "Juppiemint Bar"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Charcoal Jelly Beans') != -1) { 
	var item = document.evaluate('//b[. = "Charcoal Jelly Beans"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Brussel Sprout Jelly Beans') != -1) { 
	var item = document.evaluate('//b[. = "Brussel Sprout Jelly Beans"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Sweet Necklace') != -1) { 
	var item = document.evaluate('//b[. = "Sweet Necklace"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Peophin Chocolate Medallion') != -1) { 
	var item = document.evaluate('//b[. = "Peophin Chocolate Medallion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Buzz Chocolate Bar') != -1) { 
	var item = document.evaluate('//b[. = "Buzz Chocolate Bar"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Red Buzz Lolly') != -1) { 
	var item = document.evaluate('//b[. = "Red Buzz Lolly"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Raspberry and Vanilla Nova') != -1) { 
	var item = document.evaluate('//b[. = "Raspberry and Vanilla Nova"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Large White Chocolate Cybunny') != -1) { 
	var item = document.evaluate('//b[. = "Large White Chocolate Cybunny"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Chocolate Balthazar') != -1) { 
	var item = document.evaluate('//b[. = "Chocolate Balthazar"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Orange Chocolate Pyramid') != -1) { 
	var item = document.evaluate('//b[. = "Orange Chocolate Pyramid"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Orange Gummy Stamp') != -1) { 
	var item = document.evaluate('//b[. = "Orange Gummy Stamp"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Mint Chocolate Lupe') != -1) { 
	var item = document.evaluate('//b[. = "Mint Chocolate Lupe"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Dark Chocolate Shoyru') != -1) { 
	var item = document.evaluate('//b[. = "Dark Chocolate Shoyru"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Ummagine Candy Cane') != -1) { 
	var item = document.evaluate('//b[. = "Ummagine Candy Cane"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Toffee Dubloon') != -1) { 
	var item = document.evaluate('//b[. = "Toffee Dubloon"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Mint Chocolate Blumaroo') != -1) { 
	var item = document.evaluate('//b[. = "Mint Chocolate Blumaroo"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Dark Chocolate Skeith') != -1) { 
	var item = document.evaluate('//b[. = "Dark Chocolate Skeith"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Strawberry Fondant Surprise') != -1) { 
	var item = document.evaluate('//b[. = "Strawberry Fondant Surprise"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Fluff N Stuff Grarrl Gobstopper') != -1) { 
	var item = document.evaluate('//b[. = "Fluff N Stuff Grarrl Gobstopper"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('White Chocolate Nova') != -1) { 
	var item = document.evaluate('//b[. = "White Chocolate Nova"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Chocolate King Skarl') != -1) { 
	var item = document.evaluate('//b[. = "Chocolate King Skarl"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Codestone Truffle') != -1) { 
	var item = document.evaluate('//b[. = "Codestone Truffle"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Mint Chocolate Chia') != -1) { 
	var item = document.evaluate('//b[. = "Mint Chocolate Chia"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Apple and Custard Drops') != -1) { 
	var item = document.evaluate('//b[. = "Apple and Custard Drops"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Kau Sundae') != -1) { 
	var item = document.evaluate('//b[. = "Kau Sundae"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Banana Jelly Flotsam') != -1) { 
	var item = document.evaluate('//b[. = "Banana Jelly Flotsam"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Mint Chocolate Peophin') != -1) { 
	var item = document.evaluate('//b[. = "Mint Chocolate Peophin"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Minty Choccywhip') != -1) { 
	var item = document.evaluate('//b[. = "Minty Choccywhip"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Bullseyes') != -1) { 
	var item = document.evaluate('//b[. = "Bullseyes"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Large Swirly Chocolate Cybunny') != -1) { 
	var item = document.evaluate('//b[. = "Large Swirly Chocolate Cybunny"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Chocolate Jeran') != -1) { 
	var item = document.evaluate('//b[. = "Chocolate Jeran"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Super Spicy Jelly Beans') != -1) { 
	var item = document.evaluate('//b[. = "Super Spicy Jelly Beans"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Yummy Drops') != -1) { 
	var item = document.evaluate('//b[. = "Yummy Drops"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Grape Gummy Glorg') != -1) { 
	var item = document.evaluate('//b[. = "Grape Gummy Glorg"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Chocolate Dr Sloth') != -1) { 
	var item = document.evaluate('//b[. = "Chocolate Dr Sloth"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Hazelnut Whirl') != -1) { 
	var item = document.evaluate('//b[. = "Hazelnut Whirl"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('ErgyFruit Jelly Beans') != -1) { 
	var item = document.evaluate('//b[. = "ErgyFruit Jelly Beans"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Chocolate Peach') != -1) { 
	var item = document.evaluate('//b[. = "Chocolate Peach"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Snowflake Chocolate Advent Calendar') != -1) { 
	var item = document.evaluate('//b[. = "Snowflake Chocolate Advent Calendar"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Creamy Choccywhip') != -1) { 
	var item = document.evaluate('//b[. = "Creamy Choccywhip"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Spooky Flying Doughnut') != -1) { 
	var item = document.evaluate('//b[. = "Spooky Flying Doughnut"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Omnipotent Onion Grarrl Gobstopper') != -1) { 
	var item = document.evaluate('//b[. = "Omnipotent Onion Grarrl Gobstopper"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Caramel and Custard Drops') != -1) { 
	var item = document.evaluate('//b[. = "Caramel and Custard Drops"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Holiday Bell Chocolate Advent Calendar') != -1) { 
	var item = document.evaluate('//b[. = "Holiday Bell Chocolate Advent Calendar"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Chocolate Advent Calendar') != -1) { 
	var item = document.evaluate('//b[. = "Chocolate Advent Calendar"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Neo Truffle') != -1) { 
	var item = document.evaluate('//b[. = "Neo Truffle"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Deluxe Strawberry Toffee Chokato') != -1) { 
	var item = document.evaluate('//b[. = "Deluxe Strawberry Toffee Chokato"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Fishy Delight Grarrl Gobstopper') != -1) { 
	var item = document.evaluate('//b[. = "Fishy Delight Grarrl Gobstopper"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Double Chocolate Jelly Beans') != -1) { 
	var item = document.evaluate('//b[. = "Double Chocolate Jelly Beans"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Chocolate Moltenore') != -1) { 
	var item = document.evaluate('//b[. = "Chocolate Moltenore"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
else if (document.body.innerHTML.indexOf('Candy Cane Chocolate Advent Calendar') != -1) { 
	var item = document.evaluate('//b[. = "Candy Cane Chocolate Advent Calendar"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	alarm();
	autograb();
	popup();
	return;
}
// End of Chocolate Factory Items
// Randomly Refresh
else {
	window.setTimeout(function(){window.location.reload();}, randTimeMS)
};
// End of Randomly Refresh
/* End of Autograb and Refresh */

