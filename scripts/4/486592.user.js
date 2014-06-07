// ==UserScript==
// @name        XCKD Arrow Controls
// @namespace   https://play.google.com/store/apps/details?id=air.ef.PaddleBall
// @description Allows you to navigate through XCKD comics with the left and right arrow keys.
// @include     http://xckd.com/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


var leftLink = $("a[rel='prev']").attr("href");

var rightLink = $("a[rel='next']").attr("href");

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
			if(typeof leftLink != "undefined")
			window.location.href = leftLink;
        break;
        case 39: // right
			if(typeof rightLink != "undefined")
			window.location.href = rightLink;
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});