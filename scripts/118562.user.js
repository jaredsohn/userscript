// ==UserScript==
// @name           Stanford class: make forum links clickable
// @description    Makes links in Q&A forum posts clickable.
// @namespace      http://sepczuk.com
// @include        http://www.ml-class.org/course/qna/view?*
// @include        http://www.db-class.org/course/qna/view?*
// @downloadURL     https://userscripts.org/scripts/source/118562.user.js
// @updateURL       https://userscripts.org/scripts/source/118562.meta.js
// ==/UserScript==
(function(){
try{
	// support Opera & Firefox
	var $ = (typeof unsafeWindow !== "undefined")?unsafeWindow.jQuery:jQuery;
	
	// -----------

	$('.reply_actual_text').each(function() {
		var txt = $(this).html();
		txt = txt.replace(/[^"]((https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[A-Z0-9+&@#\/%=~_|])/ig,
		                  '<a href="$1">$1</a>');
		$(this).html(txt);
	})
}catch(e){}
})();