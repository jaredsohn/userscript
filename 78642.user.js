// ==UserScript==
// @name           AddSnapShots
// @namespace      http://www.e-riverstyle.com/
// @version        0.83
// @description    This is to add SnapShots for your Firefox and Google Chrome
// @include
// @exclude
// ==/UserScript==

var URL = 'http://shots.snap.com/ss/2152fa246cf24d5d5438455bb0e456da/snap_shots.js';


var script = document.createElement('script');
script.src = URL;
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);