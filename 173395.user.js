// ==UserScript==
// @name        Google - Hide Experts Exchange
// @namespace   mdrisser
// @description Hide Google search results that contain Experts Exchange
// @require     http://code.jquery.com/jquery-1.10.2.min.js
// @include     https://www.google.com/*
// @include     http://www.google.com/*
// @grant       none
// @version     1
// ==/UserScript==

function hideExpertsExchange() {
    $('cite:contains("experts-exchange")').parents('li').hide();
    console.log("Hide Experts Exchange");
}

window.setTimeout(hideExpertsExchange, 2000);
/*
Exception: window.setTimeOut is not a function
@Scratchpad/1:17
*/