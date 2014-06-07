// ==UserScript==
// @name           yahoofb
// @include        http://www.a.com/*
// ==/UserScript==


$(document).ready(function() {
  if($('#logo')[0].offsetWidth == 288) {
    $('h2.img').each(function() {
      string = $(this).text();
      filename = string.toLowerCase().replace(/ /g, '-').replace(/([^0-9a-z-])/g,'');
      $(this).html('<img src="/images/' + filename + '.gif" alt="' + string + '" />');
    });
  }
});