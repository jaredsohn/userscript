// ==UserScript==
// @name           No LineFeed script
// @namespace      http://mywebsite.com/myscripts
// @description    No LineFeed script
// @include        http://*
// Original：      ＠Japdoor
 var a=document.getElementsByTagName('textarea');
 for(var i=0; i<a.length;i++){
  a[i].value=a[i].value.replace(/\r?\n/g,"");
 }
// ==/UserScript==