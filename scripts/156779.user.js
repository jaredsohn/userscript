// ==UserScript==
// @name        MembranaRandomPage
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @namespace   http://www.membrana.ru/
// @include     http://www.membrana.ru/
// @version     1
// @grant     none
// ==/UserScript==

var lastPage = 1553;

$(document).ready(
  function(){
    
    var pageAdress = "/particles?page=" + getRandomInt(1, lastPage);  

    $.get(pageAdress,function(data,status){
          var randomList = $(data).find(".list-article"); 
          $(".list-article-main").html(randomList[0].innerHTML);
          var listOfArticles = $(".list-article");
          for (var i = 0; i < listOfArticles.length-1; i++) {
              listOfArticles[i].innerHTML = randomList[i+1].innerHTML;
              $(listOfArticles[listOfArticles.length-1]).hide();
            };  
      });   
  }
);

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};