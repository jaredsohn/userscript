// ==UserScript==
// @name           GoogleIconInjector
// @namespace      GoogleIconInjector
// @include        http://*.google.*/search*
// @description    This script inserts the file type icon in the retrieval result in Google. 
// @description    Googleの検索結果にファイルタイプごとのアイコンを挿入します。
// @version        0.1
// ==/UserScript==

(function() {

  // document.evaluateのラッパ関数
  function xpath(str) {
    var result = document.evaluate(str, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if(result.snapshotLength == 1) return result.snapshotItem(0);
    return result;
  }

  var spanTags = xpath("//span");
  for(var i=0; i < spanTags.snapshotLength; i++) {
    switch (spanTags.snapshotItem(i).innerHTML) {
      case "[PDF]":
        spanTags.snapshotItem(i).innerHTML = "<img src='http://www.fineicons.com/store/icons/filetypes_2/adobe-acrobat-icon.png' width='24' height='24'>";
        break;
      case "[DOC]":
        spanTags.snapshotItem(i).innerHTML = "<img src='http://www.fineicons.com/store/icons/filetypes_2/microsoft-word-icon.png' width='24' height='24'>";
        break;
      case "[XLS]":
        spanTags.snapshotItem(i).innerHTML = "<img src='http://www.fineicons.com/store/icons/filetypes_2/microsoft-excel-icon.png' width='24' height='24'>";
        break;
      case "[PPT]":
        spanTags.snapshotItem(i).innerHTML = "<img src='http://www.fineicons.com/store/icons/filetypes_2/microsoft-powerpoint-icon.png' width='24' height='24'>";
        break;
      case "[FLASH]":
        spanTags.snapshotItem(i).innerHTML = "<img src='http://www.fineicons.com/store/icons/filetypes_2/adobe-flash-icon.png' width='24' height='24'>";
        break;
      default:
    }
  }

})();