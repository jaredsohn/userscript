// ==UserScript==
// @name          Swap Translate Language
// @author        Allen.Jiang - netnewer@gmail.com
// @namespace     http://GT.Script.net/gm
// @description   Add  new future for google.com Translate index webpage. swap tow different languange options in selectors.
// @include       http://www.google.*/language_tools?hl=*
// @date          2009-07-23
// @version       1.0
// @GM_version    0.8.2
// ==/UserScript==

(function(){
var g_sl = document.getElementsByName("sl")[1];
var g_tl = document.getElementsByName("tl")[1];

function SwapLanguage()
{
   var sl_v = getSelectorValue(g_sl);
   var tl_v = getSelectorValue(g_tl);
   if(sl_v == null || tl_v == null) return;
   setSelectorValue(g_sl,tl_v);
   setSelectorValue(g_tl,sl_v);
}
function setSelectorValue(objSel,objValue)
{
   for(var i=0;i<objSel.options.length;i++)
   {
      if(objSel.options[i].value == objValue)
         objSel.options[i].selected = true;
   }
}

function getSelectorValue(objSel)
{
   var retValue = null;
   for(var i=0;i<objSel.options.length;i++)
   {
      if(objSel.options[i].selected) retValue = objSel.options[i].value;
   }
   
   
   return retValue;
}

function addSwapBtn()
{
   var swapBtn = document.createElement("SPAN");
   swapBtn.innerHTML = "swap";
   swapBtn.style.color = "blue";
   swapBtn.style.paddingLeft = 15;
   swapBtn.style.paddingRight = 15;
   swapBtn.style.backgroundColor = "#FFFF99";
   swapBtn.style.cursor = "pointer";
   swapBtn.addEventListener('click', SwapLanguage, true);
   g_sl.parentNode.insertBefore(swapBtn,g_tl.nextSibling);
}


if(g_sl && g_tl)
{
  addSwapBtn();
}
else
  return;

})();
