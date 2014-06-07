// ==UserScript==
// @name        Zergnet Removal on Minecraft Forum
// @description Remove Zergnet ads from Minecraft Forum
// @include     http://www.minecraftforum.net/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     1
// ==/UserScript==

$(document).ready(function(){
    $("#zergnet_homepage").remove();
});