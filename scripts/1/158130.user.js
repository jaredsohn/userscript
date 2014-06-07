// ==UserScript==
// @name            More YouTube Menu
// @namespace       http://www.lordtoad.de
// @version         1.3.1
// @author          LordToad
// @description     You will see more options in the menu bar
// @include	    *.youtube.com/*
// @updateVersion   5
// ==/UserScript==


var username = document.getElementById('yt-masthead-user-displayname').innerText;
var newMenu = '';
var MenuHr = '<li role="menuitem" style="height: 4px;"></li><li role="menuitem" style="height: 1px; background-color: #999;"></li><li role="menuitem" style="height: 4px;"></li>';

newMenu += '<li role="menuitem"><a href="/my_videos" class="yt-uix-button-menu-item upload-menu-link">Video-Manager</a></li>';
newMenu += '<li role="menuitem"><a href="/view_all_playlists" class="yt-uix-button-menu-item upload-menu-link">Playlists</a></li>';
newMenu += '<li role="menuitem"><a href="/dashboard" class="yt-uix-button-menu-item upload-menu-link">Dashboard</a></li>';
newMenu += MenuHr;
newMenu += '<li role="menuitem"><a href="/inbox" class="yt-uix-button-menu-item upload-menu-link">Posteingang</a></li>';
newMenu += '<li role="menuitem"><a href="/user/'+ username +'" class="yt-uix-button-menu-item upload-menu-link">'+ username +'</a></li>';
newMenu += MenuHr;
newMenu += '<li role="menuitem"><a href="/analytics" class="yt-uix-button-menu-item upload-menu-link">Analytics</a></li>';
newMenu += '<li role="menuitem"><a href="http://socialblade.com/youtube/user/'+ username +'/monthly" target="_blank" class="yt-uix-button-menu-item upload-menu-link">Socialblade</a></li>';
newMenu += '<li role="menuitem"><a href="/audience" class="yt-uix-button-menu-item upload-menu-link">Community</a></li>';

document.getElementById('upload-button-menu').innerHTML = newMenu;