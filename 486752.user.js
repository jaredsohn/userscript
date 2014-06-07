// ==UserScript==
// @name        PixelJoint Nice Big Random Button
// @namespace   http://userscripts.org/users/386946
// @include     http://pixeljoint.com/pixelart/*
// @include     http://www.pixeljoint.com/pixelart/*
// @version     1
// @grant       none
// @require http://code.jquery.com/jquery-latest.js
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

$(document).ready(function() {
    //Random button
    $("#ratings1").parent().append('<a href="http://www.pixeljoint.com/pixels/getrandom_pixelart.asp" style="font-weight: bold; font-size: 30px; text-decoration: none; margin-top:30px; -webkit-border-radius: 10px; border-radius: 10px display: block; height: 50px; ">RANDOM</a>');
});
    