// ==UserScript==
// @name           Flash Ads Remover - Boosts Internet Speed
// @namespace      ~dkhal~
// @description    Removes flash to fasten your internet connection. Disabled while playing flash games.
// @include        *
// @copyright dkhal
// ==/UserScript==

// Thanks to AVG
for(i=0;i<document.embeds.length;i++){
document.embeds[i].parentNode.removeChild(document.embeds[i]);
}
