// ==UserScript==
// @name Wikia Chat Logger
// @description Chat Logging Script for Wikia
// @include http://*.wikia.com/wiki/Special:Chat*
// @version 1
// @icon http://www.aerial-telephones.co.uk/aerial/wp-content/uploads/2012/04/spanner2.jpg
// ==/UserScript==

var chatLogger=document.createElement('script');
chatLogger.setAttribute('src','http://dev.wikia.com/wiki/User:Kakarot1925/ChatLogger.js?action=raw');
chatLogger.type='text/javascript';

document.getElementsByTagName('head')[0].appendChild(chatLogger);