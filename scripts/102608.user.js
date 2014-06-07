// ==UserScript==
// @name           amazon.co.jp recommendation source anchor with target "_blank"
// @namespace      http://monad.tv/
// @include        http://www.amazon.co.jp/gp/yourstore*
// ==/UserScript==

var as = document.getElementsByTagName("A");
for (var i = 0; i < as.length; i++){
    var a = as[i];
    if (a.id.indexOf("ysProdLink.") >= 0){
        a.target = "_blank";
    }
}
