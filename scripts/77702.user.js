// ==UserScript==
// @name           Forumwarz - Flamebate fix shit button
// @namespace      Forumwarz - Flamebate fix shit button
// @description    Fixes your Flamebate input
// @include        http://forumwarz.com/discussions/reply/*
// @include        http://*.forumwarz.com/discussions/reply/*
// @include        http://forumwarz.com/discussions/post/*
// @include        http://*.forumwarz.com/discussions/post/*
// @include        http://forumwarz.com/discussions/edit/*
// @include        http://*.forumwarz.com/discussions/edit/*
// ==/UserScript==

//Edit only these two lines.
var bbcodeHeader = "[color=red][b]";
var bbcodeFooter = "[/b][/color]";
//Don't edit below this line

// Inserts javascript that will be called by the autoCheckOrderButton
var scriptElement = document.createElement('script');
scriptElement.type = 'text/javascript';
scriptElement.innerHTML = 'function removeBreaks() { var addHeader = true; var needFooter = false; var justQuote = false; var myPost = document.getElementById( "discussion_post_body" ).value; var newPost = ""; for(var i = 0; i < myPost.length; i++) { if (myPost.charAt(i) == "\\n") { if ( (i + 1) < myPost.length) { if (myPost.charAt(i + 1) != "\\n") { if (!justQuote) { newPost += "[nl][nl]"; } } } } else { if (myPost.charAt(i) == "[" && myPost.charAt(i+1) == "q" && myPost.charAt(i+2) == "u" && myPost.charAt(i+3) == "o" && myPost.charAt(i+4) == "t" && myPost.charAt(i+5) == "e" && (myPost.charAt(i+6) == "]" || myPost.charAt(i+6) == "=")) { if (needFooter) { newPost += "' + bbcodeFooter + '"; needFooter = false; } newPost += "[quote"; i += 6; var quotes = 1; while (quotes > 0 && i != myPost.length) { if (i+6 < myPost.length) { if (myPost.charAt(i) == "[" && myPost.charAt(i+1) == "q" && myPost.charAt(i+2) == "u" && myPost.charAt(i+3) == "o" && myPost.charAt(i+4) == "t" && myPost.charAt(i+5) == "e" && (myPost.charAt(i+6) == "]" || myPost.charAt(i+6) == "=")) { newPost += "[quote"; i += 6; quotes++; } } if (i+7 < myPost.length) { if (myPost.charAt(i) == "[" && myPost.charAt(i+1) == "/" && myPost.charAt(i+2) == "q" && myPost.charAt(i+3) == "u" && myPost.charAt(i+4) == "o" && myPost.charAt(i+5) == "t" && myPost.charAt(i+6) == "e" && myPost.charAt(i+7) == "]") { quotes--; newPost += "[/quote"; i += 7; } } if (i < myPost.length) { newPost += myPost.charAt(i); } i++; } justQuote = true; addHeader = true; i--; } else { justQuote = false; if (addHeader) { newPost += "' + bbcodeHeader + '"; addHeader = false; needFooter = true; } newPost += myPost.charAt(i); } } } if (needFooter) { newPost += "' + bbcodeFooter + '"; needFooter = false; } document.getElementById("discussion_post_body").value = newPost; } '; 
document.getElementsByTagName("head")[0].appendChild(scriptElement); 
window.addButton = function () {
	// Get the location on the page where you want to create the button
	var targetDiv = document.getElementById('preview_buttons');
	
	// Create the button and set its attributes
	var inputButton = document.createElement('a');
	inputButton.innerHTML = 'Fix Shit';
	inputButton.setAttribute("href", "#");
	inputButton.setAttribute("class", "button");
	inputButton.setAttribute("onclick", "removeBreaks(); return false;");
	
	// Append the button to the div
	targetDiv.appendChild(inputButton); 
}
addButton();