// ==UserScript==
// @name           Stiahnut titulky hned
// @namespace      http://www.titulky.com
// @description    zobrazi tlacitko download
// @include        http://www.titulky.com/*
// ==/UserScript==

function starter(){

	var downdiv = document.getElementById("downdiv");
  downdiv.style.display='block';
  
  
}


//waits till page is loaded
window.addEventListener("load", starter, false);