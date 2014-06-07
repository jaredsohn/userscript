// ==UserScript==
// @name           Unfuddle Cocodot 
// @description    Adds "Select all" feature to unfuddle
// @version        0.0.01
// @license        GPL v3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://*.unfuddle.com/*ticket_reports*
// ==/UserScript==

// Add jQuery

  var GM_JQ = document.createElement('script');
  GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
  GM_JQ.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(GM_JQ);
  var GM_JQnC = document.createElement('script');
  GM_JQnC.innerHTML = 'jQuery.noConflict();';
  document.getElementsByTagName('head')[0].appendChild(GM_JQnC);
  
// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { 
      $_ = unsafeWindow.jQuery.noConflict(); executeChanges(); }
    }
    
    GM_wait();
    
function executeChanges() {
  $_('th.no_print').html("<input class='selectAll' type='checkbox'/>");
  $_('input.selectAll').click(function(){
    var newValue = $_(this).attr("checked");
    var stillChecking = true;
    $_(this).parent().parent().nextAll().each(function(){
      if (stillChecking) {
        if ($_(this).hasClass("row_0") || $_(this).hasClass("row_1")) {
          $_(this).find("td input").attr("checked",newValue);
        } else {
          stillChecking = false;
        }
      }
    });
  });
}