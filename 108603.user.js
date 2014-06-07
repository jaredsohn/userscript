// ==UserScript==
// @name         Waseda Library Search for Google Books 
// @namespace    http://yamitzky.site50.net/
// @description  Adds a link of Waseda University library to Google Books search page./Google Books検索に早稲田大学図書館へのリンクを追加します。
// @include      http://books.google.com/books?id=*
// @include      http://books.google.co.jp/books?id=*
// ==/UserScript==

//put link
function init(){
  isbn = search_isbn();
  if(isbn){
    var link_object = generate_link(isbn, "早稲田大学");
    get_link_place().appendChild(link_object);
  }
}


//generate object of an A tag linking to univ lib page depending on univ name(now available on Waseda univ)
function generate_link(isbn, univ){
  var link_object = document.createElement("a");
  link_object.setAttribute("href", "http://wine.wul.waseda.ac.jp/search*jpn/i?SEARCH="+isbn);
  link_object.setAttribute("target", "_blank");
  link_object.innerHTML = "<br>" + univ + "図書館で検索";
  return link_object;
}

//search isbn code depending search engine(now available on google books)
function search_isbn(){
  var isbn = "";
  if(location.href.match("v=onepage")){ // when preview page on gbooks
    isbn = document.getElementById("buy_v").innerHTML.match(/ISBN:([0-9]{10})/)[1];
  }else{//info page on gbooks
    isbn = document.getElementById("metadata_content").innerHTML.match(/[0-9]{10}/);
  }
  return isbn; 
}

//get link node depending search engine(now available on google books)
function get_link_place(){
  var place;
  if(location.href.match("v=onepage")){ //preview on gbooks
    place = document.getElementById("titlebar");
  }else{//info on gbooks
    place = document.getElementById("bookinfo").childNodes[0];
  }
  return place;
}

(function(){
   init();
})();


