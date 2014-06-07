// ==UserScript==
// @name         Sarkis
// @namespace     http://qweqwe.qwe/download/
// @description   Sarkis
// @include       http://forum.antichat.ru/*
// @include       http://forum.antichat.net/*
// @include       http://www.forum.antichat.net/*
// @include       http://www.forum.antichat.ru/*

var b=document.body.innerHTML;
b=b.replace('<font color="#ffffff">Yoyo Factory</font>','<b><font color="#00bb00">Yoyo Factory</font></b>','g');
document.body.innerHTML=b;