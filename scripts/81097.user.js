// ==UserScript==
// @name           mixi diary link replacer
// @namespace      relaxedcolumn.blog8.fc2.com
// @description    外部日記のリンクを直接リンクにする
// @include        http://mixi.jp/*
// ==/UserScript==
Array.slice(
    document.querySelectorAll('a[href^="view_diary.pl?url="]')
).forEach(function(node) {
    if(node.href.match(/view_diary\.pl\?url=(.+)&/))
        node.href = decodeURIComponent(RegExp.$1);
});
