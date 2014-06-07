// --------------------------------------------------------------------
//
// ==UserScript==
// @name          tieba_dewater 
// @namespace     http://abbypan.github.io/
// @version       0.1
// @author        Abby Pan (abbypan@gmail.com)
// @description   百度贴吧 贴子脱水
// @copyright     2014, Abby Pan (http://abbypan.github.io/) 
// @grant         GM_getResourceText
// @include       http://tieba.baidu.com/*
// @resource      jquery http://code.jquery.com/jquery-latest.min.js
// @resource      tieba_dewater https://raw.github.com/abbypan/tieba_dewater/master/tieba_dewater.js
// @resource      bbs_dewater https://raw.github.com/abbypan/bbs_dewater/master/bbs_dewater.js
// @downloadURL   http://userscripts.org/scripts/source/443517.user.js
// @updateURL     http://userscripts.org/scripts/source/443517.meta.js
// ==/UserScript==
//
// --------------------------------------------------------------------

function add_js_file(js) {
    var text = GM_getResourceText(js);
    
    var add = document.createElement('script');
    add.setAttribute('type', "text/javascript");
    add.appendChild(document.createTextNode(text));

    var ins =  document.getElementsByTagName('head')[0] || document.documentElement;
    ins.appendChild(add);
}


// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        add_js_file('tieba_dewater');
        add_js_file('bbs_dewater');
    }
}

// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        add_js_file('jquery');
    }
    GM_wait();
})();

