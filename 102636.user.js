///////////////////////////////////////////
//
// ==UserScript==
// @name           Cart Clear
// @author         Momentum
// @version        0.1.0
// @namespace      http://userscripts.org/scripts/show/102636
// @description    0.1.0 - Adds a menu item to the Greasemonkey icon to set all items in your TCG cart to zero.
// @include        http://store.tcgplayer.com/shoppingcart.aspx
// @require        http://sizzlemctwizzle.com/updater.php?id=102636
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

  CartClearer = {
    clear: function() {
      var elementList = document.evaluate("//td[@class='SHProductQty default_8']/input[@type='text']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);   
      var card, index;
      
      for (index=0; item = elementList.snapshotItem(index); index++) {
		item.value='0';
	  } 
    }
  };
    
  GM_registerMenuCommand('Clear TCG cart', function(){CartClearer.clear();});
  
} catch(e) {dump('Cart Clear ('+e.lineNumber+'): '+e+'\n')} })();