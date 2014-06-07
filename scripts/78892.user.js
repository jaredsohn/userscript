// ==UserScript==
// @name             Italia
// @namespace     http://userstyles.org
// @description	  Italia
// @author        emma/ratpoison
// @homepage      http://userscripts.org/users/175934

// @include       http://www.tumblr.com/dashboard
// @include       http://www.tumblr.com/followers
// @include       http://www.tumblr.com/messages
// @include       http://www.tumblr.com/queue

// @include       http://www.tumblr.com/dashboard/
// @include       http://www.tumblr.com/followers/
// @include       http://www.tumblr.com/messages/
// @include       http://www.tumblr.com/drafts
// @include       http://www.tumblr.com/queue/


// @include       http://www.tumblr.com/tagged/*
// @include       http://www.tumblr.com/tumblelog/*
// @include       http://www.tumblr.com/dashboard/search/*

// @include 	  http://tumblr.com/dashboard
// @include       http://tumblr.com/followers
// @include       http://tumblr.com/messages
// @include       http://tumblr.com/queue

// @include 	  http://tumblr.com/dashboard/
// @include       http://tumblr.com/followers/
// @include       http://tumblr.com/messages/
// @include       http://tumblr.com/drafts
// @include       http://tumblr.com/queue/

// @include       http://tumblr.com/tagged/*
// @include       http://tumblr.com/tumblelog/*
// @include       http://tumblr.com/dashboard/search/*

// @include       http://www.tumblr.com/likes
// @include       http://tumblr.com/likes



// ==/UserScript==
(function() {
var css = "#tip{\n    display: none;\n  }\n  #container {\n    width: 900px !important;\n    background-color:transparent\n  }\n  #header {\n    background-color:transparent !important;width:auto !important\n  }\n  body {\n    background:url(http://static.tumblr.com/q1jc975/omUl3uwg8/italy_flag_1024x768-888304.jpeg) repeat fixed transparent !important;\n  }\n  #content {\n    background: transparent !important;\n  }\n   #right_column #dashboard_controls_radar_media {\n    background:transparent !important;\n  }\n  #right_column #dashboard_controls_radar_media{\n    color:transparent !important;\n  }\n  #right_column #dashboard_controls_radar_media a{\n    color:transparent !important;\n  }";
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