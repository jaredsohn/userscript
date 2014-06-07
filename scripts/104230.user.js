// ==UserScript==
// @name		Editable New Tab Page
// @author		David Regev
// @namespace	http://userscripts.org/users/DavidRegev
// @updateURL   http://userscripts.org/scripts/source/104230.meta.js
// @description	Allows you to edit the old New Tab page. Your edits will even be remembered! User script commands are added so you can set the page title and turn editing off (or on again).
// @icon		data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAACGFjVEwAAAACAAAAAPONk3AAAAA8UExURQAAAP///////////////////////////1VUUf///2dmZGdmY19eW5iXlpGQjlBPTFBPTFRTUFBPTAAAAMmA8yMAAAATdFJOUwANDg8ZGy4zNT1DRltcXaS9vs9B8xYZAAAAGmZjVEwAAAAAAAAAEAAAABAAAAAAAAAAAAA1AGQAAHWuN0kAAABjSURBVBjThY9JDoNAEAPLbE2zDp7//zUXApFAim8u2ZYMD427Zc+zLe8jUNZUZt9nKtcCuFPVqc5A6gZKwFKtX+QTXInXyvILlrfK/41H4pguq+kAtnKfKxvQDEFE20YQQ8MHl80E6903hrAAAAAaZmNUTAAAAAEAAAADAAAACgAAAAQAAAADADUAZAAA/JXreAAAABNmZEFUAAAAAhjTY2BkZGQgAgMAAoAAHy4jrDcAAAAASUVORK5CYII=
// @license		CC0 1.0 Universal (or later); http://creativecommons.org/publicdomain/zero/1.0/
// @include		about:blank
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_deleteValue
// @grant		GM_registerMenuCommand
// @version		2.6.4
// ==/UserScript==

if (window.top != window.self)	// Don’t run in frames.
	return;

// Load and save edits. Thanks to SBscripts.
document.body.innerHTML = decodeURIComponent(GM_getValue("NewTab", ""));
document.title = GM_getValue("NewTabTitle", "");
window.onbeforeunload = function() {
	GM_setValue("NewTab", encodeURIComponent(document.body.innerHTML));
	if (document.title != "")
		GM_setValue("NewTabTitle", document.title);
	if (GM_getValue("NewTab") == "" || GM_getValue("NewTab") == "%3Cbr%3E") {
		GM_deleteValue("NewTab");		// Clear value when the page is empty,
		GM_deleteValue("NewTabTitle");	// and also clear the title.
	}
};

// Make about:blank editable by default and add a command to turn that off and on.
function toggleEditable() {
	if (document.body.contentEditable == "true")
		document.body.contentEditable = "false";
	else
		document.body.contentEditable = "true";
}
toggleEditable();
GM_registerMenuCommand("Turn editing off/on", toggleEditable, "e");

// Add a command to set the page title. The current selection is used if possible.
function editTitle() {
	q = window.getSelection().toString();
	if	(!q)
		q = window.prompt("Set page title", document.title);
	if (q != null)
		document.title = q;
}
GM_registerMenuCommand("Set page title…", editTitle, "t");

// Idea for future: change favicon to script icon when page is editable.