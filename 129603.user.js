// ==UserScript==
// @name           DeZeke
// @namespace      http://userscripts.org/users/442994
// @description    removes Zeke Miller entries from BuzzFeed
// @include        http://www.buzzfeed.com/
// ==/UserScript==

var item = document.getElementsByTagName('li');
for (var i = 0; i < item.length; i++) { 
	if(item[i].innerHTML.match(/zekejmiller/)){
 		item[i].style.visibility = 'hidden';
    }
}