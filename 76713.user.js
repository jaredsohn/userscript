// ==UserScript==
// @name	AwsClic AutoClick
// @version	1.0
// @date	2010-05-13
// @description	Ce script ouvre automatiquement les liens créés par AwsClic sans temps d'attente.
// @creator	35niavlys
// @include	http://www.awsclic.com/l/*
// ==/UserScript==

var href = document.getElementsByTagName("a");
for(i = 0; i < href.length; i++)
 {
document.location.href = href[i];
 }