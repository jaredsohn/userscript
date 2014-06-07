// ==UserScript==
// @name           Dinosaur Comics Overlay Chooser
// @namespace      http://userscripts.org/users/didero
// @description    Dinosaur Comics has a fairly hidden feature where you can get an overlay that replaces the regular characters with, for instance, XKCD or Problem Sleuth images. This script makes it easier to get to those overlays by providing a drop-down box to select from.
// @include        http://www.qwantz.com/index.php*
// @include        http://qwantz.com/index.php*
// @version        1.8.1
// @updateURL      http://userscripts.org/scripts/source/110198.meta.js
// @downloadURL    https://userscripts.org/scripts/source/110198.user.js
// @grant          none
// ==/UserScript==

//Name of each overlay. If you discover more, feel free to add them. Send them to me too, so I can add them myself.
//  The entries here are how they will be shown in the drop-down box.
//  When you select an option, the spaces will be removed and it will be converted to lower case. That string will then be added to the URL.
//  If there is a special way the option should be added to the URL (like the RIAA one, where 'RIAA' needs to be capitalized),
//   add the way it should be displayed, then add '|' and then the way it should be added to the URL. Look at the RIAA one for an example.
const listOfOverlays = ["A Lesson Is Learned But The Damage Is Irreversible", "About Pirates", "Achewood", "Brodyquest", "Buttercup Festival", "Daisy Owl", "DC Comics", "Dr McNinja", "Just About T-Rex", "Nedroid", "On April Fools Day 2014", "One Done In Watercolours", "One Where T-Rex Got Assimilated", "One Where T-Rex Swears More", "One Where T-Rex Wears More", "Penny Arcade", "Pokey", "Problem Sleuth", "Registered Weapon", "Shortpacked", "Sister Claire", "Something More Historically Accurate", "Something That Will Destroy My Brain", "Sweet Bro And Hella Jeff", "The Last Dinosaur Comic Ever", "The RIAA Version Of The Internet|theRIAAversionoftheinternet", "The Same Pictures", "Wigu", "Wondermark", "XKCD"];

//The label in front of the drop-down box. (Not always used, depends on position)
const label = 'But I Would Rather Be Reading: ';
//The topmost option in the dropdown box, that when selected shows the comic without any overlays, as nature intended
const optionNoOverlayText = 'Default Dinosaur Discourse';
//The text for the custom overlay option, if there is one set
const optionCustomOverlayText = 'Something Of My Own Choosing';
//If a URL is specified as overlay, a separate entry is added to the dropdown list. This text will be used as that entry
const optionUrlOverlayText = 'The Input Of The Internet';
//There's an overlay called 'surpriseme', which uses a random overlay each refresh. Put it in a separate choice instead of in the main lineup, because it's different
const optionRandomOverlayText = 'Something More Surprising';

/**********************
DON'T EDIT UNDER THIS LINE UNLESS YOU KNOW WHAT YOU'RE DOING
IF YOU MAKE IMPROVEMENTS, PLEASE LET ME KNOW. THANKS
**********************/
//Some functions to replace built-in Greasemonkey functions, for portability
function setValue(key, value) {
	localStorage.setItem("DCOC_"+key, value);
}
function getValue(key, defaultValue) {
	var value = localStorage.getItem("DCOC_"+key);
	if (value) return value;
	else return defaultValue;
}
function keyExists(key) {
	return localStorage.getItem(key) !== null;
}
function deleteValue(key) {
	localStorage.removeItem("DCOC_"+key);
}
function deleteAllValues() {
	//Don't use 'localStorage.clear()' since that also clears the data of other scripts
	for (var i = 0, len = localStorage.length; i < len; i++) {
		var key = localStorage.key(i);
		if (key.indexOf("DCOC_") == 0) localStorage.removeItem(key);
	}
}
function isValueStored() {
	for (var i = 0, len = localStorage.length; i < len; i++) {
		if (localStorage.key(i).indexOf("DCOC_") == 0) return true;
	}
	return false;
}


//Utility functions
function createLink(text, parent, addNewLineToParent, onclick) {
	var link = document.createElement('a');
	link.href = document.location.href;
	link.innerHTML = text;
	link.style.cssText = 'font-weight: normal; font-size: 12px; color: #000000;'; //Make sure it displays properly in all possible locations
	
	parent.appendChild(link);
	if (addNewLineToParent == true) parent.appendChild(document.createElement('br'));
	if (onclick) link.onclick = onclick;
	return link;
}

//This function retrieves the GET value of the provided key, if it exists (Source: http://stackoverflow.com/questions/827368/use-the-get-paramater-of-the-url-in-javascript)
function getQueryVariable(variable) {
	//Split up the part of the url after the question mark in key-value pairs
	var vars = window.location.search.substring(1).split("&");
	//Go through each of the pairs to see if it matches the provided variable
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	//If the requested variable wasn't found, return null
	return null;
}

//A function to test if a string is a URL. Simply checking if it starts with 'http' isn't good enough, since it throws an error if the string is null
function isUrl(line) {
	if (line != null) {
		if (line.search('http')==0) return true;
	}
	return false;
}

