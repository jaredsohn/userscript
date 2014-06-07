// ==UserScript==
// @name           arabseed no ads 3
// @author         TecHPrO
// @namespace      a
// @description    bypass ads before get download link
// @include        http://www.wwenews.us/m1.php?id=*
// @include        http://wn.arabseed.com/m1.php?id=*
// ==/UserScript==

var l=document.getElementById("cont");
var s = l.getAttribute('onclick');
var s1= s.split("(\'");
var s2= s1[1];
var s3= s2.split("\',\'");
var s4= s3[0];

//alert(s4);
window.location= s4;