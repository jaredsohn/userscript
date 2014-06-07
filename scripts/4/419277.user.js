// ==UserScript==
// @name        N-Central Refresh Active Issues
// @namespace   *
// @description Refresh Active Issues Page every 120 seconds.
// @version     1
// @grant       none
// ==/UserScript==
setInterval( function(){
    var clickEvent = document.createEvent ("HTMLEvents");
    clickEvent.initEvent("click",true, true);
    
    document.getElementById('menurow_Active Issues').dispatchEvent(clickEvent);
}, 120000);

