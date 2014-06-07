// ==UserScript==
// @name           adblocker
// @namespace      vkscript
// @include        http://vkontakte.ru/*


// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.js

// ==/UserScript==

onload = block();

function block(){    
    $("#left_ads").hide();
}