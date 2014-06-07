// ==UserScript==
// @name       Better Weather.com
// @namespace  http://example.com/
// @version    0.1
// @description  Weather.com provides a big red bar at the top even when there is no weather emergency... Very annoying.  Don't cry wolf!  Also, their ads are annoying.  Bye for now to both!
// @match      http://www.weather.com/*
// @copyright  2012+, You
// ==/UserScript==


// muchas gracias
// http://somethingididnotknow.wordpress.com/2013/07/01/change-page-styles-with-greasemonkeytampermonkey/
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// sayonara
addGlobalStyle('#wx-wrapper{border-top:none}');
addGlobalStyle('.wx-gptADS{display:none}');
