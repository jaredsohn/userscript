// ==UserScript==
// @name        SparkNotes - Add Arrow Controls
// @description This script allows you to go to the "Previous" page and "Next" page on SparkNotes using your left and right arrow keys, respectively.
// @include     *sparknotes.com/lit/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace   https://play.google.com/store/apps/details?id=air.ef.PaddleBall
// ==/UserScript==

var leftLink = $('a[title="previous"]').attr("href");

var rightLink = $('a[title="next"]').attr("href");

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