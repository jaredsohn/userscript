// ==UserScript==
// @name        Change Google Logo
// @namespace   abhisekp@engineer.com
// @description Changes the boring Google logo in the main google page to something more appealing from http://www.google.com/doodles/finder/2013/All doodles
// @include     *://*.google.tld/
// @updateURL     https://userscripts.org/scripts/source/172603.meta.js
// @downloadURL   https://userscripts.org/scripts/source/172603.user.js
// @version     1.6
// @grant       none
// ==/UserScript==
//var logoSrc = "http://www.google.com/logos/2013/new_years_day_2013-983008-hp.jpg";
var logoSrc = "https://lh3.googleusercontent.com/-FwBMabOCbFs/T__s1ir5LII/AAAAAAAABmc/u9lKkh63rMo/s1000-fcrop64=1,00000000ffffefa4/Abhisek---Small-Landscape.jpg";
var hplogo = document.getElementById('hplogo');
if(hplogo.tagName.toLowerCase() === 'img') hplogo.src = logoSrc;
else hplogo.style.background = "url(\""+logoSrc+"\") no-repeat scroll 0 0 / 275px 95px transparent";