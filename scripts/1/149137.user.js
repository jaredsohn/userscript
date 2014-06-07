// ==UserScript==
// @name        Daha iyi yemeksepeti
// @namespace   http://userscripts.org/users/297509
// @description Yemeksepetinin üst sabit panelini hareketli hale getirir, ekranda daha çok yemek görüntülenmesini sağlar.
// @include     http://*.yemeksepeti.com/*
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version     2
// ==/UserScript==

//no fixed layout
document.body.className = '';

//link to top
$('body').prepend("<div style='position:fixed; bottom:15px; left:0; width:100px;'><a href='javascript: void(0);' id='topLink'>Yukarı</a></div>");

$(function(){
    $("#topLink").click(function(){
        jQuery('html,body').animate({scrollTop:0},500);
    });
});
