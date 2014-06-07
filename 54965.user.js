// ==UserScript==
// @name         Timesonline.co.uk earliest comment first
// @namespace    kamhungsoh.com
// @description  Show an article's comments, earliest comment first.
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @include      http://*.timesonline.co.uk/*
// ==/UserScript==

var evt = document.createEvent('HTMLEvents');
evt.initEvent('click', true, true);

$("a:contains('Oldest first')").each(function() {
  this.dispatchEvent(evt);
});
