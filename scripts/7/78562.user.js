// ==UserScript==
// @name            SCPJでのISSN検索文字列正規化
// @namespace       http://penguinlab.jp/
// @include         http://scpj.tulips.tsukuba.ac.jp/
// ==/UserScript==

(function () {
    var i, j, fs, is, onsubmit, keyword, zenkakunum2hankakunum = function (zenkakunum) {
        var z, h, i, r;
        z = [/０/g, /１/g, /２/g, /３/g, /４/g, /５/g, /６/g, /７/g, /８/g, /９/g, /ｘ/g, /Ｘ/g];
        h = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'X', 'X'];
        r = zenkakunum;
        for (i = 0; i < z.length; i += 1) {
            r = r.replace(z[i], h[i]);
        }
        return r;
    };

    fs = document.getElementsByTagName('form');
    for (i = 0; i < fs.length; i += 1) {
        if (fs[i].getAttribute('action') === 'search/journal') {
            onsubmit = (function () {
                is = fs[i].getElementsByTagName('input');
                return function () {
                    for (j = 0; j < is.length; j += 1) {
                        if (is[j].getAttribute('name') === 'keyword') {
                            keyword = is[j].value;
                            keyword = zenkakunum2hankakunum(keyword);
                            keyword = keyword.replace(/^[ 　\t\r\n]*(\d\d\d\d)[ 　\t\r\n]*[\-－ー][ 　\t\r\n]*(\d\d\d[\dX])[ 　\t\r\n]*$/, "$1$2");
                            is[j].value = keyword;
                        }
                    }
                };
            }());
            fs[i].addEventListener('submit', onsubmit, false);
            return;
        }
    }
}());