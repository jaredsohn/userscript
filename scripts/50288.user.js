// ==UserScript==
// @name           PTS on Firefox
// @namespace      http://jimmybot.com
// @include        http://ap.ch5.tv/phpplay/publish.php*
// @description    Fixes link so that watching videos on 台灣公共電視台 (公視) | Taiwan Public Television Service (PTS) website works in Firefox (http://www.pts.org.tw)
// ==/UserScript==
window.location = String(window.location).replace('publish.php', 'play.php');
