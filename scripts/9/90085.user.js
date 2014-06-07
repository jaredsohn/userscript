// ==UserScript==
// @name           4chan Post Navigator
// @namespace      http://userscripts.org/users/fuzzyrp/
// @include        http://boards.4chan.org/*
// ==/UserScript==

function $() {
	var elements = new Array();
	for (var i = 0; i < arguments.length; i++)
	{
		var element = arguments[i];
		if (typeof element == 'string')
			element = document.getElementById(element);
		if (arguments.length == 1)
			return element;
		elements.push(element);
	}
	return elements;
}
function debug(text)
{
	var debugDiv = $('debugDiv');
	if (debugDiv == null)
	{
		document.body.innerHTML = "<div id='debugDiv' style='border-color:red;border-style:solid;border-width:thin;background-color:black;color:red'>Debug Info:</div>" + document.body.innerHTML;
		debugDiv = $('debugDiv');
	}
	debugDiv.innerHTML += "<br>" + text; 
}
function gotoAnchor()
{
	currentIndex = (((currentIndex % maxIndex) + maxIndex) % maxIndex);	
	window.location.hash = anchors[currentIndex];
}

function keyCallback(e)
{
	switch(e.keyCode)
	{
		case 37: // left arrow
			currentIndex--;
			gotoAnchor();
			break;
		case 39: // right arrow
			currentIndex++;
			gotoAnchor();
			break;
		default:
			break;
	}
}
function isNullOrEmpty(str)
{
    return (!str || 0 === str.length);
}

function getAllAnchors()
{
	var foundAnchors = new Array();
	var links = document.getElementsByTagName("a");
	for(i=0;i<links.length;i++)
	{
		var link = links[i];
		var inner = new String(link.innerHTML);
		var href = link.href;
		var name = link.name;
		var id = link.id;
		if (isNullOrEmpty(inner) && isNullOrEmpty(href) && isNullOrEmpty(id))
		{
			foundAnchors.push(name);
		}
	}
	return foundAnchors;
}

var currentIndex = 0;
var anchors = getAllAnchors();
const maxIndex = anchors.length;

document.addEventListener("keydown", keyCallback, false);