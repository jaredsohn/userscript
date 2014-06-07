// ==UserScript==
// @name	Remove too many colors
// @include	http://nakea.unfuddle.com/*

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; startCLE(); }
    }

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    if(typeof unsafeWindow.jQuery == 'undefined')
    {
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);
	GM_wait();
    }
    else
    {
	$ = unsafeWindow.jQuery;
	cleanUp();
    }

// Append some text to the element with id #someText using the jQuery library.
function cleanUp(){
	$('tr.row_0').removeClass('row_0').addClass('row_1');
};

testJ();
// ==/UserScript==
