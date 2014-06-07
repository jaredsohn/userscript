// ==UserScript==
// @name       SteamGifts Hide Contributor Only
// @namespace  http://steamcommunity.com/id/satanxvx/
// @version    0.666a
// @description  This script will hide all Contributor Only posts on Steam Gifts - Ugly ass code by Nicholai Nissen
// @match      http://www.steamgifts.com/*
// @copyright  2014 Nicholai Nissen - CC BY-SA 4.0 - http://creativecommons.org/licenses/by-sa/4.0/
// ==/UserScript==

setTimeout(function change_boxes() {
    var posts = document.getElementsByClassName('post'),
        i = posts.length;
    
    while(i--) {
        if(posts[i].getElementsByClassName('left')[0].getElementsByClassName('description')[0].getElementsByClassName('contributor_only').length){
            posts[i].style.display = "none";
        }
    }},1);
// =)
//left
//description
//contributor_only