//Set and/or retrieve some initial values, needed in the rest of the script
var url = "http://www.qwantz.com/index.php?";
var comicNumber = getQueryVariable("comic");
if (comicNumber != null) url += "comic=" + comicNumber +"&";
var overlayName = getQueryVariable('butiwouldratherbereading');
var dropdownLocation = getValue('location', 3);


//If a specific overlay is set to 'remember', redirect to that if we're not there already
var savedOverlay = getValue('overlay', '');
if (savedOverlay != '' && savedOverlay != 'none') {
	if (overlayName != savedOverlay) {
		window.location.href = url + 'butiwouldratherbereading='+savedOverlay;
	}
}

//If the overlay name has been set to the custom overlay or if a URL has been set, use that as overlay
if (overlayName == 'custom' || isUrl(overlayName)) {
	var overlayLocation = '';
	if (overlayName == 'custom') overlayLocation = getValue('customOverlay', '');
	else overlayLocation = overlayName;
	//If there's no custom overlay set, redirect to the overlay-less page
	if (overlayLocation == '') {
		window.location.href = url.substring(0, url.length-1);
	}
	//Otherwise, immitate the official overlays by setting the overlay as the main comic image and the actual comic as background through CSS
	else {
		var comic = document.getElementsByClassName('comic');
		//Sometimes there's multiple comics per page (#2340), account for that and apply the overlay to all of them
		if (comic.length > 0) {
			for (var i = 0, len = comic.length; i < len; i++) {
				comic[i].style.backgroundImage = 'url("'+comic[i].src+'")';
				comic[i].src = overlayLocation;
				comic[i].className = '';
			}
		}
	}
}

//Create the dropdown list
var selectBox = document.createElement('select');
selectBox.onchange=function() {
	//Store the overlay as favourite, if that is enabled by the user
	if (getValue('overlay', '') != '') {
		//Only store it if the user isn't going to the default overlay-less page
		setValue('overlay', selectBox.value);
	}
	//Then redirect to the appropriate overlay
	if (selectBox.value == 'none' || selectBox.value == '') window.location.href = url.substring(0, url.length-1);
	else window.location.href = url + 'butiwouldratherbereading=' + selectBox.value;
	//return false;
}
//Fill the select box with the provided overlay options
selectBox.add(new Option(optionNoOverlayText, 'none'), null);
//If there's a custom overlay set, add the option to choose that
if (getValue('customOverlay','') != '') {
	selectBox.add(new Option(optionCustomOverlayText, 'custom'), null);
	if (overlayName == 'custom') selectBox.selectedIndex = selectBox.length-1;
}
//If the current overlay is a URL, add a seperate option for that, for clarity's sake
if (isUrl(overlayName)) {
	selectBox.add(new Option(optionUrlOverlayText, overlayName), null);
	selectBox.selectedIndex = selectBox.length-1;
}
//Add the choice for a random overlay
selectBox.add(new Option(optionRandomOverlayText, 'surpriseme'), null);
if (overlayName == 'surpriseme') selectBox.selectedIndex = selectBox.length-1;
selectBox.add(new Option("----", ""), null);
selectBox.options[selectBox.length-1].disabled = "disabled"; //The dashed line shouldn't be selectable
for (var i=0, len = listOfOverlays.length; i < len; i++) {
	var displayName = listOfOverlays[i];
	var valueName;
	//If there's a special value name, retrieve that
	var sepPos = displayName.indexOf('|');
	if (sepPos > -1) {
		valueName = displayName.substring(sepPos+1);
		displayName = displayName.substring(0, sepPos);
	}
	else valueName = displayName.toLowerCase().replace("-", "").split(" ").join("");

	selectBox.add(new Option(displayName, valueName), null);
	//If the overlay specified in the URL is the same as the one currently being added to the dropdownlist, select it
	if (overlayName == valueName) selectBox.selectedIndex = selectBox.length-1;
}

//Then create the mouse-over options menu
var menu = document.createElement('div');
menu.style.cssText = 'position: absolute; border: solid #000000; border-width: 2px 2px 4px 3px; visibility: hidden; background-color: #FFFFFF; z-index: 100; left: 0px; top: 75%; width: 200px;'; //Border is set to match the comic's
menu.isMousedOver = false;
menu.onmouseover = function() {
	this.isMousedOver = true;
}
menu.onmouseout = function() {
	this.isMousedOver = false;
	this.style.visibility = 'hidden';
}

