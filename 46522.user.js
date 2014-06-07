// ==UserScript==
// @name            本やクラブ選書ヘルパー
// @namespace       http://penguinlab.jp/
// @include         http://www.honyaclub.com/*
// ==/UserScript==

(function () {
    "use strict";
    function html_insert_after(html, node) {
        var e = document.createElement('span');
        e.innerHTML = html;
        e.setAttribute('class', 'honyaclub-bibliography');
        if (node.nextSibling !== null) {
            node.parentNode.insertBefore(e, node.nextSibling);
        } else {
            node.parentNode.appendChild(e);
        }
    }

    function strip(string) {
        return string.replace(/^\s*/m, "").replace(/\s*$/, "");
    }

    function build_html(bib) {
        var output = bib.title + "\t" + bib.subtitle + "\t" + bib.authors.join("; ") + "\t" + bib.publisher + "\t" + bib.isbn + "\t" + bib.price;
        return '<form style="margin-top:10px"><textarea onfocus="this.select();" style="width:100%;line-height:1.2em;font-size:small;font-family:sans-serif;">' + output + '</textarea></form>';
    }

    var contents, content, bib, i, j, s, elements, matches;

    contents = document.querySelectorAll(".result-item-inner");

    for (i = 0; i < contents.length; i += 1) {
        content = contents[i];
        bib = {};

        // タイトル
        bib.title = strip(content.querySelector(".item-txt dt").textContent);

        // 出版者・出版日・ISBN
        s = strip(content.querySelector(".item-release").textContent);
        bib.publisher = strip(s.split("\n")[0]);
        if (matches = s.match(/【(\d+)年(\d+)月発売】/)) {
            bib.pubdate = matches[1] + matches[2];
        }
        if (matches = s.match(/ISBNコード (\d+)/)) {
            bib.isbn = matches[1];
        }

        // シリーズ名・副題
        bib.subtitle = strip(content.querySelector(".item-info").textContent).replace(/\s+/, " ");

        // 著者名
        bib.authors = [];
        elements = content.querySelectorAll(".item-txt > dd > p")[1].querySelectorAll("a");
        for (j = 0; j < elements.length; j += 1) {
            bib.authors.push(strip(elements[j].textContent));
        }

        // 価格
        if (matches = content.querySelector(".item-price").textContent.match(/価格：([\d,]+)円/)) {
            bib.price = matches[1].replace(/,/g, "");
        }

        html_insert_after(build_html(bib), content.querySelector(".bt-spacing"));
    }
}());
