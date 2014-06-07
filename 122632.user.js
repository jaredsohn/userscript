{\rtf1\ansi\ansicpg1252\cocoartf949\cocoasubrtf540
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
\margl1440\margr1440\vieww9000\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\ql\qnatural\pardirnatural

\f0\fs24 \cf0 // ==UserScript==\
// @name          bluh\
// @namespace     http://userstyles.org\
// @description	bluh.\
// @author        priness kennie\
// @homepage      http://userstyles.org/styles/48606\
// @include       http://www.tumblr.com/*\
// @run-at        document-start\
// ==/UserScript==\
(function() \{\
var css = "body \\n	\{background: url('http://i41.tinypic.com/2nla1sh.png') center right #F59A27 repeat fixed !important;\}  \\n*  \\n	\{text-shadow:none !important;\}\\n	\\n\\n\\n#content \\n	\{background-color:#F59A27 !important;	\\n	opacity:.9;\}\\n	\\n\\n\\n#auto_pagination_loader\\n	\{background:rgba(187,103,85, 0.00)!important;\}\\ndiv.return_to_top_icon\{	background: none !important;\\n	width: 0px !important;\\n	height: 0px !important;\\n	margin-top: 0px !important;\\n	opacity: .5 !important;\\n	border-bottom: solid 30px white !important;\\n	border-right: 15px solid transparent !important;\\n	border-left: 15px solid transparent !important; \}	\\n	\\n	\\n\\n\\n.selection_nipple.white, .selection_nipple:not([class=\\"selection_nipple white\\"]) \{ \\n	background: none !important;\\n	width: 0px !important;\\n	height: 0px !important;\\n	margin-top: 0px !important;\\n	border-bottom: solid 11px white !important;\\n	border-right: 11px solid transparent !important;\\n	border-left: 11px solid transparent !important; \}\\n.selection_nipple:not([class=\\"selection_nipple white\\"]) \{\\n	border-bottom: solid 11px #F59A27 !important;\}	\\n	\\n\\n	\\n.selected .following,\\n.selected .followers,\\n.selected .settings,\\n.selected .posts,\\n.selected .messages,\\n.selected .drafts,\\n.selected .queue, \\n.selected .likes \{\\n	color: rgba(255,255,255, 0.50) !important; \\n	background: #F59A27 !important;\}\\n\\n	\\n	\\n\\nol#posts li.post.new______post \\n	\{background: #F59A27 url('http://i56.tinypic.com/n1cebo.png') center center no-repeat;\}\\n\\nimg[src*=\\"http://assets.tumblr.com/images/new_post_icons_no_labels.png\\"]\\n	\{width:0;\\n    height:70px;\\n    padding-right:250px;\\n    opacity: 0;\}\\n	\\n	\\na.explore_more_tags,\\na.add_and_remove,\\na.customize,\\na.mass_editor\\n	\{background-color:#F59A27 !important;  \\n	background-image:none !important;\\n	border:0px !important\}\\n\\ndiv.hide_overflow\\n	\{font-size:.9em;\}\\na.tag,\\na.explore_more_tags,\\na.add_and_remove\\n	\{height:8px;\}\\na.tag\\n	\{position:relative;top:-4px;\}\\n.selected  .tag\\n	\{height:14px;background:#F59A27 !important; \\n	position:relative;top:0px;\\n	color:rgba(255,255,255, 0.50) !important;\}\\nul\\n	\{-moz-box-shadow: 1px 1px 3px #F59A27 !important;\}\\n	\\n\\n\\ndiv.gradient,\\ndiv.dashboard_nav_item, \\na.permalink\\n	\{background-color:#F59A27 !important;\\n	opacity:.9; \\n	background-image:none !important;\\n	border:0px !important\}\\n.content.is_media, \\n.mask.top, \\n.mask.bottom \{\\n	background: none !important; \}\\n.post.photo_post .photo, \\n.post.photo_post .video_thumbnail \{\\n	border-radius: 16px !important;\}\\n.post.photo_post .photo, \\n.post.photo_post .video_thumbnail \\n	\{-moz-box-shadow: 1px 1px 3px #F59A27 !important;\}\\n\\n\\n\\nblockquote\\n	\{margin-left:-5px !important;\}\\n\\n\\n\\n.login.sign_up,\\nA[href=\\"/forgot_password\\"]\{display: none !important;\}	\\n\\n\\n\\n.mceContentBody \{\\n  background: url(\\"\\") !important; \}\\n  \\n\\n\\nol#posts li.notification\\n	\{background-color: #F59A27 !important;\\n	border-bottom: 2px solid #F59A27 !important;\\n	color: #F59A27 !important;\}\\n	\\n#right_column a#dashboard_switch_blog_menu_current:hover \\n	\{background:#F59A27;\}\\n	\\n#nav .nav_item.active\\n	\{background-color:#F59A27;\}\\n	\\n#right_column\\n	\{color:#333333;\}\\n	\\n#left_column #posts .post .permalink\\n	\{background-color:#F59A27;\}\\n\\n#nav .nav_item.active, \\n#nav .nav_item .nav_menu, \\n#nav .nav_item .nav_item_nipple .nav_item_nipple_pixel\\n	\{background-color:#F59A27 !important;\\n	background-image:none !important;\\n	border:0px !important\}\\n\\n#dashboard_switch_blog_menu_current,\\n#dashboard_switch_blog_arrow_and_divider,\\n#dashboard_switch_blog_arrow_current\\n	\{background-image:none !important\}\\n\\n.notification_type_icon\\n	\{display:none !important\}\\n\\n#left_column #posts .notification \\n	\{background-color:#F59A27 !important;\\n	color:#555555 !important;\\n   	border-bottom-color: #F59A27 !important\}\\n\\n#new_post_notice_container\\n	\{color:#F59A27 !important\}\\n\\n#new_post_notice_container a\\n	\{color:#F59A27 !important\}\\nol#posts .post.new______post .new______post_label \\n	\{display:none !important;\}";\
if (typeof GM_addStyle != "undefined") \{\
	GM_addStyle(css);\
\} else if (typeof PRO_addStyle != "undefined") \{\
	PRO_addStyle(css);\
\} else if (typeof addStyle != "undefined") \{\
	addStyle(css);\
\} else \{\
	var heads = document.getElementsByTagName("head");\
	if (heads.length > 0) \{\
		var node = document.createElement("style");\
		node.type = "text/css";\
		node.appendChild(document.createTextNode(css));\
		heads[0].appendChild(node); \
	\}\
\}\
\})();\
}