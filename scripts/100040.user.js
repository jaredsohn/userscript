// ==UserScript==
// @name           t.sohu
// @namespace      tsohu
// @description    auto visit
// @include        http://t.sohu.com/live
// ==/UserScript==
var gets = function(s){
    return document.querySelectorAll(s);
};
var list = gets("#twitter_container>div>p.twit>b.nm>a");
var num = 0;
var timer = setInterval(function(){
    if(!list[num]){
        clearInterval(timer);
        timer = null;
        location.reload();
    }
    var win = window.open(list[num].href);
    setTimeout(function(){win.close();},2000);
    ++num;
},7000);
