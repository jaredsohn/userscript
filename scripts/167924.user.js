// ==UserScript==
// @name           Youtube Auto HD
// @namespace      Youtube hd auto 720p
// @description    Force any YouTube video to play in HD
// @version        1.0
// @include        http*://*youtube.com/watch?*
// @exclude        http*://*youtube.com/*&hd=1*
// @run-at         document-start
// ==/UserScript==

if (window.frameElement) return;
window.location.href = window.location.href+'&hd=1';