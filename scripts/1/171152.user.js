// ==UserScript==
// @name Chat Hacks Loader
// @description Auto Loads Chat Hacks on Wikia Chats
// @include http://*.wikia.com/wiki/Special:Chat*
// @version 1
// @icon http://www.aerial-telephones.co.uk/aerial/wp-content/uploads/2012/04/spanner2.jpg
// ==/UserScript==

var link=document.createElement('script');
link.setAttribute('src','http://dev.wikia.com/wiki/User:Kakarot1925/ChatHacks.js?action=raw');
link.type='text/javascript';

document.getElementsByTagName('head')[0].appendChild(link);