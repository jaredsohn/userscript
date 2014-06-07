// ==UserScript==
// @name          YouTube Full Description
// @version       8
// @date          2010-04-03
// @description   Automatically shows the full description on YouTube video pages.
// @namespace     http://www.theworldofstuff.com/greasemonkey/
// @copyright     Copyright 2007-2010 Jordon Kalilich (http://www.theworldofstuff.com/)
// @license       GNU GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @require       http://usocheckup.dune.net/10038.js?maxage=5
// @include       http://youtube.com/watch?*
// @include       http://*.youtube.com/watch?*
// ==/UserScript==

/*
default (not expanded):
   #watch-info has class "yt-rounded"
   #watch-description has class "watch-expander yt-uix-expander yt-uix-expander-animated yt-uix-expander-collapsed"
expanded:
   #watch-info has class "yt-rounded expanded"
   #watch-description has class "watch-expander yt-uix-expander yt-uix-expander-animated"
*/

document.getElementById('watch-info').className = 'yt-rounded expanded';
document.getElementById('watch-description').className = 'watch-expander yt-uix-expander yt-uix-expander-animated';
