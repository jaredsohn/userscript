// ==UserScript==
// @name           YahooHistorySearch
// @namespace      YahooHistorySearch
// @include        http://search.yahoo.co.jp/search*
// @description    The search word retrieved with Yahoo is preserved in a browser. ※Japanese Only
// @version        0.3
// ==/UserScript==

(function() {

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
    var result = document.evaluate(str, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if(result.snapshotLength == 1) return result.snapshotItem(0);
    return result;
  }

  var elmCheckBox = document.createElement("input");
  elmCheckBox.type = "checkBox";
  elmCheckBox.id = "his";
  elmCheckBox.addEventListener("click", OnHistoryCheck, false);
  var elmText = document.createTextNode("履歴から検索");
  
    // 検索窓に表示されているキーワードを追加
  if (decodeURI(GM_getValue("YAHOO_KEYWORD", "")) == "") {
    GM_setValue("YAHOO_KEYWORD", encodeURI(xpath("id('yschsp')").value + "¥t" + decodeURI(GM_getValue("YAHOO_KEYWORD", ""))));
  }
  else {
    GM_setValue("YAHOO_KEYWORD", encodeURI("¥t" + xpath("id('yschsp')").value + "¥t" + decodeURI(GM_getValue("YAHOO_KEYWORD", ""))));
  }

  // 履歴リストボックスの作成
  var select = document.createElement("select");
  select.addEventListener("change",
                          function() {
  xpath("id('yschsp')").value = select.options[select.selectedIndex].text;
  xpath("//input[@type='submit']").snapshotItem(0).click();
                          }, false);
  select.addEventListener("keypress", function(e) { DeleteSearchWord(e); }, false);
  select.style.cssText = "display:none;padding:0.231em 4px 0.231em; _padding:0.385em 4px 0.308em; width:330px;border:1px solid #7c7c7c;border-color:#7c7c7c #c3c3c3 #c3c3c3 #7c7c7c;background-color:#fff;background-image:url(http://k.yimg.jp/images/search/websrp_8_080819.png);background-position:0 0;background-repeat:repeat-x;";

  // 配列の後ろからリストボックスに追加していく。
  var arrKeyword = decodeURI(GM_getValue("YAHOO_KEYWORD", "")).split("¥t").only();
  for(var i = 0; i < arrKeyword.length-1; i++) {
    var option = document.createElement("option");
    if (arrKeyword[i].replace(/^¥s+|¥s+$/g, "") != "") {
      option.innerHTML = arrKeyword[i];
      select.appendChild(option);
    }
  }
  
    // リストボックスを画面に追加
  xpath("//input[@type='submit']").snapshotItem(0).parentNode.insertBefore(select, xpath("//input[@type='submit']").snapshotItem(0));
  xpath("id('yschqcon')/form/p").appendChild(elmCheckBox);
  xpath("id('yschqcon')/form/p").appendChild(elmText);
  
  // チェックボックスが変更された場合
  function OnHistoryCheck() {
    if (elmCheckBox.checked) {
      select.style.cssText = select.style.cssText + "display:inline;";
      xpath("id('yschsp')").style.cssText = "display:none;";
    }
    else {
      select.style.cssText = select.style.cssText + "display:none;";
      xpath("id('yschsp')").style.cssText = "display:inline;";
    }
  }
  
  // 検索履歴の削除
  function DeleteSearchWord(e) {
    var strKeyword = "";    // キーワード
    
    // Deleteキー以外が押下された場合は、無視する
    if (e.keyCode != 46) return;

    var arrKeyword = decodeURI(GM_getValue("YAHOO_KEYWORD", "")).split("¥t").only();
    for(var i = 0; i < arrKeyword.length; i++) {
       if(arrKeyword[i] == select.options[select.selectedIndex].text) {
         arrKeyword[i] = ""; 
       }
       strKeyword += arrKeyword[i] + "¥t";
    }
    select.options[select.selectedIndex].text = "";
    GM_setValue("YAHOO_KEYWORD", encodeURI(strKeyword));
    xpath("id('yschsp')").value = "";
    
    elmCheckBox.checked = false;
  }
})();