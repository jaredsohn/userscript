// ==UserScript==
// @name           Expose Tumblr Likes
// @namespace      http://rhyley.org/gm/
// @description    Displays a link to a tumblr user's "likes" page in their user menu on the dash, if they have made their likes public.
// @include        http://www.tumblr.com/dashboard*
// @include        http://www.tumblr.com/likes*
// @include        http://www.tumblr.com/tagged/*
// ==/UserScript==

(function(d){
var req = new XMLHttpRequest();  
var allUM = document.evaluate("//a[@following]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var length = allUM.snapshotLength;
for (var i = 0; i < length; i++) {
	thisUM = allUM.snapshotItem(i);
	thisUserName = thisUM.href;
	thisUserName = thisUserName.split('/')[4];

	var likedUrl = 'http://www.tumblr.com/liked/by/'+thisUserName;
	req.open('HEAD', likedUrl, false);   
	req.send(null);  
	if(req.status != 403) {
		var likes = document.createElement('a');
		likes.setAttribute('href', likedUrl);
		likes.innerHTML='<div class="user_menu_list_item"><span class="user_menu_icon likes"></span> Likes</div>';

		thisUM.parentNode.insertBefore(likes,thisUM.previousSibling);
	}
}
}(document));
