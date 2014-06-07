// ==UserScript==
// @name         googlelogo
// @namespace    
// @description  googlelogo austauschen
// @include      http://*.google.*/*

// ...http://windoof.org/Programs/Images/suche_logo.gif... ersetzen

// ==/UserScript==

var Image = document.getElementById("logo");
Image.style.backgroundImage = "url("http://windoof.org/Programs/Images/suche_logo.gif")";
Image.style.width = "274";
Image.style.height = "120";
Image.src = "http://windoof.org/Programs/Images/suche_logo.gif";
Image.width = "274"
Image.height = "120"