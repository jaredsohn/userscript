// ==UserScript==
// @name           FFToolbox Ticker Remover
// @namespace      http://www.mattblodgett.com/
// @description    Removes the scrolling ticker from FFToolbox
// @include        http://www.fftoolbox.com/*
// ==/UserScript==

/*************************************************************************************/
// The code below is adapted from here: http://abeautifulsite.net/notebook/90
// This technique for loading jQuery was necessary because @require would not work.

var GM_jQuery = document.createElement('script');
GM_jQuery.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
GM_jQuery.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_jQuery);

function GM_wait() {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
    $ = unsafeWindow.jQuery;
    GM_ready();
  }
}
GM_wait();

function GM_ready() {
  main();
}


/**************************************************************************************/

function main() {
  var ticker = $("#TICKER");
  ticker.remove();
}