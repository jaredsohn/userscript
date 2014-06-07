// ==UserScript==
// @name           Kongregate Game Downloader
// @namespace      http://www.kilandor.com/
// @description    Finds the Game URL and adds a download link in the "QuickLinks"
// @include        http://*.kongregate.com/games/*
// @source         http://userscripts.org/scripts/show/70371
// @identifier     http://userscripts.org/scripts/source/70371.user.js
// @version        0.6
// @date           2010-03-08

// ==/UserScript==

//Only loads this code on the main window
if(window.top == window.self)
{
	GM_setValue("game_download_url", "");
	function add_game_download()
	{
		var gameurl = GM_getValue("game_download_url");
		if(gameurl == "")
		{
			setTimeout(add_game_download, 1000);
			return;
		}
		var gamedownload = document.createElement("li");
		gamedownload.setAttribute("style","background-position:0 -100px;");
		gamedownload.innerHTML='&nbsp;<a href="'+gameurl+'">Download Game</a>';
		var quicklinks = document.getElementById('quicklinks');
		quicklinks.appendChild(gamedownload);
	}
	//This is used so it can keep running tryign to add the button, till the iframe is loaded
	//and the URL is stored.
	setTimeout(add_game_download, 1000);
}
else
{
	function URLDecode(psEncodeString)
	{
		// Create a regular expression to search all +s in the string
		var lsRegExp = /\+/g;
		// Return the decoded string
		return unescape(String(psEncodeString).replace(lsRegExp, " "));
	}
	var gamevars;
	//this code is only executed in the iframe where the game is loaded
	//it stores the url into a GreaseMonkey Value, which is the only clean way to access it
	//due to cross site scripting issues(the iframe is loading a subdomain of kongregate)
	var gamediv = document.getElementById('gamediv');
	var gameparams = gamediv.getElementsByTagName('param');
	for (var i = 0; i < gameparams.length; i++)
	{
		if (gameparams[i].getAttribute('name') == 'flashvars')
		{
			gamevars = gameparams[i].getAttribute('value');
		}
	} 
	string = URLDecode(gamevars);
	var gameurldata = string.match(/http:\/\/chat.kongregate.com\/gamez\/([0-9]+)\/([0-9]+)\/live\/(.[^.]+)\.swf/i);
	if(gameurldata == null)
	{
		var gameurl = gamediv.getAttribute('data');
	}
	else
	{
		var gameurl = gameurldata[0];
	}
	GM_setValue("game_download_url", gameurl);
}