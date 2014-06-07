// ==UserScript==
// @name FbColorChanger
// @namespace Fb
// @description Facebook background color changer
// @include http://www.facebook.com/*
// ==/UserScript==

var children = document.getElementsTagName('body').getElementsByTagName('*');
alert(children);
for (var child in children)
{
	var color = child.style.backgroundColor;
	alert(color);
}
