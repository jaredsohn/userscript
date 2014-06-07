// ==UserScript==
// @name           YOKOFAKUN stretcher
// @namespace      binfalse.de
// @description    stretch the content on plindenbaum.blogspot.com
// @include        *plindenbaum.blogspot.com/*
// ==/UserScript==

var stretchPixels = 200;
var removeFriendFeed = false;
var toChange = new Array ("header-wrapper", "outer-wrapper", "main-wrapper");


// thats it, don't change anything below
// unless you know what you're doing!


function addCSS (css)
{
	var head = document.getElementsByTagName ('head') [0];
	if (!head)
		return;
	var add = document.createElement ('style');
	add.type = 'text/css';
	add.innerHTML = css;
	head.appendChild (add);
}

for (var i = 0; i < toChange.length; i++)
{
	var element = document.getElementById (toChange[i]);
	if (!element)
		continue;
	var org = parseInt (document.defaultView.getComputedStyle(element, null).getPropertyValue("width"));
	if (!org)
		continue;
	addCSS ('#' + toChange[i] + '{width: ' + (org + stretchPixels) + 'px}');
}

if (removeFriendFeed)
{
	var friendfeed = document.getElementById ('HTML3');
	if (friendfeed) friendfeed.parentNode.removeChild (friendfeed);
}
