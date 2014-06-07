// ==UserScript==
// @name       Aftenbladet.no remove subscription content
// @namespace  http://res.no
// @version    2013-07-07
// @description  Remove locked articles (subscription only) on www.aftenbladet.no and some ads that adblocker don't catch
// @match      http://www.aftenbladet.no/
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
// ==/UserScript==

$(document).ready(function () {
  // remove all articles that requires subscription
  $(".lock[title='Låst']").each(function(){
      $(this).closest('.article, .firstChild, .debatt').attr('style','display:none');
 });
    
 // remove ads currently not caught by adblocker
 $(".ad,.jobAdCarousel").each(function(){
      $(this).remove();
 });

});