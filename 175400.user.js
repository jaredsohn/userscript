// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==
// @name       百度搜索跳转
// @namespace  cancelpj.cnblogs.com
// @version    1.0
// @description  当访问百度产品页时，默认被重定向到百度搜索首页，此脚本用来抵制重定向。
// @match      http://www.baidu.com/*
// @copyright  2012+, 碟仙
// ==/UserScript==
(function(){
    var debug = 0;
    var path = document.getElementById('warning_url');
    if ( debug > 0 ) {
        alert( path.toString().length+' '+path);
    };
    if ( path.toString().length > 0) path.click();
})();