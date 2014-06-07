// ==UserScript==
// @name           Baidu Tieba auto get gift
// @namespace      http://m13253.blogspot.com/
// @author         Star Brilliant <m13253@hotmail.com>
// @description    Automatic get gifts on Baidu Tieba
// @include        http://tieba.baidu.com/*
// @copyright      General Public License version 3
// @warranty       No warranty, use at your own risk
// @grant          none
// ==/UserScript==

function _open_rand_gift() {
    var a = document.getElementsByClassName("rand_gift");
    if(a.length>0)
        for(i in a)
            if(a[i].style && a[i].style.display!="none") {
                try {
                    a[i].click();
                } catch(e) {
                }
                console.log("Opened an Easter egg gift.");
            }
}

function _open_time_gift() {
    var a = document.getElementsByClassName("time_gift unopen_gift");
    if(a.length>0)
        for(i in a)
            if(a[i].style && a[i].style.display!="none") {
                try {
                    a[i].click();
                } catch(e) {
                }
                console.log("Opened an online time reward gift.");
            }
    setTimeout(_open_time_gift, 5000+Math.random()*5000);
}

setTimeout(_open_rand_gift, 5000+Math.random()*5000);
setTimeout(_open_time_gift, 5000+Math.random()*5000);
