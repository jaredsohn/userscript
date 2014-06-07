// ==UserScript==
// @name           GoogleHatedaSearch
// @namespace      http://d.hatena.ne.jp/replication
// @include        http://*.google.co.jp/search*
// @description    Google検索に、はてなダイアリーから検索する機能を追加します。
// @version        0.1
// ==/UserScript==

(function() {
  
  // document.getElementByIdのショートカット
  function $id(id) {
    return document.getElementById(id);
  }
  
  // トリミング関数
  function trim(str) {
    return str.replace(/^[ ]+|[ ]+$/g, '');
  }
  
  // サイト内検索の場合は、何もしない
  if(document.getElementById("site1")) return false;
  
  // テキストボックスがない場合は、何もしない
  var textBox = document.getElementsByName("q").item(0);
  if(!textBox || textBox == null) return false;
  
  // はてなダイアリーから検索のラジオボタンを作成する
  var radioElm = document.createElement("input");
  radioElm.id = "hateda";
  radioElm.type = "radio";
  radioElm.name = "lr";
  
  // ラベルタグを作成して、ラジオボタンと関連づける
  var labelElm = document.createElement("label");
  labelElm.htmlFor = "hateda"
  labelElm.innerHTML = "はてなダイアリーから検索";
  
  // ラジオボタンを画面に追加する
  var elm_label = $id("issferb");
  elm_label.appendChild(radioElm);
  elm_label.appendChild(labelElm);
  
  var url = "site:http://d.hatena.ne.jp";
  
  // ラジオボタンを取得し、onClickイベントを追加する
  $id("hateda").addEventListener("click", 
    function() {
      var searchBox = document.getElementsByName("q").item(0);
      var tmp = searchBox.value;
      if (tmp != "") {
        if (tmp.indexOf(url) == -1) {
          searchBox.value = url + " " + tmp;
        }
        // フォームをサブミット
        $id("tsf").submit();
      }
    }
  , false);
  
  // ウェブ全体から検索と日本語のページを検索がクリックされた場合は、
  // サイト内検索のキーワードを削除する
  $id("all").addEventListener("click", resetSearchBox, false);
  $id("il").addEventListener("click", resetSearchBox, false);
  
  // 検索窓をリセットする
  function resetSearchBox() {
    var searchBox = document.getElementsByName("q").item(0);
    var tmp = searchBox.value;
    if (tmp.indexOf(url) != -1) {
      tmp = trim(tmp); // 空白を除去
      searchBox.value = tmp.substring(url.length + 1, tmp.length);
    }
  }

})();
