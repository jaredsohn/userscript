// ==UserScript==
// @name           HBrowse Navigator
// @namespace      http://userscripts.org/users/fuzzyrp/
// @description    Navigate HBrowse comics
// @include        http://www.hbrowse.com/*
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
		case 90: // z
			goto(previousUrl);
			break;
		case 39: // right arrow
		case 88: // x
			goto(nextUrl);
			break;
		default:
			break;
	}
}

// <a class="pageLink" href="http://www.hbrowse.com/10363/c00001/00003" title="jump to the next page">NEXT PAGE</a>
// <a title="jump to the previous page" href="http://www.hbrowse.com/10363/c00001/00001" class="pageLink">PREVIOUS PAGE</a>

var previousUrl = "";
var nextUrl = "";
var links = document.getElementsByTagName("a");
for(i=0;i<links.length;i++)
{
	var text = new String(links[i].innerHTML);
	var href = links[i].href;
	if (text.indexOf("PREVIOUS PAGE") >= 0)
	{
		previousUrl = href;
	}
	else if (text.indexOf("NEXT PAGE") >= 0)
	{
		nextUrl = href;
	}
}

document.addEventListener("keydown", keyCallback, false);
