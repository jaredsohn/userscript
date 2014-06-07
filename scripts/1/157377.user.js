// ==UserScript==
// @name        0day Save to inbox checker
// @namespace   0day
// @description Check "Save to inbox" checkbox on write message or reply message pages
// @include     /^http:\/\/forum\.0day\.kiev\.ua\/index\.php\?.*act=Msg.*/
// @version     0.2
// ==/UserScript==
window.addEventListener('load', function(){
  document.getElementsByName('add_sent')[0].checked = true;
}, false)