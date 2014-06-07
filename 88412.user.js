// ==UserScript==
// @name           convert_CiteSeer_pdf_links_on_Google
// @version        1.0.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Convert CiteSeer pdf file links into summary pages on Google search results. / Google検索結果内のCiteSeerのpdfファイルへのリンクをSummaryページへ置き換えます。
// @include        http://www.google.com/search?*
// @include        http://www.google.co.jp/search?*
// ==/UserScript==
(function () {
    var links = document.getElementsByClassName('l');
    for (var i = 0; i <links.length; i++) {
        var url = links[i].href;
        if (!url.indexOf('http://citeseerx.ist.psu.edu/viewdoc/download?')) {
            var doi = url.split('?')[1].split('&')[0].split('=')[1];
            links[i].href = 'http://citeseerx.ist.psu.edu/viewdoc/summary?doi=' + doi;
        }
    }
})();
