// ==UserScript==
// @name           enlarge_it_chan
// @namespace      madin.jp
// @description    Enlarge IT-chan icons
// @include        http://www.itmedia.co.jp/news/*
// ==/UserScript==

(function(){
    var regexp = new RegExp('(^.*/news/articles/\d+/\d+)(news\d+\.gif$)');
    var icons = document.getElementsByTagName('IMG');
    for (var index = 0, length = icons.length; index < length; index ++) {
        var icon = icons[index];
        if (regexp.test(icon.src)) {
            icon.src = RegExp.$1 + 'top_' + RegExp.$2;
            icon.style.width = '120px';
            icon.style.height = '90px';
        }
    }
})();