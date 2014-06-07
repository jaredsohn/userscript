// ==UserScript==
// @name           sort_hatena_diary_categories
// @version        1.0.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Sort categories alphabetically on Hatena Diary. / はてなダイアリーのカテゴリーを名前順にソートします。
// @include        http://d.hatena.ne.jp/*/configedit
// ==/UserScript==
(function () {
    var ct = document.getElementsByName('categories')[0];
    var button = document.createElement('button');
    button.innerHTML = 'Sort';
    button.addEventListener('click', function (e) {
        ct.value = ct.value.split('\n').filter(function (e) {return e.length;}).sort().join('\n');
        e.preventDefault();
    }, false);
    var ctTitle = ct.parentNode.parentNode.getElementsByTagName('h3')[0];
    ctTitle.appendChild(button);
})();
