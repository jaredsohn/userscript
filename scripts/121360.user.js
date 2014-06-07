// ==UserScript==
// @name        LOVEFiLM Bigger Player
// @namespace   http://lovefilm.com
// @description A script to increase the size of the window when streaming in non-fullscreen mode.
// @include     http://*.lovefilm.*/
// @version     0.9
// ==/UserScript==

document.getElementById('player').setAttribute('style', 'width: 956px; height: 507px');
document.getElementById('slPlugin').setAttribute('style', 'width: 956px; height: 507px');
//$('#product-summary h1.long-title').first().css('float', 'left').css('margin-top', '2px');
//$('#product-summary span.long-title').first().css('margin-top', '-1px');
