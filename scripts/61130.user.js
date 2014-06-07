// ==UserScript==
// @name          Twitterrific-like Facebook
// @description	  Fluid.app-ready script to make the appearance like Twitterrific. (Color formatting and hides header, tabbar, composer, & footer.)
// @author        Ben M
// @homepage      http://userscripts.org/scripts/show/61130
// @include       http://iphone.facebook.com/*
// @include       https://iphone.facebook.com/*
// @include       http://*.iphone.facebook.com/*
// @include       https://*.iphone.facebook.com/*
// @include       http://touch.facebook.com/*
// @include       https://touch.facebook.com/*
// @include       http://*.touch.facebook.com/*
// @include       https://*.touch.facebook.com/*
// ==/UserScript==
(function() {
var css = "* #topbar, #menubar #inbox_menu, #menubar #friends_menu, #tabbar, .composer, #footer, .item .item_recent img {display: none;} html, #content {background-color:#222;} #menubar {background-color:#222; border-bottom: none;height:33px} #menubar u {width:48%; color:#eee} #menubar u.selected {background-color:#333;-webkit-border-radius:3px} .item, .item.feedback, .item_loadmore {background-color:#333;color:#eee;-webkit-border-radius:7px;border:2px #222 solid} .item .item_intentional .item_intentional_message {font-size:13px;} .item .item_intentional .item_intentional_attached .item_intentional_attached_text, .item .item_intentional .item_intentional_attached .item_intentional_attached_caption, .item .item_intentional .item_intentional_attached .item_intentional_attached_title {font-size:10px} .item .item_intentional .item_intentional_attached .item_intentional_attached_image {width:30px} .item .item_intentional .item_intentional_info, .item .item_comment .item_comment_info, .item .item_comment .item_comment_message {font-size:11px;line-height:11px;} .item.feedback {margin-left:27px} a, u, .item_loadmore .item_loadmore_text, .item_form_label, .profileheader .profileheader_info .profileheader_info_name {color: rgb(159, 189, 222);} .item .item_likebox .item_likebox_text, .item .item_recent {color:#ccc;background-color:#555;-webkit-border-radius:3px;font-size:11px;} .item .item_recent {padding:0px; margin-left:45px; margin-bottom:7px; background-color:#333; line-height: 13px} .profileheader .profileheader_info .profileheader_info_status {color:#ccc} .squareimage, .item .item_intentional .item_intentional_attached .item_intentional_attached_image, .profileheader .profileheader_image{-webkit-border-radius: 3px;} .profileheader {background-color:#222; -webkit-border-bottom-left-radius: 7px; -webkit-border-bottom-right-radius: 7px;} .login_form {background-color:#222;margin-top:20px} .login_form .login_form_label {color:#ccc} .login_form .button {float:right;} ";
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
