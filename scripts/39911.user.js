// ==UserScript==
// @name           Reparateme Ad Removal
// @namespace      77087
// @description    Remove poorly placed Reparateme ads
// @include        http://www.reparateme.com
var adBar = document.getElementById('rightpanel');
if(adBar)
{
  adBar.parentNode.removeChild(adBar);
}
// ==/UserScript==