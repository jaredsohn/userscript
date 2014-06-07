// ==UserScript==
// @name            SimplifySignatures
// @namespace       simplifysignatures
// @description     Stops the dirty visual terrorists in user's signatures
// @include         http://www.newkaliningrad.ru/forum/topic/*
// @version         1.1
// @icon            http://www.klgd.ru/city/characters/gerb.png
// @grant           none
// ==/UserScript==

 var signatures = document.getElementsByClassName('signature');

 for (var i = 0; i < signatures.length; i++)
    signatures[i].innerHTML = signatures[i].innerHTML.replace(/<([^!a\/]|\/[^a])[^>]*>/g, '');  // remove all crap except of links