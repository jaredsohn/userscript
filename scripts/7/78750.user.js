// ==UserScript==
// @name          Google NoBackground
// @namespace     http://blog.gkhn.net
// @description   Returns Google back to usual.
// @include       http://www.google.com/
// @include       http://www.google.com.tr/
// ==/UserScript==
window.setTimeout(function(){
	document.body.removeChild(document.getElementById('fpdi'));var s = document.createElement('style');s.innerHTML = '#fctr, #fctr a, .sblc a, #cpFooter a, #cpf a, #prm a, #addlang, #addlang a{color:#0000FF;text-shadow:none;}#fctr p{color:000;text-shadow:none;}';document.body.appendChild(s);document.getElementById('logo').style.backgroundImage = 'url("http://www.google.com/intl/en_ALL/images/srpr/logo1w.png")';
},1500);