// ==UserScript==
// @name          all links open new window target blank
// @version       1.0
// @include       *
// @namespace     all links open new window
// @description   changes a and base to target="_blank"
// ==/UserScript==
var a=document.getElementsByTagName('a'),
base=document.getElementsByTagName('base');
for (i=0;i<base.length;i++)
  if (!base[i].hasAttribute('target'))
    base[i].setAttribute("target","_blank");
for (i=0;i<a.length;i++)
  if (!a[i].hasAttribute('target'))
    a[i].setAttribute("target","_blank");