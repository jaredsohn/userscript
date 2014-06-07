//
// dingar@gmail.com
//
// ==UserScript==
// @name          Baidu Promotion Remover
// @namespace     Baidu Promotion Remover
// @description   remove promotion on baidu
// @include       http://www.baidu.com/s?*
// ==/UserScript==

var content = document.evaluate("//a[@class='m'][starts-with(@href, 'http://www.baidu.com/baidu.php?url=')]//parent::td//parent::tr//parent::tbody//parent::table", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
removepromotion();

var content = document.evaluate("//a[@class='m'][starts-with(@href, 'http://www.baidu.com/baidu.php?url=')]//parent::font//parent::TD", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
removepromotion();

function removepromotion(){
  for (var i = 0; i < content.snapshotLength; i++) {
    var replacestring="ad<br /><br />"; //double <br /> work well with AutoPager
    content.snapshotItem(i).innerHTML=replacestring;
    content.snapshotItem(i).style.display = 'none';
  }
}