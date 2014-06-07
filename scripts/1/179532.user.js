// ==UserScript==
// @name Hush2HBSearch
// @description はてなブックマークの検索結果ページでコメントのないお気に入りユーザーを非表示にする
// @include http://b.hatena.ne.jp/search/*
// @license MIT License
// ==/UserScript==

window.addEventListener('DOMContentLoaded', function(){
  var favorites = document.querySelectorAll('#search-result-lists ul.favorite li');
  for (var i=0; i < favorites.length; ++i) {
    var fav = favorites[i];
    if(fav.querySelector("span.comment").innerText.length == 0){
      fav.hidden = true;
    }    
  }
}, false); 