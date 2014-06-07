// ==UserScript==
// @name       AutoStartYourSubscriptions
// @namespace  http://xpherio.info
// @version    0.3
// @description  Fuck the new YouTube, I want my subscription
// @match      http://*/*
// @copyright  2012 Xpherio
// ==/UserScript==
function lox(){

    var x = window.location; if(document.getElementById('yt-masthead-user-displayname')){ if(x == 'http://youtube.com' || x == 'youtube.com/' || x == 'https://youtube.com' || x == 'https://youtube.com/' || x == 'http://youtube.com/' || x == 'http://www.youtube.com' ||  x == 'http://www.youtube.com/'){ window.location='http://www.youtube.com/feed/subscriptions/u';  } } } window.onBeforeLoad=lox(); window.onLoad=lox();