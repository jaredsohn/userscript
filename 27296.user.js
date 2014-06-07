// ==UserScript==
// @name          jQuery
// @namespace     http://www.joanpiedra.com/jquery/greasemonkey
// @description	  Play nicely with jQuery and Greasemonkey
// @author        Joan Piedra
// @homepage      http://www.joanpiedra.com/jquery/greasemonkey
// @include       *
// ==/UserScript==


// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
  else {
    $ = unsafeWindow.jQuery; letsJQuery();
  }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
  var test = $("table:eq(1) > tbody > tr:eq(4) > td:eq(0) > table:eq(0) > tbody >tr:eq(0) > td:eq(1)").text();
  if (test != "") {
    var url = window.location.href;
    if (!url.match("trefferliste.cgi")) {
      var value = GM_getValue("emails", "");
      GM_setValue("emails", value + + ", " + test);

      if (confirm("alle sehen") == true) {
        prompt("bitte", GM_getValue("emails", ""));
      }
      if (confirm("alle löschen") == true) {
        GM_setValue("emails", "");
        alert("alle emails gelöscht");
      }
    }
  }
}