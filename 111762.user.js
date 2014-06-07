// ==UserScript==
// @name           Unread message
// @namespace      permyguy
// @description    Add "Go to first unread message of thread" in forums @permies.com
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://www.permies.com/permaculture-forums/*
// ==/UserScript==



$('img[alt=New]').each(function(i){
  //alert($(this).prev().attr('href'));
  var link = $('<a/>');
  var ar = $(this).prev().attr('href').split('/');
  var ar2=ar[4].split('_');
  var url= 'http://www.permies.com/bb/index.php?topic='+ar2[0]+'.new;topicseen#new';
   link.attr('href',url);
   link.append($(this).clone());
   $(this).parent().append(link);
  $(this).hide();
});