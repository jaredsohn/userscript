// ==UserScript==
// @name       Hide Contact's Status, Ads, and Stars
// @version    0.4
// @description  This will hide your contact's status messages from the clients list, Hide the Ads, as well as Hide Stars. 
// @include    *mail.google.com*
// ==/UserScript==

var styleEl = document.createElement('style');
styleEl.type = 'text/css';
var css = 'span.nMSsuf { display: none; }';
css += 'tr.vm { display:none; }';
css += 'div.mq { display:none; }';
css += 'div.oM { display:none; }';
css += 'div.aKB { display:none; }';

styleEl.innerHTML = css;
document.documentElement.appendChild(styleEl);