// ==UserScript==
// @name Trello DockBadge [Fluid.App] 
// @version 1.0
// @description Check unread count of Trello and show on dock.
// @include     http://trello.com/*
// @include     https://trello.com/*
// ==/UserScript==

window.fluid.dockBadge = '';
setTimeout(updateDockBadge, 1000);
setTimeout(updateDockBadge, 3000);
setInterval(updateDockBadge, 5000);

function updateDockBadge() {
	var newBadge = '';

	var regex = /^\((\d+)\) \s*/;

	var text = '' + document.title;
	if (text.length) {
		console.log('text: ' + text);
		var res = text.match(regex);
		console.log('res: ' + res);
		if (res && res.length > 1) {
			newBadge = res[1];
			console.log('newBadge: ' + newBadge);
		}
	}
	window.fluid.dockBadge = newBadge;
}