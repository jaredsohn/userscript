// ==UserScript==
// @name           Facebook - Fish Wrangler Chum Shop Helper
// @namespace      wr3cktangle
// @description    Increased maxlength on quantity fields from 2 to 3.
// @include        http://apps.facebook.com/fishwrangler/customize/chum
// @include        http://apps.facebook.com/fishwrangler/earl-lavashack
// @versions       1.1 - Added Earl's Lavashack at Magma Reef to includes
// @versions       1.0 - Initial Release
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