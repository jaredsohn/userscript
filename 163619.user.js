// ==UserScript==
// @name          Nature Ocean drops 1.1
// @namespace     Nature Ocean drops
// @description	  nature Ocean drops1.1 facebook theme for facebook
// @author        neel
// @homepage      http://userstyles.org/styles/5537
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==
(function() {
var css = ".flex_open h2, .flex_open h2 a { color: #598C46 !important; }\n  #navigator { height: 42px !important; background-image: none !important; background-color: #598C46 !important; }\n  #sidebar>a.go_home {background-image:url(\"http://img175.imageshack.us/img175/3112/facebooklogopa7.png\") !important}\n  #navigator .main_set li a.edit_link, #navigator .secondary_set li a { color: #E1CD2F !important; }\n  html, body { margin: 0; padding: 0; min-height: 1000px !important; overflow: hidden; }\n\n  .toggle_tabs li a.selected { background-color: #transparent !important; }\n   #global_search_link:hover { background-color: #transparent !important; color: #fff !important; }\n   #upload_form .upload_guidelines { background-color: #fff !important; }\n   .inputbutton, .inputsubmit, .browse_more_button { background-color:#598C46 !important;\nborder-color:#B4D1B1 #2D3E12 #2D3E12 #transparent !important; }\n   #sidebar .social_ad_advert h2, .social_ad_advert h2 { color: #426527 !important; }\n   .back_links a { color: #426527 !important; }\n   .when_open .flex_header, .flex_open .box_head, .header { border-top:1px solid #fff !important; }\n   div[id*=\"box_head\"], .header { background-color: #fff !important; }\n   #navigator .main_set li a.active, #navigator .main_set li a:hover { background-color: #transparent !important; }\n   #pns { background-color: #AFCEAF !important; border-color:#2D3E12 #B4D1B1 #B4D1B1 #2D3E12 !important; }\n   #pns:hover { background-color: #fff !important; }\n   #nav_unused_1 { margin-left: 15px !important; margin-top: 6px !important; }\n   #content>div:last-child, #group, #home_container { background-image: none !important; }\n   .when_open .flex_header, .flex_open .box_head { background-image: url(\"...\")  !important; background-repeat: no-repeat !important; }\n   #nav_unused_2 { margin-top: 6px !important; }\n    div.standalone_minifeed.column, .holder, #profileActions, .fmp, .fmptd, .clearfix, #content>div:last-child, #search_results, .srch_landing { background-color: transparent !important; }\n  \n   #content>div#profileActionsSecondary:last-child, div.bottom.clearfix, #profile_footer_actions, .footer_bar { margin-top:15px !important; background: transparent url(\"...\") !important; }\n   .title_header, .dashboard_header, .profile .account_info, #nettop, .grayheader, #content>div:first-child:not(.tabs):not(:last-child):not(.column), .media_header { background: #transparent url(\"...\") !important; }\n   .media_gray_bg { border: none !important; }\n\n\n   #page_body { background-image: url(\"...\") !important; }\n  html { background-color: #8DD6E5 !important; background-image: url(\"...\") !important; background-repeat: no-repeat !important; z-index: 2 !important; overflow: auto; }\n\n  body { background-color: transparent !important; background-image: url(\"http://interfacelift.com/wallpaper/D47cd523/01951_greenlandmystery_1280x960.jpg\") !important; background-attachment: fixed !important; background-repeat: no-repeat!important; background-position: center!important; }";
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

var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href=\"http://themes4orkut.blogspot.com\">themes4orkut</a>&nbsp;|&nbsp;</li>";
