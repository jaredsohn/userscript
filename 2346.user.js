// GoogleReaderQuickLinks
// version 0.9.2
// 2008-4-5
// Copyright (c) 2005, Ben Beckwith (ben at whitebucket dot com)
// Copyright (c) 2007, Ugo Di Profio
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Reader Quick Links", and click Uninstall.
//
// --------------------------------------------------------------------
//
// I am a keyboard junkie and I often click on links within
// the body of an entry, but I prefer a keyboard shortcut.
// This script will label the links (0-9) and allow quick access
// to any link by pressing 'f' and then the corresponding digit.
// This script also allows a page to be loaded in the background by
// pressing 'f' and then 'f'
// The script uses GM_openInTab for the links.
//
// Extended version by Ugo Di Profio
// Added support for handling post with more than 10 links. 
// Pressing keystroke f+l multiple times will move by blocks of
// 10 consecutive links, tagged [0-9] as in the original script.
// At any give time, only a subset of 10 links will be available.
// Blocks will restart from top when the last link in the post is
// reached.
// 
// As of version 0.9, this script allows the user to customize the
// shortcut keys utilized.  The script adds a menu command and then
// through some simple prompts, the shortcut keys can be set.
// --------------------------------------------------------------------
// Changelog
// 0.9.2
// Added a stop to the event propagation as requested by Anthony Lieuallen
// This will fix an issue were the Firefox 'Find as you type' feature was
// being triggered.
// 0.9.1
// Fixed the script to find the links after an apparent Google Reader change
// 0.9
// Added the ability to set the shortcut keys used in this script. Now
// menu items are added that allow the user to enter in a keycode or
// key to use for the various actions.
// There is a control key that starts an action. There is a key then that
// opens the Reader items in a background tab.  There is also a key that
// labels the links in a particular reader item.
// These changes also resulted in minor reorganization of the body of the
// code handling the key presses.
// 0.5
// Updated to work with latest Google Reader
// Changed the key presses to require an 'f' first to activate commands
// This is to avoid conflicts with Google Reader's built-in shortcuts
// 0.2
// Update due to google changing their Javascript on the page.
// links are now added after the keystroke 'l'
// Also updated so that 'f' will show the original in a new tab.
// 0.1
// Initial version
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// Changelog by Ugo
// 0.8
// Added support for handling post with more than 10 links. 
// Pressing keystroke f+l multiple times will move by blocks of
// 10 consecutive links, tagged [0-9] as in the original script.
// At any give time, only a subset of 10 links will be available.
// Blocks will restart from top when the last link in the post is
// reached.
// 0.7
// Added secure (https) versions in include directives
// 0.6
// Initial version based on version 0.5 of original code
// --------------------------------------------------------------------

//
// ==UserScript==
// @name          Google Reader Quick Links
// @namespace     http://whitebucket.com/greasemonkey
// @description   Adds shortcut keys for links in the body of an item in Google Reader.
// @include       http://reader.google.com/*
// @include       https://reader.google.com/*
// @include	  http://www.google.com/reader/*
// @include	  https://www.google.com/reader/*
// @include	  http://google.com/reader/*
// @include	  https://google.com/reader/*
// ==/UserScript==

// This flag indicates that the control key has been pressed
var controlkey = 0;
// This variable keep track of the current set of enumerated links.
var linkOffset = 0;
// This variable describes the size of the links
var linkNumber = 10;


// The following variables are the shorcut (hotkey) key codes used.
// The Control key code is the main button to push to "activate" the features of this script
// The Open key code opens a Google Reader item in a background tab
// The Label key code enumerates the links within the body of a Google Reader Item.
var controlKeyCode = 102; // "f"
var openKeyCode    = 102; // "f"
var labelKeyCode   = 108; // "l"


// The following 'if' blocks see if there is a value saved in the
// Greasemonkey registry and read that value if it is.
if(GM_getValue('controlKeyCode')){
    controlKeyCode = GM_getValue('controlKeyCode');
}
if(GM_getValue('openKeyCode')){
    openKeyCode = GM_getValue('openKeyCode');
}
if(GM_getValue('labelKeyCode')){
    labelKeyCode = GM_getValue('labelKeyCode');
}

// Put in a menu command to set/reset the key codes
if (!GM_registerMenuCommand) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
}else{
    GM_registerMenuCommand("GRQL: Set the shortcut keys",setShortcutKeys);
}

