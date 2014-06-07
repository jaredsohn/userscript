// ==UserScript==
// @name           DVBN
// @namespace      DVBN
// @include        http://dvbn.happysat.org/*
// ==/UserScript==

document.body.innerHTML=document.body.innerHTML.replace(/h\+\+p|hxxp/gi,'http')