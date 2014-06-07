// ==UserScript==
// @name        ameblo image dl enableer
// @namespace   http://nonamespace
// @description アメブロの画像詳細でダウンロードできるようにする
// @include     http://ameblo.jp/*
// @include     https://ameblo.jp/*
// @version     1.1
// ==/UserScript==

if(document.getElementById('naviBox')){ document.getElementById('naviBox').parentNode.removeChild(document.getElementById('naviBox'));}
var ele = document.createElement("script");
var str = document.createTextNode(" \n\
  function imgProtect(a){}; \n\
  function oncontextmenuOffByTagName(tagName){}; \n\
");
ele.appendChild(str);
document.body.appendChild(ele);	