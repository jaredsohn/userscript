// ==UserScript==
// @name       TTG Confirm Logout
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Confirm Logout of TheTechGame
// @match      *://www.thetechgame.com/*
// @copyright  2013+, Tattoo & Imp
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @grant       GM_info 

// ==/UserScript==


$('a[title="Logout"]').on('click', function(){
    return confirm('Are you sure you want to logout?');
});