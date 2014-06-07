// ==UserScript==
// @name       Youdao wordbook populator
// @version    0.1
// @description  Automatically add looking-up word to wordbook.
// @match      http://dict.youdao.com/search*
// ==/UserScript==

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else {
        $ = unsafeWindow.jQuery;letsJQuery(); }
}
GM_wait();

function letsJQuery() {
    e=$('div.error-wrapper');
    if (e.size() > 0) {return 0;}
    l=$('#wordbook');
    if(!l.hasClass('add_to_wordbook')  && !l.hasClass('remove_from_wordbook')) { window.setTimeout(letsJQuery,100); }
    if(l.hasClass("add_to_wordbook")) {
        var clickEvent  = document.createEvent('MouseEvents');
        clickEvent.initEvent('click', true, true);
        document.getElementById('wordbook').dispatchEvent(clickEvent);
    }
}