// ==UserScript==
// @name        HS translator (Spanish)
// @namespace   http://*hootsuite.com*
// @description Adds the ability to translate tweets in HootSuite. Click on a tweet to translate it to Spanish.
// @include     http://*hootsuite.com*
// @author      Ani Lopez (@anilopez)
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
		$("div._body p._tweetText").live("click", function() {
			translate(this);
		});
	}

	function translate(element) {
		$element = $(element);

		$.ajax({
			type: "GET",
			url: "http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&q=" + encodeURIComponent($element.html()) + "&langpair=|es",
			dataType: "jsonp",
			success: function(data) {
				if (data && data.responseData && data.responseData.translatedText) {
					$element.html(data.responseData.translatedText).css("color", "#999999");
				}
			}
		});
	};
})();