// ==UserScript==
// @name        Endless Improvement
// @description Script dedicated to improving kruv's endless battle browser game
// @namespace   http://feildmaster.com/
// @include     http://www.kruv.net/endlessBattle.html
// @version     1
// @grant       none
// ==/UserScript==

// Start "Selling Inventory Items"
game.inventory.sell = function sell(item) {
    // Get the sell value and give the gold to the player; don't use the gainGold function as it will include gold gain bonuses
    var value = item.sellValue;
    game.player.gold += value;
    // Increase stats!
    game.stats.itemsSold++;
    game.stats.goldFromItems += value;
}

var autoSellLoot = false;
game.inventory.lootItem = function lootItem(item) {
    for (var x = 0; x < game.inventory.maxSlots; x++) {
        if (game.inventory.slots[x] == null) {
            // You can only sell what you can carry!
            if (autoSellLoot && !(item.rarity == ItemRarity.LEGENDARY || item.rarity == ItemRarity.EPIC)) {
                game.inventory.sell(item);
            } else {
                game.inventory.slots[x] = item;
                $("#inventoryItem" + (x + 1)).css('background', ('url("/includes/images/itemSheet2.png") ' + item.iconSourceX + 'px ' + item.iconSourceY + 'px'));
            }
            game.stats.itemsLooted++;
            break;
        }
    }
}
// End selling items

// Start fixing health - can be removed when 
game.player.baseHealthLevelUpBonus = 0;
game.player.baseHp5LevelUpBonus = 0;
    
// Add stats to the player for leveling up
for (var x = 1; x < game.player.level; x++) {
    game.player.baseHealthLevelUpBonus += Math.floor(game.player.healthLevelUpBonusBase * (Math.pow(1.15, x)));
    game.player.baseHp5LevelUpBonus += Math.floor(game.player.hp5LevelUpBonusBase * (Math.pow(1.15, x)));
}
// End fixing health

// Start insert script options
$("#optionsWindowOptionsArea").append('<div id="improvementOptionsTitle" class="optionsWindowOptionsTitle">Endless Improvement Options</div>');
// Add function to toggle selling ability
game.autoSellOptionClick = function autoSellOptionClick() {
    autoSellLoot = !autoSellLoot;
    $("#autoSellValue").html(autoSellLoot?"ON":"OFF");
}
// Add option for auto sell inventory items
$("#optionsWindowOptionsArea").append('<div class="optionsWindowOption" onmousedown="game.autoSellOptionClick()">Auto sell new (non-rare) loot: <span id="autoSellValue">OFF</span></div>');
// End insert script options