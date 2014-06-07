// ==UserScript==
// @name        Shmoop - Add Arrow Controls
// @description This script allows you to go to the "Previous" page and "Next" page on Shmoop using your left and right arrow keys, respectively.
// @include     *shmoop.com/*
// @version     1
// @namespace   https://play.google.com/store/apps/details?id=air.ef.PaddleBall
// ==/UserScript==


var leftLink = $(".module_bottomnav_prev").attr("href");

var rightLink = $(".module_bottomnav_next").attr("href");

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