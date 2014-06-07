// ==UserScript==
// @name        Make a user upload playlist
// @namespace   playlisthing
// @include     http://www.youtube.com/*
// @include	https://www.youtube.com/*
// @include	youtube.com/*
// @include	www.youtube.com/*
// @version     1
// ==/UserScript==

sidebar = document.getElementById("watch7-sidebar-contents");
playlistbutton = document.createElement("div");
playlistbutton.innerHTML = '<a style=\"color: #FFFFFF; text-decoration: none; display: block;\" href=\"javascript:window.location+=\'&feature=mfu_in_order&list=UL\'\">Make a playlist</a>';
playlistbutton.style.backgroundColor="#FF8BF0";
playlistbutton.style.borderRadius="2px";
playlistbutton.style.textAlign="center";
playlistbutton.style.fontSize="15px";
playlistbutton.style.height="36px";
//playlistbutton.style.padding="0 20px";
playlistbutton.style.fontWeight="bold";
playlistbutton.style.margin="10px";
playlistbutton.style.color="#FFFFFF";
playlistbutton.style.lineHeight="36px";



if (!document.getElementById("watch-appbar-playlist")) {
sidebar.insertBefore(playlistbutton, sidebar.firstChild);
}