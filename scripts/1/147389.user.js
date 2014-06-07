// ==UserScript==
// @name           Google加密搜索(Google SSL)链接替换
// @namespace      https://plus.google.com/u/0/105378903141101735508
// @version        1.0
// @description    将Google SSL的搜索结果和网页快照的链接替换成HTTPS加密链接，防止撞墙
// @include        https://www.google.*/webhp?*
// @include        https://www.google.*/search?*
// @include        https://encrypted.google.*/webhp?*
// @include        https://encrypted.google.*/search?*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @copyright      2012+, 叶虫
// ==/UserScript==

(function($){
    $('#res a[onmousedown]').live("mousedown", function(){
        var href = this.href;
        if(startsWith(href, "http://www.google.com/url?")){
            href = "https" + href.substr(4);
            this.href = href.replace("http%3A%2F%2Fwebcache.googleusercontent.com", "https%3A%2F%2Fwebcache.googleusercontent.com");
        }else if(startsWith(href, "http://webcache.googleusercontent.com/search?")){  //针对部分用其他脚本取消Google搜索跟踪的用户
            this.href = "https" + href.substr(4);
        }
    });
    
    var startsWith = function(str, n){
        return str.substring(0, n.length) === n;
    };
})(jQuery)