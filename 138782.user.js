// ==UserScript==
// @name       Amazon Search
// @namespace  http://fdesaison.fr
// @version    0.1
// @description  Direct in search form in Amazon
// @include        http*://*.amazon.*/*
// @copyright  2012+, FDeSaison
// ==/UserScript==


if(document.getElementById("twotabsearchtextbox")!=null){
    document.getElementById("twotabsearchtextbox").focus();
}