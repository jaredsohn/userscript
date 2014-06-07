// ==UserScript==
// @name        mmmturkeybacon Remove Embedded Youtube
// @author      mmmturkeybacon
// @description Removes embedded youtube videos from mturkforum and mturkgrind.
// @namespace   http://userscripts.org/users/523367
// @match       http://mturkforum.com/showthread.php?*
// @match       http://www.mturkgrind.com/showthread.php?*
// @match       http://www.mturkgrind.com/threads/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/293504.user.js
// @updateURL   http://userscripts.org/scripts/source/293504.meta.js
// @version     1.11
// @grant       none
// ==/UserScript==

var yt_embed = $('iframe[src^="//www.youtube.com"]');
yt_embed.parent().append("<br><b>mmmturkeybacon Remove Embedded Youtube has removed this video.</b>");
yt_embed.remove();