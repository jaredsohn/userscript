// --------------------------------------------------------------------
//
// ==UserScript==
// @name          hjj_thread_dewater 
// @namespace     http://abbypan.github.com/
// @version       0.2
// @author        Abby Pan (abbypan@gmail.com)
// @description   红晋江( http://bbs.jjwxc.net ) 贴子脱水
// @copyright     2013, Abby Pan (http://abbypan.github.com/) 
// @grant         GM_getResourceText
// @include       http://bbs.jjwxc.net/showmsg.php?board=*&id=*
// @downloadURL   http://userscripts.org/scripts/source/173233.user.js
// @updateURL     http://userscripts.org/scripts/source/173233.meta.js
// @resource      hjj_thread_dewater https://raw.github.com/abbypan/hjj_thread_dewater/master/hjj_thread_dewater.js
// @resource      bbs_dewater https://raw.github.com/abbypan/bbs_dewater/master/bbs_dewater.js
// ==/UserScript==
//
// --------------------------------------------------------------------



function add_js_file(js) {
    var text = GM_getResourceText(js);

    var add = document.createElement('script');
    add.setAttribute('type', "text/javascript");
    add.appendChild(document.createTextNode(text));

    document.getElementsByTagName('head')[0].appendChild(add);
}

function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        add_js_file('hjj_thread_dewater');
        add_js_file('bbs_dewater');
    }
}

(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        //hjj has jquery
        //add_js_file('jquery');
    }
    GM_wait();
})();
