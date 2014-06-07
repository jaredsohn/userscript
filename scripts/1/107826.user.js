{\rtf1\ansi\ansicpg1252\cocoartf1038\cocoasubrtf350
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
\margl1440\margr1440\vieww9000\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\ql\qnatural\pardirnatural

\f0\fs24 \cf0 // ==UserScript==\
// @name          Vintage Ink Flowers [tumblr] ***UPDATED***\
// @namespace     http://userstyles.org\
// @description	  Vintage Ink Flowers by Larissa Punzalan - \
// @author        ainjhel21\
// @homepage      http://userstyles.org/styles/48823\
// @include       http://www.tumblr.com/*\
// @include       http://www.tumblr.com/reblog/*\
// @include       http://www.tumblr.com/directory/*\
// @include       http://www.tumblr.com/reblog/*\
// @include       http://www.tumblr.com/new/*\
// @include       http://www.tumblr.com/goodies\
// @include       http://www.tumblr.com/edit/*\
// @include       http://www.tumblr.com/login*\
// ==/UserScript==\
(function() \{\
var css = "";\
if (false || (document.location.href.indexOf("http://www.tumblr.com/") == 0))\
	css += "*\{text-shadow:none !important; color:#666666 !important;\}\{font:16px 'Trebuchet MS';\\ncolor:#666666;\\n\}\\n\\n#dashboard_index, #dashboard_edit_post, #dashboard_submissions, #dashboard_drafts, #dashboard_post_queue, #dashboard_tumblelog, #dashboard_inbox, #dashboard_help, \\n\\n\\n\\n\\n\\n\\n\\n#dashboard_preferences, #dashboard_followers, #dashboard_members, #dashboard_tumblelog, #dashboard_inbox, #dashboard_help\{background: url('http://i55.tinypic.com/eq5g7r.jpg') top left #E5DBCF no-repeat fixed !important;\}\\n#content\{background-color:#f9f9f9!important; background: rgba(105,105,105,0.3) !important;\}\\nol#posts li.notification\{background-color: #f9f9f9 !important; border-bottom: 2px solid #9d92a5 !important; color: #f9f9f9 !important;opacity: 0.50;\}\\n#right_column a#dashboard_switch_blog_menu_current:hover \{background:#f9f9f9;opacity: 0.50;\}\\n#nav .nav_item.active\{background-color:#f9f9f9\}\\n#left_column #posts .post .permalink\{background-color:#f9f9f9;opacity: 0.50;\}\\n#nav .nav_item.active,\\n#nav .nav_item .nav_menu,\\n#nav .nav_item .nav_item_nipple .nav_item_nipple_pixel \{\\nbackground-color:#f9f9f9 !important;\\nbackground-image:none !important;\\nborder:0px !important\}\\n#dashboard_switch_blog_menu_current,\\n#dashboard_switch_blog_arrow_and_divider,\\n#dashboard_switch_blog_arrow_current\\n\{background-image:none !important\}\\n.notification_type_icon\{display:none !important\}\\n#left_column #posts .notification \{\\nbackground-color:#f9f9f9 !important;\\ncolor:#666 !important;\\nborder-bottom-color: #eee !important;opacity: 0.50;\}\\n#new_post_notice_container\{\\ncolor:#fff !important\}\\n#new_post_notice_container a\{\\ncolor:#fff !important\}\\nol#posts li.post.new_post \{\\nbackground: #ffffff url('http://i46.tinypic.com/257oe84.jpg') center center no-repeat\}\\nimg[src*=\\"http://assets.tumblr.com/images/new_post_icons_no_labels.png\\"]\{\\n\\n    width:0;\\n\\n    height:70px;\\n\\n    padding-right:250px;\\n\\n    opacity: 0;\}";\
if (false || (document.location.href.indexOf("http://www.tumblr.com/reblog/") == 0))\
	css += "#content \{\\n    padding: 40px 0;\\n  \}";\
if (false || (document.location.href.indexOf("http://www.tumblr.com/directory/") == 0))\
	css += "#content \{\\n    padding: 40px 0;\\n  \}";\
if (false || (document.location.href.indexOf("http://www.tumblr.com/reblog/") == 0))\
	css += "#content \{\\n    padding: 40px 0;\\n  \}";\
if (false || (document.location.href.indexOf("http://www.tumblr.com/new/") == 0))\
	css += "#content \{\\n    padding: 40px 0;\\n  \}";\
if (false || (location.href.replace(location.hash,'') == "http://www.tumblr.com/goodies"))\
	css += "#content \{\\n    padding: 40px 0;\\n  \}";\
if (false || (document.location.href.indexOf("http://www.tumblr.com/edit/") == 0))\
	css += "#content \{\\n    padding: 40px 0;\\n  \}";\
if (false || (document.location.href.indexOf("http://www.tumblr.com/login") == 0))\
	css += "#content \{background: url('http://images.blogskins.com/skin_images/361/698/images/xgbka.png') top left #E5DBCF no-repeat fixed !important; background-color:#f9f9f9!important; \}";\
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