// ==UserScript==
// @name         Better_Hatena_Bookmark_Add_Page
// @namespace    http://d.hatena.ne.jp/Koonies/
// @description  はてなブックマーク追加ページの不要部分を削除し、タグをできるだけ表示させる
// @include      http://b.hatena.ne.jp/add*url=*
// @include      http://b.hatena.ne.jp/*/add.confirm*url=*
// @version      1.1
// ==/UserScript==

(function(){
    var ele;
    
    ele = document.getElementById("user-header");
    if (ele) ele.parentNode.removeChild(ele);
    
    ele = document.evaluate('//div[@class="breadcrumbs"]',document,null,7,null).snapshotItem(0);
    if (ele) ele.parentNode.removeChild(ele);
})();
