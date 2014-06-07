// ==UserScript==
// @name           enclose_query_on_google_search
// @version        1.0.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Add button to enclose search query in double quotation marks. / 検索文字列をダブルクオートで囲むためのボタンを付けます。
// @include        http://www.google.com/search?*
// @include        http://www.google.co.jp/search?*
// ==/UserScript==
(function () {
    var lst = document.getElementsByName('q')[0];
    var button = document.createElement('button');
    with (button.style) {
        border = 'none';
        MozBorderRadius = '6px';
        WebkitBorderRadius = '6px';
        padding = '0px 3px';
        margin = '0px 0px 0px 5px';
        background = '#DDDDDD';
    }
    button.innerHTML = 'enclose';
    button.addEventListener('click', function (e) {
        lst.value = '"' + lst.value + '"';
        e.preventDefault();
    }, false);
    document.getElementById('subform_ctrl').firstChild.appendChild(button);
})();
