// ==UserScript==
// @name           4chan Search Engine
// @author         Witiko
// @include        http://www.4chan.org/
// @include        https://www.4chan.org/
// @include        http://www.4chan.org/#
// @include        https://www.4chan.org/#
// @include        http://www.4chan.org/?*
// @include        https://www.4chan.org/?*
// @namespace      http://witiko.blogspot.com/
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/118589.user.js
// @downloadURL    https://userscripts.org/scripts/source/118589.user.js
// @icon           http://www.4chan.org/favicon.ico
// @version        1.092
// ==/UserScript==


(function(){
	//底部弹框
	$(".quick_entry, .quick_entry_attach, .market_tip").hide();

	$("#close_li").click();
	
	//有广告及时反馈给我吧。
})();