// ==UserScript==
// @name           Check all emails in WebMail
// @namespace      http://www.jeroenvanwarmerdam.nl
// @include        */exchange/*
// ==/UserScript==

(function(doc, win) {

	// Add jQuery;
	var GM_jQ = doc.createElement('script');
	GM_jQ.src = 'http://code.jquery.com/jquery-latest.min.js';
	GM_jQ.type = 'text/javascript';
	doc.getElementsByTagName('head')[0].appendChild(GM_jQ);

	// Check if jQuery's loaded
	function GM_wait() {
		if(typeof unsafeWindow.jQuery == 'undefined') { win.setTimeout(GM_wait, 100); }
		else { $ = unsafeWindow.jQuery; init(); }
	}
	GM_wait();

	var i = 0;
	function init() {
		$("img[src~='/exchweb/img/view-mark.gif']").click(function() {
			$("td input[name='MsgID']:checkbox").attr("checked", ++i % 2 ? "checked" : "");
		});
	}
})(document, this);