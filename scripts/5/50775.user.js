// ==UserScript==
// @name           UserScripts.org - New Jetpack in Dropdown
// @namespace      http://mailerdaemon.home.comcast.net
// @description    Adds a "New Jetpack" option to the user dropdown on UserScripts.org
// @include        http://userscripts.org/*
// ==/UserScript==

if(hm = document.getElementById("homeMenu"))
{
	li = document.createElement("li");
	li.innerHTML="<a href='/jetpacks/new'>new jetpack</a>";
	hm.appendChild(li);
}