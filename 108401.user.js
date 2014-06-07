// ==UserScript==
// @name          purple and pink sky
// @namespace     http://userstyles.org
// @description	  purple and pink sky
// @author        Cyberwh0re
// @homepage      http://userstyles.org/styles/49145
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
	css += "body {\n\n\n\n    background: url('http://i114.photobucket.com/albums/n253/han_nah_bucket/bckgrnd-1.jpg') right #333333 repeat fixed !important;\n\n\n\n  }\n\n\n\n\n\n\n\n\n\n\n\nol#posts li blockquote,\n\n\n\n\n\n\n\nbody.mceContentBody blockquote {\n\n\n\n\n\n\n\nmargin-left: 0 !important;\n\n\n\n\n\n\n\nmargin-right: 0 !important;\n\n\n\n\n\n\n\npadding-left: 10px !important;\n\n\n\n\n\n\n\nborder-width: 4px !important;\n\n\n\n\n\n\n\nborder-color: #d5b1b8 !important;\n\n\n\n\n\n\n\n}\n\n\n\n\n\n\n\nol#posts li blockquote blockquote,\n\n\n\n\n\n\n\nbody.mceContentBody blockquote blockquote {\n\n\n\n\n\n\n\nborder-color: #b68d96 !important;\n\n\n\n\n\n\n\n}\n\n\n\n\n\n\n\nol#posts li blockquote blockquote blockquote,\n\n\n\n\n\n\n\nbody.mceContentBody blockquote blockquote blockquote {\n\n\n\n\n\n\n\nborder-color: #947379 !important;\n\n\n\n\n\n\n\n}\n\n\n\n\n\n\n\nol#posts li blockquote blockquote blockquote blockquote,\n\n\n\n\n\n\n\nbody.mceContentBody blockquote blockquote blockquote blockquote {\n\n\n\n\n\n\n\nborder-color: #74545a !important;\n\n\n\n\n\n\n\n}\n\n\n\n\n\n\n\nol#posts li blockquote blockquote blockquote blockquote blockquote,\n\n\n\n\n\n\n\nbody.mceContentBody blockquote blockquote blockquote blockquote blockquote {\n\n\n\n\n\n\n\nborder-color: #533c40 !important;\n\n\n\n\n\n\n\n}\n\n\n\n\n\n\n\nol#posts li.notification.single_notification {\n\n\n\nborder-bottom: 1px solid #000000;\n\n\n\n}\n\n\n\n\n\n\n\n#dashboard_index #content {\n\n\n\n    background: rgba(50,0,0,0.5) !important;\n\n\n\n  }\n\n\n\n\n\n\n\n#content {\n\n\n\n    background: rgba(50,0,0,0.8) !important;\n\n\n\n    -webkit-border-radius: 20px;\n\n\n\n    -moz-border-radius: 20px;\n\n\n\n    border-radius: 20px;\n\n\n\n    margin: auto;\n\n\n\n    padding: 40px auto;\n\n\n\n  }\n\n\n\n\n\n\n\nh1 {\n\n\n\ncolor: #333333;\n\n\n\ntext-shadow: 0 0 3px #ffffff;\n\n\n\n}\n\n\n\n\n\n\n\n.no_posts_found, h1.dashboard_header {\n\n\n\ncolor: #666666;\n\n\n\n}\n\n\n\n\n\n\n\nimg#content_top, img#content_bottom {\n\n\n\ndisplay: none;\n\n\n\n}\n\n\n\n\n\n\n\n#right_column a#dashboard_switch_blog_menu_current #dashboard_switch_blog_arrow_current {\n\n\n\n    background: url(http://o.imm.io/Gys.png);\n\n\n\n  }\n\n\n\n\n\n\n\n#right_column .dashboard_nav_item {\n\n\n\n    background: url(http://o.imm.io/GyC.png) repeat-x;\n\n\n\n    background-attachment: initial;\n\n\n\n    background-position-x: 50%;\n\n\n\n    background-position-y: 100%;\n\n\n\n    background-origin: initial;\n\n\n\n    background-clip: initial;\n\n\n\n    background-color: initial;\n\n\n\n}\n\n\n\n\n\n\n\n#right_column .dashboard_nav_item #hide_radar {\n\n\n\nbackground-image: url(http://o.imm.io/GyG.png);\n\n\n\nbackground-repeat-x: no-repeat;\n\n\n\nbackground-repeat-y: repeat;\n\n\n\nbackground-attachment: initial;\n\n\n\nbackground-position-x: 0%;\n\n\n\nbackground-position-y: 0%;\n\n\n\nbackground-origin: initial;\n\n\n\nbackground-clip: initial;\n\n\n\nbackground-color: transparent;\n\n\n\n}\n\n\n\n\n\n\n\n#right_column .dashboard_nav_item .dashboard_controls_radar_media.photo, #right_column .dashboard_nav_item .dashboard_controls_radar_media.photoset, #right_column .dashboard_nav_item .dashboard_controls_radar_media.video {\n\n\n\nbackground: rgba(0,0,0,0.5);\n\n\n\n}\n\n\n\n\n\n\n\n#nav .nav_item.active {\n\n\n\n    background: rgba(50,0,0,0.5) !important;\n\n\n\n  }\n\n\n\n\n\n\n\n#nav .nav_item .nav_item_nipple .nav_item_nipple_pixel {\n\n\n\n    background: rgba(50,0,0,0.5) !important;\n\n\n\n  }\n\n\n\n\n\n\n\nol#posts li.notification.alt {\n\n\n\n    background-color: rgba(0,0,0,0.5);\n\n\n\n}\n\n\n\n\n\n\n\nol#posts li.notification.first_notification {\n\n\n\n    background-color: rgba(0,0,0,0.8);\n\n\n\n}\n\n\n\n\n\n\n\nol#posts li.notification {\n\n\n\n    background-color: rgba(0,0,0,0.8);\n\n\n\n    border-bottom: 1px solid #000000;\n\n\n\n}\n\n\n\n\n\n\n\nol#posts li.notification.last_notification {\n\n\n\n    border-bottom: 1px solid #000000;\n\n\n\n}\n\n\n\n\n\n\n\nol#posts li.post .permalink {\n\n\n\n    background: rgba(50,0,0,0.9);\n\n\n\n}\n\n\n\n\n\n\n\n#right_column .dashboard_nav_item #dashboard_controls_suggested_blogs {\n\n\n\nbackground: rgba(0,0,0,0.8);\n\n\n\nborder: solid #000000;\n\n\n\n}\n\n\n\n\n\n\n\nol#posts li.post .post_avatar{\n\n\n\nborder-bottom: 0px solid #0A2939;\n\n\n\n}\n\n\n\n\n\n\n\n#right_column .dashboard_nav_item #dashboard_controls_suggested_blogs .dashboard_controls_suggested_blog {\n\n\n\nborder-top: 1px solid #000000;\n\n\n\nborder-bottom: 1px solid #000000;\n\n\n\n}\n\n\n\n\n\n\n\n#right_column a#dashboard_switch_blog_menu_current:hover {\n\n\n\nbackground: url(http://o.imm.io/Gzl.png);\n\n\n\n}\n\n\n\n\n\n\n\n#right_column a#dashboard_switch_blog_menu_current:hover #dashboard_switch_blog_arrow_current {\n\n\n\nbackground: url(http://o.imm.io/Gzm.png);\n\n\n\n}\n\n\n\n\n\n\n\nform.dashboard_options_form {\n\n\n\nbackground-color: rgba(0,0,0,0.7);\n\n\n\nborder-bottom: 1px solid #000000;\n\n\n\nborder-bottom-left-radius: 10px 10px;\n\n\n\nborder-bottom-left-radius: 10px 10px;\n\n\n\nborder-bottom-right-radius: 10px 10px;\n\n\n\nborder-bottom-right-radius: 10px 10px;\n\n\n\nborder-top-left-radius: 10px 10px;\n\n\n\nborder-top-left-radius: 10px 10px;\n\n\n\nborder-top-right-radius: 10px 10px;\n\n\n\nborder-top-right-radius: 10px 10px;\n\n\n\ncolor: #cccccc;\n\n\n\ndisplay: block;\n\n\n\nfont-size: 13px;\n\n\n\nmargin-bottom: 25px;\n\n\n\npadding: 15px 22px;\n\n\n\n}\n\n\n\n\n\n\n\nform.dashboard_options_form .option_container {\n\n\n\nborder-top: 1px solid #000000;\n\n\n\n}\n\n\n\n\n\n\n\n.no_posts_found, h1.dashboard_header {\n\n\n\ncolor: #333333;\n\n\n\n}\n\n\n\n\n\n\n\n.answer_container {\n\n\n\nbackground-color: #000000;\n\n\n\nborder-bottom: 0px solid #24394E;\n\n\n\n}\n\n\n\n\n\n\n\n#nav .nav_item .nav_menu {\n\n\n\nbackground-color: #000000;\n\n\n\nborder-bottom: 2px solid #333333;\n\n\n\n}\n\n\n\n\n\n\n\n#nav .nav_item .nav_menu a {\n\n\n\nborder-top: 1px solid #333333;\n\n\n\n}\n\n\n\n\n\n\n\n#auto_pagination_loader {\n\n\n\nbackground: rgba(0,0,0,0.05) url(http://o.imm.io/GYD.png) repeat-x 50% 0%;\n\n\n\nborder-top: 0px solid #1B2D42;\n\n\n\n}";
if (false || (document.location.href.indexOf("http://www.tumblr.com/reblog/") == 0))
	css += "#content {\n\n\n\n    padding: 40px 0;\n\n\n\n  }";
if (false || (document.location.href.indexOf("http://www.tumblr.com/directory/") == 0))
	css += "#content {\n\n\n\n    padding: 40px 0;\n\n\n\n  }";
if (false || (document.location.href.indexOf("http://www.tumblr.com/reblog/") == 0))
	css += "#content {\n\n\n\n    padding: 40px 0;\n\n\n\n  }";
if (false || (document.location.href.indexOf("http://www.tumblr.com/new/") == 0))
	css += "#content {\n\n\n\n    padding: 40px 0;\n\n\n\n  }";
if (false || (location.href.replace(location.hash,'') == "http://www.tumblr.com/goodies"))
	css += "#content {\n\n\n\n    padding: 40px 0;\n\n\n\n  }";
if (false || (document.location.href.indexOf("http://www.tumblr.com/edit/") == 0))
	css += "#content {\n\n\n\n    padding: 40px 0;\n\n\n\n  }";
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
