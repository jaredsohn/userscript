// ==UserScript==
// @name           Orange1
// @namespace      sadas
// @description    sadsads
// @include        *http://lockerzsite.c0.pl*

// ==/UserScript==

var Boutique = 'Cash Money';
//////////////////////////////////////////////////////////////
if(document.getElementById("boutiques")!=null)for(var a=document.getElementsByClassName("boutiqueTitle"),b=0;b<a.length;b++)if(a[b].innerHTML.toLowerCase().search(Boutique.toLowerCase())!=-1)window.location=a[b].parentNode.href;

var Products = '4000';
//////////////////////////////////////////////////////////////
if(document.getElementById("products")!=null)for(var a=document.getElementsByClassName("productInfo"),b=0;b<a.length;b++)if(a[b].innerHTML.toLowerCase().search(Products.toLowerCase())!=-1)window.location=a[b].parentNode.href;