// ==UserScript==
// @name        CliffsNotes - Add Arrow Controls
// @description This script allows you to go to the "Previous" page and "Next" page on CliffsNotes using your left and right arrow keys, respectively.
// @include     *cliffsnotes.com/literature/*
// @version     1.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace   https://play.google.com/store/apps/details?id=air.ef.PaddleBall
// ==/UserScript==

var leftLink = $("#innerlayout_0_phbottompager_0_divPreviousPage").find("a").attr("href");

var rightLink = $("#innerlayout_0_phbottompager_0_divNextPage").find("a").attr("href");

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