// ==UserScript==
// @name          pinboard_blue
// @include       http://pinboard.in/*
// @include       https://pinboard.in/*
// @include       http://*.pinboard.in/*
// @include       https://*.pinboard.in/*
// @grant 	  none
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "body {\n    font-family: \"Helvetica\" !important;\n    color:#292929}\n\na {color:#292929!important;padding:0px}\na:hover,.user_navbar a:hover,#tag_cloud_header a:hover {background:#fff!important;color:#0099CC!important}\n\n.display .when {\n    color: #555 !important;\n    margin-left: 0px !important;\n    padding-left: 0px !important;\n    font-size: 12px}\n\n.display {border-bottom:1px dotted #bbb; width:100%; padding:0px 0px 25px}\n.display .bookmark_title {\n    font-weight: bold;\n    font-size: 14px !important;\n    line-height: 18px;\n    font-family: Helvetica, sans serif;\n    margin:6px 0px 0px;}\n.display a.bookmark_title {color:#292929;}\n.display a.unread {background:#99E6FF;\n    padding:2px !important;\n}\n.display a.bookmark_title:hover {color:#0099CC}\n.display .description {\n    font:12px/14px Helvetica !important;\n    margin:8px 0px 2px;\n    padding:0px !important;\n    background:#fff}\n.display .tag {\n    font:12px \"Helvetica\";\n    display:inline-block;\n    padding:0px 0px !important;\n    margin:4px 0px 3px !important;\n  color:#0099CC !important;n\  background:#0099CC}\n.display .source {\n    font-size:12px;\n    display:inline-block;\n    margin:6px 0px !important;\n    padding:0px !important;\n    text-decoration: none !important;\n    color: #555 !important;}\n.display .edit_links a {\n    color: #555 !important;\n    font-size:11px !important;\n    text-decoration: underline !important;}\n\n.user_navbar a, #tag_cloud_header a {\n    font-size:13px !important;\n    color:#059ece !important;\n    font-weight:bold}\n    \n#nextprev .next_prev {\n    font-size: 12px !important;\n    color: #222 !important;\n    background-color: #ffffff;\n    padding: 0 2px !important;\n}\n#nextprev a:hover {\n    color: #0099CC!important;\n    background-color: #FFF !important;\n}\n\n\n\n#edit_bookmark_form .edit_form_input {\n    font-size: 12px !important;\n}\n\n#edit_bookmark_form .description {\n    font-family: \"Helvetica\" !important;\n    height: 8em !important;\n    font-size: 12px !important;\n    line-height: px !important; \n}\n\n#edit_bookmark_form .submit {\n    font-size:12px !important;\n}\n\n#edit_bookmark_form .reset {\n    font-size:12px !important;\n    border-color: #f0f0f0 !important;\n    background-color: #fdfdfd !important;\n    color: #999 !important;\n}{   display:inline-block;\n    font-weight:bold;\n    margin: 0px 10px -25px -20px;}\n \n#bookmarks .private {background:#fff!important}\n#bookmarks .private .display:before {\n    content:\"PRIVATE: \";\n    font-size:11px;\n    color:#0099cc}\n\n#top_menu a {\n    color: #222 !important;\n}\n#top_menu a:hover {\n    color: #0099CC !important;\n    background-color: #fff !important;\n}";
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
