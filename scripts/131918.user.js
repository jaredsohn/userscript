// ==UserScript==
// @name           Rutracker & Pornolab spoiler expand
// @description    Add button in first spoiler block that expand all spoilers on page
// @author         Fornit
// @license        WTFPL
// @version        4
// @include        http://rutracker.org/*
// @include        http://pornolab.net/*
// @updateURL      https://userscripts.org/scripts/source/131918.user.js
// @icon           http://static.pornolab.net/favicon.ico
// ==/UserScript==

function inject(func)
{
	var script = document.createElement("script");
	script.setAttribute("type", "application/javascript");
	script.appendChild(document.createTextNode(func));
	document.body.appendChild(script);
}

function expandAll()
{
	var array = document.getElementsByClassName("sp-head");
	for(var key in array)
	{
		var elem = array[key];
		if(typeof elem.dispatchEvent === "function") 
		{
			var evt = document.createEvent("MouseEvents"); 
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); 
			elem.dispatchEvent(evt);
		}
	}
}

function insertButton()
{
	var firstWrap;
	var wraps = document.getElementsByClassName("sp-wrap");
	for (var i = 0; i < wraps.length; ++i)
	{
		if(wraps[i].parentNode.className != "sig-body")
    		{
			firstWrap = wraps[i];
        		break;
		}
	}
	if(!firstWrap)
		return;
	inject(expandAll);

	var button = document.createElement("input");
	button.type = "button";
	button.value = "Развернуть всё";
	button.setAttribute("onclick", "expandAll()");

	firstWrap.insertBefore(button, firstWrap.firstChild);
}

insertButton();