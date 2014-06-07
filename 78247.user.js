scr_meta=<><![CDATA[
// ==UserScript==
// @name           Renforts CdR
// @namespace     Renforts CdR
// @description    Permet de soigner le nombre exact d'hommes que l'on veut
// @include        http://*campagne-de-russie.com/perso.php
// @version        1.0.1
// ==/UserScript==
]]></>.toString();

changer_select();

function changer_select()
{
   var select = document.evaluate("//select[@name='renfort']",
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
      
   var source = document.body.innerHTML;
   var nb_renforts = source.match(/<strong>Réserve :<\/strong> ([0-9]+)<br>/)[1];
   //alert(nb_renforts);
   var nb_pa = source.match(/<strong>PA :<\/strong> ([0-9]+)<br>/)[1];
   //alert(nb_pa);
   if (nb_pa >= 10)
   {
      for (var i = 1; i<=nb_renforts ; i++)
      {
         select.options[i] = null;
         select.options[i] = new Option(i+((i == 1) ? " homme" : " hommes"), i);
      }
   }
}