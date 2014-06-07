// ==UserScript==
// @name                GDaJie ed2k link revealer
// @namespace           http://use.i.E.your.homepage/
// @version             0.1
// @downloadURL         http://userscripts.org/scripts/source/485581.user.js
// @updateURL           http://userscripts.org/scripts/source/485581.meta.js
// @description         there is no black magic
// @match               http://www.verycd.gdajie.com/detail.htm*
// @copyright           2014+, Ya Zhuang
// ==/UserScript==
document.getElementById('detail').style.display = 'block' ;
document.getElementById('predetail').style.display = 'none' ;

function kill(who) {
    var i, l;
    var target = document.querySelectorAll(who);
    for (i = 0, l = target.length; i < l; i++) {
        if (target[i].parentNode) {
            target[i].parentNode.removeChild(target[i]);
        }
    }
}


kill('#cproIframe2002holder');
kill('#cproIframe2001holder');
kill('iframe');
