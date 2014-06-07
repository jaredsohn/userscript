// ==UserScript==
// @name          73iru
// @namespace	  
// @author        
// @description   cuts google logo

// @include       http://*.google.pl
// @include       http://*.google.com
// @grant	      GM_getValue
// @grant	      GM_setValue
// @grant	      GM_xmlhttpRequest
// @version       1.0.0
// ==/UserScript==

var logo = document.getElementById('hplogo');

logo.style.display='none';