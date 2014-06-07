// ==UserScript==
// @name Fanfou confirmation before marking
// @version 1.0
// @author HackMyBrain
// @description 在手机版饭否 m.fanfou.com 上收藏消息时弹出确认框，防止在触屏上操作误击
// @include http://m.fanfou.com/*
// @download http://userscripts.org/scripts/show/156343
// ==/UserScript==


(function (){
    var markConfirm = function (e){
        if (e.target.tagName.toLowerCase() == "a" && /\/msg\.favorite\.add\//.test(e.target.href)){
            if (!confirm('是否要收藏此条消息?')){
                e.preventDefault();
            }
        }
    }
    
    window.addEventListener('click', markConfirm, false);
})();