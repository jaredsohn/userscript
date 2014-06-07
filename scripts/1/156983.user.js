// ==UserScript==
// @name       Simplifier for 二次萌エロ画像ブログ
// @namespace  http://blog.huky.org/
// @version    0.3
// @description  简化「二次萌エロ画像ブログ」这个博客
// @match      http://moeimg.blog133.fc2.com/blog-entry*
// @run-at     document-start
// @copyright  2012+, Diky
// ==/UserScript==

window.stop();
var r = new XMLHttpRequest();
r.open("GET", location.href);
r.send();
r.onreadystatechange = function (){
    if(r.readyState == 4 && r.status == 200){
        var doc = document.createElement("body");
        doc.innerHTML = r.responseText;
        var imgs = doc.querySelectorAll(".box a img");
        document.body = document.createElement("body");
        var d = document.body.appendChild(document.createElement("div"));
        for (var i = 0; i < imgs.length; ++i) {
            a = document.createElement("a");
            a.setAttribute("target", "_blank");
            a.setAttribute("href", "http://saucenao.com/search.php?db=999&url=" + imgs[i].src);
            a.appendChild(imgs[i]);
            d.appendChild(a);
        }
        document.head.innerHTML = "<style type=\"text/css\">div {-webkit-column-count:4;-webkit-column-gap:0；-moz-column-count:4;-moz-column-gap:0；}img {max-width:470px;}</style>";
    }
}