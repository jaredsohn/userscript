// ==UserScript==
// @name           YouTube HD
// @namespace      Guillermo Rodríguez & Cody Bellinger
// @description    Force any YouTube video to play in 720p
// @version        1.3
// @include        http*://*youtube.com/watch?*
// @exclude        http*://*youtube.com/*&hd=1*
// @run-at         document-start
// ==/UserScript==
//Stops iFrame
if (window.frameElement) return;
// Change to HD
window.location.href = window.location.href+'&hd=1';