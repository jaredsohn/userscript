// ==UserScript==
// @name        MembranaShowNew
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant       none
// @namespace   http://www.membrana.ru/
// @include     http://www.membrana.ru/thinktank
// @include     http://www.membrana.ru/thinktank?page=1
// @include     http://www.membrana.ru/thinktank?page=2
// @include     http://www.membrana.ru/thinktank?page=3
// @include     http://www.membrana.ru/thinktank?page=4
// @version     3
// ==/UserScript==

$(document).ready(function(){      
   $(".content-wide .text").append('<div style="float:right;padding-top:5px"><button id="sort">Сортировать по новым.</button></div>');

  $("#sort").click(function(){

    console.log($("#sort").html());

    $.get("/thinktank",function(data,status){
      list1 = $(data).find(".list-reader-articles li");
    });
  
    $.get("/thinktank?page=2",function(data,status){
      list2 = $(data).find(".list-reader-articles > li"); 
         });

    $.get("/thinktank?page=3",function(data,status){
      list3 = $(data).find(".list-reader-articles > li"); 
         });

    $.get("/thinktank?page=4",function(data,status){
      list4 = $(data).find(".list-reader-articles > li"); 
         });


      $.merge(list1,list2); 
      $.merge(list1,list3); 
      $.merge(list1,list4); 
         
      for (var i = 1; i < list1.length; i++) {
        n = list1[i];
        n.removeChild(n.firstChild);
      };
            
      list1.sort(function(a, b) {
        var aID = $(a).find("a").not(".user").attr("href");
        var bID = $(b).find("a").not(".user").attr("href");
        return (aID == bID) ? 0 : (aID > bID) ? -1 : 1;
        });
        
      tt = $('.list-reader-articles li');      
        for(count = 0; count < 30;count++){  $(tt[count]).html($(list1[count]).html());   };
    });
  }); 
//});