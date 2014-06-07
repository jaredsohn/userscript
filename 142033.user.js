// ==UserScript==
// @name         巴哈姆特哈拉開圖器
// @namespace    http://akr.tw/
// @description  直接顯示巴哈姆特哈啦區文章的圖片和影片。跳過站外連結警告。
// @author       akiratw
// @version      1.1
// @license      MIT License
// @include      http://forum.gamer.com.tw/*
// ==/UserScript==

var displayImage = function () {
    var links = document.querySelectorAll('a.T3_red'),
        regex = /(\.gif|\.jpg|\.jpeg|\.png|\.bmp)/i;

    for (var i = links.length - 1; i >= 0; i--) {
        var link = links[i],
            src = link.getAttribute('id');

        if (regex.test(src)) {
            link.innerHTML = '<img src="' + src + '" />';
        }
    }
}();

var displayYouTube = function () {
    var links = document.querySelectorAll('a.T3_red'),
        regex = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/i;

    for (var i = links.length - 1; i >= 0; i--) {
        var link = links[i],
            url = link.getAttribute('href'),
            matches = url.match(regex);

        if (matches) {
            url = 'http://www.youtube.com/embed/' + matches[1];
            var iframe = document.createElement('iframe');
            iframe.setAttribute('width', '560');
            iframe.setAttribute('height', '315');
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.setAttribute('src', url);
            link.parentNode.insertBefore(iframe, link.nextSibling);
        }
    }
}();

var redirectLinks = function () {
    var links = document.querySelectorAll('a'),
        regex = /.*redir\.php\?url=(.+)/i;

    for (var i = links.length - 1; i >= 0; i--) {
        var link = links[i],
            url = link.getAttribute('href');

        if (regex.test(url)) {
            link.setAttribute(
                'href',
                decodeURIComponent(url.replace(regex, '$1'))
            );
        }
    }
}();