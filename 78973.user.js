// ==UserScript==
// @name           fullscreen-vb
// @namespace      http://userscripts.org/users/177675
// @description    fullscreen foci vb.
// @include        http://sportgeza.hu/futball/2010/vb/elo/
// @author         keo
// @homepage       http://www.facebook.com/pages/fullscreen-vb/134444576567553
// ==/UserScript==

(function(){
  //boilerplate greasemonkey to wait until jQuery is defined...
  function GM_wait()
  {
    if(typeof unsafeWindow.jQuery == 'undefined')
      window.setTimeout(GM_wait,100);
    else
      unsafeWindow.jQuery(function() { letsJQuery(unsafeWindow.jQuery); });
  }
  GM_wait();

  function letsJQuery($)
  {
    $('embed').prependTo('body').wrap('<div id="warpah"/>');
    $('#warpah').css({'width': '100%', 'height': '100%', 'position': 'absolute'});
    $('embed').css({'width': '100%', 'height': '100%'});
    $('.wrapper').detach();
  }
})();