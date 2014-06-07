// ==UserScript==
// @name           Youtube Homepage to Subscriptions
// @namespace      CodyMKW
// @author         CodyMKW
// @copyright      2012+, CodyMKW
// @description    Redirects youtube homepage to subscriptions
// @version        1.0
// @website        http://codysnintendoroom.co.vu
// @include        *www.youtube.com/
// @include        *www.youtube.com/home
// @include        *www.youtube.com/?feature=ytca
// @exclude        http://www.youtube.com/feed/subscriptions/
// @exclude        https://www.youtube.com/feed/subscriptions/
// @icon           http://i.imgur.com/FnVaxMO.png
// ==/UserScript==

//Stops iFrame
if (window.frameElement) return;

window.location.replace("http://www.youtube.com/feed/subscriptions/");