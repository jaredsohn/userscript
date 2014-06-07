// ==UserScript==
// @name MultiKick loader
// @description Autoloads Multikick feature on Wikia chats
// @include http://*.wikia.com/wiki/Special:Chat*
// @version 1
// @icon http://www.aerial-telephones.co.uk/aerial/wp-content/uploads/2012/04/spanner2.jpg
// ==/UserScript==

var multiKick=document.createElement('script');
multiKick.setAttribute('src','http://callofduty.wikia.com/wiki/User:Madnessfan34537/multikick.js?action=raw');
multiKick.type='text/javascript';

document.getElementsByTagName('head')[0].appendChild(multiKick);