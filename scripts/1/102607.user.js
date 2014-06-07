// ==UserScript==
// @name           amazon.co.jp order log source anchor with target "_blank"
// @namespace      http://monad.tv/
// @include        https://www.amazon.co.jp/gp/css/history/orders/view.html*
// ==/UserScript==

var spans = document.getElementsByTagName("SPAN");
for (var i = 0; i < spans.length; i++){
    var span = spans[i];
    if (span.className == "item-title"){
        span.parentNode.target = "_blank";
    }
}
