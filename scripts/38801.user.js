// ==UserScript==
// @name          NukeZone Menu
// @namespace     http://safetydance.se/nz
// @description   Making navigation of NukeZone less tedious
// @include       http://nukezone.nu/*
// @include       http://www.nukezone.nu/*
// ==/UserScript==

var navbar, clanHeadLine;
navbar = document.getElementById('menuHeader');
navbar.parentNode.innerHTML = 
	'<span>The province</span>'
		+ '<a href="/game.asp?Action=Main">Overview</a>'
		+ '<a href="/info.asp?Action=Status">Status</a>'
		+ '<a href="/research.asp">Research</a>'
		+ '<a href="/explore.asp">Explore</a>'
		+ '<a href="/build.asp?Action=Buildings">Buildings</a>'
		+ '<a href="/bank.asp">Bank</a>'
		+ '<a href="/preferences.asp?Action=Preferences">Preferences</a>'
	+ '<span><a href=""><a href="/clan.asp?Action=Clans">The Clan</a></span>'
		+ '<a href="/clan.asp?Action=ClanInformation">Information</a>'
		+ '<a target="_blank" href="/forum/clanforum.asp">Forum</a>'
		+ '<a href="/clan.asp?Action=ClanMessage">Message</a>'
		+ '<a href="/clan.asp?Action=ClanWars">Wars</a>'
		+ '<a href="/clan.asp?Action=SendAid">Send aid</a>'
	+ '<span>The mall</span>'
		+ '<a href="/market.asp?Action=Buy">Market</a>'
		+ '<a href="/build.asp?Action=SeaUnits">Sea Units</a>'
		+ '<a href="/build.asp?Action=AirUnits">Air Units</a>'
		+ '<a href="/build.asp?Action=Vehicles">Vehicles</a>'
		+ '<a href="/build.asp?Action=Infantry">Infantries</a>'
		+ '<a href="/build.asp?Action=Missiles">Missiles</a>'
		+ '<a href="/satellites.asp?Action=Satellites">Satellites</a>'
	+ '<span>Attack</span>'
		+ '<form name="search" method="get" action="http://www.nukezone.nu/attack.asp">'
			+ 'P <input type="text" name="X" value="" size="6">'
			+ '<input type="submit" value="kill!">'
		+ '</form>'
	+ '<span><a href="/search.asp?Action=Standard">Find Prrreeey...</a></span>'
		+ '<a href="/show.asp?Action=Clans">All Clans</a>'
		+ '<a href="/toplist.asp?Action=Provinces">Top Lists</a>'
		+ '<form name="search" method="get" action="search.asp">'
			+ '<input type="hidden" name="Action" value="Standard">'
			+ '<input type="hidden" name="X2" value="0">'
			+ '<input type="hidden" name="X3" value="0">'
			+ 'P <input type="text" name="X1" value="" size="6">'
			+ '<input type="submit" value="ok">'
		+ '</form>'
		+ '<form name="search" method="get" action="search.asp">'
			+ '<input type="hidden" name="Action" value="Standard">'
			+ '<input type="hidden" name="X2" value="1">'
			+ '<input type="hidden" name="X3" value="0">'
			+ 'C <input type="text" name="X1" value="" size="6">'
			+ '<input type="submit" value="ok">'
		+ '</form>'
	+ '<span>The other stuff</span>'
		+ '<a target="_blank" href="http://files.nukezone.info/manual_en.htm">Manual</a>'
		+ '<a target="_blank" href="/forum/nukeforum.asp">Forums</a>'
		+ '<a target="_blank" href="http://www.nukezone.info/articles.aspx">Articles</a>'
		+ '<a href="/logout.asp">Logout</a>';