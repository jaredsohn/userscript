// ==UserScript==
// @name			Force AutoComplete at phpMyAdmin
// @include			http://phpmyadmin.*
// @include			http://*/phpmyadmin/*
// @description		Makes autocomplete always on for phpMyAdmin login form.
// ==/UserScript==
// @author			Francisco Lopes
// @date			11/10/2007

(function() {
   var form;

   form = document.getElementsByTagName('form');
   if(form) {
      for(i = 0; i < form.length; i++) {
         form[i].setAttribute('autocomplete', 'on');
      }
   }
})();