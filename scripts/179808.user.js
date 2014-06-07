// ==UserScript==
// @name       Open CodeProject Links
// @namespace  http://hibbard.eu/
// @version    0.1
// @description  Opens all of the links from the CodeProject newsletter in one go
// @match      http://video.swagbucks.com/video/*
// @copyright  2012+, hibbard.eu
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
 
$(document).ready(function() {
  var hrefs = new Array();
  var elements = $('.thumb-container > a');
  elements.each(function() { 
    hrefs.push($(this).attr('href'))
  });
    
  $('h5').append('<input type="button" value="Open Links" id="CP">')
  $("#CP").css("position", "fixed").css("top", 0).css("left", 0);
  $('#CP').click(function(){ 
    $.each(hrefs, function(index, value) { 
      setTimeout(function(){
       window.open(value, '_blank');
      },1000);
    });
  });
});