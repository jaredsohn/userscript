// ==UserScript==
// @name           HideHeaderAndFooterForLDR
// @namespace      HideHeaderAndFooterForLDR
// @include        http://reader.livedoor.com/reader/*
// @description    This script operates on LDR. And, the header and the footer are made non-display.このスクリプトは、LDRにおいて、ヘッダとフッタの部分を非表示します。
// @version        0.2
// ==/UserScript==

(function() {
  // document.evaluateのラッパ
  function xpath(str) {
    var result = document.evaluate(str, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if(result.snapshotLength == 1) return result.snapshotItem(0);
    return result;
  }
  // ヘッダ・フッタの非表示
  xpath("id('header')").style.cssText = "display: none";
  xpath("id('footer')").style.cssText = "width:0;height:0;";
  
  // 広告を非表示にする
  xpath("id('ads_top')").style.display = "none";
  xpath("id('ads_bottom')").style.display = "none";
  
})();