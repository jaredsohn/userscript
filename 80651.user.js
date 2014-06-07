// ==UserScript==
// @name           Tmblr
// @namespace      http://userscripts.org
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description    Yet to be decided
// @include        http://www.tumblr.com/tagged/*
// ==/UserScript==

function replaceStyleSheet(oldCSS, newCSS) {
    document.evaluate('//link[@rel="stylesheet" and @href="'+oldCSS+'"]', document, null, 
      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = newCSS;
}

replaceStyleSheet("http://assets.tumblr.com/stylesheets/compressed/dashboard.css?344", "http://missha.tw/css.css");

var currentNum = 10;

function countDivs(){
  var postsNum = $('.post').size();
  if (currentNum != postsNum){
    $("div[id*=highres_photo_]").removeAttr('style');
    
    $("img.image").parent().click(function() {
      return false;
    });
    $("img.image").load();
  }
  currentNum = postsNum;
}
window.setInterval(countDivs, 2000);

$("img.image").load(function() {
  $(this).css("display", "none");
  $(this).parent().parent().append("<img class='imagecopy' src='" + $(this).attr('src') + "' />");
  $("img.imagecopy").click(function() {
    window.location.href = $(this).attr('src');
  });
});