// ==UserScript==
// @name SD/LUE
// @namespace pendevin
// @description far better version of Platypus's script by pendevin
// @include http://luelinks.net/*
// @include http://www.luelinks.net/*
// @include https://luelinks.net/*
// @include https://www.luelinks.net/*
// @include http://*.endoftheinter.net/*
// @include http://endoftheinter.net/*
// @include https://*.endoftheinter.net/*
// ==/UserScript==


function insertAfter(newNode, target) {
var parent = target.parentNode;
var refChild = target.nextSibling;
if(refChild != null)
parent.insertBefore(newNode, refChild);
else
parent.appendChild(newNode);
};

var as=document.getElementsByTagName("a");
for (var i=0; i<as.length; i++)
{
	if (as[i].innerHTML=="Boards")
	{
		var s=document.createElement("span");
		s.innerHTML=" | <a href='http://luelinks.net/showtopics.php?board=42'>LUE</a> | <a href='http://luelinks.net/showtopics.php?board=51'>PM</a>";
		insertAfter(s, as[i]);
	}
}