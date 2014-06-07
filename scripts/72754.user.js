//This is a Greasemonkey user script, to install it you need to first install Greasemonkey at:
//https://addons.mozilla.org/en-US/firefox/addon/748
//---------------------------------------------------------------------
//A better version of this will be released eventually, but for now please make do with this one!
//---------------------------------------------------------------------
//To change the color of your background, change the 2 values of FF9933 to something else, a chart for these can be found
//by searching “hexadecimal code chart”
// ==UserScript==
// @name           Color Changer for FB
// @namespace      http://www.facebook.com/home.php#!/profile.php?ref=profile&id=100000202447274
// @description    This script changes part of the background color of your FB page! Defaults to orange, but that can be changed.
// @include        http://www.facebook.com/*
// @include        http://facebook.com/*
// ==/UserScript==

        var elmModify = document.getElementById("contentArea");
        elmModify.style.color = 'black';
        var elmModify = document.getElementById("contentArea");
        elmModify.style.background = '#FF9933';
        var elmModify = document.getElementById("headNavOut");
        elmModify.style.background = '#FF9933';
        var elmModify = document.getElementById("div.GenericStory_Body");
        elmModify.style.color = 'white';
