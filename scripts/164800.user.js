// ==UserScript==
// @name        haaretz no popup
// @namespace   www.haaretz.co.il
// @include     http://www.haaretz.co.il/*
// @version     1
// ==/UserScript==
for (i=0 ; i<document.body.children.length ; i++)
{
	node=document.body.children[i];
	name=node.className;
	if (name.substring(0,26)=="blockUI blockMsg blockPage") 
	{
		node.parentNode.removeChild(node)
	}
}