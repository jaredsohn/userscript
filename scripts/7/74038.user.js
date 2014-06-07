// ==UserScript==
// @name          relink.us click'n'load adder
// @namespace     
// @author        Thomas Kekeisen (http://thomaskekeisen.de)
// @description   Shows everytime the jdownloader click'n'load button
// @include       http://*relink.us/*
// ==/UserScript==

// Check whether the "click'n'load" parameter is missing
if (window.location.href.indexOf('&jd=1') == -1)
{
    // Add the missing parameter
    window.location.href += '&jd=1';
}