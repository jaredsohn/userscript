// ==UserScript==
// @name           One click LL Mart
// @namespace      Ekim Gram
// @description    Adds a link to LL Mart in the top bar.
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
	if (a[i].innerHTML=="Boards")
	{
		var m=document.createElement("a");
		m.innerHTML=" | <a href='" + prefix + "//boards.endoftheinter.net/showtopics.php?board=419'>LL Mart</a>";
		insertAfter(m, a[i]);
		break;
	}
}