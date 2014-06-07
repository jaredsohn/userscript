// ==UserScript==
// @name           d_meter_comment_star_sort
// @version        1.2.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Add button to sort comments by the number of stars it received to dokusho meter. / 読書メーターにコメントを星の数順に並び替えるボタンを追加します。
// @include        http://book.akahoshitakuya.com/b*/*
// ==/UserScript==
(function () {
    var button = document.createElement('input');
    button.type = 'button';
    button.className = 'submit';
    button.value = '☆順にソート';
    button.style.cssFloat = 'right';
    button.style.marginLeft = '5px';
    button.addEventListener('click', function (e) {
        e.stopPropagation();
        var nStarsArr = [];
        if (location.href.indexOf('http://book.akahoshitakuya.com/b/')) {
            var container = document.getElementById('main_right').getElementsByClassName('inner')[1];
        } else {
            var container = document.getElementById('book_review_list');
        }
        var starContainers = container.getElementsByClassName('nice_star_list');
        for (var i = -1, stars; stars = starContainers[++i]; ) {
            nStarsArr[i] = [stars.parentNode.parentNode.parentNode, stars.innerHTML.length];
        }
        nStarsArr.sort(function (a, b) {return b[1] - a[1];});
        var entries = [];
        var children = container.childNodes;
        for (var i = -1, s = -1, child; child = children[++i]; ) {
            if (child.nodeType !== 3) {
                if (child.className.indexOf('log_list_box') === -1) {
                    entries.push(child);
                } else {
                    entries.push(nStarsArr[++s][0]);
                }
            }
        }
        for (var i = -1, entry; entry = entries[++i]; ) {
            container.appendChild(entry);
        }
    }, false);
    if (location.href.indexOf('http://book.akahoshitakuya.com/b/')) {
        var container = document.getElementById('main_right').getElementsByClassName('inner')[1];
    } else {
        var container = document.getElementById('book_review_list');
    }
    container.insertBefore(button, container.firstChild);
})();
