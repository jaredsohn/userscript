// ==UserScript==
// @name           Flickr new comments section improvement
// @description    For the new flickr designed pages, removes the favorites and group invites from the comments section, and renames the section back to Comments
// @namespace      http://www.flickr.com/photos/ceberon
// @include        http://*flickr.com/photos/*
// ==/UserScript==

// Version 1.0 by Ceberon (http://www.flickr.com/photos/ceberon)

var favblock = document.getElementsByClassName('fave-block');
for (favitem in favblock) {
    favblock[0].parentNode.removeChild(favblock[0]);
}
var groupinviteblock = document.getElementsByClassName('group-invite-block');
for (groupinviteitem in groupinviteblock) {
    groupinviteblock[0].parentNode.removeChild(groupinviteblock[0]);
}

var titlename = document.getElementsByTagName('h3');
for (var i = 0; i < titlename.length; i++) {
    GM_log('in loop');
	if (titlename[i].innerHTML == 'Comments and faves')
	    titlename[i].innerHTML = 'Comments'
}
