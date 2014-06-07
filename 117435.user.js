// ==UserScript==
// @name           MegaVideo No Limits
// @description    Will remove the MegaUpload limits
// @namespace      http://userscripts.org/scripts/show/117435
// @updateURL      http://userscripts.org/scripts/review/117435.user.js
// @version        00.00.0004
// @include        http://www.megavideo.com/?*
// @exclude        http://www.megavideo.com/
// ==/UserScript==

var newurl = window.location.href.replace(/^http:\/\/www.megavideo.com\/(.+)/, 'http://wwwstatic.megavideo.com/mv_player\.swf$1');
//window.location.href = newurl;
location.replace(newurl);