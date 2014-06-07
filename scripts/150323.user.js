// ==UserScript==
// @name   unkar.user.js
// @include http://unkar.org/*
// @author  LicenseFreeSoftware (CC BY-ND 3.0)
// @licence http://creativecommons.org/licenses/by-nd/3.0/deed.ja
// ==/UserScript==

(function(){if(''!=document.title){
  var ele=document.createElement('div');ele.id='unkar.user.js';ele.innerHTML=
  '<style>#main,.topbox *{display:none !important;}</style>'+
  '<style>a[href="http://unkar.org/help/"]{display:none !important;}</style>';
  var objBody=document.getElementsByTagName('body').item(0);
objBody.appendChild(ele);}})();
