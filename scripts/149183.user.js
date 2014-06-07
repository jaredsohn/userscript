// ==UserScript==
// @name          rakuten_books_customize
// @namespace     http://userscripts.org/users/kawaz
// @description   楽天ブックスを弄る
// @version       1.5
// @include       http://search.books.rakuten.co.jp/bksearch/*
// @include       http://books.rakuten.co.jp/*
// ==/UserScript==
(function(){


//検索フォームに自動フォーカスする
document.querySelector("#searchWords").focus()

//「この著者の関連商品」の画像を大きくする
Array.prototype.slice.call(document.querySelectorAll("#relatedItems img")).forEach(
  function(img){
    img.style.outline = 'yellow 2px solid';
    img.src = img.src.replace(/\?.*/,'?_ex=200x200');
  }
);

Array.prototype.slice.call(document.querySelectorAll("div#relatedItems div.showCase")).forEach(
  function(elm){
    elm.style.width = "inherit";
  }
);

//要らないパーツを消す
window.setTimeout(function(){
  Array.prototype.slice.call(document.querySelectorAll(
    "#remoteNav, #siteID, #tagLine, .hotKeywords, .banner, .susumeruWidget, .utilityArea, "+
    "#rightContents .lineBox3, #rightContents #itemListArea"
  )).forEach(
    function(e){
      e.parentNode.removeChild(e);
    }
  );
  Array.prototype.slice.call(document.querySelectorAll(
    "#possiblyTitle"
  )).forEach(
    function(e){
      e.style.zoom = 0.1;
    }
  );
}, 1000);

//無駄な空白除去
Array.prototype.slice.call(document.querySelectorAll(
  "#grpheader, #sectionNav"
)).forEach(
  function(e){
    e.style.margin = 0;
    e.style.padding = 0;
  }
);

})();
