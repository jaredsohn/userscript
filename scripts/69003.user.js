// ==UserScript==
// @name           Rankings & Friends
// @description	   Adds friend links to rankings(English vers only)
// @author	   Endy
// @namespace      DeNada
// @include        http://ww*.erepublik.com/en/rankings/citizens*
// ==/UserScript==

var allLinks = document.getElementsByClassName('dotted');

for(var i=0; i < allLinks.length; i++) {
    // check if the link href matches pattern
        junk = allLinks[i].href.replace('en/citizen/profile','citizen/friends/add');
	allLinks[i].innerHTML = allLinks[i].innerHTML + '<br> <a title="Add Friend" href="'+junk+'" target="_blank">Add as Friend</a>';
}