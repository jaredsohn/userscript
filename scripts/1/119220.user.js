// ==UserScript==
// @name           Google Compatibility with QuickDrag
// @namespace      http://userscripts.org/users/115601
// @include        http://www.google.*
// ==/UserScript==

document.addEventListener("DOMNodeInserted", runFixLinks, false);

var goingToRunQuickDragFix = false;

fixLinks();

function fixLinks()
{
	document.removeEventListener("DOMNodeInserted", runFixLinks);


	var i = document.querySelectorAll("a.l");

	for( var k = 0; k < i.length; k++ ){

		var link = i[k];

		if (link.style.display != "none")
		{

		// tried just removing onmousedown attribute, but that didn't work.... creating a new link did the trick...
		var newLink = document.createElement('a');
		newLink.href = link.ref;
		newLink.text = link.text;

		link.insertAdjacentHTML("beforeBegin","<a href='" + link.href + "'>" + link.innerHTML + "</a>");

		// parentNode is not defined (Greasemonkey thing?) so we'll just hide the old one instead of removing it...
		link.style.display = "none";

		}

	}

	document.addEventListener("DOMNodeInserted", runFixLinks,false);

	goingToRunQuickDragFix = false;

}

function runFixLinks()
{
	if (! goingToRunQuickDragFix)
	{
		window.setTimeout(fixLinks,1000);
		goingToRunQuickDragFix = true;
	}
}


