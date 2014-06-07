// ==UserScript==
// @name          SukaStatus Logo On Google
// @namespace     http://userscripts.org/scripts/show/92702
// @include       http://google.*/*
// @include       http://*.google.*/*
// @version       1.0
// @description   Replacing Google's logo with SukaStatus logo

// ==/UserScript==

var logoku = document.createElement('img');
logoku.title = 'SukaStatus';
logoku.setAttribute('border', 0);
logoku.src = 'http://a3.sphotos.ak.fbcdn.net/hphotos-ak-snc6/260164_169295953133316_169295576466687_439880_2305978_n.jpg';

var elmNewContent = document.createElement('a');
elmNewContent.href = 'http://www.facebook.com/pages/SukaStatus/169295576466687';
elmNewContent.appendChild(logoku);

var elmLogo = document.getElementById('logo');
elmLogo.parentNode.replaceChild(elmNewContent, elmLogo);