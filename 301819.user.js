// ==UserScript==
// @name        Kustuta liigne
// @namespace   qixinglu.com
// @description Kustuta liigne
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include     http*://www.1182.ee/*
// ==/UserScript==

//Avoid conflicts
$(document).ready(function(){
$('<div/>', {
    id: 'foo',
    href: 'http://google.com',
    title: 'Become a Googler',
    rel: 'external',
    text: 'Launch Delete!'
}).appendTo('#feedback');
$('#foo').click(function(){
$( ".branches" ).remove();
$( ".inner" ).remove();
$('.company-profile-link').each(function(){
  var addressValue = $(this).attr("href");
  $(this).before("<td>https://www.1182.ee"+addressValue+"</td> ");
});
$( ".company-profile-link" ).remove();
 $(".company").each(function(){
    var html = $(this).html();
    $(this).replaceWith("<tr>" + html + "</tr>");
  });
  $(".companies-list").each(function(){
    var html = $(this).html();
    $(this).replaceWith("<table>" + html + "</table>");
  });
$( ".lp-loaded" ).remove();

});
});

