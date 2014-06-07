// ==UserScript==
// @name           Anti TMF
// @namespace      TecHPrO
// @description    Bypass takemyfile.com link protection
// @include        http://tmf.myegy.com/*
// ==/UserScript==


var n=location.pathname;
var exp= /2-ar.php/;
var x= n.search(exp);

if (x != -1)
{
var l=document.getElementsByName('groovybtn1')[0];
var s = l.getAttribute('onclick');
var s1= s.split("(\'");
var s2= s1[1];
var s3= s2.split("\',\'");
var s4= s3[0];
window.location= s4;
alert(s4);
}

else {
var p=location.href;
var c=p.split("http://");
var c1=c[0];
var c2=c[1].split("/");
var c3=c2[0];
var c4=c2[1];
var c5=c4.split("?id=");
var c6=c5[1];
window.location="http://"+c3+"/2-ar.php?id="+c6;
}