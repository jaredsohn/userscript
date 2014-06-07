// Version 0.1
// Sat Sep 15 21:25:04 EST 2007.
// Target Link Fix
// Matthew H

// ==UserScript==
// @name           Target Link Fix
// @description    Remove anchor targets which refer to new/blank, to help prevent links opening in new windows.
// @include        *
// ==/UserScript==

// Create a list of anchors
var handle = document.getElementsByTagName('a');

// Parse each anchor
for (i=0; i<=handle.length; i++)
{
	if ((handle.item(i).target == 'blank') || (handle.item(i).target == 'new') || (handle.item(i).target == '_new') || (handle.item(i).target == '_blank'))
	{
		handle.item(i).target = '';
	}
}