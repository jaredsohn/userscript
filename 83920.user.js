// ==UserScript==
// @name	SchuelerVZ: Freunde online?
// @author	Homer Bond 005
// @include	http://www.schuelervz.net/*
// @exclude	http://www.schuelervz.net/Plauderkasten
// @exclude	http://www.schuelervz.net/logout*
// @exclude	http://www.schuelervz.net/Default*
// ==/UserScript==

//createElement preparation
var newlink = document.createElement("a");
var newatext = document.createTextNode("online");
//find the menu
var menu = document.getElementById("Grid-Navigation-Main");
var friends = menu.getElementsByTagName("li")[2];
//set classes of existing elements
friends.setAttribute("class","clearFix");
var firsta = friends.getElementsByTagName("a")[0];
firsta.setAttribute("class","left");
	//getProfilId
	var profillink = friends.getElementsByTagName("a")[0].getAttribute("href");
	var profilid = profillink.replace(/\/Friends\/All\//,"");
	profilid = profilid.replace(/\/tid\/\d+/, "");
//new a and new text
var a = friends.appendChild(newlink);
a.setAttribute("href","/Friends/Friends/" + profilid + "/online/1");
a.setAttribute("class","right");
a.setAttribute("title","Freunde anzeigen die online sind");
a.setAttribute("rel","nofollow");
a.appendChild(newatext);
