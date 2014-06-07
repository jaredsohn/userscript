// ==UserScript==
// @name           KU CSV transcript
// @namespace      pybt
// @description    This script append CSV format of transcript.
// @include        https://regis.ku.ac.th/stud_advisor.php
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait, 100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {

      var u = function(msg) {
        $("#csv").append(msg);
      }

      $("body").append('</br><hr><h2 style="background-color:yellow;text-align:center;">CSV</h2> \
          <pre id="csv" style="border-style:dotted;border-width:1px;padding: 5px 5px 5px 5px;"></pre>');

      $("table").each(function(i, table_e) {

        if(i >= 4) {
          $("tr", table_e).each(function(i, tr_e) {

             if($("td", tr_e).length == 4) {
              $("td", tr_e).each(function(i, td_e) {
                var text = $(td_e).text();
                text = text.replace(",", "");
                u(text);
                
                if(i != 3 && $("td", tr_e).length == 4) {
                  u(",");
                }});

              u("\n");
            }
          });}});
    }

