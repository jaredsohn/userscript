// ==UserScript==
// @name           killnyan
// @namespace      http://ryumu.info/
// @description    にゃん|にゃー等をKILL!
// @include        http://d.hatena.ne.jp/tikani_nemuru_M/*
// ==/UserScript==

(function(){
  function killnyan(elem) {
    var kids = elem.childNodes;
    
    var kid;
    for(var a = 0; a < kids.length; a++ ) {
      kid = kids.item(a);
      if(kid.nodeType == 3) {
        kid.nodeValue = kid.nodeValue
          .replace(/にゃんと/g, "なんと")
          .replace(/(どうしようも|なんで|わから|わかん|では|いえ|なら)にゃー/g, "$1ない")
          .replace(/にゃー/g, "")
          .replace(/にゃ/g, "")
        ;
      } else {
        if(kid.childNodes.length > 0) {
          killnyan(kid);
        }
      }
    }
  }
  
  killnyan(document.body);
})();