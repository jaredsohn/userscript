// ==UserScript==
// @name           GoogleHistorySearch
// @namespace      http://d.hatena.ne.jp/replication/
// @include        http://www.google.co.jp/search*
// @description    Googleで過去に検索したキーワードから再検索します。
// @version        2.2
// ==/UserScript==

(function() {
  var textBox;          // テキストボックス
  var select;           // リストボックス
  var arrKeyword;       // キーワード配列
  var tmp;              // 一時領域
  var separator = "¥n"; // 区切り文字
  var blnMode = false;  // 履歴から検索モード
  
  var doc = document;  
  textBox = doc.getElementsByName("q").item(0);
  if(!textBox) return false;
  
  // 配列の重複排除 from: http://m035.blog61.fc2.com/blog-entry-9.html
  Array.prototype.only = function() {
    var len = this.length, cnt=0, list={}, end=[];
    for(var i = 0; i < len; i++){
      if(!list[this[i]]) {
        end[cnt++] = this[i];
        list[this[i]] = true;
      }
    }
    return end;
  }

  // document.evaluateのラッパ
  function xpath(str) {
    var nsr_elem = document.createElementNS(null, "ns-resolver");
    nsr_elem.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:h", "http://www.w3.org/1999/xhtml");
    var nsr = document.createNSResolver(nsr_elem);
    var result = document.evaluate(str, document, nsr, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (result.snapshotLength === 1) {
      return result.snapshotItem(0);
	}
    return null;
  }
  
  // 検索窓に表示されているキーワードを追加
  if (decodeURI(GM_getValue("KEYWORD", "")) === "") {
    GM_setValue("KEYWORD", encodeURI(textBox.value + separator + decodeURI(GM_getValue("KEYWORD", ""))));
  }
  else {
    GM_setValue("KEYWORD", encodeURI(separator + textBox.value + separator + decodeURI(GM_getValue("KEYWORD", ""))));
  }
    
  // 履歴から検索のリストを画面に追加する
  var ul = xpath("id('leftnav')/h:div[2]/ul/li[1]/ul[1]");
  if(!ul) return false;
  
  var li = doc.createElement("li");
  li.className = "tbou";
  var aTag = doc.createElement("a");
  aTag.innerHTML = "検索履歴から再検索";
  aTag.style.color = "#0000cc";
  
  // 履歴から検索のリンクがクリックされた場合
  aTag.addEventListener("click", function() {
  	// 履歴から検索が選択されていない状態
  	if(!blnMode) {
	  blnMode = true;
	  li.className = "tbos";
	  textBox.parentNode.replaceChild(select, textBox);
	}
	// 履歴から検索が選択されている場合
	else {
	  blnMode = false;
	  li.className = "tbou";
	  select.parentNode.replaceChild(textBox, select);
	}
  }, false);
  li.appendChild(aTag);
  ul.appendChild(li);

  // 履歴リストボックスの作成
  select = doc.createElement("select");
  select.id = "sel";
  select.name = "q";
  select.className = "lst";
  select.addEventListener("change", function(){
  	// 履歴リストボックスが選択された場合は、フォームをサブミットする
  	xpath("id('tsf')").submit();
  }, false);
  
  // 履歴リストボックスでキーがタイプされた場合
  select.addEventListener("keypress", function(e) {
    DeleteSearchWord(e);
  }, false);
  
  // 配列の後ろからリストボックスに追加していく。
  arrKeyword = decodeURI(GM_getValue("KEYWORD", "")).split(separator).only();
  for(var i = 0, len = arrKeyword.length; i < len; i++) {
    var option = doc.createElement("option");
    if (arrKeyword[i].replace(/^\s+|\s+$/g, "") !== "") {
      option.innerHTML = arrKeyword[i];
      select.appendChild(option);
    }
  }
  
  // 履歴の削除
  function DeleteSearchWord(e) {
    var strKeyword = "";    // キーワード
    // Deleteキー以外が押下された場合は、無視する
    if (e.keyCode != 46) return false;

    arrKeyword = decodeURI(GM_getValue("KEYWORD", "")).split(separator).only();
    for(var i = 0, len = arrKeyword.length; i < len; i++) {
       if(arrKeyword[i] === select.options[select.selectedIndex].text) {
         arrKeyword[i] = ""; 
       }
       strKeyword += arrKeyword[i] + separator;
    }
    select.options[select.selectedIndex].text = "";
    GM_setValue("KEYWORD", encodeURI(strKeyword));
    textBox.value = "";
	return true;
  }
  
  return true;

})();