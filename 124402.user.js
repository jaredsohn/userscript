// ==UserScript==
// @name          Cleanup ClockingIT Tags
// @description   Cleans out the empty tags in the taglist in ClockingIT
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include       http*://intellisearch.clockingit.com/tasks/list*
// ==/UserScript==

// Find the tags, and hide tags with (0) count.
$("#tags .content span.tag").each(function(){
	var re = /.*\(0\)/;
	if (re.test(this.textContent)) $(this).hide();
});
