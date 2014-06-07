// ==UserScript==
// @name        Spiegel.de rss
// @namespace   www.spiegel.de/#ai=*
// @description #ai überspringen
// @include     http://www.spiegel.de/#ai=*
// @version     0.0.1
// ==/UserScript==

var params=document.URL.split("#ai=")[1]; 
var param2=params.split("&")[0]; 
var param2="a-"+param2;
var inh=document.getElementById("content-main").innerHTML;

var erg=inh.search(param2);
var url2=inh.slice(0,erg+13);
var erg2=url2.lastIndexOf('"');
var url=url2.slice(erg2+1);
//alert(url);
window.location.href =url;

