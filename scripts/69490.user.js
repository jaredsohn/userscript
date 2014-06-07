// ==UserScript==
// @name           Disabler
// @namespace      http://diary.ru
// @description    Disable commentary form in all diaries but yours
// @include        http://*.diary.ru/*
// ==/UserScript==

function ge(a){return document.getElementById(a);}
sn=ge("myDiaryLink").firstChild.firstChild.getAttribute('href');
if (!(document.location.href.match(sn))) ge("addCommentArea").style.display='none';