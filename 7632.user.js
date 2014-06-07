// Neopets - Lunar Temple
// by nungryscpro (nungryscpro@yahoo.com)
//
// ==UserScript==
// @name           Neopets - Lunar Temple
// @namespace      http://userscripts.org/users/22349
// @description    V 2.00 - Shows you the correct answer for the Lunar Temple.
// @include        http://www.neopets.com/shenkuu/lunar/?show=puzzle
// @include        http://neopets.com/shenkuu/lunar/?show=puzzle
// @version        2.00
// @updated        2009.09.12
// ==/UserScript==
//
// ==Update History==
// 1.0  - Released to public.
// 1.1  - Calculations changed.  Neopets fixed an anomaly with moons 8 and 9.
// 1.2  - Only shows up when you can make a selection.
//        Doesn't show the moon number anymore since the moons aren't numbered.
//        Other small cosmetic changes.
// 1.3  - Updated to work with the site layout change.
// 1.4  - Updated to work with the site layout change.
// 2.00 - Script rewrite.  Shouldn't be affected by any layout changes.  
// ==/Update History==
//

thisForm = document.getElementsByName('submitted')[0].parentNode;
if (thisForm){
  var moon = Math.round(document.body.innerHTML.match(/angleKreludor=(\d+)/)[1]/22.5 + 8) % 16;
  newElement = document.createElement("div");
  newElement.innerHTML='<div style="padding:2px; font-weight:bold; font-size:11pt; text-align:center; background-color:white; color:black;"> The correct lunar phase is:<br><br><img src="http://images.neopets.com/shenkuu/lunar/phases/'+ moon +'.gif" border="0" width="60" height="60"><br><br><font class="sf" color="#3a84b0">(Click the already selected circle to submit your answer.)</font></div><br>';
  thisForm.parentNode.insertBefore(newElement, thisForm);
  thisForm.getElementsByTagName('input')[moon + 1].checked = true;
}