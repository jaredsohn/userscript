// ==UserScript==
// @name          Ultimate Whovian by circlemaze (Full)
// @namespace     http://userstyles.org
// @description	  After the success of my <a href="http://userstyles.org/styles/67915">Gallifreyan new post icons</a>, I decided to make a full Doctor Who style.
// @author        Galifreyan Doctor Who Tumblr Icons
// @homepage      http://userstyles.org/styles/74483
// @include       http://www.tumblr.com/*
// @include       https://www.tumblr.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#dashboard_index, #dashboard_edit_post, #dashboard_submissions, #dashboard_drafts,#dashboard_post_queue, #dashboard_followers, #dashboard_members{background: url(http://i.minus.com/dLDscMFX6LIgL/bigbg0.jpg) fixed !important;}\n\n#dashboard_index #content, #dashboard_submissions #content, #dashboard_drafts #content,#dashboard_post_queue #content, #dashboard_members #content{background: rgba(0,0,0,0) !important}\n\n\n\n\n\n\n\n\n\n#left_column #posts .notification .avatar {opacity:0.7 !important;}\n#left_column #posts .notification .avatar:hover{opacity:1 !important;}\n\n#right_column{background-color: #FFFFFF opacity:1 !important;}\n\n#new_post_notice_container{color:#fff!important}\n\n\n#posts .notification {\n	opacity:0.8 !important;\n	background:  #163156 !important;\n	border: 1px #000000 solid !important;\n	margin: -1px;\n	}\n\n#posts .notification .nipple.border, #posts .notification.alt .nipple.border {\n	border-right: 7px solid #000000 !important;\n	}\n\n#posts .notification .nipple, #posts .notification.alt .nipple {\n	border-right: 6px solid #163056 !important;\n	}\n\n\n\n\n\n\n\n\n#logo {height: 0 !important;\n	width: 0 !important;\n	padding-left: 240px !important;\n	padding-top: 70px !important;\n	background: url(http://24.media.tumblr.com/tumblr_mam3e37V3f1qa0t06o1_250.png) no-repeat !important;}\n\n\n\n\n\n\n\n\n#return_to_top .return_to_top_icon{\nbackground: url('http://25.media.tumblr.com/tumblr_mam3e37V3f1qa0t06o7_100.png') no-repeat transparent!important}\n\n\n\n\n\n\n\n#popover_blogs .tab_notice:after{display:none; }\n\n#header .iconic>a{\n		background-image:url('http://25.media.tumblr.com/tumblr_mam3e37V3f1qa0t06o6_250.png') !important;}\n\n\n\n\n\n\n\n.new_post_label{\nfont-size:0px !important;\n}\n\n.new_post_label_icon{background-image:none !important}\n\n#new_post{\nbackground: url(http://25.media.tumblr.com/tumblr_mam3e37V3f1qa0t06o10_r1_1280.png) center no-repeat;\nbackground-color:#fff !important;\n}\n\n\n\n\n\n\n\n.selection_nipple.white,\n.selection_nipple {\n  border: 0px !important;\nbackground-image:url(\"http://25.media.tumblr.com/tumblr_mam3e37V3f1qa0t06o2_100.png\") !important;\n  width:  36px !important;\n  height: 48px !important;\n  margin-top: -12px !important;\n  background-position: 0px 0px !important;\n  background-repeat: no-repeat !important;\n}\n\n\n\n\n\n\n\n\nhtml {cursor: url(http://25.media.tumblr.com/tumblr_mam3e37V3f1qa0t06o3_100.png), progress;}\na, a:hover {cursor: url(http://25.media.tumblr.com/tumblr_mam3e37V3f1qa0t06o4_100.png), progress;}";
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