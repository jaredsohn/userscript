// ==UserScript==
// @name          Refresh Any
// @description   Automatic Reload for any web page
// @include       http://www.baidu.com
// ==/UserScript==

var ONESEC   = 1000 ;        // One second (in ms)
var ONEMIN   = 60 * ONESEC ; // One minute (in ms)
var INTERVAL = 2 * ONEMIN ;  // How often is page refreshed (in ms)
  
window.setTimeout(
  function()
  {
    window.location.reload() ;
  },
  INTERVAL
) ;