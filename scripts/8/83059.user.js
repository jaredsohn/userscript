// ==UserScript==
// @name           BvS Automated Card Trade Suggestions
// @namespace      BvS
// @description    Auto-suggests "useless" cards for trading.
// @include        http://*animecubed.com/billy/bvs/pizzawitchgarage.html
// ==/UserScript==

function arrayContains(arr, obj) {
  var i = arr.length;
  while (i--) {
    if (arr[i] === obj) {
      return true;
    }
  }
  return false;
}

var labels = new Array();

var cardSets = new Array();
cardSets["Special Collection"] = 0;
cardSets["Style Selection"] = 1;
cardSets["Easy Street"] = 2;
cardSets["Midnight Run"] = 3;
cardSets["Maximum Tune"] = 4;

var rarities = new Array();
rarities["Common"] = 0;
rarities["Rare"] = 1;
rarities["Super-Rare"] = 2;

var cardTypes = new Array();
cardTypes["Ability"] = 0;
cardTypes["Equip"] = 1;
cardTypes["Passenger Equip"] = 2;

var neededCards = new Array();

//Note that you want to have -at least- one common card from each set marked as needed.
//Otherwise you'll trade everything down to tips.

//Abilities that we don't want to trade
neededCards.push("One Last Race");
neededCards.push("Infinite Potential");
neededCards.push("Emergency Countermeasures");
neededCards.push("Melty Cheese");

//Equipment that we don't want to trade
neededCards.push("Jump Jacks");
neededCards.push("Jack Jumps");
neededCards.push("Awesomium Banding");
neededCards.push("Cobalt Supercharger");
neededCards.push("Basic Turbo");
neededCards.push("World Class Machine");

function canTrade(card) {
  var cardSet = card.cardSet;
  if(cardSet < 2) return false; //Never autotrade special or style
  
  var rarity = card.rarity;
  if(rarity > 1) return false; //Never autotrade super rares, which means we never trade passengers.
  
  var count = card.count;
  if(count < 2) return false; //Never autotrade the last of any card
  
  var name = card.name;
  if(arrayContains(neededCards,name)) return false; //Never autotrade the cards we need
  
  return true;
  
}

//Trade the most expensive cardsets first
//Then trade the most rare cards first
//Then trade the cards you have the most of first
function compareCardCount(a, b) {
  var r = b.cardSet - a.cardSet;
  if(r != 0) return r;
  r = b.rarity - a.rarity;
  if(r != 0) return r;
  return b.count - a.count;
}

function decipherLabel(label) {
  var card = new Array();
  var tempStatText; //temporary holder for stats
  var count,name,rarity,cardType,cardSet;
  
  tempStatText = label.children[2].innerHTML;
  
  count = label.innerHTML.substring(0,label.innerHTML.indexOf("\n"));
  name = label.children[0].innerHTML;
  
  //The form is
  //(RARITY CARDTYPE - CARDSET)<br>
  //We don't care about the other stats for now.
  //I'm too lazy to use regexes here and it's too simple a pattern.
  tempStatText = tempStatText.substring(1,tempStatText.indexOf(")"));
  
  var space = tempStatText.indexOf(" ");
  rarity = rarities[tempStatText.substring(0, space)];
  tempStatText = tempStatText.substring(space+1);
  
  var dash = tempStatText.indexOf("-");
  
  cardSet = cardSets[tempStatText.substring(dash+2)];
  
  cardType = cardTypes[tempStatText.substring(0,dash-1)];
  
  card["count"] = count;
  card["name"] = name;
  card["rarity"] = rarity;
  card["cardSet"] = cardSet;
  card["cardType"] = cardType;
  
  return card;
}

window.addEventListener('load', function () {
  
  //Rather ghetto detect-if-we're-on-the-correct-page
  var index = document.body.innerHTML.indexOf("Trade Cards with Cici!");
  if(index < 0) {
    return;
  }
  
  var tradecards = document.getElementsByName("tradecards")[0];
  var tradeText = tradecards.children[7];
  
  var labelElements = document.getElementsByTagName("label");
  
  for(var i in labelElements) {
    var label = labelElements[i];
    labels[label.htmlFor] = label;
  }
  
  var cardRadioButtons = document.getElementsByName("cardtrades");
  
  var cardCount = document.getElementsByName("cardcount")[0];
  
  var cards = new Array();
  var cardsById = new Array();

  for(var i in cardRadioButtons) {
    var cardRadioButton = cardRadioButtons[i];
    var label = labels[cardRadioButton.id];
    var card = decipherLabel(label);
    card["button"] = cardRadioButton;
    
    cards.push(card);
    cardsById[cardRadioButton.id] = card;
    
    card.button.addEventListener("click", function() {
      var c = cardsById[this.id];
      tradeText.textContent = c.name + " will be traded, you have " + c.count;
      cardCount.value = c.count - 1; //Never trade ALL of one card.
    }, true);
  }
  
  cards.sort(compareCardCount);
  
  /*
  for(var i in cards) {
    var card = cards[i];
    console.log(i + " " + card.cardSet + " " + card.rarity + " " + card.count + " " + card.name);
  }
  */
  
  for(var i in cards) {
    var card = cards[i];
    if(canTrade(card)) {
      //console.log(card.count + " " + card.name + " " + card.rarity + " " + card.cardSet + " " + card.cardType);
      card.button.click();
      break;
    }
  }
}, true);