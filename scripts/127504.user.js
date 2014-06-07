// ==UserScript==
// @name           Old YouTube uploader
// @namespace      http://youtube.com/elfabiotv
// @description    Forces YouTube to use the old video upload manager and does nothing more!
// @author         elFABIO
// @version        5th March 2012
// @include        http://*.youtube.com/my_videos_upload*
// @exclude        http://*.youtube.com/*?forceui=3
// @include        https://*.youtube.com/my_videos_upload*
// @exclude        https://*.youtube.com/*?forceui=3
// ==/UserScript==
window.location.href = window.location.href+'?forceui=3';