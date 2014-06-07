// ==UserScript==
// @name           HabraUsernameReplace
// @namespace       http://userscripts.org
// @description	  Replace '%username%' to real user name of registered user
// @author        ALLIG@TOR http://ali-k777.narod.ru, Rozboris http://ctd120m.info
// @include        http://habrahabr.ru/blogs/*
// @include        http://*.habrahabr.ru/blogs/*
// @include        http://habrahabr.ru/blog/*
// @include        http://*.habrahabr.ru/blog/*
// @exclude        http://habrahabr.ru/blog/*/edit/*
// @exclude        http://*.habrahabr.ru/blog/*/edit/*

var info = document.getElementById("info-search").getElementsByTagName("a");
var habrausername;
for (var i=0; i<info.length; i++){
  if (info[i].className=="habrauser") {
	habrausername=info[i].innerHTML;
  }
}

var wrapper=document.getElementById("main-content");
wrapper.innerHTML=wrapper.innerHTML.replace(/%username%/gm, habrausername);
	
// ==/UserScript==