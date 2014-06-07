// ==UserScript==
// @name		ASMS Uncoacher
// @version		0.3.6
// @namespace	http://userscripts.org/users/437108
// @description	Detects the proxy's warning pages and automatically bypasses them.
// @downloadURL	https://userscripts.org/scripts/source/126411.user.js
// @icon		http://i.imgur.com/ZGTvp.png
// @include		http://*.*/*
// @include		https://*.*/*
// @run-at document-end
// ==/UserScript==
// Take note that whenever "\"" (without enclosing quotes) is called it is because JavaScript uses quotation marks in its own syntax, and we need to use the backslash before it can be placed inside a string.
// Checks if the current page title matches that of a coach/block warning page.
//if(document.title == "REQUEST COACHED" || document.title == "REQUEST BLOCKED"){
//The above bit is commented out for a few reasons. One is that it's naughty. Another is that it doesn't really work that well as of mid 2012. And really it doesn't make a difference since as of late 2012 very few sites are blocked completely. You're free to use your own modified version but if it doesn't work or you get suspended for bypasssery then that's not my issue. This script is in the public domain.
if (document.title == "REQUEST COACHED") {
	reloadforproxy();
}

function reloadforproxy() {
	// Creates new element to contain hyperlink.
	var pageLink = document.createElement("a");
	// Sets the hyperlink to point to the current document location.
	pageLink.setAttribute("href", document.location.href);
	// Sets the hyperlink's text content to a suitably informative message. It'll be reloading by the time this renders.
	pageLink.textContent = "RELOADING";
	// Defines a new element to contain the new body.
	var newBody = document.createElement("body");
	// Sets the body style to text align center, because why not?
	newBody.setAttribute("style", "text-align:center");
	// Adds the link to the new body.
	newBody.appendChild(pageLink);
	// Finally replaces the body element with the one we made and populated. The title is retained, and the HTML tags would be if they existed.
	document.documentElement.replaceChild(newBody, document.body);
	// Additional warning to append for blocked page.
	//    if (document.title == "REQUEST BLOCKED"){
	//        var warningMessage = document.creatElement("p");
	//        warningMessage.textContent = "Warning here";
	//        document.body.appendChild(warningMessage);
	//    }
	// Attempts to click the first hyperlink in the body of a page (the one we made above).
	var targLink = document.querySelector("body a");
	var clickEvent = document.createEvent('MouseEvents');
	clickEvent.initEvent('click', true, true);
	targLink.dispatchEvent(clickEvent);
}
if (document.title == "ContentKeeper") {
	var targLink = document.querySelector("body form");
	if (targLink.innerHTML.indexOf("COACH1") !== -1) {
		targLink.submit();
	}
}
// Adds a menu item allowing the manual "forced" reloading of broken sites.
GM_registerMenuCommand("Reload current page", reloadforproxy);
