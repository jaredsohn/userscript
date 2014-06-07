// ==UserScript==
// @name			4chan YouTube URL replacer
// @namespace		ScottSteiner@irc.rizon.net
// @description		Turns plaintext youtube URIs into embedded objects
// @include			http://4chanarchive.org/brchive/*
// @include			http://archive.easymodo.net/cgi-board.pl/*
// @include			http://boards.4chan.org/*
// @include			http://boards.420chan.org/*
// @include			http://dis.4chan.org/read/*
// @include			http://green-oval.net/cgi-board.pl/*
// @include			http://suptg.thisisnotatrueending.com/archive/*
// @include			http://www.ptchan.net/*
// @version			1.09
// @copyright		2010, Scott Steiner
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

reDis			= /<a rel.*>.*?\?v=([a-zA-Z0-9_-]{11}).*?<\/a>(?:<br \/>|)/
reLinked		= /<a href="(?:http.{3}|)(?:www.|)youtube.com\/watch\?v=.*?"(?: rel="nofollow"|)>.*?\?v=([a-zA-Z0-9_-]{11}).*?<\/a>/
reMain			= /(?:http.{3}|)(?:www.|)youtube.com\/watch\?v=([a-zA-Z0-9_-]{11})(?:&amp;(?:feature=(?:agve|aso|channel|feedrec|fvhl|player_embedded|playlist|popt[a-zA-Z0-9]{6}|popular|sub|topvideos|youtu.be|)|index=[0-9]|p=[a-zA-Z0-9_-]{16}|playnext=[0-9]|playnext_from=TL|videos=[a-zA-Z0-9_-]{11})|){1,10}(?:<br>|)/

reDisSites		= /(?:dis.4chan.org)/
reLinkedSites	= /(?:420chan.org|green-oval.net)/
reMainSites		= /(?:boards.4chan.org|4chanarchive.org|archive.easymodo.net|suptg.thisisnotatrueending.com|www.ptchan.net)/

embedcode 		= '<object type="application/x-shockwave-flash" style="width: 630px; height: 380px" data="http://www.youtube-nocookie.com/v/$1&ap=%2526fmt%3D22"><param name="movie" value="http://www.youtube-nocookie.com/v/$1&ap=%2526fmt%3D22"></object><br />'

posts = document.getElementsByTagName("blockquote");
for (i = 0; i < posts.length; i++) { 
	for (j = 0; j < 5; j++) { 
		if (reDisSites.exec(document.URL))		posts[i].innerHTML		= posts[i].innerHTML.replace(reDis, embedcode);
		if (reLinkedSites.exec(document.URL))	posts[i].innerHTML		= posts[i].innerHTML.replace(reLinked, embedcode); 
		if (reMainSites.exec(document.URL))		posts[i].innerHTML		= posts[i].innerHTML.replace(reMain, embedcode); 
	}
}
