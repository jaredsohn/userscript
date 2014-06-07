// ==UserScript==
// @name        VotersPub
// @namespace   document.onclick = function () {}
// @include     http://www.voters-club.com/
// @include     http://www.voters-club.com/Default.aspx*
// @version     1.3
// ==/UserScript==

var $;
// Add jQuery
(function () {
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
        $ = unsafeWindow.jQuery.noConflict(true);
        letsJQuery();
    }
}
function letsJQuery() {
    var porno = $('*:contains("Currently there are no orders for voting")').length;
    var porno2 = $('*:contains("Order #")').length;
    var porno3 = $('*:contains("Sign In:")').length;
    if (porno3 > 0) {
        alert("Please, log on!");
        exit;
    }
    function autoRefresh(time) {
        setTimeout('location.href=location.href;', time);
    }
    if (porno > 0) {
        autoRefresh(60000);
    } else {
        if (porno2 > 0) {
            alert("Go, go, go!");
            autoRefresh(120000);
        }
    }
}