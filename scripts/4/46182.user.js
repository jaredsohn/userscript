// ==UserScript==
// @name          FriendFeed Service Icons (Beta version) - 04/08/09 [not all icons have been set]
// @namespace     http://userstyles.org
// @description	  Changelog
// @author        zoblue
// @homepage      http://userscripts.org/scripts/show/46182
// @include       http://beta.friendfeed.com/*
// @include       https://beta.friendfeed.com/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml);/* add service icons */ a.service[href*=twitter]{padding-left: 18px;background: transparent url(http://beta.friendfeed.com/static/images/icons/twitter.png?v=df0a) no-repeat top left;}a.service[href*=flickr] {padding-left: 18px;background: transparent url(http://beta.friendfeed.com/static/images/icons/flickr.png?v=77ee) no-repeat top left;}a.service[href*=facebook] {padding-left: 18px; background: transparent url(http://beta.friendfeed.com/static/images/icons/facebook.png?v=3188) no-repeat top left;}a.service[href*=last] {padding-left:18px; background: transparent url(http://beta.friendfeed.com/static/images/icons/lastfm.png?v=997d) no-repeat top left;}a.service[href*=pandora] {padding-left: 18px;background: transparent url(http://beta.friendfeed.com/static/images/icons/pandora.png?v=7b57) no-repeat top left;}a.service[href*=vimeo] {padding-left: 18px;background:transparent url(http://beta.friendfeed.com/static/images/icons/vimeo.png?v=4889) no-repeat top left;}a.service[href*=youtube] {padding-left: 18px; background:transparent url(http://beta.friendfeed.com/static/images/icons/youtube.png?v=c6c1) no-repeat top left;}a.service[href*=seesmic] {padding-left: 18px; background: transparent url(http://beta.friendfeed.com/static/images/icons/seesmic.png?v=8204) no-repeat top left;}a.service[href*=12seconds] {padding-left: 18px; background: transparent url(http://beta.friendfeed.com/static/images/icons/twelveseconds.png?v=739d) no-repeat top left;}a.service[href*=amazon]{padding-left:18px; background:transparent url(http://beta.friendfeed.com/static/images/icons/youtube.png?v=c6c1) no-repeat top left;}a.service[href*=digg] {padding-left: 18px; background: transparent url(http://beta.friendfeed.com/static/images/icons/digg.png?v=a719) no-repeat top left;}a.service[href*=brightkite] {padding-left: 18px; background:transparent url(http://beta.friendfeed.com/static/images/icons/brightkite.png?v=5e24) no-repeat top left;}a.service[href*=delicious] {padding-left: 18px; background:transparent url(http://beta.friendfeed.com/static/images/icons/delicious.png?v=508c) no-repeat top left;}a.service[href*=digg] {padding-left: 18px; background:transparent url(http://beta.friendfeed.com/static/images/icons/digg.png?v=a719) no-repeat top left;}a.service[href*=linkedin] {padding-left: 18px; background: transparent url(http://beta.friendfeed.com/static/images/icons/linkedin.png?v=713d) no-repeat top left;}a.service[href*=netflix] {padding-left: 18px; background:transparent url(http://beta.friendfeed.com/static/images/icons/netflix.png?v=4a3c) no-repeat top left;}a.service[href*=photobucket] {padding-left: 18px; background:transparent url(http://beta.friendfeed.com/static/images/icons/photobucket.png?v=d324) no-repeat top left;}a.service[href*=picasa] {padding-left: 18px; background:transparent url(http://beta.friendfeed.com/static/images/icons/picasa.png?v=6252) no-repeat top left;}a.service[href*=plurk] {padding-left: 18px; background: transparent url(http://beta.friendfeed.com/static/images/icons/plurk.png?v=7c79)}no-repeat top left;}a.service[href*=reddit] {padding-left: 18px; background: transparent url(http://beta.friendfeed.com/static/images/icons/reddit.png?v=594c) no-repeat top left;}a.service[href*=stumbleupon] {padding-left: 18px; background: transparent url(http://beta.friendfeed.com/static/images/icons/stumbleupon.png?v=dbf1) no-repeat top left;}a.service[href*=tumblr] {padding-left: 18px; background: transparent url(http://beta.friendfeed.com/static/images/icons/tumblr.png?v=bd2e) no-repeat top left;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();