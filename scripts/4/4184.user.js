// ==UserScript==
// @name          Check the box lolol
// @description	  
// @include       www.thedomainyouwantittoaffectandstuff.com
// ==/UserScript==

(function() {
window.addEventListener(
    'load', 
    function() { document.getElementsByName('attr_104_correct')[0].checked = true; },
    true);
window.addEventListener(
    'load', 
    function() { document.getElementsByName('attr_56_correct')[0].checked = true; },
    true);
})();