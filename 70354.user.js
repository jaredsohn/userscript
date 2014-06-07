// ==UserScript==
// @name           Newgrounds BBS Angry Faic Contra Code
// @namespace      UberCream
// @description    Use the contra code to summon him.
// @include        http://*newgrounds.com/bbs/topic/*
// ==/UserScript==
var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
$(document).keydown(function(e) {
  kkeys.push( e.keyCode );
  if ( kkeys.toString().indexOf( konami ) >= 0 ){
    $(document).unbind('keydown',arguments.callee);
    $.getScript('http://www.newgrounds.com/bbs/forum/1',function(){
      InitAngry();
      $(document).keydown(InitAngry());
    });
  }
});