// ==UserScript==
// @name           Cyanide & Happiness Navigator
// @namespace      http://userscripts.org/users/fuzzyrp/
// @description    Easily navigate C&H comics
// @include        http://www.explosm.net/comics/*
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
function isUndefined(object)
{
	return (typeof text == 'undefined');	
}
function debug(text)
{
	if (isUndefined(text)) text = "";
	var debugDiv = $('debugDiv');
	if (debugDiv == null)
	{
		document.body.innerHTML = "<div id='debugDiv' style='border-color:red;border-style:solid;border-width:thin;background-color:black;color:red'>Debug Info:</div>" + document.body.innerHTML;
		debugDiv = $('debugDiv');
	}
	debugDiv.innerHTML += "<br>" + text; 
}
function goto(url)
{
	location.href = url;
}
function keyCallback(e)
{
	switch(e.keyCode)
	{
		case 37: // left arrow
			goto(previousUrl);
			break;
		case 39: // right arrow
			goto(nextUrl);
			break;
		case 82: // R button
			goto("/comics/random");
			break;
		case 78: // N button
			goto("/comics/new");
			break;
		default:
			break;
	}
}

var previousUrl = "";
var nextUrl = "";
var links = document.getElementsByTagName("a");
for(i=0;i<links.length;i++)
{
	var text = new String(links[i].innerHTML);
	var href = links[i].href;
	if (text.indexOf("Previous") >= 0)
	{
		previousUrl = href;
	}
	else if (text.indexOf("Next") >= 0)
	{
		nextUrl = href;
	}
}

var contentDiv = $("maincontent");
var imageDiv = contentDiv.children[1].children[1]; // second div of the second div of the maincontent div
imageDiv.innerHTML = "<a name='comic' />" + imageDiv.innerHTML;

document.addEventListener("keydown", keyCallback, false);
window.location.hash = "comic";