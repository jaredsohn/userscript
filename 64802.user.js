// ==UserScript==
// @name           Ikariam Forum Logo Changer
// @version        0.04
// @namespace      krwq_ikariam
// @description    Ikariam Forum Logo Changer

// @include        http://board.ikariam.pl/*

// @history        0.01 Pierwsza wersja
// @history        0.02 Dodany auto-update
// @history        0.03 Test auto-update'a
// @history        0.04 Test auto-update'a

// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57756.user.js

// @resource       MainLogo http://board.ikariam.ru/wcf/images/ikariam/headtestie6.png

// ==/UserScript==

ScriptUpdater.check(64802, '0.04');

var elems = document.getElementsByTagName("img");

for(var i = 0; i < elems.length; i++)
 {
  if(elems[i].src.match(/headtestie6.png/))
   {
    elems[i].src = GM_getResourceURL('MainLogo');
   }
 }