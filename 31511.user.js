// ==UserScript==
// @name			delicious Bookmark Highlight Effect
// @namespace		delicious_bookmark_highlight.user.js
// @description		Removes the intro div tag at the top with the rotating list elements and adds a nice background and border when you hover over a popular bookmark.
// @include			http://delicious.com/*
//
//	By Joe McCann (joe@subprint.com) | www.subprint.com
//
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
	if($('div#intro').length){
        $('div#intro').remove();
		}
		$('div.bookmark').hover(function(){
$(this).css({
backgroundColor: "#eee",
border: "1px solid #3274D0"
})
}, function() {
$(this).css({
backgroundColor: "#fff",
border: "0"
});
});

}
