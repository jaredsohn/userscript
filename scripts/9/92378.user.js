// ==UserScript==
// @name           mixi_diary_whitespaces_keeper
// @version        1.0.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Keep whitespaces in mixi diary. / mixi日記の投稿時に本文の空白文字が消えないようにします。
// @include        http://mixi.jp/add_diary.pl*
// @include        http://mixi.jp/edit_diary.pl*
// ==/UserScript==
(function ($id, $class) {
    var submitButton = $class('formBt01')[0];
    if (submitButton.value != '入力内容を確認する') {
        return;
    }
    var TAB_LENGTH = 4; // tab character length / タブ文字を半角スペース何個として扱うか
    var tabstr = [];
    for (var i = -1, n = TAB_LENGTH; ++i < n; ) {
        tabstr[i] = '&nbsp;';
    }
    tabstr = tabstr.join('');
    var li = document.createElement('li');
    li.innerHTML = '<input id="keep_whitespaces" type="checkbox" checked="checked"/>Keep Whitespaces';
    $class('formButtons01')[0].getElementsByTagName('ul')[0].appendChild(li);
    submitButton.addEventListener('click', function (e) {
        if ($id('keep_whitespaces').checked) {
            var dbody = $id('diaryBody');
            dbody.value = dbody.value
              .replace(/&/g, '&amp;amp;')
                .replace(/^ /mg, '&nbsp;')
                  .replace(/  /g, '&nbsp;&nbsp;')
                    .replace(/\t/g, tabstr);
        }
    }, false);
})(document.getElementById, document.getElementsByClassName);
