// ==UserScript==
// @name           Expand Similar Posts
// @namespace      http://www.dnote.nl/
// @include        http://www.facebook.com/*
// @version		   1.1
// ==/UserScript==

function click(e, type) 
{
	if(!e && typeof e=='string') e=document.getElementById(e);
	if(!e) {return;}
	var evObj = document.createEvent('MouseEvents');
	evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
	e.dispatchEvent(evObj);
}

function expandAll()
{
	var className = 'UIIntentionalStory_CollapsedStories';
	var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
	var allElements = document.getElementsByTagName("*");

	var element;
	for (var i = 0; (element = allElements[i]) != null; i++) 
	{
		if (element.tagName.toLowerCase() == "a" && (element.href == "http://www.facebook.com/?sk=nf") || (element.href == "/?sk=nf"))
		{
			element.setAttribute("onClick", "expandAll()");
		}
		var elementClass = element.className;
		if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
		{
			click(element.getElementsByTagName("a")[0]);
		}
	}
}


if(/Chrome/.test(navigator.userAgent)) {
var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + expandAll + ")();";
document.body.appendChild(script);
} else {
expandAll();
}