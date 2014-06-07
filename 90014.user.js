// ==UserScript==
// @name vbsupport.org tweaks
// @description Various interface tweaks for vbsupport.org
// @version 1.1.1
// @match http://vbsupport.org/*
// ==/UserScript==

// expand [off] bb-code tags
var divs = document.getElementsByClassName('subblock');
for (var i = 0; i < divs.length; i++)
	divs[i].style.display = 'block';

// hide announcement block
document.getElementById('tab_content').style.display = 'none'; 

// remove header with ad and other useless things
var body = document.getElementsByTagName('body')[0];
removeNodesBetweenComments(' general header ', ' /general header ', body);

// remove footer ad
var pages = document.getElementsByClassName('page');
for (var i = 0; i < pages.length; i++)
{	
	var parentNode = pages[i].childNodes[1];
	removeNodesBetweenComments(' footer ad () ', ' / footer ad ', parentNode);
}

function removeNodesBetweenComments(startComment, endComment, parentNode)
{
	var node = parentNode.firstChild;
	while (node != null && !(node.nodeName == '#comment' && node.data == startComment))
	{
		node = node.nextSibling;
	}
	while (node != null && node.data != endComment)
	{
		var oldnode = node;
		node = node.nextSibling;
		parentNode.removeChild(oldnode);
	}
}