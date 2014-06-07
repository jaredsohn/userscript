// ==UserScript==
// @name            Yammer UnFollow Fix
// @description     Brief description of script
// @include         https://www.yammer.com/users/*
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
$('#unsubscribe_User_156041').find('span').text("Remove");
//$('#unsubscribe_User_156041').find('span').fadeOut("slow");
//if($('#unsubscribe_User_156041').find('span').text() == "Unfollow"){
//alert("Changed");


//}
//else{
//alert("not changed");
//}
    }

