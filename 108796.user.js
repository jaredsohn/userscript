// ==UserScript==
// @name           Short Script Bypass
// @namespace      TecHPrO
// @description    Short Script Bypass u can add any site using this script
// @include        http://viplinks.info/*
// ==/UserScript==


var n=location.pathname;
var exp= /m1.php/;
var x= n.search(exp);

if (x != -1)
{
var l=document.getElementsByName('groovybtn1')[0];
var s = l.getAttribute('onclick');
var s1= s.split("(\'");
var s2= s1[1];
var s3= s2.split("\',\'");
var s4= s3[0];
window.location= s4;}

else {
var p=location.href;
var c=p.split("http://");
var c1=c[0];
var c2=c[1].split("/");
var c3=c2[0];
var c4=c2[1]
window.location="http://"+c3+"/m1.php?id="+c4;
}