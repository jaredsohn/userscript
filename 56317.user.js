// ==UserScript==
// @name           Hacker Diet Pager
// @namespace      mdryden
// @include        http://www.fourmilab.ch/hackdiet/*
// ==/UserScript==

unsafeWindow.document.onkeypress = keyDown;

function keyDown(event)
{
	if (event.keyCode == 39) {pageNext();} //Right Arrow (forward)
	if (event.keyCode == 37) {pageBack();} //Left Arrow (back)
}

function changePage(url)
{
	window.location = url;
}


function pageNext()
{
	// find the next button
	var url = findLink("Next");
	changePage(url);
}

function pageBack()
{
	var url = findLink("Previous");
	changePage(url);
}

function findLink(altText)
{
	doc = document.getElementsByTagName("IMG");

	for ( var f = 0; f < doc.length; ++f ) 
	{ 
		var fld = doc[f]; 
		if ( fld.alt == altText) 
		{ 
			var parent = fld.parentNode
			return parent.href;			
		}
	} 
}