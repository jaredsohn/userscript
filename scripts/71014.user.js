// ==UserScript==
// @name           pixiv_comment_histories_opener
// @version        1.0.2
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Open comment histories from the start on pixiv. / pixivでイラストのコメント履歴を最初から開いておきます。
// @include        http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// ==/UserScript==
(function () {
    var iid = document.getElementById('rpc_i_id').innerHTML;
    var uid = document.getElementById('rpc_u_id').innerHTML;
    var request = new XMLHttpRequest();
    request.open('POST', './rpc_comment_history.php');
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var oca = document.getElementById('one_comment_area');
            oca.innerHTML = request.responseText;
            oca.style.display = '';
            oca.style.overflow = 'visible';
            document.getElementById('one_comment_view').style.display = 'none';
            document.getElementById('one_comment_view2').style.display = '';
        }
    };
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send('i_id=' + iid + '&u_id=' + uid);
})();
