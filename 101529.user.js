// ==UserScript==
// @name           fanfou-float-message
// @namespace      fanfou
// @include        http://fanfou.com/home
// @include        http://fanfou.com/home?*
// @include        http://fanfou.com/replies
// @include        http://fanfou.com/replies?*
// @include        http://fanfou.com/mentions
// @include        http://fanfou.com/mentions?*
// ==/UserScript==

(function() {
    var $i = function(id) { return document.getElementById(id); };
    var $main = $i('main');
    var $update = $i('update');
    var ud_top = -10;
    for (var $p = $update; $p && $p.offsetParent; $p = $p.offsetParent)
        ud_top += $p.offsetTop;
    var ud_height = $update.offsetHeight;
    window.addEventListener('scroll', function() {
        if (window.scrollY > ud_top) {
            $update.style.position = 'fixed';
            $update.style.top = '0px';
            $update.style.zIndex = 100;
            $update.style.background = '#fff';
            $update.style.borderBottom = '1px dashed #ddd';
            $update.style.padding = '10px 0';
            $main.style.paddingTop = (ud_height + 20) + 'px';
        } else {
            $update.style.position = 'static';
            $update.style.borderBottom = '0';
            $update.style.padding = '0';
            $main.style.paddingTop = '20px';
        }
    }, false);
})();