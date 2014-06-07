// ==UserScript==
// @name           Boursorama No Virtual Keyboard
// @namespace      boursorama
// @author         JrCs
// @version        1.0 (Feb 13, 2011)
// @description    Permet de désactiver le clavier virtuel de boursorama
// @include        https://www.boursorama.com/connexion*
// ==/UserScript==

if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}

// Disable the virtual keyboard
unsafeWindow.swapClientMembre = function(){}; 

