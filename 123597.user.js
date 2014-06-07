// ==UserScript==
// @name          Convert Redmine URL text into hyperlinks
// @version       1.0
// @namespace     redmine
// @include       http://*/*
// @include       https://*/*
// @description   This script converts Redmine links in the "URL(s) to be edited" field into URLs.
// ==/UserScript==

var $;

// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');

        GM_JQ.src = '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
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
        // letsJQuery();
        makeLinks();
    }
}

// All your GM code must be inside this function
function letsJQuery() {
    console.log($); // check if the dollar (jquery) function works
    console.log($().jquery); // check jQuery version
}

// Turn URL text into links
function makeLinks() {
    var url_field = url_text = url_links = '';
    url_field = $("th:contains('URL(s)')").next("td");
    if (url_field.html().match(/^http/) != null) {
        url_text = url_field.text().split(/[\s\n,]+/);
        for (i in url_text) {
            url_links += '<a href="' + url_text[i] + '" target="_blank">' + url_text[i] + '</a><br/>';
        }
        url_field.html(url_links);
    }
}