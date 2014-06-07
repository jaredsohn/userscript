// ==UserScript==
// @name        Github remove relative date stupidness
// @namespace   http://www.wilcoxd.com
// @include     https://github.com*
// @version     1
// @grant       none
// ==/UserScript==

// created: WD-rpw 03-25-2013

/*
	if you don't like this there are two other Greasemonkey scripts that do the
	same thing, although in a more complicated way:

	  1. http://userscripts.org/scripts/show/107649
	  2. http://userscripts.org/scripts/show/107649

*/

(function() {

	function parseDate(date) {
    	var m = /^(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d) UTC$/.exec(date);
    	var tzOffset = new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]).getTimezoneOffset();

    	return new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5] - tzOffset, +m[6]);
	}
	function format(el) {
		$el = $(el);
		$el.removeClass("js-relative-date");
		var time = $el.attr('title')||$el.attr("datetime");
		var formatted = time + " UTC";
		var dateObj = parseDate(formatted);

		if (dateObj)
			formatted = dateObj.toLocaleString();

		$el.html( formatted );
	}

	function onDOMSubtreeModifiedHandler(e){
		var target = e.target;
		// console.log(target);
		if(target.nodeType === 1 && /TIME/ig.test(target.nodeName)&&/ago/.test(target.innerHTML)) {
			format(target);
		}
	}
	$("time.js-relative-date").each( function(index, el) {
		format(el);
	});

	document.addEventListener('DOMSubtreeModified', onDOMSubtreeModifiedHandler, false);
})();
