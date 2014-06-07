// ==UserScript==
// @name           MarkVisitedFotka
// @description    Także tego.
// @include        http://www.fotka.pl/*

$(function(){
  $.getScript('http://remysharp.com/downloads/jquery.visited.js');
  
  $('.shadowed-avatar').visited(function(){
	$(this).parent().parent().css('opacity', 0.5);
  });
})

// ==/UserScript==