//Let's add some entries to the menu!
// First to set the location of the dropdown box
if (dropdownLocation != 1) {
	createLink('Move To Header', menu, true, function() {setLocation(1); return false;});
}
if (dropdownLocation != 2) {
	createLink('Move To Above The Comic', menu, true, function() {setLocation(2); return false;});
}
if (dropdownLocation != 3) {
	createLink('Move To Below The Comic', menu, true, function() {
		//Below comic is standard, no need to store location anymore
		deleteValue('location');
		window.location.reload();
		return false;
	}); 
}
// Then to set a favourite overlay
if (getValue('overlay', '') == '' && overlayName != null) {
	createLink('Always Use Current Overlay', menu, true, function() {
		setValue('overlay', overlayName);
		alert('The next time you visit Dinosaur Comics, you will be automatically redirected to this overlay.');
		return false;
	});
}
// If there already is a stored overlay, allow it to be cleared
else if (getValue('overlay', '') != '') {
	createLink('Stop Always Using Current Overlay', function() {
		deleteValue('overlay');
		alert('You will no longer be automatically redirected to an overlay.');
		return false;
	});
}
//Custom overlay
if (getValue('customOverlay', '') != '') createLink('Change Custom Overlay', menu, true, function() {setCustomOverlay(); return false;});
else createLink('Set Custom Overlay', menu, true, function() {setCustomOverlay(); return false;});
// Also allow the option to clear values stored by this script, if there are any
if (isValueStored() > 0) {
	createLink('Delete All Data Stored By This Script', menu, true, function() {
		deleteAllValues();
		alert('All stored data was successfully deleted');
		window.location.reload();
		return false;
	});
}

//And add functions to handle those choices
// Location choices
function setLocation(location) {
	setValue('location', location);
	window.location.reload();
}
// Custom overlay
function setCustomOverlay() {
	var customOverlay = prompt('Enter the exact location of the overlay image\nLeave empty to clear the stored value', getValue('customOverlay','http://')); //Ask the user which URL they want to use, as default use the current one if applicable
	if (customOverlay != null ) { //If the user didn't cancel
		//If empty return, clear stored value
		if (customOverlay == '' || customOverlay == 'http://') {
			deleteValue('customOverlay');
			window.location.reload();
		}
		else {
			setValue('customOverlay', customOverlay);
			window.location.href = url + 'butiwouldratherbereading=custom';
		}
	}
}

//Create an image to mouse-over to display the menu
var img = document.createElement('span');
img.style.cssText = "position: relative; background-image: url('http://i.imgur.com/Bp5pU.png'); background-repeat: no-repeat; width: 20px;";
img.innerHTML = '&nbsp;&nbsp;&nbsp;';
img.appendChild(menu);
img.menu = menu;
img.onmouseover = function() {
	this.menu.style.visibility = 'visible';
}
img.onmouseout = function() {
	if (!this.menu.isMousedOver) {
		this.menu.style.visibility = 'hidden';
	}
}
//Tie it all together
var selectBoxDisplay = document.createElement('span');
selectBoxDisplay.appendChild(selectBox);
selectBoxDisplay.appendChild(img);


/*DISPLAY THE DROPDOWN IN THE TOP MENU*/
if (dropdownLocation == 1) {
	//Find the 'About' link, since our dropdown box will be added just after it
	var aboutLink = document.evaluate(
			"//a[@href='http://www.qwantz.com/about.php']",
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
	);
	if (aboutLink.snapshotLength == 1) {
		aboutLink = aboutLink.snapshotItem(0);
		aboutParent = aboutLink.parentNode.parentNode;

		//Insert a separating bullet, like with the other links
		var separator = document.createElement('li');
		separator.className = 'paddedbullet';
		separator.innerHTML = '\u2022'; //the '\u2022' is the bullet character used to separate the links
		aboutParent.appendChild(separator);
		
		//since all other menu items are contained in an 'li', this one should be no different
		var selectContainer = document.createElement("li");
		selectContainer.appendChild(selectBoxDisplay);

		//Finally, display the dropdown box
		aboutParent.appendChild(selectContainer);
	}
}

//Display the dropdown between the header and the comic
else if (dropdownLocation == 2) {
	var newRow = document.getElementById('header').getElementsByTagName('table')[0].insertRow(2); //Below the Utahr.-Rex conversation (1 = above)
	var newCell = newRow.insertCell(0);
	newCell.colSpan=2;
	newCell.className = 'white';
	newCell.align = 'center';
	newCell.style.fontWeight = 'bold';
	newCell.innerHTML = label;
	newCell.appendChild(selectBoxDisplay);
}

//Display the dropdown below the comic
else {
	var comic = document.getElementsByClassName('comic');
	//Some pages have multiple comics (page 2340). Allow for that (hence length-1 instead of just '0'
	if (comic.length >= 1) comic = comic[comic.length-1];
	else {
		//If there's an overlay active, the image tag changes. Now it's the only image with a 'style' tag
		comic = document.evaluate(
			"//img[contains(@style, 'background')]",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
		);
		if (comic.snapshotLength == 1) comic = comic.snapshotItem(0);
		else comic = null;
	}
	
	if (comic) {
		var display = document.createElement('div');
		display.innerHTML = label;
		display.appendChild(selectBoxDisplay);
		display.style.fontWeight = 'bold';
		
		var comicParent = comic.parentNode;
		//If the comic is a link, put the dropdown outside the link. With multiple comics, the dropdown has to go one further up the hierarchy
		if (comicParent.tagName == 'A' || comicParent.tagName == 'DIV') {
			comicParent = comicParent.parentNode;
		}
		comicParent.appendChild(display);
	}
}