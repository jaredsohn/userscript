// ==UserScript==
// @name           fayer-sin-trolls
// @namespace      fayerwayer
// @description    Quita comentarios de fayerwayer
// @include        http://www.fayerwayer.com/*
// ==/UserScript==
var who;
who=document.getElementById('comments');
if(who && who.parentNode)who.parentNode.removeChild(who);



