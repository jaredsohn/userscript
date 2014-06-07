// ==UserScript==
// @name        What.CD :: Show requests on torrent group pages
// @author      Z4ppy
// @namespace   Z4ppy.What.CD
// @description Automatically toggle the request list on torrent group pages
// @include     https://what.cd/torrents.php?id=*
// @grant       none
// @version     1.0
// @date        2013-03-21
// ==/UserScript==

document.getElementById('requests').parentNode.getElementsByTagName('a')[0].click();