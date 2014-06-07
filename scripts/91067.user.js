// No YouNoobs
// version 0.4
// November 23, 2010
// Copyright (c) 2007, Nicholas Francisco
// Edited by Timothy Butwinick November 2008, March 2009
// Edited by Ewyx November 2010
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name          No YouNoobs Nov 2010
// @namespace     http://franciscodesign.com/junk/
// @description   YouTube comments are useless.
// @include       http://*.youtube.com/*
// ==/UserScript==


(function() {
var remove = document.getElementsByClassName('comments-section');
var _body = document.getElementsByTagName('body') [0];

//yeah I don't like to add and append, but somehow it can't find it's parentNode, so this is a work around.
if (remove)
{
	for (x=0; x <= remove.length; x = x + 1)
	{
		var _child = remove[0];
		_body.appendChild(_child);
    		_body.removeChild(_child);
	}
}

//remove the bar to browse comments on other pages
remove = document.getElementsByClassName('yt-uix-pager');
if (remove) 
{
	_child = remove[0];
	_body.appendChild(_child);
	_body.removeChild(_child);
}

//remove the 'view all comments' link
remove = document.getElementsByClassName('comments-section-see-all');
if (remove)
{
	_child = remove[0];
	_body.appendChild(_child);
	_body.removeChild(_child);
}
})();
