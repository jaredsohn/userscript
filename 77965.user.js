// ==UserScript==
// @name           MediaMaker with ComicDash
// @namespace      http://efcl.info/
// @include        http://mediamarker.net/reg?*
// @include        http://mediamarker.net/u/*/edit*
// @description    MediaMaker から ComicDash へのリンク
// ==/UserScript==
new function(doc){
    var form = doc.createElement("div");
    form.innerHTML = <form method="post" action="http://ckworks.jp/comicdash/search" target="sub1" onSubmit="window.open('','sub1')">
        <input type="hidden" name="search" value="post" />
        キーワード: <input name="keyword" value="$$" size="40" />
        <input type="submit" value="検索" />
    </form>.toString().replace("$$" ,doc.getElementById("title").value);
    doc.querySelector("div[class=tabbody]").appendChild(form);
}(document)