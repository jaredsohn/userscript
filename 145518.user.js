// ==UserScript==
// @name          Niall Horan: Up All Night Photoshoot (No Icons)
// @namespace     http://userstyles.org
// @description	  1dmedia.tumblr.com
// @author        1dmedia
// @homepage      http://userstyles.org/styles/66220
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
// @include       http://www.tumblr.com/blog/*
// @include       http://www.tumblr.com/dashboard/*
// @include       http://www.tumblr.com/new/*
// @include       http://www.tumblr.com/tumblelog/*
// @include       http://www.tumblr.com/tagged/*
// @include       http://www.tumblr.com/spotlight/*
// @include       http://www.tumblr.com/edit/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "body {\n\n  background:url(\"http://img401.imageshack.us/img401/387/90619958.png\") no-repeat fixed !important;\n\n  background-color: rgba(44,71,98, 0) !important;\n\n  background-position: 0% 0% !important;\n\n  background-size: 100% 100%  !important;\n\n}\n\n\n\n\n\n\n\n#logo {\n\n  width: 0px !important;\n\n  height: 0px !important;\n\n  background:none !important;\n\n  width: 196px !important;\n\n  height: 44px !important;\n\n}\n\n\n\n\n\n\n\nimg[src*=\"http://assets.tumblr.com/images/post_icons.png\"],\n\n.new_post_label_icon {\n\nopacity: 0.00 !important;  \n\n}\n\n#new_post{\n\n  background-image: url(http://assets.tumblr.com/images/post_icons.png) !important;\n\n  background-position: top center !important; \n\n  background-repeat: no-repeat !important;\n\n}\n\n\n\n\n\n\n\nnew_post {\n\n  background-color: rgba(255, 255, 255, 1.0) !important;\n\n}\n\n\n\n\n\n\n\n#new_post .arrow {\n\n  opacity: .07 !important;\n\n  margin-left: 0px !important; \n\n}\n\n\n\n\n\n\n\n#content {\n\n  background: rgba(44,71,98, 0.00) !important;\n\n}\n\n \n\n\n\n\n\n#posts LI[class*=\" post\"] {\n\n  background: rgba(255, 255, 255, 0.7) !important;\n\n}\n\n\n\n\n\n\n\n.selection_nipple.white, .selection_nipple:not([class=\"selection_nipple white\"]) {\n\n  background: none !important;\n\n  width: 0px !important;\n\n  height: 0px !important;\n\n  margin-top: 0px !important;\n\n  border-bottom: solid 11px rgba(255,255,255,1.0) !important;\n\n  border-right: 11px solid transparent !important;\n\n  border-left: 11px solid transparent !important;\n\n}\n\n\n\n.selection_nipple:not([class=\"selection_nipple white\"]) {\n\n  border-bottom: solid 11px rgba(44,71,98, 1.0)  !important;\n\n}\n\n\n\n\n\n\n\nli.selected, li.recessed, a.active, div.post_filter_tabs a {\n\n  background: rgba(255, 255, 255, 0.4) !important;\n\n}\n\n\n\n\n\n\n\n.post.photo_post .photo, .post.photo_post .video_thumbnail {\n\n  -moz-box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.0) !important;\n\n  border-radius: 12px !important;\n\n}\n\n.content.is_media, .mask.top, .mask.bottom {\n\n  background: none !important;\n\n}\n\n\n\n\n\n\n\n.mceContentBody {\n\n  color: rgba(0, 0, 0, 1.0) !important;\n\n  background: rgba(255,255,255, 1.0) !important;\n\n}";
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
