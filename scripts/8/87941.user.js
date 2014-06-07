// Hold To New Tab
// version 1 Beta
// 2010-10-10
// Copyright (c) 2010, Daniel Sheldon
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hold To New Tab
// @version		  1
// @namespace     http://www.danielsheldon.com
// @description   Allows a user to click and hold to open a link in a new tab
// @include       *
// ==/UserScript==

var anchors;
var currentTimeout = null;
var currentTarget = null;
var currentlyHeld;
var waitTime = 250;

init();

function init()
{	
	anchors = document.getElementsByTagName('A');
	
	if(anchors.length > 0)
	{
		for(i = 0; i < anchors.length; i++)
		{
			anchors[i].addEventListener("mousedown", startHold, true);
			anchors[i].addEventListener("mouseout", stopHold, true);
			anchors[i].addEventListener("mouseup", mouseUpHandler, true);
		}
	}
}

function startHold(event)
{	
	currentTimeout = setTimeout(openInNewTab, waitTime)
	currentlyHeld = event.currentTarget;
	
	var oldTarget = currentlyHeld.getAttribute('oldTarget')
	
	if(oldTarget != undefined)
	{
		if(oldTarget == "none")
		{
			currentlyHeld.setAttribute("target",'');
		}else{
			currentlyHeld.target = oldTarget;
		}
	}
	
	if(currentlyHeld.target == '')
		{
		currentlyHeld.setAttribute('oldTarget',"_self");
	}else{
		currentlyHeld.setAttribute('oldTarget', currentlyHeld.target);
	}
}

function stopHold(event)
{	
	if(currentlyHeld != null)
	{
		currentlyHeld.setAttribute('held','false');
	}
	
	if(currentTimeout != null)
	{
		clearTimeout(currentTimeout);
		currentTimeout = null;
	}
}

function mouseUpHandler()
{
	if(currentlyHeld != null)
	{
		if(currentlyHeld.getAttribute('held') == 'true')
		{
			currentlyHeld.setAttribute('target','_new');
		}
	}
}

function openInNewTab()
{
	if(currentlyHeld != null)
	{
		currentlyHeld.setAttribute('held','true');
	}
}