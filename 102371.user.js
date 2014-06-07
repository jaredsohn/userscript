// ==UserScript==
// @name           Nico Search History
// @namespace      http://efcl.info/
// @description    ニコニコ動画の検索履歴を保存する
// @include        http://www.nicovideo.jp/tag/*
// @include        http://www.nicovideo.jp/search/*
// ==/UserScript==
function Sandbox() {
    // 引数は配列argsに変換
    var args = Array.prototype.slice.call(arguments),
        // 配列の最後はコールバック関数なので取り出す
            callback = args.pop(),
        // Sandbox(["A","B"],callback) or Sandbox("A","B",callback) どちらでも可能なように
            modules = (args[0] && typeof args[0] === "string") ? args : args[0];
    // newを付けないで呼ばれたときにコンストラクタとして呼び直す
    if (!(this instanceof Sandbox)) {
        return new Sandbox(modules, callback);
    }
    // now add modules to the core `this` object
    // moduleがない=パラメータレス or *を指定したときは全てのモジュールを使う
    if (!modules || modules === '*') {
        modules = [];
        for (i in Sandbox.modules) {
            if (Sandbox.modules.hasOwnProperty(i)) {
                modules.push(i);
            }
        }
    }
    // 必要なモジュールの初期化
    for (var i = 0,len = modules.length; i < len; i++) {
        Sandbox.modules[modules[i]](this);
    }
    // Sandboxのコールバック(処理本体)を呼ぶ
    callback(this);
}
Sandbox.modules = {};
// すべてのprototypeプロパティとして必要部分
// モジュール内からならbox.constructor.prototypeって書いたやつと同じ
Sandbox.prototype = {
    name: "Nico Search History",
    version: "1.0",
    getName: function () {
        return this.name;
    }
};
Sandbox.add = function(name, method) {
    Sandbox.modules[name] = method;
    return this;// メソッドチェーン用
};
// 最近の履歴をローカル内で作る
Sandbox.add("history", (function() {
    function history() {
        this.initialize.apply(this, arguments);
    }

    history.prototype = {
        initialize: function(name, limit) {
            this.name = name;
            this.limit = limit;
            this.value = this.load() || [];
        },
        save :function(v) {
            v && GM_setValue(this.name, JSON.stringify(v));
        },
        load :function() {
            var v = GM_getValue(this.name, null);
            if (v) {
                return JSON.parse(v);
            } else {
                return false;
            }
        },
        // keyをvalueにpush
        record :function(key) {
            this.value.push(key);
            if (this.value && this.value.length > this.limit) {
                this.value.shift();
            }
            this.save(this.value);
        },
        // keyに一致するものを削除
        remove : function(key) {
            var idx = this.value.indexOf(key);
            this.value.splice(idx, 1);
            this.save(this.value);
        },
        // idx番目のkeyを移動
        moveheadinAry : function (idx, ary) {
            return ary.push(ary.splice(idx, 1)[0]);
        },
        // 同じものが既にあるかどうか
        checkIfExist :function(target) {
            var that = this;
            if (this.value) {
                return this.value.some(function(val, idx, ary) {
                    // 既にあったら先頭に入れ替える
                    if (val === target) {
                        // console.log(idx-1, ary, ary[idx]);
                        that.moveheadinAry(idx, ary)
                        that.save(ary);
                        return true;
                    }
                });
            }
        }
    };
    return function(box) {
        box.history = history;
    }
})());
// テンプレートモジュール
Sandbox.add("templete", function(box) {
    box.aryToList = function(searchAry, mode) {
        return array2list(searchAry, mode);
    };
    // array to li
    function array2list(array, mode) {
        if (array.length < 1) return;
        var doc = document;
        var list = doc.createElement('ul'), li;
        list.className = "GM_search_key";
        Sandbox("history", function(box) {
            delegation(list, "GM_history_register", "click", function(evt) {
                var tar = evt.target,
                        tarKeys = JSON.parse(tar.dataset.GM_history_register),
                        page = tarKeys.page,
                        query = tarKeys.query,
                        searchKey = page + " " + query;// 種類 検索単語の+区切り
                tar["textContent" || "innerText"] = (mode === "fav") ? "☆" : "★";
                var searchFav = new box.history("fav", 100);
                // favの★なら削除、searchの☆ならFavにaddする
                if (mode === "fav") {
                    searchFav.remove(searchKey);
                } else {
                    if (!searchFav.checkIfExist(searchKey)) {
                        searchFav.record(searchKey);
                    }
                }
            });
        });
        for (var i = array.length - 1; i >= 0; i--) {
            var item = array[i];
            var itemType = Object.prototype.toString.call(item);
            if (itemType === '[object Array]') {
                if (!li) li = list.appendChild(doc.createElement('li'));
                li.appendChild(arguments.callee(item, ordered, doc));
            } else {
                li = list.appendChild(doc.createElement('li'));
                if (itemType === '[object Number]') item = String(item);
                else if (itemType === '[object String]') item = searchKeyTolink(item, mode);
                li.appendChild(item);
            }
        }
        return list;
    }

    function delegation(ele, className, evtType, callback) {
        ele.addEventListener(evtType, function(evt) {
            if (evt.target.classList.contains(className)) {
                evt.preventDefault();
                callback(evt);
            }
        }, true);
    }

    function searchKeyTolink(searchKey, mode) {
        var searchKey = searchKey.split(" "),
                page = searchKey[0],
                query = searchKey[1];
        var linkGroup = document.createDocumentFragment();
        var a = document.createElement("a");
        a.href = "http://www.nicovideo.jp/" + page + "/" + query;
        a["textContent" || "innerText"] = decodeURIComponent(query);
        var starBt = document.createElement("a");
        starBt["textContent" || "innerText"] = (mode === "fav") ? "★" : "☆";
        starBt.className = "GM_history_register";
        starBt.dataset.GM_history_register = JSON.stringify({
            page : page,
            query: query
        });
        linkGroup.appendChild(starBt);
        linkGroup.appendChild(a);
        return linkGroup;
    }
});
// 検索履歴の保存
Sandbox("history", function(box) {
    var searchHistory = new box.history("search", 100),
            historyAry = searchHistory.value;
    var searchFav = new box.history("fav", 100),
            favAry = searchFav.value;
    //log(favAry);
    var locationPathname = location.pathname.split("/"),
            page = locationPathname[1],
            query = locationPathname[2].replace(/\s/g, "+") + location.search,
            searchKey = page + " " + query;// 種類 検索単語の+区切り
    // 検索キーの保存
    if (!searchHistory.checkIfExist(searchKey)) {
        searchHistory.record(searchKey);
    }
    Sandbox("templete", function(box) {
        var listTagHistory = box.aryToList(historyAry, "search"),
                listTagFav = box.aryToList(favAry, "fav");
        log(listTagHistory, listTagFav);
        var div = document.createElement("div");
        div.id = "GM_search_history_window";
        listTagFav && div.appendChild(listTagFav);
        listTagHistory && div.appendChild(listTagHistory);
        var refresh = document.createElement("a");
        refresh["textContent" || "innerText"] = "検索履歴";
        refresh.id = "GM_search_history_button";
        refresh.addEventListener("click", function(evt) {
            evt.preventDefault();
            if (div.style.display == "block") {
                div.style.display = "none";
            } else {
                div.style.display = "block";
            }
        }, false);
        // スタイルの追加
        addCSS();
        document.body.appendChild(refresh);
        document.body.appendChild(div);
        function addCSS() {
            GM_addStyle(['',
'            #GM_search_history_button {',
'                cursor:default;',
'                position: absolute;',
'                overflow: auto;',
'                top: 30px;',
'                right: 0;',
'                background: #FFFFFF url(/img/bg.png) repeat-x scroll 0 0;',
'                -moz-border-radius: 0 0 0 8px;',
'                display: block;',
'                width: 5em;',
'                color: #FFF;',
'                text-decoration: none;',
'                cursor: pointer;',
'                padding: 4px;',
'                opacity: 0.8;',
'                z-index: 10000;',
'            }',
'            #GM_search_history_window {',
'                display: none;',
'                max-height: 300px;',
'                width:300px;',
'                overflow-y: scroll;',
'                overflow-x: hidden;',
'                border: 1px dotted;',
'                padding: 5px 15px 5px 5px;',
'                background-color: #fff;',
'                position: absolute;',
'                top: 55px;',
'                left: 750px;',
'                z-index: 1;',
'            }',
'            ul.GM_search_key{',
'                list-style: none outside none;',
'                padding: 3px 10px;',
'                white-space:nowrap;',
'            }',
'            ul.GM_search_key > li{',
'                 margin: 1px 0;',
'                 line-height:120%;',
'            }',
''].join("\n"));
        }
    })
});

function log(m) {
    var w = this.unsafeWindow || window;
    w.console && w.console.log.apply(this, arguments);
}