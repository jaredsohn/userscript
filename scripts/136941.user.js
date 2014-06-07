// ==UserScript==
// @name        A-P Remove Screenshots Tab
// @namespace   http://localhost
// @include     http://www.anime-planet.com/anime/*
// @version     1
// ==/UserScript==

function getElementByClassName(elementType, className, src)
{
	if (src == null)
	{
		src = document;
	}
	var tags = src.getElementsByTagName(elementType);
	var i;
	for (i = 0; i < tags.length; i++)
	{
		if (tags[i].className == className)
		{
			return tags[i];
		}
	}
	return null;
}

var navBar = getElementByClassName("ul", "tabNavigationBar");
if (navBar.children[0].innerHTML.search("screenshot") >= 0)
{
	navBar.removeChild(navBar.children[0]);
	var tabs = getElementByClassName("div", "tabViewStack mid");
	tabs.removeChild(tabs.children[0]);
	navBar.children[1].className = "selected";
	tabs.children[1].style.display = "";
}