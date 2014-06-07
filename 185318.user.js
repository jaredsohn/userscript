// ==UserScript==
// @name        Motion Detector Pro App Movil
// @namespace   motiondetector.mobi
// @include     *motiondetector.mobi*
// @version     1.0
// @grant       none
// @require     http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==

$(document).ready(function() {
    $(".image a").each(function(){
        $(this).append("<a href='"+$(this).attr("href")+"&deleteimage=true'><img width='200px' src='http://www.mikeweller.com/images/blog/iphone_delete_button_example.png'/></a>");
    });
});