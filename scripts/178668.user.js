// ==UserScript==
// @name        Reload on Back using PageShow
// @namespace   JeffersonScher
// @description Bypass Firefox's tenacious caching and reload on Back
// @include     http://thepsas.org/forum/viewforum.php*
// @version     1
// ==/UserScript==

function doReload(){
  window.location.reload(); // reload this page
}
function addPageShow(){
  window.addEventListener('pageshow', doReload, false); // set up reload trigger
}
// Add the event listener after a 3 second delay (adding too soon leads to endless reloads)
window.setTimeout(addPageShow, 3000);