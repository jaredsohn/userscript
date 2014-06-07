// ==UserScript==
// @name           TwojePC.pl - rot13 user posts
// @namespace      http://www.grocal.pl
// @description    Rot-13 post of certain user
// @include        http://twojepc.pl/board.php
// @include        http://twojepc.pl/*
// @include        http://*.twojepc.pl/*
// ==/UserScript==
// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://code.jquery.com/jquery-latest.js';
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
		String.prototype.rot13 = function(){
			return this.replace(/[a-zA-Z]/g, function(c){
			return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
			});
		};
		$("a[class='u'][href='u.php?u=3920&k=12af3']").prev().each(function (i) { this.innerHTML = this.innerHTML.rot13(); return true; });
		$("a[class='u'][href='u.php?u=3920&k=12af3']").nextAll('font[class="txt"]').each(function (i) { this.innerHTML = this.innerHTML.rot13(); return true; });

}