// ==UserScript==
// @name		Movinsane Cleaner
// @namespace	http://technoblogia.net
// @description	Removes all adds from Movinsane VOD website pages and fixed few design & general bugs and other goodies
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @include		http://*movinsane.com/*
// ==/UserScript==

// Remove banners:
$(".TopBanner_Container, #ContentSplitContainer_left_2, #IndexGrayBox_121, #divStripBanner, table[cellpadding=5], #ContentSplitContainer_right212, #BottomBanner_Container, .clearfix2, .banner_big, .banner_big1, .banner_logo, #ipbwrapper, #IndexGrayBox_2, #LikeboxPluginPagelet, iframe, script[src*='media.foxweb.co.il']").remove();
// resize content element:
$("#ContentSplitContainer_right_2122, #ContentSplitContainer_right_2").css("width", "100%");
// Prevent opening pages in new windows:
$("a[href*='movinsane.com']").removeAttr("target");