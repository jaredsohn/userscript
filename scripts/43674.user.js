// ==UserScript==
// @name           Twitter Back To English
// @version        2
// @namespace      http://ellab.org/
// @author         angusdev
// @include        http*
// @description    Sick of 推特, 銳推? Translate them to English
// ==/UserScript==

(function(){
  var words = [
   ['推特', 'Twitter'],
   ['銳推', 'Re-tweet'],
   ['噗浪', 'Plurk'],
  ];
  for (var i=0;i<words.length;++i) {
    var res = document.evaluate("//text()[contains((.), '" + words[i][0]+ "')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for(var j=0;j<res.snapshotLength;++j) {
      res.snapshotItem(j).textContent = res.snapshotItem(j).textContent.replace(words[i][0], words[i][1], 'g');
    }
  }
})();