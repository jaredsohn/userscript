// ==UserScript==
// @name           Train Spam Catcher
// @namespace      hollow life
// @description    Adds a link to the Train Spam topic view.
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
	if (a[i].innerHTML=="All links")
	{
		var m=document.createElement("a");
		m.innerHTML=" | <a href='" + prefix + "//images.endoftheinter.net/imagemap.php?md5=0e7d5b50a2fb3b10bf4ffc0b5306288d'>TSC</a>";
		insertAfter(m, a[i]);
		break;
	}
}