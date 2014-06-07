// ==UserScript==
// @name           fix foro_old
// @namespace      ameboide
// @description    arreglar los links q apunten a foro_old
// @include        http://www.cai.cl/foro/*
// ==/UserScript==
var olds = document.querySelectorAll('a[href*="/foro_old/"]');
for(var i=0; i<olds.length; i++) olds[i].href = olds[i].href.replace('/foro_old/', '/foro/');