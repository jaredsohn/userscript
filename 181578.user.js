// ==UserScript==
// @name        Google url replace
// @namespace   com.bugxm
// @description 点击谷歌搜索结果链接会先被提交到谷歌，再由谷歌请求指定URL，这个转发过程中可能因敏感关键词而被屏蔽无法完成请求。而本脚本正好能解决这个问题。
// @include     http*://www.google.*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     www.bugxm.com 1.0
// @grant       none
// ==/UserScript==
(function($){
    $('#search a').live("mouseover", function(){
        $(this).removeAttr("onmousedown");
    });
})(jQuery)