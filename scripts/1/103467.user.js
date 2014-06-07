// ==UserScript==

// @name          blue beach _   http://themefb.blogspot.com

// @namespace     http://themefb.blogspot.com

// @description	  blue beach 01 : more beautiful facebook theme visit http://themefb.blogspot.com, download more than 100 nature cartoons,celebrity facebook/orkut theme from
http://themes4orkut.blogspot.com

// @author       neel

// @homepage      http://themefb.blogspot.com

// @include       http://facebook.com/*

// @include       https://facebook.com/*

// @include       http://*.facebook.com/*

// @include       https://*.facebook.com/*

// ==/UserScript==
(function() {
var css = ".flex_open h2, .flex_open h2 a { color: #0066B3 !important; }\n  #navigator { height: 50px !important; background-image: none; !important; background-color: transparent !important; }\n  #sidebar>a.go_home {background-image:url(\"http://img175.imageshack.us/img175/3112/facebooklogopa7.png\") !important}\n  #navigator .main_set li a.edit_link, #navigator .secondary_set li a { color: #E1CD2F !important; }\n  html, body { margin: 0; padding: 0; min-height: 1000px !important; overflow: hidden; }\n\n  .toggle_tabs li a.selected { background-color: #CC0099 !important; }\n   #global_search_link:hover { background-color: #598C46 !important; color: #fff !important; }\n   #upload_form .upload_guidelines { background-color: #0066B3 !important; }\n   .inputbutton, .inputsubmit, .browse_more_button { background-color: transparent !important;\nborder-color:#B4D1B1 #2D3E12 #2D3E12 #B4D1B1 !important; }\n   #sidebar .social_ad_advert h2, .social_ad_advert h2 { color: #426527 !important; }\n   .back_links a { color: #413839 !important; }\n   .when_open .flex_header, .flex_open .box_head, .header { border-top:1px solid #598C46 !important; }\n   div[id*=\"box_head\"], .header { background-color: #C9EAC6 !important; }\n   #navigator .main_set li a.active, #navigator .main_set li a:hover { background-color: #98BF91 !important; }\n   #pns { background-color: #AFCEAF !important; border-color:#2D3E12 #B4D1B1 #B4D1B1 #2D3E12 !important; }\n   #pns:hover { background-color: #C9EAC6 !important; }\n   #nav_unused_1 { margin-left: 15px !important; margin-top: 6px !important; }\n   #content>div:last-child, #group, #home_container { background-image: none !important; }\n   .when_open .flex_header, .flex_open .box_head { background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKdJREFUeNpi/P//PwM1ARMDlcEINJCFkIKsLSX/T966iVPeXE2dYZpPDyPRLgzT92aQERHCKgcSD9P3JM3LDrKOjKZKGljlzJS1gPLOjCSHoZeaG4OEkACKGIjvpeZCXqQYiRkzBhs5ooiB+Iaixoxkx7KFjBmDuow0mA2iQXyKko2WkA5jpLE3AwcbKwOIBvEpTody/DIMFqrqYBoXYBwtHCgGAAEGAKOiG1oCH3MQAAAAAElFTkSuQmCC\")  !important; background-repeat: no-repeat !important; }\n   #nav_unused_2 { margin-top: 6px !important; }\n    div.standalone_minifeed.column, .holder, #profileActions, .fmp, .fmptd, .clearfix, #content>div:last-child, #search_results, .srch_landing { background-color: transparent !important; }\n  \n   #content>div#profileActionsSecondary:last-child, div.bottom.clearfix, #profile_footer_actions, .footer_bar { margin-top:15px !important; background: transparent url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1JREFUeNpiPnNolfHlK/ekZKWlwJgZxGGAgsm95QxMyJzc4k6IAIwDAgABBgCLdxAj6IM90AAAAABJRU5ErkJggg==\") !important; }\n   .title_header, .dashboard_header, .profile .account_info, #nettop, .grayheader, #content>div:first-child:not(.tabs):not(:last-child):not(.column), .media_header { background: #B5D2B1 url(\"data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1JREFUeNpiPnNolfHlK/ekZKWlwJgZxGGAgsm95QxMyJzc4k6IAIwDAgABBgCLdxAj6IM90AAAAABJRU5ErkJggg==\") !important; }\n   .media_gray_bg { border: none !important; }\n\n\n   #page_body { background-image: url(\"data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABBJREFUeNpiePdi1WaAAAMACHwDNGWU9l4AAAAASUVORK5CYII=\") !important; }\n  html { background-color: transparent !important; background-image: url(\"data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAGlCAIAAAC0jQuSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQhJREFUeNqcVFsSwiAMbNZ+e3LP4/EWA0J5NAF0OhQb89gsS/B8vXEcR7/iQ+Mb1YYxxllIrs7/GH1neayYaGba44vZj2ob66LE8V635i/58u/dfmMxej1h3s8WD0j4yaaPxpcjPxcWmLiBBZ6Li+zLzbPCyCPss6OFIZqC9iJrfIVvGHitOLOWrW+bL1HuQ9prXrExmrXYneP0vqD2UrToarlZDzWH7C/ZXxEi8Lv7XEq2BZNLOhoYeYo19fQgrLVdndPWJpz54Ny9E63OKsbT9S/cJj9eOv3Kyal/0yrWswobc6zTHf6cf96cYaOhXtepT87yzGY0fpz9dTaJPkHvkEBWcR8BBgBiwTib6Nyc2QAAAABJRU5ErkJggg==\") !important; background-repeat: no-repeat !important; z-index: 2 !important; overflow: auto; }\n\n  body { background-color: transparent !important; background-image: url(\"http://www.hdwallpapers.in/wallpapers/dead_tree_beach-1680x1050.jpg\") !important; background-attachment: fixed !important; background-repeat: no-repeat !important; background-position: center center!important; }";
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
