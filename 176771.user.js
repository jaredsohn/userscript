// ==UserScript==
// @name       YouTube - Reintroduction of the Inboxbutton
// @namespace  www.youtube.com
// @version    0.92b
// @description  Adds the Inbox-entry
// @copyright  Gonso_x3
// ==/UserScript==

var ul 	= document.getElementById('masthead-expanded-menu-list');
var ul2 = document.getElementsByClassName('guide-user-links yt-box')[0];
	
var a 	= document.createElement('a');
	a.className = "yt-uix-sessionlink";
	a.href = "https://www.youtube.com/inbox";
	a.innerHTML = "Inbox";
	
var a2 	= document.createElement('a');
	a2.href = "https://www.youtube.com/inbox";
	a2.className = "guide-item yt-uix-sessionlink yt-valign spf-nolink ";
	a2.innerHTML = "<span class='yt-valign-container'> <img class='thumb ' src='https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif' alt='' title=''> <span class='display-name no-count'><span>&nbspInbox</span></span></span>";
	a2.setAttribute("id", "playlists-guide-item");
	a2.setAttribute("data-channel-id", "playlists")
	
var li  = document.createElement('li');
	li.appendChild(a);
	li.className = "masthead-expanded-menu-item";
	
var li2 = document.createElement('li');
	li2.className = "vve-check guide-channel";
	li2.setAttribute("id", "playlists-guide-item");
	li2.appendChild(a2);
	
ul.appendChild(li);
ul2.appendChild(li2);