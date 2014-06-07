// ==UserScript==
// @name        wikipedia.org : switch to simple english
// @namespace   tukkek
// @description Offers to redirect to simple english article if it is available
// @include     http*://*.wikipedia.org/wiki/*
// @version     1
// ==/UserScript==
var simple=document.querySelector('a[hreflang=simple]');
if (simple&&window.confirm('Switching to Simple English')){
  document.location.href=simple.href;
  return;
}