// ==UserScript==
// @name			Dima1994 sucks
// @description		Removes annoying posts on forum.funkysouls.com
// @include			http://forum.funkysouls.com/*
// @copyright		2010, whm
// @version 1.05
// ==/UserScript==

(function ()
{
	var fucktards = ["Dima1994"];
	var titles = ["хуесос", "мудак", "пидрила"];

	function nextObject(obj)
	{
		var n = obj;
		do n = n.nextSibling; while (n && n.nodeType != 1);
		return n;
	}

	function previousObject(obj)
	{
		var n = obj;
		do n = n.previousSibling; while (n && n.nodeType != 1);
		return n;
	}
	
	function hideObject(obj)
	{
		obj.style.display = 'none';
	}
	
	function getRandomInt(min, max)
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var links = document.getElementsByTagName('a');
	for(var i = 0; i < links.length; i++)
	{
		var link = links[i];
		if (fucktards.indexOf(link.innerHTML) > -1 && link.parentNode.parentNode.tagName.toLowerCase() == "span")
		{
			var row = link.parentNode.parentNode.parentNode.parentNode;
			var tbody = row.parentNode;
			
			hideObject(previousObject(row));
			hideObject(nextObject(nextObject(row)));
			hideObject(nextObject(row));
			hideObject(row);
		}
	}
	var links = document.getElementsByTagName('b');
	for(var i = 0; i < links.length; i++)
	{
		var link = links[i];
		for(j = 0; j < fucktards.length; j++)
		{
			if (link.innerHTML.indexOf(fucktards[j]) > -1)
			{
				link.innerHTML = link.innerHTML.replace(fucktards[j], titles[getRandomInt(0, titles.length-1)]);
			}
		}
	}
})();
