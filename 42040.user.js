// ==UserScript==
// @name           CheckBoxCheckerForHatena
// @namespace      CheckBoxCheckerForHatena
// @include        http://d.hatena.ne.jp/*/keywords*
// @description    はてなダイアリーのキーワード編集画面にすべてチェックボタンをつける。
// @version        0.2
// ==/UserScript==

(function() {

  // document.evaluateのラッパ
  function xpath(str) {
    var result = document.evaluate(str, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if(result.snapshotLength == 1) return result.snapshotItem(0);
    return result;
  }
  
  var btnCheck = document.createElement("button");
  btnCheck.id = "ChangeAllCheckBox";
  btnCheck.innerHTML = 'ページ内をすべてチェック';
  btnCheck.class = "box-l";
  btnCheck.disabled = true;
  btnCheck.addEventListener("click", checkAll, false);
  xpath("id('main')/div[4]").appendChild(btnCheck);
  
  // チェックボックスが存在しない場合は、グレーアウト
  if (IsExistCheckBox()) {
    btnCheck.disabled = false;
  }
  
  // チェックボックスをすべてチェックする。
  function checkAll() {
    var inputTags = document.getElementsByTagName('input');
    var checkFlag = true;
    
    // チェックボックスがすべてチェックされているかを調べる関数
    function isCheckAll() {
      var flag = true;
    
      for(var i=0; i<inputTags.length; i++) {
        if(inputTags[i].type == "checkbox") {
          if(inputTags[i].checked == false) {
            flag = false;
          }
        }
      }
      return flag;
    }
    
    //すべてチェック済みかどうか判定
    if(isCheckAll()) {
      checkFlag = false;
    }
    
    for(var i=0; i<inputTags.length; i++) {
      if(inputTags[i].type == "checkbox") {
        inputTags[i].checked = checkFlag;
      }
    }
  }
  
  // チェックボックスがあるかどうかを調べる
  function IsExistCheckBox() {
    var inputTags = document.getElementsByTagName('input');
    for(var i=0; i<inputTags.length; i++) {
      if(inputTags[i].type == "checkbox") {
        return true;
      }
    }
    return false;
  }
})();
