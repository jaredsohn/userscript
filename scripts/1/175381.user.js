// ==UserScript==
// @name        HFES - Location Hider
// @author      Emylbus
// @namespace   http://www.sublyme.net
// @version     1
// @description Hide your location on HF.
// @include     *hackforums.net/*
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

if(document.URL.indexOf("nsfw.") != -1){
    $.get("http://nsfw.hackforums.net/misc.php", function(){});
}else if(document.URL.indexOf("www.") != -1){
    $.get("http://www.hackforums.net/misc.php", function(){});
}else{
    $.get("http://hackforums.net/misc.php", function(){});
}