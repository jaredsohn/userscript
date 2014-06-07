// ==UserScript==
// @name          Select Option Sorter
// @namespace     http://userscripts.org/users/guwapoman
// @description   Sorts the options in a select tag.
// ==/UserScript==

var $j;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$j = unsafeWindow.jQuery.noConflict(true);
		main();
	}
}

// All your GM code must be inside this function
function main() {
	var selects = $j("select");
	selects.each(function(index) {
		var options = $j("option", $j(this));
		sortOptions(options);
		$j("option", $j(this)).remove();
		if(options.length > 0) {
			options.removeAttr("selected");
			$j(options[0]).attr("selected", "true");
		}
		$j(this).append(options);
	});
}

function sortOptions(options) {
	insertionSort(options);
}

function insertionSort(options) {
	var length = options.length;
	for(var i = 1; i < length; i++) {
		var newValue = $j(options[i]).text();
		var placeHolder = options[i];
		
		var j = i;
		while(j > 0 && $j(options[j - 1]).text() > newValue) {
			options[j] = options[j - 1];
			j--;
		}
		options[j] = placeHolder;
	}
}