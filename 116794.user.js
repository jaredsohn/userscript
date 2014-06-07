// ==UserScript==
// @name           Script & Style - Convert Direct Links
// @namespace      Convert Direct Links
// @include        http://scriptandstyle.com/*
// ==/UserScript==

var leftDivElements = document.getElementById("left-col").getElementsByTagName("div");
var rightDivElements = document.getElementById("right-col").getElementsByTagName("div");

var a = "";

for(i = 0; i < leftDivElements.length; i++)
{	
	a = leftDivElements[i].getElementsByTagName("a");
	a[0].href = a[1].href;
	a[1].style.display="none";
}

for(i = 0; i < rightDivElements.length; i++)
{
	a = rightDivElements[i].getElementsByTagName("a");
	a[0].href = a[1].href;
	a[1].style.display="none";
}