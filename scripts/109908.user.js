// ==UserScript==
// @name           personal autoclick test
// @namespace
// @description
// @include
// ==/UserScript==

function autoClick()
{
   for (var i=0;i=99;i++)
   {
      var buttonArray = document.getElementsByTagName("input");
      for (var a=0;a<inputs.length;i++)
      {
         buttonArray[a].click();
      }
      location.href = "/classes.php/"
   }
}

autoClick()