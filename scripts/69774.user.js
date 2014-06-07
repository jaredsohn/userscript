// ==UserScript==
// @name          	Accented Character Shortcuts
// @namespace		http://chaosinacan.com
// @author			Joel Spadin
// @description   	Allows entering accented characters with "Ctrl+symbol, character" shortcuts.  All shortcuts at http://office.microsoft.com/en-us/help/HP012303781033.aspx except ones that use ALT will work.
// @include       	*
// ==/UserScript==

// Based on a script by Philip Dorrell which can be found at:
// http://www.1729.com/spanish/index.html


(function () {
var userAgent = navigator.userAgent.match(/(opera|firefox)\/([0-9]+)/i);
var browser = userAgent[1].toUpperCase();
var isOpera = (browser == "OPERA");
	
var lookup;						//list of characters in format
								//lookup[Ctrl+key][character] = accented character
var shiftFix = new Array();		//list of fixes for wrong keycodes when Shift pressed
var shortcutKey = null;			//keyCode of Ctrl + [key]

var debug = false;

if (isOpera)
{
	addEventListener("DOMContentLoaded", function (e) {
		setupShortcutsOnAllTextFields();
	}
	, false);
}
else
	setupShortcutsOnAllTextFields();

//Reset stuff when unfocusing a text input
function blurHandler(event) {
	shortcutKey = null;
}

//Stuff happens when you type
function accentsKeyPressHandler(event) {
	//If not a text input, ignore
	//alert(document.activeElement.nodeName);
	if (!document.activeElement || !isTextInput(document.activeElement))
		return true;
	
	if (!event)
		event = window.event;
	//Opera uses keyCode, but Firefox uses charCode
	var code = event.keyCode == 0 ? event.charCode : event.keyCode;
	if (event.shiftKey && shiftFix[code])
			code = shiftFix[code];

	if (event.ctrlKey) {
		//Get the "Ctrl+symbol" key
		if (lookup[code] != null) {
			shortcutKey = code;
			dbg("key = " + shortcutKey);
			//Automatically add an event handler to fix stuff if you unfocus
			//the control before finishing the shortcut
			document.activeElement.addEventListener("blur", blurHandler, false);
		}
		else {
			shortcutKey = null;
		}
	}
	else if (shortcutKey != null && lookup[shortcutKey][code] != null) {
		//Write the accented character if a replacement exists
		addAccent(document.activeElement, lookup[shortcutKey][code]);
		event.preventDefault();
	}
	else
		shortcutKey = null;
	return true;
}

//Returns whether a node is a text input box
function isTextInput(node)
{
	return (node.nodeName.toLowerCase() == "textarea" ||
		(node.nodeName.toLowerCase() == "input" && (node.type.toLowerCase() == "text" || node.type.toLowerCase() == "password")) ||
		isRichText(node));
}

//Returns whether a node is a rich text area
function isRichText(node)
{
	//In Firefox, the Gmail editor doesn't have the contenteditable attribute.  wut?
	return node.getAttribute("contenteditable") != null || node.getAttribute("g_editable") != null;
}

function setupShortcutsOnAllTextFields() {
	var shortcuts = [
		[96, [ // `
			[97, 224], //a
			[101, 232], //e
			[105, 236], //i
			[111, 242], //o
			[117, 249], //u
			[65, 192], //A
			[69, 200], //E
			[73, 204], //I
			[79, 210], //O
			[85, 217] //U
		]],
		[39, [ // '
			[97, 225], //a
			[100, 240], //d
			[101, 233], //e
			[105, 237], //i
			[111, 243], //o
			[117, 250], //u
			[121, 253], //y
			[65, 193], //A
			[68, 208], //D
			[69, 201], //E
			[73, 205], //I
			[79, 211], //O
			[85, 218], //U
			[89, 221] //Y
		]],
		[94, [ // ^
			[97, 226], //a
			[101, 234], //e
			[105, 238], //i
			[111, 244], //o
			[117, 251], //u
			[65, 194], //A
			[69, 202], //E
			[73, 206], //I
			[79, 212], //O
			[85, 219] //U
		]],
		[126, [ // ~
			[97, 226], //a
			[110, 241], //n
			[111, 244], //o
			[65, 194], //A
			[78, 209], //N
			[79, 212], //O
		]],
		[59, [ // :
			[97, 228], //a
			[101, 235], //e
			[105, 239], //i
			[111, 246], //o
			[117, 252], //u
			[121, 255], //y
			[65, 196], //A
			[69, 203], //E
			[73, 207], //I
			[79, 214], //O
			[85, 220], //U
			[89, 376] //Y?
		]],
		[64, [ //@
			[65, 194], //A
			[97, 226] //a
		]],
		[38, [ // &
			[65, 198], //A
			[97, 230], //a
			[79, 339], //O
			[111, 338], //o
			[115, 223], //s
			
		]],
		[44, [ // ,
			[67, 199], //C
			[99, 231], //c
		]],
		[47, [ // /
			[79, 216], //O
			[111, 248], //o
		]]
	];

	//Make the lookup tables
	lookup = makeLookupTable(shortcuts);
	shiftFix[96] = 126;

	//alertLookup();
	document.addEventListener("keypress", accentsKeyPressHandler, true);
}

/*
 * Lookup Table Format:
 * lookup[Ctrl+key][char] = replacement
 */
function makeLookupTable(oldLookup)
{
	var newLookup = new Array();
	for (var i in oldLookup) {
		var key = oldLookup[i][0];
		newLookup[key] = new Array();
		for (var j in oldLookup[i][1]) {
			newLookup[key][oldLookup[i][1][j][0]] = oldLookup[i][1][j][1];
		}
	}
	return newLookup;
}

//Adds the accented character to an input element
function addAccent(input, key) {
	if (isRichText(input)) {
		//HTML5 makes this easy
		document.execCommand("inserthtml", false, String.fromCharCode(key));
	}
	else {
		//Normal textboxes are a little more difficult
		var pos = input.selectionStart;
		input.value = input.value.substring(0, input.selectionStart) +
			String.fromCharCode(key) + input.value.substring(input.selectionEnd);
		input.selectionStart = pos + 1;
		input.selectionEnd = pos + 1;
		shortcutKey = null;
	}
}

//Alerts if debug == true
function dbg(message) {
	if (debug) alert(message);
}

//Prints the lookup table
function alertLookup() {
	var str = "";
	for (var key in lookup) {
		str += "[" + key + "                            \n";
		for (var c in lookup[key]) {
			str += "  [" + c + ", " + lookup[key][c] + "]\n";
		}
		str += "]\n";
	}
	alert(str);
}

})();