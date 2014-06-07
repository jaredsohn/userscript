// ==UserScript==
// @name           selectMyLogin
// @namespace      http://sam.intelunix.fr
// @description    [FR] preselectionnne une adresse pour le login (vous épargne un click...)
// @include        http://id.orange.fr/auth_user/bin/authNuser.cgi?date=*
// ==/UserScript==


/* adapter l'adresse ci dessous */
var address='XXXX@wanadoo.fr'

function clickLiline(nb) {
   var div = document.evaluate('//tr[@id="thumbnailsContainer"]/td[@class="thumbnailShell"]/div[@title="'+address+'"]//img[@class="overlay"]',
      document,
      null,
      XPathResult.ANY_UNORDERED_NODE_TYPE,
      null).singleNodeValue;

   if (!div) {
      if (nb < 14) {
         setTimeout(clickLiline, 300, ++nb);
      }
      /* else {
         alert('on arrete tout '+nb);
      }
      */
   } else {
      if (div.dispatchEvent) {
         var evt = document.createEvent("MouseEvents");
         evt.initEvent("click", true, true);
         div.dispatchEvent(evt);
      }
   }
}

/* vim: set et sts=3 sw=3 foldmethod=marker : */

clickLiline(0);