// ==UserScript==
// @name           Party Friends
// @namespace      http://www.erepublik.com/en/newspaper/freedom-post-180922/1
// @include        http://ww*.erepublik.com/*/party-members/*
// ==/UserScript==

var allLinks = document.getElementsByClassName('nameholder');


for(var i=0; i < allLinks.length; i++) {
    // check if the link href matches pattern
        junk = allLinks[i].href.replace('en/citizen/profile','citizen/friends/add');
	allLinks[i].innerHTML = allLinks[i].innerHTML + '<br> <a title="Add Friend" href="'+junk+' " target="_blank">Add as a Friend</a>';
}