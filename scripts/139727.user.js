// ==UserScript==
// @name        A-P New Episodes
// @namespace   http://localhost
// @include     http://www.anime-planet.com/users/*/anime*
// @version     4
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
		if (tags[i].className.indexOf(className) != -1)
		{
			return tags[i];
		}
	}
	return null;
}

function getElementByName(elementType, name, src)
{
	if (src == null)
	{
		src = document;
	}
	var tags = src.getElementsByTagName(elementType);
	var i;
	for (i = 0; i < tags.length; i++)
	{
		if (tags[i].name == name)
		{
			return tags[i];
		}
	}
	return null;
}

var list = getElementByClassName("table", "entryTable");

if (list != null)
{
	for (var i = 0; i < list.children[1].children.length; i++)
	{
		var tableRow = list.children[1].children[i];
		var status = getElementByName("select", "status", tableRow);
		//alert(status.value);
		if (status.innerHTML.search("Watched") == -1 && status.value == 2)
		{
			var episodes = getElementByName("select", "episodes", tableRow);
			if (episodes.value < episodes.children.length - 1)
			{
				var newP = document.createElement("p");
				newP.style.color = "red";
				newP.style.padding = 0;
				newP.innerHTML = "NEW";
				tableRow.children[0].appendChild(newP);
			}
		}
	}
}