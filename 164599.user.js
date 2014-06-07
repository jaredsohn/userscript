// ==UserScript==
// @name Searchbar loader
// @description Autoloads Searchbar feature on Wikia chats
// @include http://*.wikia.com/wiki/Special:Chat*
// @version 1
// @icon http://www.aerial-telephones.co.uk/aerial/wp-content/uploads/2012/04/spanner2.jpg
// ==/UserScript==

var searchbar=document.createElement('script');
searchbar.setAttribute('src','http://callofduty.wikia.com/wiki/MediaWiki:Chat.js/searchbar.js?action=raw');
searchbar.type='text/javascript';

document.getElementsByTagName('head')[0].appendChild(searchbar);