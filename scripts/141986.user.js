// ==UserScript==
// @name           Folha sem limites
// @author         Evandro Luiz e *cftw, thx to orkut exploits!
// @description    Remove a limitação de 20 paginas mensais do jornal folha de sao paulo.
// @version        1.1
// @include        http*folha.uol.com.br/*
// ==/UserScript==

document.getElementById("paywall").style.display = "none"; 
window.onscroll = function() { return true }; 
window.onresize = function() { return true }; 
document.body.style.overflow = "auto"