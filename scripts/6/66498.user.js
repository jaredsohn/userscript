// ==UserScript==
// @name           SL Skipper
// @namespace      ScanloverSkip
// @description    this skips the annoying and inefficient & pathetic anti-leech page
// @include        http://forum.scanlover.com/custom/noleech/index.php
// ==/UserScript==


//PUT YOUR SCANLOVER FORUM USERNAME HERE
var myusername = "some_user_name";


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
        $('input[name=username]').val(myusername)
		numbers = $('h2').eq(2).text().replace("=","").split(" + ");
		answer = parseInt(numbers[0]) + parseInt(numbers[1])
        $('input[name=answer]').val(answer)
    }