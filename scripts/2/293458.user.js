// ==UserScript==
// @name        Mirko ctrl+enter
// @namespace   OK
// @description Kombinacja klawiszy ctrl+enter wysyła wiadomość
// @include     http://www.wykop.pl/*
// @version     1.0
// @author      Wiceps
// ==/UserScript==

$('textarea[name="entry[body]"], textarea[name="pm[body]"], textarea[name="comment[text]"]').live('keydown', function(e) {
   if(e.ctrlKey && e.keyCode == 13) {
      $(e.target).closest('form').submit();
   }
});