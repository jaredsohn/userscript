// ==UserScript==
// @name           mixi_diary_compressor
// @version        1.0.1
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    mixi日記から空行を取り除きます。
// @include        http://mixi.jp/view_diary.pl?*
// ==/UserScript==
(function () {
    var button = document.createElement('button');
    with (button.style) {
        padding = '0px 3px';
        margin = '0px 0px 0px 5px';
    }
    button.innerHTML = '圧縮';
    button.addEventListener('click', function (e) {
        var diary = document.getElementById('diary_body');
        var contents = diary.childNodes;
        for (var i = 0; i < contents.length; i++) {
            if (contents[i].tagName == 'BR'
            && (i < 1 || contents[i-1].tagName == 'BR'
             || contents[i-1].textContent == '\n' && (i < 2 || contents[i-2].tagName == 'BR'))) {
                contents[i].style.display = 'none';
            }
        }
    }, false);
    document.getElementsByClassName('listDiaryTitle')[0].getElementsByTagName('dd')[0].appendChild(button);
})();
