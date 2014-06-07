// ==UserScript==
// @name        no ads
// @namespace   http://listen.grooveshark.com*
// @description quick hack to remove GS ads after 30 seconds
// @include     *
// @author      David Chan
// ==/UserScript==

(function () {
	function JQ_wait() {
		if (typeof $ != 'undefined') { JQ_ready(); } // Opera
		else if (typeof this.jQuery != 'undefined') { $ = this.jQuery; JQ_ready(); } // Chrome
		else if (typeof unsafeWindow != 'undefined' && typeof unsafeWindow.jQuery != 'undefined') { $ = unsafeWindow.jQuery; JQ_ready(); } // Firefox
		else window.setTimeout(JQ_wait, 100);
	};
	JQ_wait();

	function JQ_ready() {
		setTimeout(function() {
			$("#sidebar").remove();
			$("#mainContentWrapper").css({"marginRight":0});
		}, 30000);	// do it in 30 sec
	}
})();