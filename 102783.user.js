// ==UserScript==
// @name           Logo-Replacement
// @namespace      Chaoten-Treff_Logo_Tausch
// @include        http://chaoten.hanseknaller.de/*
// ==/UserScript==
var oldLogo = document.getElementById('logo');
var newLogo = document.createElement('img');
newLogo.id = "SemperVideo-Logo";
newLogo.border = 'no'
newLogo.src = 'http://s7.directupload.net/images/user/110426/d8rqgijy.gif';
oldLogo.parentNode.replaceChild(newLogo, oldLogo);
