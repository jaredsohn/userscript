// ==UserScript==
// @name           no_garantie_rdc
// @namespace      Vire la garantie
// @include        http://www.rueducommerce.fr/info/basket/caddie_confirmation.cfm*
// ==/UserScript==

if(document.location.href.indexOf('contrat_or=non')==-1)
window.open('/info/basket/caddie_confirmation.cfm?contrat_or=non','_top');
