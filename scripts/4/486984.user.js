// --------------------------------------------------------------------
//
// ==UserScript==
// @name          ljj_dewater 
// @namespace     http://abbypan.github.io/
// @version       0.1
// @author        Abby Pan (abbypan@gmail.com)
// @description   绿晋江( http://www.jjwxc.net ) 小说合集
// @copyright     2014, Abby Pan (http://abbypan.github.io/) 
// @grant         GM_getResourceText
// @include       http://www.jjwxc.net/onebook.php?novelid=*
// @exclude       http://www.jjwxc.net/onebook.php?*chapterid=*
// @resource      bbs_dewater https://raw.github.com/abbypan/bbs_dewater/master/bbs_dewater.js
// @resource      ljj_dewater https://raw.github.com/abbypan/ljj_dewater/master/ljj_dewater.js
// @downloadURL   http://userscripts.org/scripts/source/486984.user.js
// @updateURL     http://userscripts.org/scripts/source/486984.meta.js
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
        add_js_file('ljj_dewater');
        add_js_file('bbs_dewater');
    }
}

(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        //ljj has jquery
        //add_js_file('jquery');
    }
    GM_wait();
})();
