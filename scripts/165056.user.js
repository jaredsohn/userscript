// ==UserScript==
// @name        Facebook Newsticker Killer
// @namespace   http://www.slickwebdev.net/
// @description Gets rid of the annoying Facebook newsticker.
// @version     1.0
// @include     http://facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://facebook.com/*
// @include     https://*.facebook.com/*
// ==/UserScript==

/*         DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
 *                     Version 2, December 2004 
 * 
 *  Copyright (C) 2004 Sam Hocevar <sam@hocevar.net> 
 * 
 *  Everyone is permitted to copy and distribute verbatim or modified 
 *  copies of this license document, and changing it is allowed as long 
 *  as the name is changed. 
 * 
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION 
 * 
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 */

var ticker = document.getElementById('pagelet_ticker');
console.log(ticker);
if (ticker) {
    ticker.parentNode.removeChild(ticker);
}

// EOF