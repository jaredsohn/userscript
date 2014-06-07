// ==UserScript==
// @name          Fireworks Dash Background
// @namespace     http://userstyles.org
// @description	  For more dash themes, tumblr banners, backgrounds, navigation buttons, codes and more tumblr goodies, go to http://4lisonwonderland.tumblr.com/ (4lisonwonderland.tumblr.com)
// @author        wonderlandd
// @homepage      http://userstyles.org/styles/56667
// @include       https://www.tumblr.com/login
// @include       http://www.tumblr.com/dashboard
// @include       http://www.tumblr.com/new/blog
// @include       http://www.tumblr.com/inbox
// @include       http://www.tumblr.com/help
// @include       https://www.tumblr.com/preferences
// @include       http://www.tumblr.com/lookup
// @include       http://www.tumblr.com/explore
// @include       http://www.tumblr.com/following
// @include       http://www.tumblr.com/likes
// @include       http://www.tumblr.com/new/*
// @include       http://www.tumblr.com/tumblelog/*
// @include       http://www.tumblr.com/tagged/*
// @include       http://www.tumblr.com/spotlight/*
// @include       http://www.tumblr.com/edit/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "body {\n\n\n\n  background:url(\"http://static.tumblr.com/blpgwiz/zfWluzt4l/tumblr_luzp3poz7s1qc5cc5o1_500.jpg\") no-repeat fixed !important;\n\n\n\n  background-color: rgba(44,71,98, 0.95) !important;\n\n\n\n  background-position: 0% 0% !important;\n\n\n\n  background-size: 100% 100%  !important;\n\n\n\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#content {\n\n\n\n  background: rgba(44,71,98, .50) !important;\n\n\n\n}\n\n\n\n \n\n\n\n\n\n\n\n\n\n\n\n#posts LI[class*=\" post\"] {\n\n\n\n  background: rgba(255, 255, 255, 1.0) !important;\n\n\n\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.post.photo_post .photo, .post.photo_post .video_thumbnail {\n\n\n\n\n\n\n\n  -moz-box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.0) !important;\n\n\n\n\n\n\n\n  border-radius: 12px !important;\n\n\n\n\n\n\n\n}\n\n\n\n\n\n\n\n.content.is_media, .mask.top, .mask.bottom {\n\n\n\n\n\n\n\n  background: none !important;\n\n\n\n\n\n\n\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.mceContentBody {\n\n\n\n  color: rgba(0, 0, 0, 1.0) !important;\n\n\n\n  background: rgba(255,255,255, .50) !important;\n\n\n\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
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
