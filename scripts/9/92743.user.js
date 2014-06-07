///////////////////////////////////////////
//
// ==UserScript==
// @name           Deckbox TCG Search
// @author         Momentum
// @version        0.1.4
// @namespace      http://userscripts.org/scripts/show/92743
// @description    0.1.4 - Adds a menu item to the Greasemonkey icon to convert absolute TCG links to name-based searches.
// @include        http://deckbox.org/*
// @require        http://sizzlemctwizzle.com/updater.php?id=92743
// ==/UserScript==
//
///////////////////////////////////////////
///////////////////////////////////////////
//
// Copyright (C) 2010 Momentum
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or any
// later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
///////////////////////////////////////////

(function() {try {

  LinkConverter = {
    convert: function() {
      var elementList = document.evaluate("//tr[@id]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);   
      var card, index;
      
      for (index=0; card = elementList.snapshotItem(index); index++) {
      
        var name = document.evaluate("./td[@class='card_name']/div/a", card, null, XPathResult.ANY_TYPE, null).iterateNext();
        var price = document.evaluate("./td[@class='center price tcgplayer_price_avg']/a", card, null, XPathResult.ANY_TYPE, null).iterateNext();
        
        if (name && price){
          price.href = 'http://store.tcgplayer.com/Products.aspx?GameName=Magic&Partner=DECKBOX&Name=' + name.textContent;
          price.style.color = 'purple';
        }
      } 
    }
  };
    
  GM_registerMenuCommand('Convert links to TCG searches', function(){LinkConverter.convert();});
  
  if(GM_getValue('oldInstall')!=true)
  {
    GM_setValue('oldInstall', true);
    alert("Thank you for installing the Deckbox TCG Search userscript!\n\n"+
      "To convert TCG hardlinks to name-based searches, right-click on the Greasemonkey icon in your status bar or navigate to its menu under 'Tools', then select 'User Script Commands...' and 'Convert links to TCG searches.'"+
      "\n\nUnfortunately, this sometimes disables the auto-complete feature for card entering, but it will work again if you reload or navigate to another page.");
  }
  
} catch(e) {dump('Deckbox TCG Search ('+e.lineNumber+'): '+e+'\n')} })();