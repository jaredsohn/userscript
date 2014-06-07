// Neopets - PIN Filler
// by nungryscpro (nungryscpro@yahoo.com)
//
// ==UserScript==
// @name           Neopets - PIN Filler
// @namespace      http://userscripts.org/users/22349
// @description    V 1.00 - Automatically fills your PIN
// @include        http://www.neopets.com/bank.phtml
// @include        http://www.neopets.com/safetydeposit.phtml*
// @include        http://www.neopets.com/market.phtml?type=till
// @include        http://www.neopets.com/market.phtml*type=your*
// @include        http://www.neopets.com/market_your.phtml
// @include        http://www.neopets.com/battledome/battledome.phtml?type=equip*
// @include        http://www.neopets.com/gallery/quickremove.phtml
// @include        http://www.neopets.com/gallery/index.phtml*dowhat=remove*
// @include        http://www.neopets.com/disown.phtml
// @include        http://www.neopets.com/email_change.phtml
// @include        http://www.neopets.com/stockmarket.phtml?type=portfolio*
// @include        http://www.neopets.com/pound/transfer_confirm.phtml
// @include        http://www.neopets.com/pound/abandon.phtml
// @include        http://www.neopets.com/closet.phtml*
// @include        http://www.neopets.com/neohome/shed*
// @version        1.00
// @updated        2009.07.24 
// ==/UserScript==

var pin = 1234;
if (document.getElementById('pin_field')){
  for (var x = 0; x <= 5; x++){
    window.setTimeout(function(){document.getElementById('pin_field').value = pin;}, x * 500);
  }
}
