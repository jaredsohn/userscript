// ==UserScript==
// @name          Tumblr - Generic Theme Template
// @namespace     http://userstyles.org
// @description	  This Generic Tumblr theme is aimed at those who wish to try to alter the way your Tumblr looks. This theme doesn't change everything that could be changed, but should serve as a solid base to build upon.
// @author        Ohne Mitleid
// @homepage      http://userstyles.org/styles/49548
// @include       http://www.tumblr.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
    var css = "body {\n\n  background: url(\"http://fc09.deviantart.net/fs71/i/2011/198/2/9/rarity_wallpaper_by_tehnomad-d3yowzq.jpg\") !important; \n  background-size: 100% !important; background-repeat: no-repeat !important; background-attachment: fixed !important; \n}\n\n\n\n.login.sign_up,\nA[href=\"/forgot_password\"],\n#login_form SPAN,\n.footer_links {\n  display: yes !important; \n}\n\n\n\n\n\n#logo {\n  width: 0px !important;\n  height: 0px !important;\n  padding-left: 196px !important; \n  padding-top: 44px !important; \n  background-image: url(\"http://i273.photobucket.com/albums/jj236/Snowwika/logo-3.png\") !important; \n !important;\n}\n\n\nimg[src*=\"http://i273.photobucket.com/albums/jj236/Snowwika/rarityicons-2.png\"]{\nopacity:0.00 !important;  \n}\n#new_post{\n  background-image: url(http://i273.photobucket.com/albums/jj236/Snowwika/rarityicons-2.png) !important; \n  background-repeat: no-repeat !important; \n}\n\n.post.is_mine.with_avatar.new_post {\n  background: rgba(147,112,219,0.29) !important; \n}\n\n\n.new_post_label{\n  color: rgba(147,112,219, 1.0) !important; \n}\n\n#content {\n  background: rgba(147,112,219, 0.50) !important; \n}\n\n\n.selection_nipple.white, .selection_nipple:not([class=\"selection_nipple white\"]) {\nbackground: none !important;\nwidth: 0px !important;\nheight: 0px !important;\nmargin-top: 0px !important;\nborder-bottom: solid 11px rgba(147,112,219, 0.50) !important;\nborder-right: 11px solid transparent !important;\nborder-left: 11px solid transparent !important;\n}\n.selection_nipple:not([class=\"selection_nipple white\"]) {\nborder-bottom: solid 11px rgba(147,112,219, 0.50)  !important;\n}\n\n\n\n\n.mceContentBody {\n  background: url(\"http://imgsrc.hubblesite.org/hu/db/images/hs-1994-02-c-web.jpg\") !important; \n  background-size: 100% !important; \n  color: rgba(255,255,255, 1.0) !important; \n}\n\n\n#content_top {\n  width: 0px !important;\n  height: 0px !important;\n\n\n\n\n}\n\n\n#content_bottom {\n  width: 0px !important;\n  height: 0px !important;\n\n\n\n\n}\n\n\n#content {\n  padding-top: 25px !important; \n  padding-bottom: 25px !important; \n   -moz-border-radius: 20px !important; \n}\n\n\nLABEL {\n  color: rgba(147,112,219, 1.0) !important; \n}\n\n\n\n.radar {\n  display: none !important; \n}\n#footer {\n  display: none !important; \n}\n.selected .following,\n.selected .followers,\n.selected .settings,\n.selected .posts,\n.selected .messages,\n.selected .drafts,\n.selected .queue,\n.selected .likes  {\n  color: rgba(147,112,219, 0.50) !important; \n  background: rgba(147,112,219, 1.0) !important; \n}\n\n\n#new_post .arrow {\n  opacity: 0.50 !important;\n  margin-left: -1px !important; \n}";
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