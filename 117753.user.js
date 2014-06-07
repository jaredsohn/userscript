// ==UserScript==
// @name           fanfou_badchild
// @namespace      fanfou_badchild
// @include        http://fanfou.com/*
// ==/UserScript==
// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();


// *** put your code inside letsJQuery: ***
function letsJQuery() {
    var delaytime = 5000;
    setInterval(function(){bed_child()}, delaytime);
}

function bed_child() {
    var methods = $(".method");
    methods.each(function(){
        method = $(this);
        var result = method.text().indexOf("按时吃饭");
        if (result !== -1) {
            method.parent().parent().hide();
        }
    });
}
