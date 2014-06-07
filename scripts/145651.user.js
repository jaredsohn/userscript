// ==UserScript==
// @name       Tony's yuhoo script
// @namespace  http://testoo/
// @version    0.1
// @description  terrible script 
// @match  http://*.store.yahoo.com/*
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==



$(function()
  {
      formelements = $("form[name^='f'] font font p:first table table tr");
      //add buttons
      formelements.prepend("<td><span class='upbutton'>^^</span></td>");
      $("form table span.upbutton").bind("click", function (poop) {
         
          var clicked=$(this);
          var thisinputs=clicked.parent().nextAll().find("input, select");
          var previousinputs=clicked.parent().parent().prev().find("input, select");
          for (var q in [0,1]){
              var tmptext=previousinputs.eq(q).val();
              previousinputs.eq(q).val(thisinputs.eq(q).val());
              thisinputs.eq(q).val(tmptext);
          }
          
          
      });
      
      
      
      
      
      
      
  }
  
  
  
  
  
 )