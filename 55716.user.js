// ==UserScript==
// @name           fishy Chum Shop Helper
// @namespace      kiyoshii
// @description    (:
// @include        http://apps.facebook.com/fishwrangler/customize/chum
// @include        http://apps.facebook.com/fishwrangler/earl-lavashack
// @credit         wr3cktangle
// ==/UserScript==

var inputs = document.getElementsByTagName("input");
var affectedCount = 0;

if(inputs)
{   
   for(i = 0; i < inputs.length; i++)
   {
      if(inputs[i].name.indexOf("quantity_") != -1 && inputs[i].maxLength != 3)
      {
         inputs[i].maxLength = 3;         
         affectedCount++;
      }
   }
   document.body.innerHTML = document.body.innerHTML + "<br /><br />Fish Wrangler Chum Shop Helper helped you " + affectedCount + " time(s).<br /><br /><br />";
}