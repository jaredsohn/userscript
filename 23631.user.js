// ==UserScript==
// @name           TopicalChartz
// @namespace      VGChartz
// @description    Shows the topic of the VGChartz thread you're viewing (or a more descriptive title where possible) in the title bar.
// @include        http://www.vgchartz.com/*
// @include        http://vgchartz.com/*
// ==/UserScript==

window.main = function(alwaysReverse)
{
	GM_registerMenuCommand("Swap Browsing Tree Position (Beginning/End)", function(event) { GM_setValue("reverse", !GM_getValue("reverse", false)); formatTitle(true); return; }, "s", "control shift", "s");
	window.titleList = null;
	formatTitle(false);

	return;
}

window.formatTitle = function(alwaysReverse)
{
	var index;
	var item;
	var originalList;
	var titleList;
	var welcome;
	var welcomeLength;

	if(window.titleList != null)
		titleList = window.titleList;
	else
	{
		titleList = document.title.split(new RegExp(" \\|\\s*", "g"));
		while((empty = titleList.indexOf("")) > -1)
			titleList.splice(empty, 1);
		(originalList = titleList.concat()).splice(0, 1);
		if((welcome = document.getElementById("welcome")) != null && (welcome = welcome.getElementsByTagName("h1")).length > 0 && (welcome = welcome[0].getElementsByTagName("a")).length > 0)
		{
			welcomeLength = welcome.length;
			for(index = 0; index < welcomeLength; index++)
			{
				if((item = welcome[index].firstChild.nodeValue) != null && originalList.indexOf(item) == -1 && item != ">")
					titleList.push(welcome[index].firstChild.nodeValue);
			}
		}
		window.titleList = titleList;
	}
	if(alwaysReverse == true || GM_getValue("reverse", false) == true)
		window.titleList.reverse();
	document.title = window.titleList.join(" | ");

	return;
}

main();
