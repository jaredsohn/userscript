// ==UserScript==
// @name         BBS图片大小调整工具
// @namespace    http://t.qq.com/kleinchen
// @version      1.0
// @description  调整OA BBS的图片大小，方便看大图
// @include      http://bbs.oa.com/forum/*
// @Author       kleinchen
// ==/UserScript==

(function(){

    if(typeof(GM_addStyle) == 'undefined'){
        GM_addStyle = function (css) {
            var parent = document.getElementsByTagName('head')[0] || document.documentElement;
            var style = document.createElement('style');
            style.type = 'text/css';
            var textNode = document.createTextNode(css);
            style.appendChild(textNode);
            parent.appendChild(style)
        };
    };

    GM_addStyle('.content img {max-width:700px;}');

})();
