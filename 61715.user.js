// ==UserScript==
// @name GoogleIncSearch
// @namespace http://d.hatena.ne.jp/mollifier/
// @description  Search incrementally in Google
// @include http://www.google.co.jp/search?*
// @include http://www.google.com/search?*
// ==/UserScript==
//
// auther : mollifier http://d.hatena.ne.jp/mollifier/
// version : 0.0.1
//
// GoogleIncSearch is released under the MIT License.
// http://www.opensource.org/licenses/mit-license.php

(function() {
  // 設定値
  var Config = {
    // 入力値の変化をチェックする時間(msec)
    // キー入力を開始してからこの間だけ
    // 値が変わったかどうかを周期的にチェックする
    valueChangeCheckTime : 4000,

    // テキストボックスの入力値の変化をチェックする間隔(msec)
    checkInterval : 300
  };

  // ユーティリティ関数
  var Utils = {
    createHTMLDocument : function(source) {
      var XHTML_NS = 'http://www.w3.org/1999/xhtml';
      var doctype = document.implementation.createDocumentType('html',
        '-//W3C//DTD HTML 4.01//EN', 'http://www.w3.org/TR/html4/strict.dtd');
      var doc = document.implementation.createDocument(XHTML_NS, 'html', doctype);
      var range = document.createRange();
      range.selectNodeContents(document.documentElement);
      var content = doc.adoptNode(range.createContextualFragment(source));
      doc.documentElement.appendChild(content);
      return doc;
    },

    trim : function(text) {
      return text.replace(/^\s+/, "").replace(/\s+$/, "");
    },

    replaceNode : function(oldNode, newNode) {
        oldNode.parentNode.replaceChild(newNode, oldNode);
    },

    // キャッシュオブジェクトを作成する
    createCache : function() {
      var data = {};

      return {
        // キャッシュのデータを取得する
        // キャッシュにない場合は null を返す
        get : function(key) {
          var ret = null;
          if (data.hasOwnProperty(key)) {
            ret = data[key];
          }
          return ret;
        },

        // キャッシュに値を設定する
        set : function(key, value) {
          data[key] = value;
        }
      };
    }

  };

  // 現在の検索状態
  var searchState = function(initialQuery) {
    var requestCount = 0;
    var currentQuery = Utils.trim(initialQuery);
    var oldQuery = "";

    return {
      getCurrentQuery : function() {
        return currentQuery;
      },

      // @return : 設定値が変更された場合 true
      //           そうでない場合 false
      setCurrentQuery : function(q) {
        var ret = false;
        var query = Utils.trim(q);

        if (query !== "" && query !== currentQuery) {
          oldQuery = currentQuery;
          currentQuery = query;

          ret = true;
        }

        return ret;
      },

      startSearching : function() {
        requestCount++;
      },
      stopSearching : function() {
        // requestCount が負の値にならないようにする
        if (requestCount > 0) {
          requestCount--;
        }
      },
      isSearching : function() {
        return requestCount > 0;
      }
    };
  };

  // 検索語句を入力するテキストボックス
  var box = document.getElementsByName("q")[0];
  // 検索結果の統計情報
  var stats = document.getElementById("resultStats");
  // 検索結果の内容
  var container = document.getElementById("res");

  // 検索結果のキャッシュ
  // 以下の構造のオブジェクトである
  // {stats : 検索結果の統計情報, container : 検索結果の内容}
  // document.importNode でインポート済みのノードを格納する
  var cache = Utils.createCache();
  var state = searchState(box.value);

  cache.set(state.getCurrentQuery(),
            {stats : stats, container : container});

  var initIncSearch = function() {
    // 2回初期化されないようにするために
    // すぐにイベントハンドラを削除する
    box.removeEventListener("keyup", initIncSearch, false);

    var doIncSearch = function() {
      var queryChanged = state.setCurrentQuery(box.value);

      if (! queryChanged) {
        return;
      }

      var cacheData = cache.get(state.getCurrentQuery());

      if (cacheData) {
        // キャッシュにデータがある場合
        Utils.replaceNode(stats, cacheData.stats);
        Utils.replaceNode(container, cacheData.container);

        stats = cacheData.stats;
        container = cacheData.container;
      } else {
        // キャッシュにデータがない場合
        var url = location.protocol + "//" + location.host + "/search?q=" + state.getCurrentQuery();

        (function(query) {
          state.startSearching();
          //console.log("send request : url = %s", url);
          GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: function(res) {
              state.stopSearching();

              var doc =  Utils.createHTMLDocument(res.responseText);

              var tempStats = doc.getElementById("resultStats");
              var tempContainer = doc.getElementById("res");

              var responseData = {
                stats : document.importNode(tempStats, true),
                container : document.importNode(tempContainer, true)
              };
              cache.set(query, responseData);

              var addData = {stats : null, container : null};
              if (state.isSearching()) {
                // 別のリクエストを送信して結果待ちである場合
                addData.container = document.createElement("p");
                addData.container.id = "res";
                addData.container.appendChild(document.createTextNode("loading ..."));
                // stats(統計情報) には何も表示しない
              } else {
                // 結果待ちリクエストがない場合
                addData.stats = responseData.stats;
                addData.container = responseData.container;
              }

              if (addData.stats) {
                Utils.replaceNode(stats, addData.stats);
                stats = addData.stats;
              }

              Utils.replaceNode(container, addData.container);
              container = addData.container;
            }
          });
        })(state.getCurrentQuery());

      }

    };

    // Config.valueChangeCheckTime の間、
    // 定期的にテキストボックスの内容を監視してクエリを送信する

    // キーを入力した瞬間からインクリメンタル検索を開始する。
    // setInterval では Config.checkInterval 経過した後でないと
    // 最初の1回目の doIncSearch() が呼び出されないため、
    // 明示的に doIncSearch を呼び出す。
    doIncSearch();
    var intervalId = window.setInterval(doIncSearch, Config.checkInterval);

    window.setTimeout(function() {
      window.clearTimeout(intervalId);
      // テキストボックスの内容は変化したにもかかわらず
      // 1度も doIncSearch 呼び出しタイミングを迎えることなく
      // タイマーがクリアされる可能性があるため、
      // 最後に明示的に doIncSearch を呼び出す。
      doIncSearch();
      box.addEventListener("keyup", initIncSearch, false);
    }, Config.valueChangeCheckTime);

  };

  box.addEventListener("keyup", initIncSearch, false);
})();

