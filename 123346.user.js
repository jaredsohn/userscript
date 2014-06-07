// ==UserScript==
// @name           TUmblr
// @namespace      Backround
// @include        tumblr.com/dashboard
// ==/UserScript==// ==UserScript==
// @name          Black Dashboard
// @namespace     http://userstyles.org
// @description	  Simple Black dashboard theme for tumblr.
// @author        avalonolava
// @homepage      http://userstyles.org/styles/56261
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "";
css += "@namespace url(http://www.w3.org/1999/xhtml);";
if (false || (location.href.replace(location.hash,'') == "https://www.tumblr.com/login") || (location.href.replace(location.hash,'') == "http://www.tumblr.com/dashboard") || (location.href.replace(location.hash,'') == "http://www.tumblr.com/new/blog") || (location.href.replace(location.hash,'') == "http://www.tumblr.com/inbox") || (location.href.replace(location.hash,'') == "http://www.tumblr.com/help") || (location.href.replace(location.hash,'') == "https://www.tumblr.com/preferences") || (location.href.replace(location.hash,'') == "http://www.tumblr.com/lookup") || (location.href.replace(location.hash,'') == "http://www.tumblr.com/explore") || (location.href.replace(location.hash,'') == "http://www.tumblr.com/following") || (location.href.replace(location.hash,'') == "http://www.tumblr.com/likes") || (document.location.href.indexOf("http://www.tumblr.com/blog/") == 0) || (document.location.href.indexOf("http://www.tumblr.com/dashboard/") == 0) || (document.location.href.indexOf("http://www.tumblr.com/new/") == 0) || (document.location.href.indexOf("http://www.tumblr.com/tumblelog/") == 0) || (document.location.href.indexOf("http://www.tumblr.com/tagged/") == 0) || (document.location.href.indexOf("http://www.tumblr.com/spotlight/") == 0) || (document.location.href.indexOf("http://www.tumblr.com/edit/") == 0))
	css += "body {\n  background:url(\"\") no-repeat fixed !important;\n  background-color: rgba(0,0,0, 1.0) !important;\n  background-position: 0% 0% !important;\n  background-size: 100% 100%  !important;\n}\n\n\n\n#logo {\n  width: 0px !important;\n  height: 0px !important;\n  background:url(\"\") !important;\n  width: 196px !important;\n  height: 44px !important;\n}\n\n\n\nimg[src*=\"http://assets.tumblr.com/images/new_post_icons_no_labels.png\"]{\nopacity: 0.00 !important;  \n}\n#new_post{\n  background-image: url(http://assets.tumblr.com/images/new_post_icons_no_labels.png) !important;\n  background-position: center center !important; \n  background-repeat: no-repeat !important;\n}\n\n\n\n#new_post {\n  background-color: rgba(255, 255, 255, 1.0) !important;\n}\n\n\n\n#new_post .arrow {\n  opacity: 1.0 !important;\n  margin-left: 0px !important; \n}\n\n\n\n#content {\n  background: rgba(19,19,19, 1.00) !important;\n}\n \n\n\n#posts LI[class*=\" post\"] {\n  background: rgba(255, 255, 255, 1.0) !important;\n}\n\n\n\n.selection_nipple.white, .selection_nipple:not([class=\"selection_nipple white\"]) {\n  background: none !important;\n  width: 0px !important;\n  height: 0px !important;\n  margin-top: 0px !important;\n  border-bottom: solid 11px rgba(255,255,255,1.0) !important;\n  border-right: 11px solid transparent !important;\n  border-left: 11px solid transparent !important;\n}\n\n.selection_nipple:not([class=\"selection_nipple white\"]) {\n  border-bottom: solid 11px rgba(19,19,19, 1.0)  !important;\n}\n\n\n\n.post.photo_post .photo, .post.photo_post .video_thumbnail {\n  -moz-box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.0) !important;\n  border-radius: 12px !important;\n}\n.content.is_media, .mask.top, .mask.bottom {\n  background: none !important;\n}\n\n\n\n.mceContentBody {\n  color: rgba(0, 0, 0, 1.0) !important;\n  background: rgba(255,255,255, 1.0) !important;\n}";
css += ".permalink {\n  background: none !important;\n  width: 16px !important;\n  height: 16px !important;\n  background: rgba(170,179,188, .85) !important;\n  border-bottom-left-radius: 10px !important;\n  border-top-right-radius: 24px !important;\n  margin-top: 6px !important;\n  margin-right: 6px !important;\n}\n.permalink:hover {\nbackground: rgba(152,143,127, 1.0 ) !important;\n}\n\n.sub_avatar{width:32px !important; height:32px !important; background-color:transparent !important}\n.post.photo_post .photo, .post.photo_post .video_thumbnail {\n  -moz-box-shadow: 2px 2px 2px rgba(0,0,0, 0.50) !important;\n  border-radius: 12px !important;\n}\n.content.is_media, .mask.top, .mask.bottom {\n  background: none !important;\n}\n\n#left_column #posts .notification {\n  background-color:#242424 !important;\n  color:#666 !important;\n  border-bottom-color: #0f0f0f !important;\n  border-top-color: #0f0f0f !important;\n  border-right-color: #0f0f0f !important;\n  border-left-color: #0f0f0f !important\n  \n}\n#left_column #posts .notification .block {\n  color:#242424 !important;\n}\n#left_column #posts .notification.alt {\n  background-color: #242424 !important;\n}\n#left_column #posts .notification.last_notification,\n#left_column #posts .notification.single_notification {\n  border-bottom-color:#0f0f0f !important;\n}\n#left_column #posts .notification a {\n  color:#929292 !important;\n  border-bottom:0px !important;\n}\n#left_column #posts .notification blockquote {\n  border-left-color:#242424 !important;\n}\n#left_column #posts .notification .avatar {\n  border-color: !important;\n  background-color:#242424 !important;\n  opacity:1 !important;\n}\n#left_column #posts .notification .avatar:hover {\n  opacity:1 !important;\n}\n\n.nipple {\n  background: none !important;\n  width: 0px !important;\n  height: 0px !important;\n  border-right: solid 6px rgba(36,36,36, 1.00) !important;\n  border-bottom: 6px solid transparent !important;\n  border-left: 0px solid transparent !important;\n  border-top: 6px solid transparent !important;\n  margin-top: 0px !important;\n}\n.nipple.border {\n  background: none !important;\n  width: 0px !important;\n  height: 0px !important;\n  border-right: solid 6px rgba(19,19,19, 1.0) !important;\n  border-bottom: 6px solid transparent !important;\n  border-left: 1px solid transparent !important;\n  border-top: 6px solid transparent !important;\n  margin-top: 1px !important;\n}\n\n*{\n  text-shadow:none !important;\n}";
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
