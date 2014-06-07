// ==UserScript==
// @name        Reddit Comment Collapse
// @description collapses/expands each comment tree in sequence using keys and scrolls to next
// @include     http://www.reddit.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version     1.0
// ==/UserScript==

function scroll_to_last() {
  $('html, body').animate({
    scrollTop: $('div.nestedlisting').children('div.hidden:last').offset().top
	}, 500);
}

$(document).keydown(function(event) {
  //currently binded to ctrl keycode
  if (event.which == 17) {
    $('div.nestedlisting').children('div.comment').not('.hidden').eq(0).addClass("hidden").find("a.expand").eq(2).click()
	scroll_to_last();
  }	
  //currently binded to shift keycode
  if (event.which == 16) {
    $('div.nestedlisting').children('div.hidden:last').removeClass("hidden").find("a.expand").eq(0).click()
	scroll_to_last();
  }
});