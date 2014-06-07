// ==UserScript==
// @name           MixRiot Downloader
// @namespace      http://logankoester.com
// @include        http://www.mixriot.com/content/*
// @include        http://www.mixriot.com/en/content/*
// @version        0.2
// @description    Replace the paid download link on MixRiot with a free download link instead.
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://www.mixriot.com/misc/jquery.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// Greasemonkey code goes in here
function letsJQuery() {

  // returns value of parm from string
  // Borrowed from http://www.irt.org/articles/js063/index.htm
  function getParm(str,parm) {
      var startPos = str.indexOf(parm + "=");
      if (startPos > -1) {
          startPos = startPos + parm.length + 1;
          var endPos = str.indexOf("&",startPos);
          if (endPos == -1)
              endPos = str.length;
          return unescape(str.substring(startPos,endPos));
      }
      return '';
  }

  // Extract the URL of the mp3 and replace the download link
  $(document).ready(function(){
    var flashvars = $('param[name=FlashVars]').val();
    var soundFile = getParm(flashvars, "soundFile");
    $('.audio_download_link').replaceWith('<a href="' + soundFile + '">DOWNLOAD MIX FOR FREE</a>');
  });
}