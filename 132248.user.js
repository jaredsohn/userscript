// ==UserScript==
// @name       mihon
// @description Just kill authors posts from http://mmm-tasty.ru/main/last 
// @version     0.1
// ==/UserScript==

$(document).ready(function() {
  var author = jQuery(".post_body .rel .post_author"); 
    if(author.text() = "ornik"){ 
      author.remove(); 
    }
});