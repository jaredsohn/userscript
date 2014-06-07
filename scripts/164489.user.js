// ==UserScript==
// @name        Hide Blocked GeekList Items
// @namespace   dschachtler.dssr.ch
// @include     http://www.boardgamegeek.com/geeklist/*
// @include     http://boardgamegeek.com/geeklist/*
// @include     http://www.videogamegeek.com/geeklist/*
// @include     http://videogamegeek.com/geeklist/*
// @include     http://www.rpggeek.com/geeklist/*
// @include     http://rpggeek.com/geeklist/*
// @version     3
// @updateURL   http://userscripts.org/scripts/source/164489.user.js
// ==/UserScript==

var items = document.getElementsByClassName("mb5");
for (var i = 0; i < items.length; i++)
{
	var item = items[i];
	var cmd = item.getElementsByClassName('commands');
	if (cmd && cmd.length > 0)
	{
		if (cmd[0].innerHTML.indexOf("Unblock") >= 0)
		{
			hideItem(item);
		}
	}
}

function hideItem(item)
{
	var id = item.getAttribute('id').substr(4);
	
	var comments = document.getElementById('comments_' + id);
	if (comments) comments.style.display = "none";
	
	var body = document.getElementById('body_listitem' + id);
	if (body)
	{
		for (var c = 0; c < body.childNodes.length; c++)
		{
			var child = body.childNodes[c];
			if (child.nodeName == "DD" && child.style) child.style.display = "none";
		}
	}
}