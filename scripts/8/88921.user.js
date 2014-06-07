// ==UserScript==
// @name           Gmail Title Manipulation
// @author         Reem Bar
// @namespace      http://snark.co.il
// @description    Modify Gmail title: Unread messages - Tag - Account
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

unsafeWindow.document.watch('title',
function(prop, oldval, newval) {
	if (matches = newval.match(/^Gmail - "?([^"]*)"?([^"]*)$/)) {
	newval = matches[1] + matches[2];
		if (matches = newval.match(/^(.*) \((\d+)\) - (.*)$/)) {
		newval = matches[2] + ' - ' + matches[1] + ' - ' + matches[3];
		}
	}
return (newval);
});

