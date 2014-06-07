// ==UserScript==
// @name           Remove Google Ads from DU
// @namespace      http://dev.dvia.com
// @description    Remove Google Ads from Democratic Underground Forums.
// @include        http://www.democraticunderground.com/discuss/duboard.php*
// ==/UserScript==


function exampleBrowserStartup(event)
{
  // place your startup code here
  var regexT = /\<iframe [^\>]+\>/gi;  

document.body.innerHTML= document.body.innerHTML.replace(regexT,"");
}
window.addEventListener("load", exampleBrowserStartup, false);

