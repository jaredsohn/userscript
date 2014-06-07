// ==UserScript==
// @name			Steam Trading Offer Enhancer
// @namespace		offerenhancer
// @version			1
// @description		Enhances the experience of trading
// @match			http://steamcommunity.com/tradeoffer/new/*
// @copyright		2014 duperp
// ==/UserScript==

var filter_item = $J('.filter_ctn');

function AddItemsToTrade(items) {
    if (items.length) {
      OnDoubleClickItem(null, items.pop());
      setTimeout(function() {AddItemsToTrade(items)}, 50);
    }
}

function RemoveItemsFromTrade(name) {
    var item = $J(name).children(":first")[0];
    if (item.hasItem) {
      OnDoubleClickItem(null, item.down('.slot_inner').children[0]);
      setTimeout(function() {RemoveItemsFromTrade(name)}, 100);
    }
}

$J('.offerheader').eq(0).prepend('<h2 id="itemcountyours"> 0 </h2>');
$J('.offerheader').eq(1).prepend('<h2 id="itemcounttheirs"> 0 </h2>');

function UpdateTheirItemCountInTrade() {
  var slots = $J('#their_slots').children();
  var count = 0;
  while (slots[count].hasItem) {
    count++;
  }
    $J('#itemcounttheirs').text('Count: ' + count); 
}

function UpdateYourItemCountInTrade() {
  var slots = $J('#your_slots').children();
  var count = 0;
  while (slots[count].hasItem) {
    count++;
  }
    $J('#itemcountyours').text('Count: ' + count); 
}

setInterval(function() { UpdateTheirItemCountInTrade(); }, 100);
setInterval(function() { UpdateYourItemCountInTrade(); }, 100);

if(filter_item) {
    filter_item.append('<button type="button" class="btn_grey_grey btn_small_thin" id="addmultiple"><span>Add filtered items</span></button>');
    filter_item.append('<button type="button" class="btn_grey_grey btn_small_thin" id="removetheir"><span>Remove all items from their slots</span></button>');
    filter_item.append('<button type="button" class="btn_grey_grey btn_small_thin" id="removeyour"><span>Remove all items from your slots</span></button>');
    $J('#removetheir').click(function() {   
        RemoveItemsFromTrade('#their_slots');
        
    });
    $J('#removeyour').click(function() {   
        RemoveItemsFromTrade('#your_slots');
        
    });
    $J('#addmultiple').click(function() {
        var amount = Number(prompt("Amount of items", ""));
        if (isNaN(amount) || amount < 1) return;
        
        var items = g_ActiveInventory.rgItemElements;
        items_to_add = [];
        var added_count = 0;
        for ( var index = 0; index < items.length; index++ ) {
            if (added_count >= amount) break;
            
            var current_item = items[index];
            if (current_item.filtered) continue;
            if (BIsInTradeSlot(current_item.rgItem.element)) continue;
    
            items_to_add.push(current_item);
            added_count++;          
        }
        
        AddItemsToTrade(items_to_add);
        
    });
}

