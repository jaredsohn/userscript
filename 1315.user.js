// ==UserScript==
// @name          Force AutoComplete
// @namespace     http://loucypher.cjb.net/
// @include       *
// @exclude       http://greasemonkeyed.com/*
// @exclude       http://userscript*.com/*
// @description	  Makes autocomplete always on
// ==/UserScript==
// Changelog:
// - Conditions added

(function() {
  var form, input;
  form = document.getElementsByTagName('form');
  if(form) {
    for(i = 0; i < form.length; i++) {
      form[i].setAttribute('autocomplete', 'on');
    }
    input = document.getElementsByTagName('input');
    for(i = 0; i < input.length; i++) {
      if(input[i].type=='text') {
        input[i].setAttribute('autocomplete', 'on');
      }
    }
  }
})();
