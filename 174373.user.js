// ==UserScript==
// @name    book support
// @namespace http://looxu.blogspot.com/
// @include http://www.amazon.co.jp/*
// @author  Arc Cosine
// @version 1.9
// @LICENSE Public Domain
// ==/UserScript==
(function(){
  var bookLogList = {
    "Bookmater" : {
      "url" : "http://book.akahoshitakuya.com/b/{ASIN}/",
      "favicon" : "http://book.akahoshitakuya.com/favicon.ico",
      "alt" : "読書メーター"
    },
    "booklog" : {
      "url" : "http://booklog.jp/item/1/{ASIN}/",
      "favicon" : "http://booklog.jp/favicon.ico",
      "alt" : "ブクログ"
    },
"ReaderStore" : {
  "url" : "http://ebookstore.sony.jp/search/?q={ASIN}&x=22&y=18",
"favicon" : "http://ebookstore.sony.jp/favicon.ico" ,
"alt" : "ReaderStore",
"engine" : "TITLE"
},
    "bukkupe" : {
      "url" : "http://bukupe.com/book/{ASIN}/",
      "favicon" : "http://bukupe.com/favicon.ico",
      "alt" : "ブクペ"
    },
    "TwitterSearch" : {
      "url" : "https://twitter.com/search?q={ASIN}",
      "favicon" : "https://twitter.com/favicon.ico" ,
      "alt" : "Twitter検索"
    },
    "Kinoppy" : {
      "url" : "http://www.kinokuniya.co.jp/disp/CSfDispListPage_001.jsp?qs=true&ptk=03&q={ASIN}",
      "favicon" : "http://www.kinokuniya.co.jp/favicon.ico",
      "alt" : "紀伊國屋書店 電子書籍検索",
      "engine" : "ISBN13"
    },
    "Wikipedia" : {
      "url" : "http://ja.wikipedia.org/wiki/{ASIN}",
      "favicon" : "http://ja.wikipedia.org/favicon.ico" ,
      "alt" : "Wikipedia",
      "engine" : "TITLE"
    }

  };

  var extractFunc = {
    "ASIN" : function(){
      return document.getElementById("ASIN").value;
    },
    "ISBN13" : function(){
      var ee = document.getElementsByTagName("B"),
      i = 0, iz = ee.length,
      one = null, isbn = "";

      for(;i<iz;i++){
        one = ee[i];
        if( one.innerHTML === "ISBN-13:" ){
          isbn = one.nextSibling.nodeValue.replace(/[^\d]*(\d+)-(\d+).*/, "$1$2");
          break;
        }
      }
      return isbn;
    },
    "TITLE" : function(){
      var html = document.getElementById("btAsinTitle").innerHTML.replace(/ ?(\(|<| [0-9]).*>/,'');
      html = html.replace(/<.*?\/>/g,'');

      return encodeURIComponent(html);
    }
  }

  function init(){

    var target = document.getElementById("btAsinTitle");
    
    if( target ){
    
      var key = "", one = null, img = null, link = null, div = null;

      var div = document.getElementById("book-support-div");
      if( !div ){
        div = document.createElement("div");
        div.id = "book-support-div";
      }else{
        // ForFirefox
        return;
      }
      
      for( key in bookLogList ){
        one = bookLogList[key];
      
        var engine = (typeof one.engine === "undefined") ? "ASIN" : one.engine,
            asin = extractFunc[engine]();

        link = div.appendChild(document.createElement("a"));
        link.href = one.url.replace(/{ASIN}/,asin);

        link.style.margin = "0px 16px 0px 0px";
      
        img = link.appendChild(document.createElement("img"));
        img.src = one.favicon;
        img.alt = one.alt;

        img.style.width = "16px";
        img.style.height= "16px";
      
        // option code.
        if( typeof one.option !== "undefined" && typeof one.option === "function" ){
          one.option(one,link);
        }
      
      }
      target.parentNode.insertBefore(div, target);
    }
  }
 
  init(); 

  document.addEventListener('DOMContentLoaded', init, false );
})();
