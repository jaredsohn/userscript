// ==UserScript==
// @name           MyP2p.eu web-only streams
// @namespace      planetargon
// @description    Hides all non-web streams of matches
// @include        http://www.myp2p.eu/broadcast.php*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait,100);
  } else {
    $ = unsafeWindow.jQuery; letsJQuery();
  }
}

GM_wait();

function letsJQuery() {
  // Let's ditch all of the 'Offline' streams... no sense in the clutter
  $('tr td font').each(function(){
    if ($(this).attr('color') == 'red' ){
      $(this).parents('tr:first').hide();
    }
  });

  $('tr td a').each(function(){
    // we only want to find links that say, "Play"
    link_text = $(this).text();
    if (link_text == 'Play') {
      // we only want the streams that start with http:// (ignore sop://, mms://, etc.)
      if ($(this).attr('href').match(/http/)) {
        $(this).text('Watch Now');
      } else {
        $(this).parents('tr:first').hide();
      }
    }
  });
}
