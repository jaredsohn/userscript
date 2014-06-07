// ==UserScript==
// @name Chatags loader
// @description Autoloads chatags on Wikia chats
// @include http://*.wikia.com/wiki/Special:Chat*
// @version 1
// @icon http://www.aerial-telephones.co.uk/aerial/wp-content/uploads/2012/04/spanner2.jpg
// ==/UserScript==

var link=document.createElement('script');
link.setAttribute('src','http://dev.wikia.com/wiki/ChatTags/code.js?action=raw');
link.type='text/javascript';

document.getElementsByTagName('head')[0].appendChild(link);
