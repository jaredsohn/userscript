// ==UserScript==
// @name            本やクラブで三重大学附属図書館での所蔵の有無を表示するスクリプト
// @namespace       http://penguinlab.jp/
// @include         http://www.honyaclub.com/*
// ==/UserScript==

(function () {
    "use strict";

    // チェーンを順番に実行していくクラス。
    // http://d.hatena.ne.jp/drgqst/20080110/1199976698
    // より転載。
    function Chain() {
        // コンストラクタ
        this.jobs = [];
        this.container = {};

       // チェーンに GM_xmlhttpRequest の引数を返す関数を追加する。
        this.addRequestFunction = function (f) {
            this.jobs.push({ type: 'request', func: f });
        };

        // チェーンに普通の関数を追加する。
        this.addFunction = function (f) {
            this.jobs.push({ type: 'function', func: f });
        };

        // 先頭のジョブを返す
        this.shift = function () {
            return this.jobs.shift();
        };

        // チェーンを順番に実行して行く。
        this.doChain = function () {
            // 先頭のジョブを取り出す。何もなかったらおしまい。
            var job = this.jobs.shift(), obj;
            if (!job) { return; }

            if (job.type === 'function') {
                // ただの関数ならそのまま実行する。
                job.func.apply(this);
                // 終わったら次のジョブを実行する。
                this.doChain();
            } else if (job.type === 'request') {
                // リクエストだったら GM_xmlhttpRequest のパラメーターをちょっと改ざんして実行する。
                obj  = job.func.apply(this);
                obj.chain = this;
                if (obj.onload) {
                    // onloadを改ざん。関数を実行した後に次のジョブを実行してもらう。
                    obj.$onload = obj.onload;
                    obj.onload = function (response) {
                        obj.$onload.apply(this.chain, [response]);
                        this.chain.doChain();
                    };
                }
                GM_xmlhttpRequest(obj);
            }
        };
    }

    function html_insert_after(element, node) {
        var e = document.createElement('span');
        e.appendChild(element);
        e.setAttribute('class', 'honyaclub_book_in_library');
        if (node.nextSibling !== null) {
            node.parentNode.insertBefore(e, node.nextSibling);
        } else {
            node.parentNode.appendChild(e);
        }
    }

    function search_url(isbn) {
        var
            //検索URL：ISBNの前まで
            searchurl_before = "http://opac.lib.mie-u.ac.jp/cgi-bin/opc/seek.cgi?isbn=",
            //検索URL：ISBNの後
            searchurl_after = "";

        return searchurl_before + isbn + searchurl_after;
    }

    //ヒットした際に挿入するHTMLを生成
    function html_hit(isbn) {
        var content = '<img src="http://www.mie-u.ac.jp/favicon.ico" border="0" />',
            a = document.createElement("a");
        a.setAttribute("href", search_url(isbn));
        a.innerHTML = content;
        return a;
    }

    //ヒットしなかった時に挿入するHTMLを生成
    function html_nohit(isbn) {
        var span = document.createElement("span");
        span.setAttribute("style", "color:red");
        span.textContent = "×";
        return span;
    }

    var
        //ヒットしなかった際に OPAC から返ってくる HTML（正規表現）
        nohitstring = "検索に該当する書誌情報はありませんでした。",
        contents = document.querySelectorAll(".result-item-inner"),
        chain = new Chain(),
        queue = [],
        i, content, matches, isbn;

    for (i = 0; i < contents.length; i += 1) {
        content = contents[i];
        matches = content.textContent.match(/ISBNコード (\d+)/);
        if (!matches) { continue; }
        isbn = matches[1];

        queue.push({
            isbn: isbn,
            html_hit: html_hit(isbn),
            node: content.querySelector(".item-txt dt a")
        });

        chain.addRequestFunction(function () {
            var job = queue.shift();
            return {
                method: "GET",
                url: search_url(job.isbn),
                onload: function (details) {
                    if (details.responseText.match(nohitstring)) {
                        html_insert_after(html_nohit(), job.node);
                    } else {
                        html_insert_after(job.html_hit, job.node);
                    }
                }
            };
        });
    }
    chain.doChain();
}());
