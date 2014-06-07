// ==UserScript==
// @name          rakuten_books_auto_focus
// @namespace     http://userscripts.org/users/kawaz
// @description   楽天ブックス検索フォーカス
// @version       1.0
// @include       http://search.books.rakuten.co.jp/bksearch/*
// @include       http://books.rakuten.co.jp/*
// ==/UserScript==
(function(){

document.querySelector("#searchWords").focus()

})();