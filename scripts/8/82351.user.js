// ==UserScript==
// @name           pixiv_color_author_comments
// @version        1.0.1
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Color illust author's name on comments on pixiv. / pixivのコメント欄で描いた人の名前を色付けします。
// @include        http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// ==/UserScript==
(function () {
    var oid = document.getElementById('rpc_u_id').innerHTML;
    var color = function (node) {
        var link = node.getElementsByTagName('a')[0];
        if (link.href.split('=').pop() == oid) {
            link.style.color = '#FF0000';
        }
    };
    document.addEventListener('DOMNodeInserted', function (e) {
        if (e.target.className == 'worksComment') {
            color(e.target);
        }
    }, false);
    var comments = document.getElementsByClassName('worksComment');
    for (var i = 0; i < comments.length; i++) {
        color(comments[i]);
    }
})();
