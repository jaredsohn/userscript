// ==UserScript==
// @name          Acfun a tag with title
// @namespace     
// @description   set title attribute to the post link
// @include       http://www.acfun.tv/*
// @exclude        
// @require       http://code.jquery.com/jquery.min.js
// ==/UserScript==

$('.title').each( function () {
  $(this).attr('title', this.text);
});
