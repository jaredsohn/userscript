// ==UserScript==
// @name 		NL_Spoiler_Button
// @author 		Shadow Thief
// @namespace 	DutchSaint
// @version     0.3
// @description	Adds a Spoiler button to the QuickPost bar.
// @include		http://nolinks.net/*
// @include		http://www.nolinks.net/*
// ==/UserScript==

// Version History
// 0.3 - Spoiler tags now surround selected text, or just around the cursor
//       Thanks to http://userscripts.org/scripts/review/12206
// 0.2 - Fixed bug that prevented tags from being added after text was put in text box
//       Thanks to http://stackoverflow.com/a/1589775
// 0.1 - Initial version

// Insert the spoiler code at the cursor
function insertSpoilerCode(event) {
	event.preventDefault();
	var textarea = document.getElementById("req_message");
	var scrollX = textarea.scrollLeft;
	var scrollY = textarea.scrollTop;
	
	if (textarea.selectionStart || textarea.selectionStart == '0') {
		var startPos = textarea.selectionStart;
		var endPos = textarea.selectionEnd;
		textarea.value = textarea.value.substring(0, startPos)
			+ "[spoiler]" + textarea.value.substring(textarea.selectionStart, textarea.selectionEnd)
			+ "[/spoiler]" + textarea.value.substring(endPos, textarea.value.length);
	}
	
	textarea.focus();
	textarea.scrollLeft = scrollX;
	textarea.scrollTop = scrollY;
}

// Create the spoiler button image
var but_19 = document.createElement("img");
but_19.src = 'http://i.imgur.com/OVE7Ulu.png';
but_19.title = 'Spoiler: [spoiler=caption]text[/spoiler]';
but_19.tabindex = '400';
but_19.style = 'padding 3px 5px 0px 0px;';
but_19.addEventListener('click', insertSpoilerCode);

// Insert the spoiler button between Italics and Strikethrough
italics = document.getElementById("but_2");
italics.parentNode.insertBefore(but_19, italics.nextSibling);