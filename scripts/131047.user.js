// ==UserScript==
// @name           remove target blank
// @namespace      *
// @include        http://www.turismolapampa.gov.ar/*
// @description    removes the target="_blank" crap that really annoys me
// ==/UserScript==
var a = document.getElementsByTagName('a'); 
for (i = 0; i < a.length; i++) {
if (a[i].getAttribute('target')=='_blank')
{
a[i].style.display='none';
}
}