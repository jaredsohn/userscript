// ==UserScript==
// @name        Zmiana nicka uzytkownika
// @include     http://*.wykop.pl/*
// @include     http://wykop.pl/*
// @grant       none
// @run-at document-end
// ==/UserScript==

//var lewak =;
if (typeof $ == 'undefined') {
 if (unsafeWindow.jQuery) {
  var $ = unsafeWindow.jQuery;
  $(document).ready(maine_functionb);
 } else {
  addJQuery(maine_functionb);
 }
} else {
 $(document).ready(maine_functionb);
}
function maine_functionb()

{
 "use strict";
 function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
 }
 var temp1 = {
	

//	'cheft': 'dobrychuj',
//	'testowynick': 'zamiana',
	'Ginden': 'PanWadas'
  
  
  
      };

 var xyz = function(){
  $('a[title^="profil"] img').each(function (i,el) {
  if (temp1[el.alt])
   {
    var $el = $(el);
    var li = $el.closest('li');
    var nick = $('strong', li).first();
    if (temp1[nick.text()]) {
     nick.html(temp1[nick.text()]);
    }
   }
  });

 };
 xyz();
 var abcd = function(obiekt, opcje) {
  if (opcje['data']) {
   var z = opcje['data'];
   
   var t = function(key, element) {
	var q = encodeURIComponent("@"+element);
	z = z.replace(new RegExp(q, "gi"), "%40"+key);

   };
   $.each(temp1, t);
   opcje['data'] = z;
  }
 };
 $.ajaxSetup({
  global: true,
  beforeSend: abcd,
  complete: xyz
  });
 
}


function addJQuery(callback) {
 var script = document.createElement("script");
 script.textContent = "$(document).ready(" + callback.toString() + ");";
 document.body.appendChild(script);
};