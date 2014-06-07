// DOM Inspector
// version 0.1
// 2006-01-25
// Copyright (c) 2006, Onur Mat
//
// --------------------------------------------------------------------
//
// This user script allows you to interact with elements of a web page
// by moving mouse pointer on a web page and clicking on selected elements.
//
// To install for Firefox, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To install for Internet Explorer, you need Turnabout:
// http://www.reifysoft.com/turnabout.php
// See instructions for using Turnabout here:
// http://www.reifysoft.com/turnabout.php
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          DOM Inspector
// @namespace     http://www.dominspector.com/
// @description   Inspect DHTML DOM elements interactively
// @include       *
// ==/UserScript==

function DIOnMouseOver(evt)
{
	element = evt.target; 	// not IE
	
	// set the border around the element
	element.style.borderWidth = '2px';
	element.style.borderStyle = 'solid';
	element.style.borderColor = '#f00';
}


function DIOnMouseOut(evt)
{
	evt.target.style.borderStyle = 'none';
}


function DIOnClick(evt)
{
	var selection = evt.target.innerHTML;
		
	alert('Element is: ' + evt.target.toString() + '\n\nSelection is:\n\n' + selection);
	return false;
}


document.addEventListener("mouseover", DIOnMouseOver, true);
document.addEventListener("mouseout", DIOnMouseOut, true);
document.addEventListener("click", DIOnClick, true);
