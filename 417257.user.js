// ==UserScript==
// @name           TF2Outpost Mark Quicksells
// @version        1.0
// @description    Marks quicksales
// @include        http://www.tf2outpost.com/*
// @run-at         document-end
// @grant          none
// ==/UserScript==


$('.trade').each(function ()
{
  var notes = $(this).find('.notes');
  if (notes.text().toLowerCase().indexOf("quicksell") !== -1)
  {
    console.log("quicky");
    //$(this).find('.notes').css('border', 'dashed 5px rgb(20, 20, 50)');
    $(this).find('.contents').css('border', 'dashed 5px rgb(20, 20, 50)');
  }
  else if (notes.text().toLowerCase().indexOf("quick-sell") !== -1)
  {
    console.log("quicky");
    //$(this).find('.notes').css('border', 'dashed 5px rgb(20, 20, 50)');
    $(this).find('.contents').css('border', 'dashed 5px rgb(20, 20, 50)');
  }
});