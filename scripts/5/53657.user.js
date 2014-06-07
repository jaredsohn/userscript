// QSS Forum Network
// Made by Jeremy Neiman - docmarionum1
// version 0.3
// First Release: 2008-09-11
// Last Update: 2008-09-12
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
//
// This script will add a navigation bar for the forums under the  current QSS Network navigation bar.
//
// Version 0.3 changes: Code Cleaned up.
// Version 0.2 changes: The forum bar will now not display the forum that you are currently in.
// Version 0.1 changes: "Live Sport" changed to "Live Sports."
//
// ==UserScript==
// @name          QSS Forum Network
// @namespace     http://okastic.com
// @description   adds QSS forum Network bar to QSS forum
// @include       http://ipb.quicksilverscreen.com/*
// @exclude      
// ==/UserScript==




var text = "<br/><b>The Qss Forums: </b> <b><a href='http://ipb.quicksilverscreen.com/index.php?act=idx'>Index</a></b> - <b><a href='http://ipb.quicksilverscreen.com/index.php?showforum=46'>General Discussion</a></b> - <b><a href='http://ipb.quicksilverscreen.com/index.php?showforum=49'>Movies</a></b> - <b><a href='http://ipb.quicksilverscreen.com/index.php?showforum=50'>TV</a></b> - <b><a href='http://ipb.quicksilverscreen.com/index.php?showforum=51'>Other</a></b> - <b><a href='http://ipb.quicksilverscreen.com/index.php?showforum=48'>Requests</a></b> - <b><a href='http://ipb.quicksilverscreen.com/index.php?showforum=61'>Underground</a></b> - <b><a href='http://ipb.quicksilverscreen.com/index.php?showforum=86'>Contributor Forums</a></b>";


var everything = document.getElementsByTagName("*");

var navBar;

for (i = 0; i < everything.length;i++)
{
	if (everything[i].innerHTML == '<a href="http://livesport.fm/" target="_blank">Live Sport</a>')
	{
		navBar = everything[i];
		continue;
	}
	else if(everything[i].className == "newslink")
	{
		break;
	}
	else if (everything[i].href != null && everything[i].href.search(/showforum=(46|49|50|51|48|61|86)/) > -1)
	{
		text = text.replace("- <b><a href='" + everything[i].href + "'>", "<b style='position:absolute;left:-999em;height:1px;width:100px;overflow:hidden;display:none;'><a href='" + everything[i].href + "'>");
	}
	
}

navBar.innerHTML = '<a href="http://livesport.fm/" target="_blank">Live Sports</a>';
navBar.parentNode.innerHTML = navBar.parentNode.innerHTML + text;




