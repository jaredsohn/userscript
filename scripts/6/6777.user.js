// ==UserScript==
// @name                NW Inventory Stacker
// @namespace           
// @description         Combines multiple instances of a repeating item.
// @include             http://www.nexuswar.com/map/*
// @include             http://nexuswar.com/map/*
// ==/UserScript==

var firstid = new Array();
var itemcount = new Array();
var stackable = new Array();

// populate stackable
stackable[0]  = "Arrow";
stackable[1]  = "Apple";
stackable[2]  = "Bag of Industrial Plastic";
stackable[3]  = "Banana";
stackable[4]  = "Batch of Leather";
stackable[5]  = "Batch of Mushrooms";
stackable[6]  = "Blood Ice";
stackable[7]  = "Book of Matches";
stackable[8]  = "Bottle of Holy Water";
stackable[9]  = "Bottle of Paradise Water";
stackable[10] = "Bottle of Bourbon";
stackable[11] = "Bottle of Champagne";
stackable[12] = "Bottle of Port";
stackable[13] = "Bottle of Rum";
stackable[14] = "Bottle of Scotch";
stackable[15] = "Bottle of Tequila";
stackable[16] = "Bottle of Whiskey";
stackable[17] = "Bottle of Wine";
stackable[18] = "Bunch of Daisies";
stackable[19] = "Bunch of Lilies";
stackable[20] = "Bunch of Paradise Lilies";
stackable[21] = "Candy Bar";
stackable[22] = "Can of Black Beans";
stackable[23] = "Can of Chicken Soup";
stackable[24] = "Can of Chili con Carne";
stackable[25] = "Can of Creamed Corn";
stackable[26] = "Can of Green Beans";
stackable[27] = "Can of Peaches";
stackable[28] = "Can of Preserved Meat";
stackable[29] = "Can of Tomato Soup";
stackable[30] = "Can of Vegetables";
stackable[31] = "Can of Vegetable Soup";
stackable[32] = "Chunk of Brass";
stackable[33] = "Chunk of Iron";
stackable[34] = "Chunk of Ivory";
stackable[35] = "Chunk of Onyx";
stackable[36] = "Chunk of Steel";
stackable[37] = "Chunk of Stygian Iron";
stackable[38] = "Concussion Grenade";
stackable[39] = "Dose of Amphetamines";
stackable[40] = "Dose of Painkillers";
stackable[41] = "First Aid Kit";
stackable[42] = "Femur";
stackable[43] = "Field Ration Pack";
stackable[44] = "Fragmentation Grenade";
stackable[45] = "Fuel Can";
stackable[46] = "Gold Ingot";
stackable[47] = "Handful of Grave Dirt";
stackable[48] = "Handful of Strawberries";
stackable[49] = "Humerus";
stackable[50] = "Kiwi";
stackable[51] = "Lead Brick";
stackable[52] = "Lemon";
stackable[53] = "Lime";
stackable[54] = "Magic Marker";
stackable[55] = "Newspaper";
stackable[56] = "Orange";
stackable[57] = "Pack of Cigarettes";
stackable[58] = "Padlock";
stackable[59] = "Patch of Lichen";
stackable[60] = "Patch of Moss";
stackable[61] = "Peach";
stackable[62] = "Pear";
stackable[63] = "Piece of Chalk";
stackable[64] = "Piece of Stygian Coal";
stackable[65] = "Piece of Wood";
stackable[66] = "Pistol Round";
stackable[67] = "Pistol Speedload Clip";
stackable[68] = "Rifle Magazine";
stackable[69] = "Rifle Round";
stackable[70] = "Rock";
stackable[71] = "Rose";
stackable[72] = "Quiver of Arrows";
stackable[73] = "Set of Lockpicks";
stackable[74] = "Shotgun Shell";
stackable[75] = "Silver Ingot";
stackable[76] = "Skull";
stackable[77] = "Small Bottle of Gunpowder";
stackable[78] = "SMG Clip";
stackable[79] = "SMG Round";
stackable[80] = "Soul Ice";
stackable[81] = "Spool of Copper Wire";
stackable[82] = "Sprig of Nightshade";
stackable[83] = "Throwing Knife";
stackable[84] = "Vial of Angel\'s Tears (magical)";
stackable[85] = "White Phosphorus Grenade";

var basicactionsdiv = document.getElementById("basicactions");

if (!basicactionsdiv) return;

var allitems = document.evaluate(
               ".//form[@action='/map/trade.do']/select[@name='instanceID']/option",
               basicactionsdiv,
               null,
               XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
               null);

if (!allitems.snapshotLength) return;

for (var i = 0; i < allitems.snapshotLength; i++) {
  countitems(i, allitems);
}

// global list of items to stack
function countitems(i, allitems) {
  for (var j = 0; j < stackable.length; j++) {
    if (allitems.snapshotItem(i).firstChild.data == stackable[j]) {
        stackitems(i, allitems, j);
        return;
    }
  }
}

// increment count, remove extra items
function stackitems(i, allitems, j) {
  var thisitem = allitems.snapshotItem(i);
  if (itemcount[j] == null) {
    itemcount[j] = 0;
  }
  itemcount[j]++;
  if (itemcount[j] == 1) {
    firstid[j] = i;
  }
  if (itemcount[j] > 1) {
    allitems.snapshotItem(firstid[j]).firstChild.data = stackable[j] + " (x" + itemcount[j] + ")";
    thisitem.parentNode.removeChild(thisitem);
  }
}