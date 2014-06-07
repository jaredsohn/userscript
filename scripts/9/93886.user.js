// ==UserScript==
// @name           arabseed no ads 2
// @author         TecHPrO
// @namespace      a
// @description    bypass ads before get download link
// @include        http://www.wwenews.us/*
// @exclude        http://www.wwenews.us/m1.php?id=*
// @include        http://wn.arabseed.com/*
// @exclude        http://wn.arabseed.com/m1.php?id=*
// ==/UserScript==

var p=location.href;
var s=p.split("http://");
var s1=s[0];
var s2=s[1].split("/");
var s3=s2[0];
var s4=s2[1]
//alert(s3);
window.location="http://"+s3+"/m1.php?id="+s4;