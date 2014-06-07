// ==UserScript==
// @name           Dictionary.com cleanup
// @description    hides Word Dynamo boxes, ads and other distractions
// @include        http://dictionary.reference.com/*
// ==/UserScript== 
(function(){
var style = document.createElement('style');
style.textContent = '#fcrds, #diduno, .banner-ad, .box-ad, #top, '+
  '#rightimg, #leftimg, #rrbox, #wrapserp, #hdmd, .mdbt '+
  '{ display: none !important; }'+
  '#relatedwords { margin-top: 0; }'+
  '#hlin #dyn { background-color: transparent; color: #36C; }';
document.getElementsByTagName('head')[0].appendChild(style);
}());
