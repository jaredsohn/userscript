// ==UserScript==
// @name           psychic minion
// @description    enable pm
// @include        http://apps.facebook.com/vampiresgame/properties.php
// ==/UserScript==

function en_pm()
{
  document.input.disabled = "false";
  setTimeout(en_pm,2000);
}
setTimeout(en_pm,1000);