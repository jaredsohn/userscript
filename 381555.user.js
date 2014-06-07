// ==UserScript==
// @name  Quora FistLogin popup remover
// @include 
// @description  Just remove popup , that shows up just afther registration
// @include      http://*quora.com*

// ==/UserScript==

(function(){
  //boilerplate greasemonkey to wait until jQuery is defined...
  function GM_wait()
  {
    if(typeof unsafeWindow.jQuery == 'undefined')
      window.setTimeout(GM_wait,100);
    else
      unsafeWindow.jQuery(function() { letsJQuery(unsafeWindow.jQuery , unsafeWindow); });
  }
  GM_wait();

  function letsJQuery($ , usw)
  {
  $( document ).ready(function() {
$('.modal_nux_background').remove();
$('.dialog_wrapper').remove();
});

  }
})();



