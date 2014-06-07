// ==UserScript==
// @name            CHDBits Auto Thanks
// @namespace       http://rainux.org/
// @description     浏览 CHDBits.org 资源详情页面时使用 AJAX 方式在后台自动感谢发布者。
// @include         http://chdbits.org/details.php*
// ==/UserScript==

(function() {
    document.getElementById('saythanks').click();
}
)();
