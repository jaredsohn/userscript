// ==UserScript==
// @name           Facebook の友達になったみたいな情報フィルタリングするやつ
// @namespace      http://ssig33.com/
// @include        http://www.facebook.com/
// ==/UserScript==

//これを要件に合わて適当に書き換えてください。これは英語設定の時に誰と誰が友達になったかとかを消すやつ。
var regExp = /now\ friends\ with/;

var ns = document.evaluate('//*[contains(concat(" ",@class," "), " pvm ")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for ( var i=0 ; i < ns.snapshotLength; i++ )
{
  var n = ns.snapshotItem(i);
  if(n.innerHTML.match(regExp)){
    n.style.display = "none";
  }
}


document.addEventListener('DOMNodeInserted', insert_node, false);

function insert_node(evt) {
  if(evt.target.localName == "li"){
    var n = evt.target;
    if(n.innerHTML.match(regExp)){
      n.style.display = "none";
    }
  }
}