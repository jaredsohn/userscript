scr_meta=<><![CDATA[
// ==UserScript==
// @name           Quake Live Chat Mover
// @version        1.1
// @namespace      http://userscripts.org/scripts/show/70077
// @description    move the quakelive.com chat box to the top of the right panel
// @include        http://www.quakelive.com/*
// @require        http://sizzlemctwizzle.com/updater.php?id=70077
// ==/UserScript==
]]></>.toString();

function get_jQuery() {
   if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(get_jQuery,100); }
   else { $ = unsafeWindow.jQuery; main(); }
}
get_jQuery();

function main() {
	if ($("#post_spon_content").length > 0 && $("#qlv_chatControl").length > 0) {
		$("#qlv_chatControl").prependTo($("#qlv_contentChat"));
		$("#post_spon_content").appendTo($("#qlv_contentChat"));
		GM_addStyle("#qlv_chatControl { margin-bottom: 10px; }");
	}
	else { window.setTimeout(main,100); }
}
