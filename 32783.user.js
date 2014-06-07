// ==UserScript==
// @name           Football Outsiders fix spacing
// @author 	   Steve Matuszek
// @namespace      http://matuszek.net
// @description    Attempts to fix spacing on FootballOutsiders.
// @include        http://www.footballoutsiders.com/*
// @include        http://footballoutsiders.com/*
// ==/UserScript==
//
// If you use Firefox 2, and you increase the font size, an awful lot of web pages will 
// render like crap. That's not new. What IS new, or seems so to me, is that a lot of 
// them now have a horizontal nav bar that isn't even followed by a line break. 
// Basically they're just planning on the text taking up exactly one line. 
// This is typewriter thinking and it makes me want to punch the Internet.
// All this script does is find the DIV named "menu" and insert a <br> after it.

function insertAfter(newNode, target) 
{
	var parent = target.parentNode;
	var refChild = target.nextSibling;
	if(refChild != null)
	{
		parent.insertBefore(newNode, refChild);
	}
	else
	{
		parent.appendChild(newNode);
	}
};

//  Find the div named "menu".
var navbar_div = document.getElementById("menu");	

//  Create a <br>.
var br = document.createElement("br");

//  Insert the <br> after the menu div. Presto!
insertAfter(br, navbar_div);
