// ==UserScript==
// @name              AdminTuLouco? v0.2
// @description	      Bypasses admin's evil word filter.
// @include		http://ptchan.net/*
// @include   http://www.ptchan.net/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

function sanitize (){
  var rgx = /(fir|fen|face|fin|rin|test|port|espa|pre|gaj)/gi;
  var txt = document.getElementsByName('message');
  txt[0].value = txt[0].value.replace (rgx, "$1\u00AD");
} 

(function () {
  var form = document.getElementById('postform');
  form.addEventListener ('submit', sanitize, true);
})();
