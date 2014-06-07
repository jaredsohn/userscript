// ==UserScript==
// @name          Lovely Light Purple
// @namespace     http://userstyles.org
// @description	  Theme Created By Rachel @ yslaurent.tumblr.com http://yslaurent.tumblr.com
// @author        yslaurent
// @homepage      http://userstyles.org/styles/39360
// @include       http://www.tumblr.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "body {background: url('http://i55.tinypic.com/29xg845.png') center right #ffffff repeat fixed !important;}\n#content{background-color:#f9f9f9!important;}\n*{text-shadow:none !important; color:#7a7a7a !important;}\nol#posts li.notification{background-color: #f9f9f9 !important; border-bottom: 2px solid #9d92a5 !important; color: #f9f9f9 !important;}\n#right_column a#dashboard_switch_blog_menu_current:hover {background:#f9f9f9;}\n#nav .nav_item.active{background-color:#f9f9f9}\n#left_column #posts .post .permalink{background-color:#f9f9f9;}\n#dashboard_switch_blog_menu_current,\n#dashboard_switch_blog_arrow_and_divider,\n#dashboard_switch_blog_arrow_current\n{background-image:none !important}\n.selection_nipple.white, .selection_nipple:not([class=\"selection_nipple white\"]) { \n	background: none !important;\n	width: 0px !important;\n	height: 0px !important;\n	margin-top: 0px !important;\n	border-bottom: solid 11px white !important;\n	border-right: 11px solid transparent !important;\n	border-left: 11px solid transparent !important; }\n.selection_nipple:not([class=\"selection_nipple white\"]) {\n	border-bottom: solid 11px #f9f9f9 !important;}\n.notification_type_icon{display:none !important}\n.selected .following,\n.selected .followers,\n.selected .settings,\n.selected .posts,\n.selected .messages,\n.selected .drafts,\n.selected .queue, \n.selected .likes {\n	color: #A099A1 !important; \n	background: #e9e9e9 !important;}\na.explore_more_tags,\na.add_and_remove,\na.customize,\na.mass_editor\n	{background-color:#e9e9e9 !important;  \n	background-image:none !important;\n	border:0px !important}\ndiv.gradient,\ndiv.dashboard_nav_item, \na.permalink\n	{background-color:#e9e9e9 !important;\n	opacity:.9; \n	background-image:none !important;\n	border:0px !important}\n.content.is_media, \n.mask.top, \n.mask.bottom {\n	background: none !important; }\n.post.photo_post .photo, \n.post.photo_post .video_thumbnail {\n	border-radius: 16px !important;}\n.post.photo_post .photo, \n.post.photo_post .video_thumbnail \n	{-moz-box-shadow: 1px 1px 3px #000000 !important;}\n#auto_pagination_loader\n	{background: #A099A1 !important;}\ndiv.return_to_top_icon{	background: none !important;\n	width: 0px !important;\n	height: 0px !important;\n	margin-top: 0px !important;\n	border-bottom: solid 30px white !important;\n	border-right: 15px solid transparent !important;\n	border-left: 15px solid transparent !important;}\n#left_column #posts .notification {\nbackground-color:#f9f9f9 !important;\ncolor:#666 !important;\nborder-bottom-color: #eee !important}\n#left_column #posts .post .post_avatar{-moz-border-radius: 38px !important; -webkit-border-radius: 60px !important; width: 64px !important; height: 64px !important; margin: 0px !important;}\n#left_column #posts .post .sub_avatar_inner {\n-moz-border-radius: 38px !important; -webkit-border-radius: 60px !important; width: 32px !important; height: 32px !important; margin: 0px !important;}\n#new_post_notice_container{\ncolor:#fff !important}\n#new_post_notice_container a{\ncolor:#fff !important}\nol#posts li.post.new_post {\nbackground: #ffffff url('http://i56.tinypic.com/n1cebo.png') center center no-repeat;}\nimg[src*=\"http://assets.tumblr.com/images/new_post_icons_no_labels.png\"]{\n    width:0;\n    height:70px;\n    padding-right:250px;\n    opacity: 0;\n}\nol#posts .post.new_post .new_post_label {\ndisplay:none !important;}\n.permalink {background: none !important;\nwidth: 16px !important;\nheight: 16px !important;\n  background: #f9f9f9) !important;\n  border-bottom-left-radius: 10px !important;\n  border-top-right-radius: 10px !important;\n  margin-top: 3px !important;\n  margin-right: 4px !important;}";
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
