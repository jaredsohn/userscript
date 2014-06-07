// ==UserScript==
// @name        T-Square Anti-Timeout
// @namespace   williamstamper.com
// @include     *t-square.gatech.edu*
// @include     *t2.gatech.edu*
// @match       *t-square.gatech.edu*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

window.setInterval(
  function(){
    alert = $('#timeout_alert_body');
    if(alert != null && alert.length != 0)
    {
      alert.find('input').click();
    }
  }
,1000);
