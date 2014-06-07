// ==UserScript==
// @name       Formation check-button
// @version    0.1
// @description  Formation check-button
// @match      http://fotomag.com.ua/admin/*
// @copyright  2012+, gera_b
// ==/UserScript==

if(document.location.href.indexOf('preparation') != -1 && document.getElementsByClassName('grid')[0]){
   try{    
       document.getElementsByClassName('grid')[0].children[0].children[0].children[0].innerHTML = "<input type=\"checkbox\" onclick=\"$('input[name^=id]').attr('checked', $(this).attr('checked'))\">";
   }
   catch(er){
           console.log("There was an error in Formation check-button module: " + er.message);
   }
}