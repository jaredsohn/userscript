// ==UserScript==
// @name         pressAntichat
// @namespace     http://qweqwe.qwe/download/
// @description   now all is Admins
// @include       http://forum.antichat.tld/*
// @include       http://www.forum.antichat.tld/*

var b=document.body.innerHTML;
b=b.replace('<font color="#ffffff">presidentua</font>','<b><font color="#00bb00">presidentua</font></b>','g');
document.body.innerHTML=b;