// ==UserScript==
// @name        sex8破解浏览数量
// @author    Thunder Bot
// @namespace   local
// @description 打开帖子自动使用。推荐使用浏览器手势，解放另一只手。
// @include     http://www.sex8.cc/read-htm-tid-*.html
// @version     1
// @grant       none
// ==/UserScript==

(function() {
    var d = document.getElementsByClassName('f14')
    if(d){
        try{d.read_tpc.removeAttribute("style");}
        catch(e){}
    }
})();