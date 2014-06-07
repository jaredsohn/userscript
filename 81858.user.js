 // ==UserScript==
// @name        Grooveshark Ad remove & set title (Useful when you have GS in prisn or fluid)
// @namespace   http://listen.grooveshark.com*
// @description Quick hack to remove GS ads after 60 seconds.
// @include     *
// @author      David Chan /modified by iThom
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
                        document.title = 'Grooveshark';
		}, 60000);	// do it in 60 sec
	}
})();