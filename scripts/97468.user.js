// ==UserScript==
// @name           Levels4You Skip Queue
// @namespace      http://kodewerx.org/
// @include        http://*.levels4you.*/queue.l4y?*
// @exclude        http://*.levels4you.*/queue.l4y?*addme=true*
// ==/UserScript==

window.location = window.location.href.replace(/http:..(.+)\.levels4you.*file=([^&]+).*/, "http://s1.levels4you.com/files/$1/$2");