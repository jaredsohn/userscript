// ==UserScript==
// @name           Hide someone
// @description    Hide someone
// @author         hxgdzyuyi fork from Xupeng (https://gist.github.com/2728385)
// @include        http://www.douban.com/ 
// @version        1.3
// @run-at         document-start
// ==/UserScript==

function replaceDoubanCai(){
    if(document.cookie.indexOf('ck') === -1){
        return;
    }
    var referrer = document.referrer;
    if(referrer === 'http://www.douban.com/' || referrer === '' || referrer.indexOf('accounts/login') !== -1 ) {
        window.location.replace('http://www.douban.com/update/');
    }
}
replaceDoubanCai();