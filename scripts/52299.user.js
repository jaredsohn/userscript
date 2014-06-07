// ==UserScript==
// @name         Economist.com earliest comment first
// @namespace    kamhungsoh.com
// @description  Show an article's comments, earliest comment first.
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @include      http://www.economist.com/*
// ==/UserScript==

$("a[href$='mode=comment&intent=readBottom']").each(function(i) {
  this.href = this.href + "&sort=asc";
});

$("a[href$='mode=comment&intent=postTop']").each(function(i) {
  this.href = this.href + "&sort=asc";
});
