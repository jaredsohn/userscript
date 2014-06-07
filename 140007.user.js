// ==UserScript==
// @name        _Add an image to a web page
// @include     http://oilempires.com/*
// 
// ==/UserScript==

$("body").append (
    '<img id="myNewImage" src="http://i67.photobucket.com/albums/h320/maddyn99/Oil%20Empires/Cartel%20Bar/RedAlert-Animated80X60.gif" onclick="http://oilempires.com/mcDetail.cfm?threadID=844930">'
);
$("#myNewImage").css ( {
        position:   "fixed",

    top:        "0",
    left:       "0"
} );

