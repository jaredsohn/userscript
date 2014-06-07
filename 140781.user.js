// ==UserScript==
// @name really ignore ignored SMF users
// @description Completely removes the link 'Show me the post.' for ignored SMF 2.X users
// @include http://www.htforum.nl/*
// ==/UserScript==


var regex = /msg_\d+_ignored_prompt/;
var myDivs= document.getElementsByTagName('div');

for (i=0; i<myDivs.length; i++)
{
if (myDivs[i].id.match(regex))
	     myDivs[i].style.visibility = 'hidden';
}