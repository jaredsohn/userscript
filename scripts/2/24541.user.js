// ==UserScript==
// @name           Bebo typing speed cheat
// @namespace      typecheat
// @include        *typingspeed*
// ==/UserScript==

setInterval('YAHOO.tw._tk = function() {   YAHOO.tw._sc++;   if(YAHOO.tw._sc <= YAHOO.tw._tlim) {      gebi("timewindow").innerHTML = YAHOO.tw._tlim - YAHOO.tw._sc;      }   if(YAHOO.tw._sc > 90 && YAHOO.tw._bsta < 2) {      YAHOO.tw._stst();      } else if(YAHOO.tw._sc > 30 && YAHOO.tw._bsta < 2) {var timeleft = 90 - YAHOO.tw._sc; gebi("timediv").innerHTML = timeleft + " seconds";}   };',1000);