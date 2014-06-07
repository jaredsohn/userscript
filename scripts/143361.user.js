// ==UserScript==
// @name          Summer Clouds Dash
// @namespace     http://userstyles.org
// @description	  for all things tumblr go to tutorialsandsuch.4lison.com
// @author        wonderlandd
// @homepage      http://userstyles.org/styles/67500
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
// @include       http://www.tumblr.com/new/*
// @include       http://www.tumblr.com/tumblelog/*
// @include       http://www.tumblr.com/tagged/*
// @include       http://www.tumblr.com/spotlight/*
// @include       http://www.tumblr.com/edit/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "{ color: #000 !important;}\n\n#left_column #posts .notification .avatar {\n\n          \n                        \n\n			opacity:0.95 !important;\n\n}\n\n\n\n\n\n\n\n\nbody {\nbackground: url('http://media.tumblr.com/tumblr_m5fw7ywZBU1qby5ua.jpg') center #fff  fixed !important;\n background-repeat: no-repeat;\n background-size: 100% 100%;\nbackground-color: #Fff !important;\ncolor:#000000!important;\n font-family: 'PermanentMarkerRegular';\n\n}\n\n\nh1,h2,h3,h4,h5,h6{color:#000 !important}\n\na, a:visited{color:#000 !important}\n\n\n\n\n\n\n\n#content {\n\n\n  background: #fff!important;\n  opacity: 0.80 !important;\n\n\n  \n\n}\n\n\n \n\n\n\n\n\n#posts LI[class*=\" post\"] {\nbackground: #Fff!important;\nborder: 2px #CF0 !important;\nopacity: 1!important;\n\n\n\n}\n\n\n\n\n\n\n.post.photo_post .photo, .post.photo_post .video_thumbnail {\n\n \nborder: 2px #000 !important;\n\n}\n\n\n\n\n.content.is_media, .mask.top, .mask.bottom {\n\n  background: none !important;\n\n}\n\n\n\n#left_column #posts .post .post_avatar \n\n	{-moz-border-radius: 38px !important;  \n\n	-webkit-border-radius: 60px !important;  \n\n	width: 64px !important; height: 64px !important;  \n\n	margin: 0px !important;} \n\n#left_column #posts .post .sub_avatar_inner \n\n	{-moz-border-radius: 38px !important;  \n\n	-webkit-border-radius: 60px !important;  \n\n	width: 32px !important; height: 32px !important;  \n\n	margin: 0px !important;} \n\n\n\n\n\n\n\n.controls_section{\n	border:3px solid #fff  !important;\n	\n}\n\n.mceContentBody {\ncolor: #000; !important;\nbackground: #fff !important;\n\nborder: 2px #fff !important;\n}";
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
