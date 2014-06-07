// ==UserScript==
// @name		NatNit's Safe Dungeon Closer
// @description Version 0.3 - Never again will you accidentally close Hobopolis!
// @include 	http://*kingdomofloathing.com/clan_basement.php*
// @include		http://127.0.0.1:60*/clan_basement.php*
// @exclude		http://forums.kingdomofloathing.com/*
// ==/UserScript==

// Changelog:

// v0.3 - 20090629 - Added initial hiding of hobopolis form, with a click to make it visible. First public version
// v0.2 - 20090628 - Added ability to place Slimetube confirmation about Hobopolis confirmation
// v0.1 - 20090628 - First version, colorizes and changes font size of explanation text and modifies submission buttons for Hobopolis

// Find text to identify Slime and Hobop
var Paragraphs = document.getElementsByTagName('p');

var SlimeIndex = -1;
var HoboIndex = -1;

for (var i = 0; i < Paragraphs.length; i++) {
	if (Paragraphs[i].innerHTML.indexOf("put down some new cement and seal up the Slime Tube.") != -1) {
		var SlimeIndex = i;
	}
	else if (Paragraphs[i].innerHTML.indexOf("close off the sewers leading to Hobopolis.  This will make") != -1) {
		var HoboIndex = i;
	}
}

SlimeOpen = (SlimeIndex != -1);
HoboOpen = (HoboIndex != -1);

if (SlimeOpen) {
	Paragraphs[SlimeIndex].style.color = "green";
}
if (HoboOpen) {
	Paragraphs[HoboIndex].style.color = "red";
	Paragraphs[HoboIndex].style.fontSize = "xx-small";
}

// Appropriate forms which include buttons, etc
if (HoboOpen) {
	var HoboForm = Paragraphs[HoboIndex].parentNode.lastChild.firstChild.firstChild.nextSibling;
}
if (SlimeOpen) {
	var SlimeForm = Paragraphs[SlimeIndex].parentNode.lastChild.firstChild.firstChild.nextSibling;
}

// Hobop button changes
if (HoboOpen) {
	HoboForm.value = "DO NOT CLICK HERE";
	HoboForm.style.color = "red";
	HoboForm.style.fontSize = "xx-large";
	HoboForm.style.textDecoration = "line-through";
}

// Slime button changes
if (SlimeOpen) {
	SlimeForm.style.color = "green";
	SlimeForm.style.fontSize = "xx-large";
}

// Begin condensing of Hobopolis
if (HoboOpen) {
	var HoboHeader = Paragraphs[HoboIndex];
	for (var i = 0; i < 8; i++) {
		HoboHeader = HoboHeader.parentNode;
	}

	var blockToHide = HoboHeader.firstChild.nextSibling; // What do we want to toggle?
	blockToHide.setAttribute("finder","fun");
	HoboHeader.parentNode.setAttribute("width","100%"); // Hack to get it the right width

	HoboHeader = HoboHeader.firstChild.firstChild;
	HoboHeader.removeChild(HoboHeader.firstChild); // get rid of Bold to create new node (following inventory page example)

	// Re-add nodes
	var firstLevel = document.createElement('B');
	var secondLevel = document.createElement('FONT');
	secondLevel.setAttribute("color","white");
	secondLevel.innerHTML = "Hobopolis (click to expand)";

	firstLevel.appendChild(secondLevel);
	HoboHeader.appendChild(firstLevel);

	// Hide it at first
	blockToHide.style.display = "none";

	// But click to show
	secondLevel.setAttribute("onclick","var hid = document.getElementsByTagName('tr'); for (var i = 0; i < hid.length; i++) hid[i].style.display = \"\"; return false;")
}

// Put SlimeTube above Hobopolis
if (HoboOpen) {
	var SlimeNode = Paragraphs[SlimeIndex];
	var HoboNode = Paragraphs[HoboIndex];
	for (var i = 0; i < 9; i++) {
		SlimeNode = SlimeNode.parentNode;
		HoboNode = HoboNode.parentNode;
	}
	var SharedParent = HoboNode.parentNode;

	var TempHobo = HoboNode.cloneNode(true);
	SharedParent.removeChild(HoboNode);
	SharedParent.appendChild(TempHobo);
}