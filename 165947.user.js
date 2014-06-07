// --------------------------------------------------------------------
//
// ==UserScript==
// @name          discuz_dewater 
// @namespace     http://abbypan.github.com/
// @version       0.1
// @author        Abby Pan (abbypan@gmail.com)
// @description   Discuz 论坛贴子脱水
// @copyright     2013, Abby Pan (http://abbypan.github.com/) 
// @grant         GM_getResourceText
// @include       *viewthread*
// @include       */thread-*-*-1.html
// @downloadURL   http://userscripts.org/scripts/source/165947.user.js
// @updateURL     http://userscripts.org/scripts/source/165947.meta.js
// @resource      jquery http://code.jquery.com/jquery-latest.min.js
// @resource      discuz_dewater https://raw.github.com/abbypan/discuz_dewater/master/discuz_dewater.js
// @resource      bbs_dewater https://raw.github.com/abbypan/bbs_dewater/master/bbs_dewater.js
// ==/UserScript==
//
// --------------------------------------------------------------------

function add_js_content(text){
    var add = document.createElement('script');
    add.setAttribute('type', "text/javascript");
    add.appendChild(document.createTextNode(text));

    var ins =  document.getElementsByTagName('head')[0] || document.documentElement;
    ins.appendChild(add);
}

function add_js_file(js) {
    var text = GM_getResourceText(js);
    add_js_content(text);
}

(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        add_js_file('jquery');
    }
    GM_wait();
})();

function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        add_js_file('discuz_dewater');
        add_js_file('bbs_dewater');
    }
}

