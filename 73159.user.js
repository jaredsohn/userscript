// ==UserScript==
// @name           Kill jNotifica
// @namespace      http://userscripts.org/users/143579
// @include        *
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

jQuery.jnotifica = null;

jQuery(document).ready(function() {
  $('.jnotifica_cont').remove();
});