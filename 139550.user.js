// ==UserScript==
// @name        A-P extra status bar without "won't"s
// @namespace   http://localhost
// @include     http://www.anime-planet.com/users/*
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
	var result = new Array();
	var i;
	for (i = 0; i < tags.length; i++)
	{
		if (tags[i].className == className)
		{
			result.push(tags[i]);
		}
	}
	if (result.length == 0)
	{
		return null;
	}
	else
	{
		return result;
	}
}


function addStatusBar(panel)
{
	var total = 0;
	var stats = new Array();
	var colors = new Array();
	var statsList = panel.children[1];
	for (i = 0; i < 5; i++)
	{
		var stat = parseInt(statsList.children[i].children[1].innerHTML.split(" ")[0].replace(",",""));
		total += stat;
		stats.push(stat);
	}
	var statArea = document.createElement("div");
	statArea.style.width = "100%";
	statArea.style.border = "1px solid black";
	statArea.style.height = "9px";
	statArea.style.textAlign = "right";

	colors.push("#4444F4");
	colors.push("#44FC3C");
	colors.push("#FCFC3C");
	colors.push("#FC9F3C");
	colors.push("#FC443C");
	colors.push("#9C44E6");
	
	var hasBcgColor = false;
	
	for (i = 0; i < 5; i++)
	{
		if (!hasBcgColor && stat[i] > 0)
		{
			hasBcgColor = true;
			statArea.style.backgroundColor = colors[i];
		}
		var statBar = document.createElement("span");
		statBar.style.height = "9px";
		statBar.style.display = "inline-block";
		//statBar.style.float = "left";
		statBar.style.width = ((stats[i] / total) * 100).toFixed(2) + "%";
		statBar.style.backgroundColor = colors[i];
		statArea.appendChild(statBar);
	}
	if (panel.children.length > 2)
	{
		panel.insertBefore(statArea, panel.children[2]);
	}
	else
	{
		panel.appendChild(statArea);
	}
}

var panel = getElementsByClassName("div", "profEntryStats box3");
if (panel != null)
{
	for (n = 0; n < panel.length; n++)
	{
		addStatusBar(getElementByClassName("div", "mid", panel[n]));
	}
}