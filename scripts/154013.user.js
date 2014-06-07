// ==UserScript==
// @name       Youtube Title on Top
// @namespace  m36
// @version    0.1
// @description  Old Style
// @match      http*://*.youtube.*/watch?*
// @copyright  2012+, You
// ==/UserScript==
var container = document.getElementById('watch7-video');
var headline = document.getElementById('watch7-headline').cloneNode(true);
container.parentNode.insertBefore(headline,container);