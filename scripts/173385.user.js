// ==UserScript==
// @name        Hide H and Yaoi images on M-U
// @namespace   http://localhost
// @description Hides images on H and Yaoi entries on M-U
// @include     http://www.mangaupdates.com/series.html?id=*
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

function getElementsByClassName(elementType, className, src)
{
	if (src == null)
	{
		src = document;
	}
	var tags = src.getElementsByTagName(elementType);
	var i;
	var result = new Array();
	for (i = 0; i < tags.length; i++)
	{
		if (tags[i].className == className)
		{
			result.push(tags[i]);
		}
	}
	return result;
}

var Table = getElementsByClassName("div", "sContainer")[1];
var sections = getElementsByClassName("div", "sContent", Table);
var img = sections[0].children[0];
var geners = sections[1];
if (geners.innerHTML.indexOf("Yaoi") >= 0)
{
	img.innerHTML = '<h1 style="color:red">Yaoi</h1>';
}
if (geners.innerHTML.indexOf("Hentai") >= 0)
{
	img.innerHTML = '<h1 style="color:red">Hentai</h1>';
}