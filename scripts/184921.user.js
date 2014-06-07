// ==UserScript==
// @name        Facebook Hide SimilarTo
// @namespace   http://forstinea.nl/fb/
// @description Facebook Hide SimilarTo
// @include     https://www.facebook.com/*
// @include     http://www.facebook.com/*
// @version     1
// ==/UserScript==

document.getElementsByTagName('head')[0].innerHTML+='\n<style type="text/css">.mvs._5j5u._5jqk.clearfix{display:none}</style>\n';

