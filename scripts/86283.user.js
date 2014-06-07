// ==UserScript==
// @name           One click CD
// @namespace      hollow life
// @description    Adds a link to CD in the top bar.
// @include        http://endoftheinter.net/*
// @include        http://*.endoftheinter.net/*
// @include        https://endoftheinter.net/*
// @include        https://*.endoftheinter.net/*
// ==/UserScript==

prefix = parent.location.protocol;

function insertAfter(newNode, target)
{
	var parent = target.parentNode;
	var refChild = target.nextSibling;
	if(refChild != null)
		parent.insertBefore(newNode, refChild);
	else
		parent.appendChild(newNode);
};

var a=document.getElementsByTagName("a");
for (var i=0; i<a.length; i++)
{
	if (a[i].innerHTML=="Stats")
	{
		var m=document.createElement("a");
		m.innerHTML=" | <a href='" + prefix + "//boards.endoftheinter.net/showtopics.php?board=56'>CD</a>";
		insertAfter(m, a[i]);
		break;
	}
}