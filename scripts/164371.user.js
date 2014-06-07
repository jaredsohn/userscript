// ==UserScript==
// @name           DCURLRewriter
// @description    This script fixes download problem in dcinside.com
// @date           4/7/2013
// @author         BerrkeSY
// @include        http://gall.dcinside.com/*no=*
// @include        http://gall*.dcinside.com/*no=*
// ==/UserScript==

window.addEventListener('DOMContentLoaded',function(){
    var links = document.evaluate("//a[contains(@href,'image.dcinside.com/download.php')]",document,null,6,null);
    var link_dl, link_vi;
    var re_dl = /^http:\/\/image.dcinside.com\/download.php[?](.*)/;
    var re_vi = "http://dcimg1.dcinside.com/viewimage.php?$1";
    for(var i=0; i<links.snapshotLength; ++i) {
        link_dl = links.snapshotItem(i);
        link_vi = link_dl.href.replace(re_dl, re_vi);
        link_dl.removeAttribute('href');
        link_dl.setAttribute('href', link_vi);
    }
},0);