// ==UserScript==
// @name        Karachan /b/ title
// @namespace   *
// @description Changes title on Karachan.org's /b/ board
// @include     http://www.karachan.org/b/
// @include     http://www.karachan.org/b/*
// @version     1
// ==/UserScript==

var tytul = 'Kochane anuniaczki ;3'
var title = document.querySelectorAll('.logo');
title[0].innerHTML = '<img src="http://www.karachan.org/baners/fandom.php" alt="karachan.org"  width="300" height="106" /><br /><!--<img id="fandom_img" src="/baners/logo54.png" height="106" width="300">--><br>'+tytul;
document.title = tytul