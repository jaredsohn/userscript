//This is a Greasemonkey user script, to install it you need to first install Greasemonkey at:
//https://addons.mozilla.org/en-US/firefox/addon/748
//---------------------------------------------------------------------
//A better version of this will be released eventually, but for now please make do with this one!
//---------------------------------------------------------------------
//To change the color of your background, change the 2 values of FF9900 and black to something else,
//a chart for these can be found by searching “hexadecimal code chart”
//---------------------------------------------------------------------
// ==UserScript==
// @name           GameFAQs Background Changer
// @namespace      http://websiteoninternet.com
// @description    Changes the text and background color on GameFAQs guides to hurt your eyes less if read at night!
// @include        http://www.gamefaqs.com/*
// @include        http://gamefaqs.com/*
// ==/UserScript==

        var elmModify = document.getElementById("body");
        elmModify.style.color = '#FF9900';
        var elmModify = document.getElementById("body");
        elmModify.style.backgroundColor = 'black';

