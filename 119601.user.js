// ==UserScript==
// @name           RemoveOnClick
// @namespace      ledudu
// @description    去除种子下载页的按钮上的跳转函数
// @include        http://*.*down.info/*
// @version        20111203
// ==/UserScript==
(function(){
    //if(window.location.href.indexOf("rmdown.com")!=-1||window.location.href.indexOf("zz1su.info")!=-1){
        var mySpan=document.evaluate('//input[@type="submit"]', document, null, 9, null);
        mySpan.singleNodeValue.removeAttribute("onclick");
    //}
}
());