// ==UserScript==
// @name        Facebook Chat Sidebar FIX
// @namespace   facebook.com
// @include     *.facebook.com/*
// @include     *www.facebook.com/*
// @version     1
// @grant       none
// ==/UserScript==
document.getElementById('pagelet_canvas_nav_content').style.display = 'none';
document.getElementById('pagelet_ticker').style.display = 'none';

document.getElementsByClassName('fbSidebarGripper')[0].style.display = 'none';
document.getElementsByClassName('fbSidebarGripper')[1].style.display = 'none';