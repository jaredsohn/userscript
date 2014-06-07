// ==UserScript==
// @name           Change Page Title
// @namespace      #
// @description    Changes the title of any page, and automatically prompts to name Untitled pages. Remembers saved titles across sessions.
// @include        *
// ==/UserScript==

GM_registerMenuCommand("Change Page Title",ask);
GM_registerMenuCommand("Remove Custom Page Title",reset);

var otitle;
otitle = document.title
document.title = GM_getValue(document.URL);
if (document.title == "undefined"){
	document.title = otitle;
	if (document.title == "Untitled Document"){
		ask();
	}
}


function ask(e){
var NewTitle = prompt("This page has not been named.\nEveryone deserves a name\n\nEnter a name for the page...",document.title);
document.title = NewTitle;
GM_setValue(document.URL,NewTitle);
}

function reset(e){
document.title = otitle;
GM_setValue(document.URL,"undefined");
}