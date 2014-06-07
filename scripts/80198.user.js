// ==UserScript==
// @name           bola(.)net xstripper
// @namespace      http://www.krakenstein.cz.cc
// @description    Bola.net AdsBusters PRO 2010
// @include        http://*.bola.net/*
// @include        http://bola.net/*
// @match          http://*.bola.net/*
// @match          http://bola.net/*
// ==/UserScript==

function g(id){if(id && typeof id==='string'){id=document.getElementById(id);}return id||null;}
function h(id){el=g(id);if(el!==null){return(el.parentNode)?el.parentNode.removeChild(el):el;}}
function s(id,s){el=g(id);if(el!==null){el.setAttribute('style',s);}}
function c(q){return document.evaluate(q,document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null).iterateNext();}
unsafeWindow.OA_show=function(){return false;}
h('topframe');h('top_leaderboard');s('header','padding-top:2px;');h(c("//div[@class='bolasc1']"));h(c("//div[@class='bolasc2']"));