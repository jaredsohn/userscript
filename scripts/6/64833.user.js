// --------------------------------------------------------------------
// ==UserScript==
// @name          Facebook: Remove Events
// @description   I don't care that much when your birthday and functions are, so I want it gone. Thanks for the cheese!
// @include       http://www.facebook.com/*
// @include       http://facebook.com/*
// ==/UserScript==

removeEvents();

document.addEventListener("DOMNodeInserted", removeEvents, false);

function removeEvents()
{
	// Bye Bye Event Box
	var child = document.getElementById('pagelet_eventbox');
	removeNode(child);

	// alternate div for Events box
	var child = document.getElementById('UIUpcoming_Item');
	removeNode(child);

	{
		var child = elements[0];
		removeNode(child);
	}

}

function removeNode(child)
{
	if (child)
	{
		var parent = child.parentNode;
		parent.removeChild(child);
	}
}
