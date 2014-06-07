// ==UserScript==
// @name        New Google Logo
// @description Changes the Google logo to the new flat look logo
// ==/UserScript==
var logoSrc = "https://www.google.com/images/srpr/logo6w.png";
var hplogo = document.getElementById('hplogo');
if(hplogo.tagName.toLowerCase() === 'img') hplogo.src = logoSrc;
else hplogo.style.background = "url(\""+logoSrc+"\") no-repeat scroll 0 0 / 275px 95px transparent";