// This function prompts the user for a key or key code.
// Arguments:
//    msg:            The message to display to the user
//    defaultKeyCode: The default key code to display in the prompt
// The function prompts the user for a keycode. Upon return from the user prompt,
// the entry is checked to see if the user entered in a keycode or simply a key
// (for example, 'f' vs. '102').  Then the correct keycode is returned to the
// calling function.
function getKeyOrKeyCode(msg,defaultKeyCode){
    var keyOrCode = prompt(msg + "\nCurrent Key: " + String.fromCharCode(defaultKeyCode) + " , KeyCode: " + defaultKeyCode,defaultKeyCode);
    if(keyOrCode.match(/\d{2,3}/)){ // Match 2-3 digit strings.
	keyOrCode = parseInt(keyOrCode);
	return keyOrCode;
    }else{
	return keyOrCode.charCodeAt(0);
    }
}

// Set all three shortcut keys
function setShortcutKeys(){
    setControlKey();
    setOpenKey();
    setLabelKey();
}

// Set the control key
function setControlKey(){
    controlKeyCode = getKeyOrKeyCode("Enter in the Key or KeyCode to use as your control key.",controlKeyCode);
    GM_setValue('controlKeyCode',controlKeyCode);
}

// Set the open key
function setOpenKey(){
    openKeyCode = getKeyOrKeyCode("Enter in the Key or KeyCode to use as your open key.",openKeyCode);
    GM_setValue('openKeyCode',openKeyCode);
}

// Set the label key
function setLabelKey(){
    labelKeyCode = getKeyOrKeyCode("Enter in the Key or KeyCode to use as your label key.",labelKeyCode);
    GM_setValue('labelKeyCode',labelKeyCode);
}

// Apply the numberical [X] to the links
function LabelLinks() {
    // Get the list of links in the item's body
    var links = getCurrentItemLinks();

    // Remove Labels from previous block
    for(var i = (linkOffset-linkNumber); (linkOffset>=linkNumber)&&(i < links.length )&&(i<linkOffset); i++){
	linkname = links[i].innerHTML;
	links[i].innerHTML = linkname.substring(0,linkname.length-4);
    }
    // Check if last block of links have been labeled already, and reset offset.
    if ( linkOffset > links.length ) {
	linkOffset = 0;
    }
    // Loop through the links, adding the identifier
    for(var i = linkOffset; (i < links.length )&&(i<(linkNumber+linkOffset)); i++){
	links[i].innerHTML += " [" + (i-linkOffset) + "]";
    }
    linkOffset += linkNumber;
}

// Function to handle the keypress events
function LinkKey(event) {
    // Get the keycode for the keypress
    var kcode = (event.keyCode)?event.keyCode:event.which;
    // Get the key pressed in string format
    var k = String.fromCharCode(kcode);
    // If the controlkey flag is set, then the user has 'activated' the script and
    // is trying to open an item, enumerate links, or open a link.
    if(controlkey){
	// Check to see if it fits our range
	if (k >= "0" && k <= "9" && controlkey && (linkOffset>0)){
	    // If the number is in range, then get that link.
	    var links = getCurrentItemLinks();
	    var link  = links[eval(k)+linkOffset-linkNumber]; 
	    if(link){
		// If the link is valid, open it in a tab.
		GM_openInTab(link.href);
	    }
	}
	// If the label key has been pressed, then enumerate the links.
	if (kcode == labelKeyCode){
	    LabelLinks();
	}
	// If the open key has been pressed, then open the Google Reader item in a tab.
	if (kcode == openKeyCode){
	    GM_openInTab(document.getElementById("current-entry").getElementsByTagName("A")[0].href);
	    linkOffset = 0;
	}
	// Stop the event from being processed.
	event.stopPropagation();
	// Reset the controlkey flag
	controlkey = 0;
    }else{
	// set the controlkey flag if the control key has been pressed.
	if (kcode == controlKeyCode){
	    controlkey = 1;
	    // Stop the event from being processed.
	    event.stopPropagation();
	}
    }
    // If we move away from a Google Reader item, reset the link offset
    if ( k == "o" || k == "j" || k == "k" || event.which == 13 ){
	if(controlkey==0){
	    linkOffset = 0;
	}
    }
}


// Return a list of links from the current Reader item
function getCurrentItemLinks(){
    // First, get a reference to the current entry
    var current_entry = document.getElementById("current-entry");
    // Now, get all of the DIV elements under this node.
    var elements = current_entry.getElementsByTagName('DIV');
    // Setup a placeholder for the item body element
    var itembody;
    // Setup the regular expression to find the class name
    var classregex = new RegExp('\\bitem-body\\b');
    // Loop through the DIV elements and set the itembody
    // when it is found
    for(var i = 0; i< elements.length; i++){
	if(classregex.test(elements[i].className)) 
	    itembody = elements[i];
    }
    // Return the links found in the body
    return itembody.getElementsByTagName("A");
}

// Add listener for to handle the keypress events.
document.addEventListener("keypress", LinkKey, true);
