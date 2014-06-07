// ==UserScript==
// @name MultiPM loader
// @description Autoloads Joeytje50's MultiPM on Wikia chats
// @include http://*.wikia.com/wiki/Special:Chat*
// @version 1
// @icon http://www.aerial-telephones.co.uk/aerial/wp-content/uploads/2012/04/spanner2.jpg
// ==/UserScript==

var multiPM=document.createElement('script');
multiPM.setAttribute('src','http://community.wikia.com/wiki/User:Joeytje50/ChatPMs.js?action=raw');
multiPM.type='text/javascript';

document.getElementsByTagName('head')[0].appendChild(multiPM);