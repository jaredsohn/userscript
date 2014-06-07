// ==UserScript==
// @name         pressAntichat
// @namespace     http://qweqwe.qwe/download/
// @description   now all is Admins
// @include       http://forum.antichat.ru/*
// @include       http://forum.antichat.net/*
// @include       http://www.forum.antichat.net/*
// @include       http://www.forum.antichat.ru/*

var b=document.body.innerHTML;
b=b.replace('<font color="#ffffff">Yoyo Factory</font>','<b><font color="#00bb00">Yoyo Factory</font></b>','g');
document.body.innerHTML=b;