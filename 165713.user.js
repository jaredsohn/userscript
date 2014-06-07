// ==UserScript==
// @name           Reddit Downvote/Upvote Bomb
// @namespace      void
// @description    Allows you to downvote or upvote entire threads on Reddit.
// @match          http://www.reddit.com/*
// @include        http://www.reddit.com/*
// @version        1.0
// ==/UserScript==

var bombButton = document.createElement("input");
bombButton.type = "button";
bombButton.onclick = function()
{	
	var downvoteList = document.querySelectorAll('[class~="arrow"][class~="down"]');
	var i = 0;
	var timer = setInterval(function()
	{
		downvoteList[i].click();
		i++;
		if (i >= downvoteList.length)
		{
			clearInterval(timer);
		}
	},1000);
}
bombButton.value = "Downvote All"
bombButton.setAttribute("style","box-sizing: content-box; display: block; position: fixed; top: 45px; right: 20px; width: 106px; height: 16px; padding: 1px 6px; margin: none; z-index: 1000;");
document.body.appendChild(bombButton);

var bombButton2 = document.createElement("input");
bombButton2.type = "button";
bombButton2.onclick = function()
{	
	var upvoteList = document.querySelectorAll('[class~="arrow"][class~="up"]');
	var i = 0;
	var timer = setInterval(function()
	{
		upvoteList[i].click();
		i++;
		if (i >= upvoteList.length)
		{
			clearInterval(timer);
		}
	},1000);
}
bombButton2.value = "Upvote All"
bombButton2.setAttribute("style","box-sizing: content-box; display: block; position: fixed; top: 20px; right: 20px; width: 106px; height: 16px; padding: 1px 6px; margin: none; z-index: 1000;");
document.body.appendChild(bombButton2);