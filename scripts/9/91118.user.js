// ==UserScript==
// @name commpress mixi diary
// @version 0.9.1
// @namespace http://userscripts.org/users/253871
// @description mixi日記から連続する空行を１つにまとめます。
// @include http://mixi.jp/view_diary.pl?*
// ==/UserScript==
(function () {
    var button = document.createElement('button');
    with (button.style) {
        padding = '0px 3px';
        margin = '0px 0px 0px 5px';
        fontWeight = 'bold';
    }
    button.innerHTML = 'compress';
    button.addEventListener('click', function (e) {
        var diary = document.getElementById('diary_body').innerHTML;
        var reg = new RegExp('((<br />|<br>)(\n|\r)){2,}', 'gi');
        document.getElementById('diary_body').innerHTML = diary.replace(reg,'<br />');
    }, false);

    document.getElementsByClassName('listDiaryTitle')[0].getElementsByTagName('dd')[0].appendChild(button);
})();