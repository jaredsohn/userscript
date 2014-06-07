// ==UserScript==
// @name           pixiv_add_user_tag_page_links
// @version        1.0.1
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    pixivのイラストの登録タグ一覧に、描いたユーザの各タグページへのリンクを追加します。
// @include        http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// ==/UserScript==
(function () {
    var protoA = document.createElement('a');
    protoA.innerHTML = '(UT)';
    var space = document.createTextNode(' ');
    var uid = document.getElementsByClassName('avatar_m')[0].href.split('?').pop();
    var imgs = document.getElementById('tags').getElementsByTagName('img');
    for (var i = 0; i < imgs.length; i++) {
        var dictNode = imgs[i].parentNode;
        var tag = dictNode.href.split('/').pop();
        var a = protoA.cloneNode(true);
        a.href = 'member_illust.php?' + uid + '&' + 'tag=' + tag;
        dictNode.parentNode.insertBefore(a, dictNode);
        dictNode.parentNode.insertBefore(space.cloneNode(true), dictNode);
    }
})();
