// ==UserScript==
// @name        HS translator (Spanish)
// @namespace   http://hootsuite.com
// @description Adds the ability to translate tweets in HootSuite. Click on a tweet to translate it to Spanish.
// @include     http*://*hootsuite.com*
// @author      David Chan (@chandavid)
// ==/UserScript==

(function () {

	var langToTranslateTo = 'es';

	// this gem came from: https://gist.github.com/545223
	// This block of code injects our source in the content scope and then calls the
	// passed callback there. The whole script runs in both GM and page content, but
	// since we have no other code that does anything, the Greasemonkey sandbox does
	// nothing at all when it has spawned the page script, which gets to use jQuery.
	// (jQuery unfortunately degrades much when run in Mozilla's javascript sandbox)
	(function(run_me_in_page_scope) {
	  if ('undefined' == typeof __RUNS_IN_PAGE_SCOPE__) { // unsandbox, please!
		var src = arguments.callee.caller.toString(),
		 script = document.createElement('script');
		script.setAttribute("type", "application/javascript");
		script.innerHTML = "const __RUNS_IN_PAGE_SCOPE__ = true;\n(" + src + ')();';
		document.documentElement.appendChild(script);
		document.documentElement.removeChild(script);
	  } else { // unsandboxed -- here we go!
		run_me_in_page_scope();
	  }
	})(dcinit); // replace this with your preferred init function


	function dcinit() {
		function JQ_wait() {
			if (typeof $ != 'undefined') { JQ_ready(); } // Opera
			else if (typeof this.jQuery != 'undefined') { $ = this.jQuery; JQ_ready(); } // Chrome
			else if (typeof unsafeWindow != 'undefined' && typeof unsafeWindow.jQuery != 'undefined') { $ = unsafeWindow.jQuery; JQ_ready(); } // Firefox
			else window.setTimeout(JQ_wait, 100);
		};
		JQ_wait();

		function JQ_ready() {
			$("div._body p._tweetText").live("click", function() {
				translate(this);
			});
		}

		function translate(element) {
			$element = $(element);

			$.ajax({
				type: "GET",
				url: "https://ajax.googleapis.com/ajax/services/language/translate?v=1.0&q=" + encodeURIComponent($element.html()) + "&langpair=|" + langToTranslateTo,
				dataType: "jsonp",
				success: function(data) {
					if (data && data.responseData && data.responseData.translatedText) {
						$element.html(data.responseData.translatedText).css("color", "#999999");
					}
				}
			});
		};
	}



})();