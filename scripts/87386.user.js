// ==UserScript==
// @name           Quake Live chat and ad mover
// @version        1.1
// @namespace      http://userscripts.org/scripts/show/87386
// @description    move the quakelive.com chat box to the top of the right panel + move the top ad to the bottom
// @include        http://www.quakelive.com/*
// @require        http://sizzlemctwizzle.com/updater.php?id=87386
// ==/UserScript==


function get_jQuery() {
   if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(get_jQuery,100); }
   else { $ = unsafeWindow.jQuery; main(); }
}
get_jQuery();


function main() {
	if ( $("#post_spon_content").length > 0 && $("#qlv_chatControl").length > 0
	  && $("#qlv_topFadeAds").length > 0 && $("#qlv_footer2").length > 0 ) {
		$("#qlv_chatControl").prependTo($("#qlv_contentChat"));
		$("#post_spon_content").appendTo($("#qlv_contentChat"));
		$("#qlv_topFadeAds").appendTo($("#qlv_content"));
		$("#qlv_footer2").appendTo($("#qlv_content"));
		GM_addStyle("#qlv_chatControl { margin-bottom: 10px; }");
		GM_addStyle("#qlv_footer2 {height: 176px; }");
		GM_addStyle("#qlv_topFadeAds {padding-top: 6px !important; padding-bottom: 6px; background-color: #621300; }");
	}
	else { window.setTimeout(main,100); }
}

