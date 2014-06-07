// ==UserScript==
// @name Chathacks loader
// @description Autoloads chathacks on Wikia chats
// @include http://*.wikia.com/wiki/Special:Chat*
// @include http://*.wikia.com/index.php?title=Special:Chat*
// @version 1.1
// @icon http://www.aerial-telephones.co.uk/aerial/wp-content/uploads/2012/04/spanner2.jpg
// ==/UserScript==

var link=document.createElement('script');
link.setAttribute('src','http://community.wikia.com/index.php?title=User:Monchoman45/ChatHacks.js&action=raw');
link.type='text/javascript';

document.getElementsByTagName('head')[0].appendChild(link);