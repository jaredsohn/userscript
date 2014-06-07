// ==UserScript==
// @name           Unlinked
// @namespace      www.bungie.net
// @description    Takes away the "link your gamertag" link.
// @include        http://*bungie.net*
// ==/UserScript==

var friendslist = document.getElementsByClassName('dbItems');
if (friendslist[0].innerHTML.search("Link your gamertag!") > -1) {
    friendslist[0].parentNode.removeChild(friendslist[0]);
}