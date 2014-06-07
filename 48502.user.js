// ==UserScript==
// @name           Ogame: remove td's background
// @namespace      http://m0riarty.ya.ru
// @include        http://uni*.ogame.*/game/index.php*
// ==/UserScript==
  // Add jQuery
  var GM_JQ = document.createElement('script');
  GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
  GM_JQ.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(GM_JQ);

  // Check if jQuery's loaded
  function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') {
      window.setTimeout(GM_wait,100); }
    else { 
      $ = unsafeWindow.jQuery; letsJQuery(); 
    }
  }
  GM_wait();

  // All your GM code must be inside this function
  function letsJQuery() {
    //alert($); // check if the dollar (jquery) function works
    $(document).ready(function() {
	$('td.l').css('background-image', 'url()');
    });
  }