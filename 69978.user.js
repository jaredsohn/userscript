// ==UserScript==
// @name           Close dialog with ESC
// @namespace      stackoverflow
// @description    Attach Esc Key to close-popup dialog
// @include        *stackoverflow.com/*
// @include        *superuser.com/*
// @include        *serverfault.com/*
// ==/UserScript==

$ = unsafeWindow.$;

$(document).keypress(
   function(e){
      if(e.keyCode==27){
         $(".close-cancel").click();
      }
   }
);
