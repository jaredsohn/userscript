// ==UserScript==
// @name        Auto PVP
// @namespace   StabSoftware
// @description Click the PVP button over and over
// @include     http://www.kingdomofloathing.com/peevpee.php
// @include     http://www.kingdomofloathing.com/peevpee.php?place=fight
// @version     1
// ==/UserScript==

(function () {
  var b = document.evaluate("//input[@value='A Fighter is You!' and @type='submit' and contains(@class, 'button')]", document, null, 9, null).singleNodeValue;
  if(b)
  {
    if(document.documentURI.contains("place=fight"))
    {
      b.value="A Repeat-Fighter is You!";
    }
    else		
    {
      b.click();
    }
  }
})();