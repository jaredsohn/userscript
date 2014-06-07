// ==UserScript==
// @name           Sluggy Freelance Simple Keyboard Navigation
// @namespace      http://userscripts.org/users/bryanjamesross
// @description    Navigates Forward and Back through Sluggy Freelance using the J (forward) and K (back) keys
// @include        http://www.sluggy.com/*
// @include        http://sluggy.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

$(function(){
  $('textarea, input[type=text], input[type=password]').keydown(function(e){
    e.stopPropagation();
  });

  $(document).keydown(function(e){
    var c;
    if(e.which == 74) {
      c = '.fg-button-icon-right:contains(Next)';
    } else if(e.which == 75) {
      c = '.fg-button-icon-left:contains(Prev.)';
    }
    if(c) {
      var sel = 'div#comic_navigation .buttons a' + c;
      var url = $(sel).attr('href');
      if(url) {
        location.href = url;
      }
    }
  });
});

// vim:nowrap:ts=2:sw=2:ft=javascript
