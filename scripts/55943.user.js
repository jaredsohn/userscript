// Get playlist data from playlist.com
// version 0.02 ALFA!
// 2009−03−05
// Copyright (c) 2009, Nikolay Kandalincev
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "VKPlaylist", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          Get Playlist Com
// @namespace     http://nicloay.blogspot.com/
// @description   make playlist from text data
// @include       http://www.playlist.com/playlist/*
// ==/UserScript==



var newBlock= document.createElement("div");
newBlock.setAttribute("class","navigation")

var logList = document.createElement("textarea");
logList.setAttribute("class","navigaion");
logList.style.width="220px";
logList.style.height="500px";
logList.setAttribute("cols", 5);
logList.setAttribute("rows", 30);

var currentPath=window.location.href;
pathid=currentPath.split("/")[4];
GM_xmlhttpRequest({
            'method': 'GET',
            'url': "http://pl.playlist.com/pl.php?e=1&playlist="+pathid,
            'onload': function(xhr) {
		var regex = /<annotation>(.*?)<\/annotation>/gi;
		while (regex.test(xhr.responseText)) {        
	               logList.value=logList.value+RegExp.$1+'\n'
                }

               
            }
        });



newBlock.appendChild(logList);
var content = document.getElementById("sideColumn");
content.appendChild(newBlock);


//http://pl.playlist.com/pl.php?e=1&playlist=2883437323&time=1250613067117&userid=0&cc=&app=wid%5Fsi
