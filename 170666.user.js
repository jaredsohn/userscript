// ==UserScript==
// @name        Open YouTube videos in TV mode
// @icon        http://i.imgur.com/vD67sda.jpg
// @namespace   http://userstyles.org
// @author        BskyB
// @description	  opens youtube videos in TV(https://www.youtube.com/tv#/) mode. other pages like http://www.youtube.com/feed/subscriptions will open in their default desktop view.
// @version	2013.06.19
// @include        http://www.youtube.com/watch*
// @exclude     https://www.youtube.com/tv#/watch*
// @require    http://usocheckup.dune.net/170666.js
// @downloadURL		https://userscripts.org/scripts/source/170666.user.js
// @updateURL		https://userscripts.org/scripts/source/170666.meta.js
// @grant       GM_getValue
// @grant       GM_log
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @run-at         document-start
// ==/UserScript==

//Redirect from standard Youtube to TV view
window.location.replace(window.location.href.replace("http://www.youtube.com/watch","https://www.youtube.com/tv#/watch"));