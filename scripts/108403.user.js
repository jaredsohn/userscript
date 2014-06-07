// ==UserScript==
// @name          BVB
// @namespace     http://userstyles.org
// @description	  Black Veil Brides
// @author        Jenni2167
// @homepage      http://userstyles.org/styles/44643
// @include       http://www.tumblr.com/*
// @include       http://www.tumblr.com/reblog/*
// @include       http://www.tumblr.com/directory/*
// @include       http://www.tumblr.com/reblog/*
// @include       http://www.tumblr.com/new/*
// @include       http://www.tumblr.com/goodies
// @include       http://www.tumblr.com/edit/*
// ==/UserScript==
(function() {
var css = "";
if (false || (document.location.href.indexOf("http://www.tumblr.com/") == 0))
	css += "body {background: url('http://img251.imageshack.us/img251/5640/71478702.jpg') #0E53B8 repeat !important;}\n\n\n\nol#posts li blockquote,\n\n\n\nbody.mceContentBody blockquote {margin-left: 0 !important;margin-right: 0 !important; padding-left: 10px !important; border-width: 4px !important; border-color: #0E53B8 !important;}\n\n\n\nol#posts li.notification.single_notification {border-bottom: 1px solid #0E53B8;}\n\n\n\n#dashboard_index #content {background: rgba(62,61,61,0) !important;}\n\n#content {background: rgba(62,61,62,0) !important; -webkit-border-radius: 20px; -moz-border-radius: 20px; border-radius: 20px; margin: auto; padding: 40px auto;}\n\n\n\nh1 {color: #0E53B8; text-shadow: 0 0 0px #00AACC;}\n\n\n\n.no_posts_found, h1.dashboard_header {color: #666666;}\n\n\n\nimg#content_top, img#content_bottom {display: none;}\n\n\n\n#right_column a\n\n#dashboard_switch_blog_menu_current #dashboard_switch_blog_arrow_current {background: url();}\n\n#right_column .dashboard_nav_item {background: url() repeat-x; background-attachment: initial; background-position-x: 50%; background-position-y: 100%; background-origin: initial; background-clip: initial; background-color: initial;}\n\n#right_column .dashboard_nav_item #hide_radar {background-image: url(); background-repeat-x: no-repeat; background-repeat-y: repeat; background-attachment: initial; background-position-x: 0%; background-position-y: 0%; background-origin: initial; background-clip: initial; background-color: transparent;}\n\n#right_column .dashboard_nav_item .dashboard_controls_radar_media.photo, #right_column .dashboard_nav_item .dashboard_controls_radar_media.photoset, #right_column .dashboard_nav_item .dashboard_controls_radar_media.video {background: rgba(0,0,0,0.5);}\n\n#nav .nav_item.active {background: rgba(102,18,18,0) !important;}\n\n#nav .nav_item .nav_item_nipple .nav_item_nipple_pixel {background: rgba(52,51,51,0) !important;}\n\n\n\nol#posts li.notification.alt {background-color: rgba(0,0,0,0);}\n\n\n\nol#posts li.notification.first_notification {background-color: rgba(0,0,0,0);}\n\n\n\nol#posts li.notification {background-color: rgba(0,0,0,0); border-bottom: 1px solid #0E53B8;}\n\n\n\nol#posts li.notification.last_notification { border-bottom: 1px solid #0E53B8;}\n\n\n\nol#posts li.post .permalink {background: rgba(52,51,51,0);}\n\n\n\n#right_column .dashboard_nav_item #dashboard_controls_suggested_blogs {background: rgba(0,0,0,0); border: solid #f8f8f0;}\n\n\n\nol#posts li.post .post_avatar{border-bottom: 0px solid #0E53B8;}\n\n\n\n#right_column .dashboard_nav_item #dashboard_controls_suggested_blogs .dashboard_controls_suggested_blog {border-top: 1px solid #0E53B8; border-bottom: 1px solid #0E53B8;}\n\n\n\n#right_column a#dashboard_switch_blog_menu_current:hover {background: url(http://o.imm.io/Gzl.png);}\n\n\n\n#right_column a#dashboard_switch_blog_menu_current:hover #dashboard_switch_blog_arrow_current {background: url(http://o.imm.io/Gzm.png);}\n\n\n\nform.dashboard_options_form {background-color: rgba(0,0,0,0.7); border-bottom: 1px solid #0E53B8; border-bottom-left-radius: 10px 10px; border-bottom-left-radius: 10px 10px; border-bottom-right-radius: 10px 10px; border-bottom-right-radius: 10px 10px; border-top-left-radius: 10px 10px; border-top-left-radius: 10px 10px; border-top-right-radius: 10px 10px; border-top-right-radius: 10px 10px; color: #0E53B8; display: block; font-size: 13px; margin-bottom: 25px; padding: 15px 22px;}\n\n\n\nform.dashboard_options_form .option_container {border-top: 1px solid #0E53B8;}\n\n\n\n.no_posts_found, h1.dashboard_header {color: #00AACC;}\n\n\n\n.answer_container {background-color: #0E53B8; border-bottom: 0px solid #0E53B8;}\n\n\n\n#nav .nav_item .nav_menu {background-color: #0E53B8; border-bottom: 2px solid #f8f8f0;}\n\n\n\n#nav .nav_item .nav_menu a {border-top: 1px solid #f8f8f0;}\n\n\n\n#auto_pagination_loader {background: rgba(0,0,0,0.05) url(http://o.imm.io/GYD.png) repeat-x 50% 0%;border-top: 0px solid #f8f8f0;}";
if (false || (document.location.href.indexOf("http://www.tumblr.com/reblog/") == 0))
	css += "#content {padding: 40px 0;}";
if (false || (document.location.href.indexOf("http://www.tumblr.com/directory/") == 0))
	css += "#content {padding: 40px 0;}";
if (false || (document.location.href.indexOf("http://www.tumblr.com/reblog/") == 0))
	css += "#content {padding: 40px 0;}";
if (false || (document.location.href.indexOf("http://www.tumblr.com/new/") == 0))
	css += "#content {padding: 40px 0;}";
if (false || (location.href.replace(location.hash,'') == "http://www.tumblr.com/goodies"))
	css += "#content {padding: 40px 0;}";
if (false || (document.location.href.indexOf("http://www.tumblr.com/edit/") == 0))
	css += "#content {padding: 40px 0;}";
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
