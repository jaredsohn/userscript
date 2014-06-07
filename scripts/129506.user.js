// ==UserScript==
// @id             Google Plus Modifications
// @name           Google Plus Modifications
//// @description  Tweaks and fixes for google plus
// @author         Carl Kelly


// @include	https://plus.google.com/*
// @include	http://plus.google.com/*
// ==/UserScript==


var gbx3 = document.getElementById('gbx3');
gbx3.parentNode.removeChild(gbx3);

var gbz = document.getElementById('gbz');
gbz.parentNode.removeChild(gbz);

var gbzc = document.getElementById('gbzc');
gbzc.parentNode.removeChild(gbzc); 


var wT = document.getElement('wT');
wT.parentNode.removeChild(wT); 

//Remove bar links
// wT
// gb 70
// gbq top=0
// <div class="Dk2cHb vOdz0d" style=​"height:​ 70px;​ ">​…​</div>​
// gbu top=0
// gbvg class=gbtc first li
// <div class="EziK2e k-B-fa-nb k-fa k-B-fa-wf-mf"> width 1200
// contentPane width = 800px