// ==UserScript==
// @name           Wowhead Item List 2 TSM Shopping List
// @namespace      WoWHead
// @description    generates a list of this items for importing in TSM as a shopping list
// @include        http://www.wowhead.com/items*
// ==/UserScript==                       

function showTSMShoppingList() {
  
  window.unsafeWindow || (
    unsafeWindow = (function() {
      var el = document.createElement('p');
      el.setAttribute('onclick', 'return window;');
      return el.onclick();
      }())
  );
  
  var g_items = Object.keys(unsafeWindow.g_items);
  var itemIDs = [];
  for (var count = 0; count < g_items.length; count++) {
      if(g_items[count].match("[0-9]*")[0] == g_items[count]) {
        itemIDs.push(g_items[count]);
      }
  }
  prompt("copy this:", "s1@"+itemIDs.join()+"$@");
}


var showTSMShoppingListButton = document.createElement("input");
showTSMShoppingListButton.type = "button";
showTSMShoppingListButton.value = "show TSM shopping list";
showTSMShoppingListButton.onclick=showTSMShoppingList;

var buttons = document.getElementsByClassName("listview-withselected")[0];
buttons.insertBefore(showTSMShoppingListButton, buttons.lastChild.nextSibling);
