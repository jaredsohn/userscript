// ==UserScript==
// @name            Wikipedia SOPA Remove Blackout
// @author          wikked
// @namespace       http://wikked.info/userscripts/wikipedia-sopa-remove-blackout.js
// @description     Remove the Wikipedia SOPA Blackout screen
// @license         Creative Commons Attribution License
// @version         0.3
// @include         http://wikipedia.org/*
// @include         http://en.wikipedia.org/*
// @include         https://wikipedia.org/*
// @include         https://en.wikipedia.org/*
// @match           http://*.wikipedia.org/*
// @match           https://*.wikipedia.org/*
// @released        2012-01-18
// @updated         2012-01-18
// ==/UserScript==

var headElement = document.getElementsByTagName("head")[0];
if (headElement) 
{ 
    var styleElement = document.createElement("style");
    styleElement.type = "text/css";
    var css = "#mw-sopaOverlay { display:none!important;  } "
            + "#mw-page-base   { display:block!important; } "
            + "#mw-head-base   { display:block!important; } "
            + "#content        { display:block!important; } "
            + "#mw-head        { display:block!important; } "
            + "#mw-panel       { display:block!important; } "
            + "#footer         { display:block!important; } ";
    styleElement.innerHTML = css;
    headElement.appendChild(styleElement);
}
