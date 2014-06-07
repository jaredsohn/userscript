// ==UserScript==
// @name           4chan ONE /b/IG PAGE
// @namespace      4chan
// @description    Grab all /b/'s pages and return one big fuck off page.
// @include        http://boards.4chan.org/b/
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
    var form = $('form[name=delform]');
    for (var i = 1; i <= 15; i++) {
        $.get("http://boards.4chan.org/b/" + i,function(resp){
            var set = $('<div></div>');
            form.prepend(set);
            set.text("page " + i);
            var posts = resp.replace(/[\r\n]/g,' ').match(/<hr> <form name="delform".*<br clear=left><hr>/gi);
            set[0].innerHTML = posts;
        });
    }
}

