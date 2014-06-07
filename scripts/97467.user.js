// ==UserScript==
// @name            bgu.ac.il AUTOCOMPLETE ON
// @namespace       
// @description     
// @include         http://bgu4u.bgu.ac.il/html/*
// ==/UserScript==

// changes the AUTOCOMPLETE field to ON,
//so now you can save username&password in the password manager of your browser.

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

