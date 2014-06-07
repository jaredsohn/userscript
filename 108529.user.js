// ==UserScript==
// @name           BVS Flower Wars AI
// @namespace      chris
// @description    Makes play choices for the bvs game Flower Wars
// @include        http://www.animecubed.com/billy/bvs/partyhouse-hanafudaplay.html
// @include        http://animecubed.com/billy/bvs/partyhouse-hanafudaplay.html
// @include        http://www.animecubed.com/billy/bvs/partyhouse-hanafuda.html
// @include        http://animecubed.com/billy/bvs/partyhouse-hanafuda.html
// @require        http://userscripts.org/scripts/source/74144.user.js
// @version        1.1111
// ==/UserScript==

//  hotkeys:     d - take the selected action
//               v - open debug console

//change log
// <version>  1.1111  -  added google chrome support
// <version>  1.11    -  many tweak to choice decisions
//                    -  cheats added over from test version
// <version>  1.11    -  fixed a bug in discard when attempting to discard a card 
//                    -  with a matching month
// <version>  1.1     -  new hotkey V now opens the debug console
//                    -  made some minor adjustments to card values
// <version>  1.09.1  -  fixed discard (no clue how i made that mistake)
// <version>  1.09    -  Added a "debug console" button that shows value breakdowns 
//                       (if anyone is interested in why the script makes its choices)
//                    -  Tweaked several values to increase performance
// <version>  1.08.2  -  Slightly modified for Firefox 3.6 compatability
// <version>  1.08.1  -  fixed several issues from version 1.08 to get the script stable
// <version>  1.08    -  code for playing month cards to block opponent altered to be based on enemy yakus
//                    -  koikoi should work better (when you're really pummeling the computer)
// <version>  1.07    -  Added recommended action text for koikoi/bank
//                    -  several tweaks to card rankings/yakus to improve decisions
//                    -  script will now "pass" on matching month cards to wait for yakus
// <version>  1.06    -  koikoi now determines not only distance from enemy yakus, 
//                       but whether they are possible given the field
//                    -  minor tweaks to fix how often koikoi is called 
// <version>  1.05.0  -  revamped to koikoi source, should work properly when opponent has 8+ plains
//                    -  decisions relating to obtaining a yaku improved
// <version>  1.04.2  -  fixed a minor issue that could cause a failure to koikoi
// <version>  1.04.1  -  added auto-updater (hopefully)
// <version>  1.04    - several minor tweaks
//                    - when discarding, possible cards are now weighted into the descision
// <version>  1.03    - tweaked values for better gameplay
//                    - fixed errors in counting opponents cards
// <version>  1.02    - fixed a few errors in ranking wet brights
// <version>  1.01    - tweaked script to koikoi more often
//                    - fixed an error that could cause koikoi/bank to fail 
// <version>  1.00

try {
	ScriptUpdater.check(108529, "1.1111");
} catch(e) { };

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

var pageLoc = "/billy/bvs/partyhouse-hanafuda.html"
if(location.href.indexOf(pageLoc) != -1)
{
  GM_setValue("forcedKoi",false)
  return;
}

var forceKoi = GM_getValue("forcedKoi",false)
var forceMatch = /Next Opponent Koi-Koi forced!/.exec(document.body.innerHTML);
if (forceMatch)
{
  forceKoi = true;
  GM_setValue("forcedKoi",true)
}

var cheatMonth = 0;
var noPlayMonth = 0;
var enemyHasKoiKoi = false;
var youHaveKoiKoi = false;
var canCheat = true;
var availCheats = [];
var useCheat = null;
var yakuHandCard = null;
var yakuFieldCard = null;

if(/They play .* and call Koi-Koi!/.exec(document.body.innerHTML))
  enemyHasKoiKoi=true;
else if(/Koi-Koi - No Cheating!<br>\(Them/.exec(document.body.innerHTML))
  enemyHasKoiKoi=true;

if(/Koi-Koi - No Cheating!<br>\(You/.exec(document.body.innerHTML))
  youHaveKoiKoi = true;
  
if (youHaveKoiKoi || enemyHasKoiKoi)
  canCheat = false;
var match = /Select cheat \((\d+) remaining\):/.exec(document.body.innerHTML);
if (!match || match[1] == 0)
  canCheat = false;
  
if (/Shuffle \+ Redraw/.exec(document.body.innerHTML)) availCheats.push("redrawCheat");
if (/View top of deck/.exec(document.body.innerHTML))  availCheats.push("showTopCard");
if (/Opp. -1 Take/.exec(document.body.innerHTML))      availCheats.push("enemyCardCheat");
if (/Force Koi-Koi/.exec(document.body.innerHTML))     availCheats.push("forceKoiKoi");
  
//set value modifiers
var monthMult = [];
for (var i =1;i<13;i++)
  monthMult[i] = 0

//lower values make the script play more defensively
// (I'd recommend not going any lower than 1)
var offensive = 1.4
//increase this value to decrease the month blocking affect
var monthBlock = 2.0

//yaku value modifiers (+ per card owned in the yaku)
var plain = 1.0;
var ribbon = 1.0;
var animal = 1.0;
var Rribbon = 5.0;  //add code to drop this value when 1 owned by each player
var Bribbon = 5.0;  //add code to drop this value when 1 owned by each player
var RoShamBo= 5.0;  //add code to drop this value when 1 owned by each player
var brights = 6.0;
var loop = 5.0;
var sacrifice = 5.0;
var wetBright = .6; //only increases when brights are obtained

var onFieldMult = 1.5;
var twoInHand = .7;
var threeInPlay = .5; //this does not apply to cards on the field
var guaranteeMult=.01;
var yakuMult = 5.0;
var cheatThreshold = 20.0;

var discarding = false;

//get the top deck card
var deckCard = getDeckCard();
//get hand cards
var hand = getHand();
//get field cards and set empty slot
var emptySlot;
var playField = getFieldCards();
//get your owned cards
var yourCards = getYourCards();
//get enemies cards
var enemyCards = getEnemyCards();

//if the enemy is the dealer, disable force koikoi strat when you hit 2 cards in hand (so enemy doesn't actually win)
var dealMatch = /-- Them \((Dealer) - Current/.exec(document.body.innerHTML);
if (dealMatch && dealMatch[1] == "Dealer")
  if (hand.length == 2)
  {
    enemyHasKoiKoi = true;
    forceKoi = true;
  }
updateMultipliers();
setValues(hand, false);
setValues(playField, true);

var mc = /option to put at bottom\):<br><img src="\/billy.layout.hcards.(thumbs.)?(\d+).jpg">/.exec(document.body.innerHTML)
var mc = []
var cheatCard = new Card(0);

if (mc && mc.length > 1)
{
  //decide whether to put it on bottom, or play
  var tmpCard = new Card(mc[2]);
  var month = tmpCard.month;
  //if the month is not on the field/in hand, put it at the bottom
  if (!hasMonth(playField, month) && !hasMonth(hand, month))
    setCheat("bottom");
  else
  {
    cheatMonth = month;
    //get the value of card on top of deck
    cheatCard.value = getValue(tmpCard);
    //add other multipliers
    var num = tmpCard.num;

    cheatCard.value += monthMult[tmpCard.month];
    //guaranteed type 2 done after block (you are guaranteed the card regardless, and can do nothing to block a play)    
    if (guaranteed(tmpCard) == 2)
      cheatCard.value *= guaranteeMult;
    cheatCard.value *= onFieldMult;
    if (givesYaku(yourCards, tmpCard.num))
      cheatCard.value *= yakuMult;
    //find the best card in hand
    var bCard = null;
    for (var i=0;i<hand.length;i++)
      if ((bCard == null || bCard.value < hand[i].value) && hand[i].month == tmpCard.month)
        bCard = hand[i];
    cheatCard.num = bCard.num;
    cheatCard.month = bCard.month;
    cheatCard.element = bCard.element;
    cheatCard.playable = true;
    cheatCard.value += bCard.value;
  }
}

//stores reasons why the script should perform each action
var koiReasons = [];
var bankReasons = [];

 if (!document.forms.namedItem("bankpoints") && !document.forms.namedItem("koikoi"))
 {
    if (deckCard)
      playDeck();
    if (tryShowTopCardCheat())
    {
      var newButton = document.createElement("btn");
      var targetElement = document.forms.namedItem("placecard");
      newButton.style.fontSize = "20px";
	  newButton.innerHTML = "<b>Suggested Action : Cheat (Show Top Card)<BR></b>";
      targetElement.parentNode.insertBefore(newButton, targetElement);
	  setCheat("topCard");
    }
    if (tryEnemyCardCheat())
    {
      var newButton = document.createElement("btn");
      var targetElement = document.forms.namedItem("placecard");
      newButton.style.fontSize = "20px";  
	  newButton.innerHTML = "<b>Suggested Action : Cheat (-1 enemy cards)<BR></b>";
      targetElement.parentNode.insertBefore(newButton, targetElement);
	  setCheat("minusCard");
    }
    if (tryForceKoiKoiCheat())
    {
      var newButton = document.createElement("btn");
      var targetElement = document.forms.namedItem("placecard");
      newButton.style.fontSize = "20px";  
      newButton.innerHTML = "<b>Suggested Action : Cheat (Force KoiKoi)<BR></b>";
      targetElement.parentNode.insertBefore(newButton, targetElement);
	  setCheat("koi");
    }
    if (!deckCard && !playCard())
    {
      discarding = true;
      discard();
      if (tryRedrawCheat())
      {
        var newButton = document.createElement("btn");
        var targetElement = document.forms.namedItem("placecard");
        newButton.style.fontSize = "20px";
	    newButton.innerHTML = "<b>Suggested Action : Cheat (redraw hand)<BR></b>";
        targetElement.parentNode.insertBefore(newButton, targetElement);
		setCheat("redraw");
      }
    }
 }
  else
  {
    var newButton = document.createElement("btn");
    var targetElement;
    if (!document.forms.namedItem("koikoi"))
      targetElement = document.forms.namedItem("bankpoints");
    else if (koikoi())
      targetElement = document.forms.namedItem("koikoi");
    else
      targetElement = document.forms.namedItem("bankpoints");
	  newButton.innerHTML = "<b>Suggested Action</b>";
    insertAfter(newButton, targetElement);
  }
 
 
function contains(list, string)
{
  if (!list)  return false;
  for (var i=0;i<list.length;i++)
    if (list[i] == string)
      return true;
  return false;
}

function tryForceKoiKoiCheat()
{
  if (!canCheat || !contains(availCheats,"forceKoiKoi"))
    return false;
    
  if (guaranteedYaku() && hand.length > 2)
    return true;
  return false;
}
//this cheat runs if there is at least 3 valuable cards in play (that you can match cards with, none of which are guaranteed)
function tryShowTopCardCheat()
{
  if (!canCheat || !contains(availCheats,"showTopCard"))
    return false;

  var count = 0;
  for (var i=0;i<playField.length;i++)
    if (hasMonth(hand,playField[i].month))
      if (playField[i].value >= 1.5)
        count++;
  if (count >= 3)
    return true;
  return false;
}

//this cheat runs if enemy has 4 cards or less, where 1 is from a 2 yaku, and at least 1 other is from a 3 yaku
function tryEnemyCardCheat()
{
  if (!canCheat || !contains(availCheats,"enemyCardCheat"))
    return false;

  var hasLpA = 0;
  var hasSacP = 0;
  for (var i=0;i<enemyCards.length;i++)
  {
    if      (enemyCards[i].num == 44)
      hasLpA = 1;
    else if (enemyCards[i].num == 17)
      hasSacP = 1;
  }
  //add all low value yaku cards
  var negCount = plainCount(enemyCards) + animalCount(enemyCards) + ribbonCount(enemyCards);
  //subtract out the ones that give larger yakus
  if (!rRibbonConflict())  negCount -= rRibbonCount(enemyCards);
  if (!bRibbonConflict())  negCount -= bRibbonCount(enemyCards);
  if (!roConflict()     )  negCount -= roCount(enemyCards);
  if (!sacConflict()    )  negCount -= hasSacP;
  if (!loopConflict()   )  negCount -= hasLpA;
  
  var posCount = 0;
  if (!rRibbonConflict())  posCount += rRibbonCount(enemyCards);
  if (!bRibbonConflict())  posCount += bRibbonCount(enemyCards);
  if (!roConflict()     )  posCount += roCount(enemyCards);
  if (!sacConflict()    )  posCount += hasSacP;
  if (!loopConflict()   )  posCount += hasLpA;
  if (!brightConflict() )  posCount += brightCount(enemyCards);
  
  if ((hasBright(enemyCards) && !brightConflict() || 
       hasLoop(enemyCards)   && !loopConflict()   || 
       hasSac(enemyCards)    && !sacConflict()   )&&
       negCount < 3||
       posCount - negCount > 1)
        return true;
  return false;
}

function tryRedrawCheat()
{
  if (!canCheat || !contains(availCheats,"redrawCheat") || guaranteedYaku())
    return false;
  
  //if aug bright is in play, and no august cards in hand
  if (hasCard(playField, "29") && monthCount(8, playField) <= 2)
    if (monthCount(8, hand) == 0)
	  return true;
  
  //an alternate way to redraw, if you have less than 4 cards, and they all give the enemy big yakus
  if (hand.length < 4)
  {
    for (var i=0;i<hand.length;i++)
    {
      var num = hand[i].num;
      if (isRoShamBo(num) && roCount(enemyCards) == 2)       continue;
      if (isRribbon(num)  && rRibbonCount(enemyCards) == 2)  continue;
      if (isBribbon(num)  && bRibbonCount(enemyCards) == 2)  continue;
      if (isBright(num)   && brightCount(enemyCards) >= 2)   continue;
      if (isLoop(num)     && loopCount(enemyCards) == 1)     continue;
      if (isSac(num)      && sacCount(enemyCards) == 1)      continue;
      if (isWet(num)      && brightCount(enemyCards) >= 2)   continue;
      //if no big wins where available, this mode fails and we return false
      return false;
    }
    //return true to cheat here (this indicates all cards in your hand gave the enemy a 5 pt yaku)
    return true;
  }
  else if (playField.length < 4)
    return false;
    
  var total=0;
  var goodYakuCount = 0;
  for (var i=1;i<13;i++)
    if (monthCount(i, hand) > 2)
      return false;

  for (var i=0;i<hand.length;i++)
  {
    var num = hand[i].num;
    if (isSac(num)      && !sacConflict()     ) goodYakuCount++;
    if (isLoop(num)     && !loopConflict()    ) goodYakuCount++;
    if (isBright(num)   && !brightConflict()  ) goodYakuCount++;
    if (isRribbon(num)  && !rRibbonConflict())  goodYakuCount++;
    if (isBribbon(num)  && !bRibbonConflict() ) goodYakuCount++;
    if (isRoShamBo(num) && !roConflict()      ) goodYakuCount++;
    total += hand[i].value;

    if (guaranteed(hand[i])>0)
      return false;
  }
  
  if ((total <= cheatThreshold && goodYakuCount == 0)   ||
      (total <= cheatThreshold/2 && goodYakuCount == 1) ||
      (total <= cheatThreshold/4 && goodYakuCount == 2))
        return true;

  return false;
}
 
function setValues(list, inField)
{
  for (var i=0;i<list.length;i++)
  {
    var num = list[i].num;
    list[i].value = getValue(list[i]);
    if (monthCount(list[i].month, hand) > 1 && !inField)
      list[i].value *= twoInHand;
    if (monthCount(list[i].month, hand) + monthCount(list[i].month, playField) > 2 && !inField)
      list[i].value *= threeInPlay;
    //guaranteed type 1 done before block (you are guaranteed 1 of 2 cards,however enemy can still play the suit)
    if (guaranteed(list[i]) == 1)
      list[i].value *= guaranteeMult;
    list[i].value += monthMult[list[i].month];
    //guaranteed type 2 done after block (you are guaranteed the card regardless, and can do nothing to block a play)    
    if (guaranteed(list[i]) == 2)
      list[i].value *= guaranteeMult;
    if (inField)
      list[i].value *= onFieldMult;
  }
}

function monthCount(month, list)
{
  var count = 0;
  for (var i=0;i<list.length;i++)
    if (list[i].month == month)
      count++;
  return count;
}
  
function insertAfter(newElement,targetElement) 
{
	var parent = targetElement.parentNode;
	if(parent.lastchild == targetElement) 
		parent.appendChild(newElement);
    else 
		parent.insertBefore(newElement, targetElement.nextSibling);
}

//initiate a card object
function Card(Num, element)
{
  this.num = Num;
  this.month = Math.ceil(Num/4);
  this.element = element;
  this.playable = false;
  this.value = 0;
}
//creates and returns a card object from a card in hand element
function getCard(element)
{
  cardNum = element.getAttribute("for");
  num = /handcard(\d+)/.exec(cardNum);
  if (!num)
   ShowMsg("Failed to get Card Number");
  return new Card(parseInt(num[1]), element);
}

//getType functions
function isRoShamBo(num)  { return (num == 21 || num == 25 || num == 37); }
function isRribbon(num)   { return (num == 2 || num == 6 || num == 10);   }
function isBribbon(num)   { return (num == 22 || num == 34 || num == 38); }
function isBright(num)    { return (num == 29 || num == 45 || num == 1 || num == 9); }
function isLoop(num)      { return (num == 29 || num == 17); }
function isSac(num)       { return (num == 29 || num == 44); }
function isWet(num)       { return num == 41;}
function isRibbon(num)    { return (isRribbon(num) || isBribbon(num) || num == 43 || num == 26 || num == 18 || num == 14);}
function isAnimal(num)    { return (isRoShamBo(num) || num == 42 || num == 33 || num == 30 || num == 17 || num == 13 || num == 5);}
function isPlain(num)     { return ((!isAnimal(num) || num == 33) && !isBright(num) && !isRibbon(num) && !isWet(num));}

//functions to get card values (based on yaku counts)
function plainMult    () {return (plain     * ( 1 + plainCount(yourCards)     +  plainCount(enemyCards)    / offensive) / 10);}
function ribbonMult   () {return (ribbon    * ( 1 + ribbonCount(yourCards)    +  ribbonCount(enemyCards)   / offensive) / 5);}
function animalMult   () {return (animal    * ( 1 + animalCount(yourCards)    +  animalCount(enemyCards)   / offensive) / 5);}
function RribbonMult  () {return (Rribbon   * ( 1 + rRibbonCount(yourCards)   +  rRibbonCount(enemyCards)  / offensive) / 3);}
function BribbonMult  () {return (Bribbon   * ( 1 + bRibbonCount(yourCards)   +  bRibbonCount(enemyCards)  / offensive) / 3);}
function RoShamBoMult () {return (RoShamBo  * ( 1 + roCount(yourCards)        +  roCount(enemyCards)       / offensive) / 3);}
function brightMult   () {return (brights   * ( 1 + brightCount(yourCards)    +  brightCount(enemyCards)   / offensive) / 3);}
function loopMult     () {return (loop      * ( 1 + loopCount(yourCards)      +  loopCount(enemyCards)     / offensive) / 2);}
function sacMult      () {return (sacrifice * ( 1 + sacrificeCount(yourCards) +  sacrificeCount(enemyCards)/ offensive) / 2);}
function wetMult      () {return (wetBright * ( 1 + brightCount(yourCards)    +  brightCount(enemyCards)   / offensive) / 4);}  

function rRibbonConflict() {return (hasRed  (yourCards) && hasRed  (enemyCards));}
function bRibbonConflict() {return (hasBlue (yourCards) && hasBlue (enemyCards));}
function roConflict()      {return (hasRo   (yourCards) && hasRo   (enemyCards));}
function brightConflict()  {return (has2Bri (yourCards) && has2Bri (enemyCards));}
function sacConflict()     {return (hasSac  (yourCards) && hasSac  (enemyCards));}
function loopConflict()    {return (hasLoop (yourCards) && hasLoop (enemyCards));}

//returns -1 if it made a play, 0 if no guaranteed yakus (continue game)
// otherwise it returns a month value (to protect if forced koi)
function guaranteedYaku()
{
  //for all months
  for (var i = 1;i < 13;i++)
  {
    var yakuList = [];
    var handMonths = getMonthFromList(hand, i);
    var fieldMonths = getMonthFromList(playField, i);
    if (!handMonths)
      continue;
    var combineCards = handMonths.concat(fieldMonths);
    if (!listGivesYaku(yourCards, combineCards) || handMonths.length < 1)
      continue;
    //get a list of all pairs that can give yakus
    for (var j=0;j<combineCards.length;j++)
      for (var k=0;k<combineCards.length;k++)
        if (j != k && guaranteed(combineCards[j])>0 && guaranteed(combineCards[j])>0)
        {
          var tmpList = [];
          tmpList.push(combineCards[j]);
          tmpList.push(combineCards[k]);
          if (listGivesYaku(yourCards, tmpList))
          {
            yakuList.push(new cardPair(combineCards[j],combineCards[k]));
          }
        }
    //for all the pairs, skip it if its not possible
    for (var b=0;b<yakuList.length;b++)
    {
      var inHand = 0;
      var onField = 0;
      var handC = null;
      if (hasCard(hand,      yakuList[b].card1.num)) { inHand++; handC = yakuList[b].card1; }
      if (hasCard(hand,      yakuList[b].card2.num)) { inHand++; handC = yakuList[b].card2; }
      if (hasCard(playField, yakuList[b].card1.num)) onField++;
      if (hasCard(playField, yakuList[b].card2.num)) onField++;
      //this is the easiest case, simply play the yaku
      if (inHand == 1 && onField == 1  && guaranteed(yakuList[b].card1)>0 && guaranteed(yakuList[b].card2)>0)
        return true;
      // this is the harder case, you must first play 2 cards, so just pick the 2 highest value cards
      else if (inHand == 2 && fieldMonths == 2)
        return true;
      else if (inHand == 2 && fieldMonths <= 1)
        return true;
      else if (inHand == 1 && fieldMonths >= 2 && givesYaku(yourCards, handC.num))
        return true;
    }
  }
  return false;
}

//functions for checking yakus
function hasRo  (list)
{
for (var i=0;i<list.length;i++)
    if (isRoShamBo(list[i].num))
       return true;
return false;
}
function hasRed (list)
{
for (var i=0;i<list.length;i++)
    if (isRribbon(list[i].num))
       return true;
return false;
}
function hasBlue(list)
{
for (var i=0;i<list.length;i++)
    if (isBribbon(list[i].num))
       return true;
return false;
}
function hasBright(list)
{
  for (var i=0;i<list.length;i++)
      if (isBright(list[i].num))
         return true;
  return false;
}
function has2Bri(list)
{
count = 0;
for (var i=0;i<list.length;i++)
    if (isBright(list[i].num))
    {
       count++;
       if (count == 2)
           return true;
    }
return false;
}
function hasLoop(list)
{
for (var i=0;i<list.length;i++)
    if (isLoop(list[i].num))
       return true;
return false;
}
function hasSac (list)
{
for (var i=0;i<list.length;i++)
    if (isSac(list[i].num))
       return true;
return false;
}
//check if any card from a month is contained in the list
function hasMonth(cardList, month)
{
if (!cardList)
  return false;
for (var i=0;i<cardList.length;i++)
    if (cardList[i].month == month)
    return true;
return false;
}
function plainCount(list)
{
 var count = 0;
 for (var i = 0;i<list.length;i++)
    if (isPlain(list[i].num))
     count++;
 return count;
}
function animalCount(list)
{
 var count = 0;
 for (var i = 0;i<list.length;i++)
    if (isAnimal(list[i].num))
     count++;
 return count;
}
function ribbonCount(list)
{
 var count = 0;
 for (var i = 0;i<list.length;i++)
    if (isRibbon(list[i].num))
     count++;
 return count;
}
function redCount(list) {return rRibbonCount(list);}
function blueCount(list) {return bRibbonCount(list);}
function rRibbonCount(list)
{
 var count = 0;
 for (var i = 0;i<list.length;i++)
    if (isRribbon(list[i].num))
     count++;
 return count;
}
function bRibbonCount(list)
{
 var count = 0;
 for (var i = 0;i<list.length;i++)
    if (isBribbon(list[i].num))
     count++;
 return count;
}
function roCount(list)
{
 var count = 0;
 for (var i = 0;i<list.length;i++)
    if (isRoShamBo(list[i].num))
     count++;
 return count;
}
function brightCount(list)
{
 var count = 0;
 for (var i = 0;i<list.length;i++)
    if (isBright(list[i].num))
     count++;
 return count;
}
function loopCount(list)
{
 var count = 0;
 for (var i = 0;i<list.length;i++)
    if (isLoop(list[i].num))
     count++;
 return count;
}
function sacCount(list)
{
  return sacrificeCount(list);
}
function sacrificeCount(list)
{
 var count = 0;
 for (var i = 0;i<list.length;i++)
    if (isSac(list[i].num))
     count++;
 return count;
}

function findLoop(list)
{
  for (var i=0;i<list.length;i++)
    if (isLoop(list[i].num))
      return list[i];
  return null;
}
function findSac(list)
{
  for (var i=0;i<list.length;i++)
    if (isSac(list[i].num))
      return list[i];
  return null;
}
function findRo(list)
{
  for (var i=0;i<list.length;i++)
    if (isRo(list[i].num))
      return list[i];
  return null;
}
function findRed(list)
{
  for (var i=0;i<list.length;i++)
    if (isRed(list[i].num))
      return list[i];
  return null;
}
function findBlue(list)
{
  for (var i=0;i<list.length;i++)
    if (isBlue(list[i].num))
      return list[i];
  return null;
}
function findBright(list)
{
  for (var i=0;i<list.length;i++)
    if (isBright(list[i].num))
      return list[i];
  return null;
}

function givesYaku(cardList, cardNum)
{ 
  var yaku = 0, Ro=0,Red=0,Blue=0,Bright=0,Loop=0,Sac=0,Ribbon=0,Animal=0,Plain=0;
 //get yaku counts
 for (var i=0;i<cardList.length;i++)
 {
  num = cardList[i].num;
  if (isRoShamBo(num))  Ro++;
  if (isRribbon(num) )  Red++;
  if (isBribbon(num) )  Blue++;
  if (isBright(num)  )  Bright++;
  if (isLoop(num)    )  Loop++;
  if (isSac(num)     )  Sac++;
  if (isRibbon(num)  )  Ribbon++;
  if (isAnimal(num)  )  Animal++;
  if (isPlain(num)   )  Plain++;
 }

  if (isRoShamBo(cardNum)&& Ro     == 2)  yaku++;
  if (isRribbon(cardNum) && Red    == 2)  yaku++;
  if (isBribbon(cardNum) && Blue   == 2)  yaku++;
  if (isBright(cardNum)  && Bright >= 2)  yaku++;
  if (isLoop(cardNum)    && Loop   == 1)  yaku++;
  if (isSac(cardNum)     && Sac    == 1)  yaku++;
  if (isRibbon(cardNum)  && Ribbon >= 4)  yaku++;
  if (isAnimal(cardNum)  && Animal >= 4)  yaku++;
  if (isPlain(cardNum)   && Plain  >= 9)  yaku++;
  if (isWet(cardNum)     && Bright > 2 )  yaku++;

 return yaku;
}

function listHasYakus(cardList)
{
  var yaku = 0, Ro=0,Red=0,Blue=0,Bright=0,Loop=0,Sac=0,Ribbon=0,Animal=0,Plain=0,num=0,Wet=false;
  //get yaku counts
  for (var i=0;i<cardList.length;i++)
  {
    num = cardList[i].num;
    //these values are kept at most 1 below the yaku values
    //(this function finds new yakus, not existing ones)
    if (isRoShamBo(num))  Ro     += 1;
    if (isRribbon(num) )  Red    += 1;
    if (isBribbon(num) )  Blue   += 1;
    if (isBright(num)  )  Bright += 1;
    if (isLoop(num)    )  Loop   += 1;
    if (isSac(num)     )  Sac    += 1;
    if (isRibbon(num)  )  Ribbon += 1;
    if (isAnimal(num)  )  Animal += 1;
    if (isPlain(num)   )  Plain  += 1;
    if (isWet(num)     )  wet = true;
  }
  if (Ro>=3)               yaku++;
  if (Red>=3)              yaku++;
  if (Blue>=3)             yaku++;
  if (Bright>=3)           yaku++;
  if (Loop>=2)             yaku++;
  if (Sac>=2)              yaku++;
  if (Ribbon>=5)           yaku++;
  if (Animal>=5)           yaku++;
  if (Plain>=10)           yaku++;
  if (Wet && Bright >= 3)  yaku++;
  
  return yaku;
}

function listGivesYaku(cardList, checkList)
{
  var yaku = 0, Ro=0,Red=0,Blue=0,Bright=0,Loop=0,Sac=0,Ribbon=0,Animal=0,Plain=0,num=0,realB=0,Wet=false;
 //get yaku counts
 for (var i=0;i<cardList.length;i++)
 {
  num = cardList[i].num;
  //these values are kept at most 1 below the yaku values
  //(this function finds new yakus, not existing ones)
  if (isRoShamBo(num))  Ro     = Math.min(Ro     + 1, 2);
  if (isRribbon(num) )  Red    = Math.min(Red    + 1, 2);
  if (isBribbon(num) )  Blue   = Math.min(Blue   + 1, 2);
  if (isBright(num)  )  { Bright = Math.min(Bright + 1, 2); realB ++;}
  if (isLoop(num)    )  Loop   = Math.min(Loop   + 1, 1);
  if (isSac(num)     )  Sac    = Math.min(Sac    + 1, 1);
  if (isRibbon(num)  )  Ribbon = Math.min(Ribbon + 1, 4);
  if (isAnimal(num)  )  Animal = Math.min(Animal + 1, 4);
  if (isPlain(num)   )  Plain  = Math.min(Plain  + 1, 9);
 }
 for (var i=0;i<checkList.length;i++)
 {
  num = checkList[i].num;
  if (isRoShamBo(num))  Ro++;
  if (isRribbon(num) )  Red++;
  if (isBribbon(num) )  Blue++;
  if (isBright(num)  )  Bright++;
  if (isLoop(num)    )  Loop++;
  if (isSac(num)     )  Sac++;
  if (isRibbon(num)  )  Ribbon++;
  if (isAnimal(num)  )  Animal++;
  if (isPlain(num)   )  Plain++;
  if (isWet(num)     )  Wet=true;
 }
 
  if (Ro     > 2)  yaku++;
  if (Red    > 2)  yaku++;
  if (Blue   > 2)  yaku++;
  if (Bright > 2)  yaku++;
  if (Loop   > 1)  yaku++;
  if (Sac    > 1)  yaku++;
  if (Ribbon > 4)  yaku++;
  if (Animal > 4)  yaku++;
  if (Plain  > 9)  yaku++;
  if (realB  > 2 && Wet) yaku++;

 return yaku;
}
//gets the value of a card
function getValue(card)
{
    var num = card.num;
    
    return (isPlain(num)    * plainMult()+
            isRibbon(num)   * ribbonMult()+
            isAnimal(num)   * animalMult()+
            isRribbon(num)  * RribbonMult()+
            isBribbon(num)  * BribbonMult()+
            isRoShamBo(num) * RoShamBoMult()+
            isBright(num)   * brightMult()+
            isLoop(num)     * loopMult()+
            isSac(num)      * sacMult()+
            isWet(num)      * wetMult());
}

// 2 for completely guaranteed (all cards are yours)
// 1 if partial guaranteed (you get to pick between 2 cards)
// -1 if the card is impossible to obtain
// 0 otherwise
function guaranteed(card)
{
    var month = card.month;
    var inHand = false;
    var hCards = 0, oCards = 0, fCards = 0;
      
    for (var i = 0;i<hand.length;i++)
      if (hand[i].month == month)
      {
          hCards++;
          if (card.num == hand[i].num)
            inHand = true;
      }

    
    for (var i = 0;i<playField.length;i++)
      if (playField[i].month == month)
        fCards++;
    for (var i = 0;i<yourCards.length;i++)
      if (yourCards[i].month == month)
        oCards++;
    for (var i = 0;i<enemyCards.length;i++)
      if (enemyCards[i].month == month)
        oCards++;
    var count = hCards+oCards+fCards;
  
    if (oCards == 3)
      return -1;
    if (fCards == 2 && hCards == 2 || 
        hCards == 3 && fCards == 1 ||
        hCards == 4                ||
        hCards == 1 && fCards >= 1 && count == 4)
        return 2;
    if      (oCards == 1)
        if (hCards == 2 && fCards == 1 && inHand || 
            hCards == 3 && fCards == 0           ||
            hCards == 1 && fCards == 2 && !inHand)
          return 1;
    else if (oCards == 0)
        if (hCards == 2 && fCards == 1 && inHand  ||
            hCards == 3 && fCards == 0            ||
            hCards == 1 && fCards == 2 && !inHand ||
            hCards == 1 && fCards == 3 && !inHand )
      return 1;
    return 0;
}


function getDeckCard()
{
 var elems, current;
 var deckCard;
 elems = document.evaluate(
     ".//td[contains(./b/text(),'Game')]",
     document,
     null,
     XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
     null);

 for (var i = 0; i < elems.snapshotLength; i++)
 {
    current = elems.snapshotItem(i);
    match = current.innerHTML.match(/billy.layout.hcards.(thumbs.)?(\d+).jpg/i);
    if(!match || match.length != 3)
     continue;
    deckCard = new Card(match[2], current);
 }
 return deckCard
}
function getHand()
{
 var elems, current;
 hand = [];
 //get your hand
 elems = document.evaluate(
     ".//label[contains(@for,'handcard')]",
     document,
     null,
     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
     null);

 for (var i = 0; i < elems.snapshotLength; i++)
 {
     current = elems.snapshotItem(i);
     addcard = getCard(current);
     hand.push(addcard);
 }
 return hand;
}
function getYourCards()
{
 var hasDual = false
 var yourCards = []
 cards = /You .*Current Score.*(billy.layout.hcards.(thumbs.)?\d+.jpg.*).*/i.exec(document.body.innerHTML);
 if (cards)
  cards = cards[0];

 while (cards)
 {
  temp = /billy.layout.hcards.(thumbs.)?(\d+).jpg(.*)/.exec(cards);
  if (!temp || temp.length != 4)
   break;
  cards = temp[3];
  if (temp[2] != 33) //dual card
    yourCards.push(new Card(temp[2]));
  else
  {
    if (!hasDual)
    {
      hasDual = true;
      yourCards.push(new Card(temp[2]));
    }
  }
 }
 return yourCards;
}
function getEnemyCards()
{
 var enemyCards = []
 cards = /Them .*Current Score.*(billy.layout.hcards.(thumbs.)?\d+.jpg.*).*/i.exec(document.body.innerHTML);
 if (cards)
  cards = cards[0];
  var hasDual = false;
  
 while (cards)
 {
  temp = /billy.layout.hcards.(thumbs.)?(\d+).jpg(.*)/.exec(cards);
  if (!temp || temp.length != 4)
     break;
  cards = temp[3];

  if (temp[2] != 33) //dual card
    enemyCards.push(new Card(temp[2]));
  else
  {
    if (!hasDual)
    {
      hasDual = true;
      enemyCards.push(new Card(temp[2]));
    }
  }
 }
 return enemyCards;
}
function getFieldCards()
{
 var playField = [];
 elems = document.evaluate(
     ".//label[contains(@for,'cardinbutton')]",
     document,
     null,
     XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
     null);

 for (var i = 0; i < elems.snapshotLength; i++)
 {
     current = elems.snapshotItem(i);
     match = current.innerHTML.match(/billy.layout.hcards.(thumbs.)?(\d+).jpg/i);
     if(!match)
     {
      emptySlot = current;
      continue;
     }
     if(match.length != 3)
      ShowMsg("Failed to get field cards");
     cardNum = match[2];
     addCard = new Card(cardNum, current);
     playField.push(addCard);
 }
 return playField;
}
function getAvailable(month)
{
 var list = []
 for (var i = 4*(month-1) + 1;i < 4*month+1;i++)
 {
    if (isAvailable(i))
    {
     list.push(new Card(i,null));
    }
 }
 return list;
}
function isAvailable(num)
{
 avail = true;
 for (var i=0;i<hand.length;i++)
    if (num == hand[i].num)
     avail = false;
 for (var i=0;i<playField.length;i++)
    if (num == playField[i].num)
     avail = false;
 for (var i=0;i<yourCards.length;i++)
    if (num == yourCards[i].num)
     avail = false;
 for (var i=0;i<enemyCards.length;i++)
    if (num == enemyCards[i].num)
     avail = false;
 return avail;
}
//true if script recommends koikoi
function koikoi()
{
  var gYaku = guaranteedYaku();
  if (forceKoi && !enemyHasKoiKoi && gYaku)
  {
    koiReasons.push(new Reason("Since the enemy is forced to koikoi, and you have a guaranteed play, it is perfectly safe to keep playing"));
    return true;
  }
 
 var toKoi     = 0;  //increases based on how close you are to getting more points
 var toBank    = 0;  //increases based on how close enemy is to winning
 var threshold = 0;
 //add likelyhood of yakus for matching pairs in play, and 1/2 the amt for non matching
 for (var i=0;i<hand.length;i++)
 {
    if (givesYaku(yourCards, hand[i].num))
    {
      if      (guaranteed(hand[i]) > 0)              { toKoi += 5;  koiReasons.push(new Reason("Guaranteed a yaku",5)); }
      else if (hasMonth(playField, hand[i].month))   { toKoi+=1;    koiReasons.push(new Reason("likely to get a yaku (2 cards visible that will give a yaku if taken)",1)); }
      else                                           { toKoi += .4; koiReasons.push(new Reason("possible yaku available if a month match is drawn",.4)); }
    }
    else
    {
    //get all possible deck cards that can match
    var cardsAvail = getMonthCards(hand[i].month)   
    if (cardsAvail)
    {
      //get values for unseen cards
      for (var k = 0;k<cardsAvail.length;k++)
        cardsAvail[k].value = getValue(cardsAvail[k]);
      var bestCard = getHighestValue(cardsAvail);

      //at this point, this should always be true
      if (hand[i] && bestCard)
      {  
        var yakus = getYakus(yourCards, enemyCards, hand[i], bestCard);
        for (var k=0;k<10;k++)
          if (yakus[k] > 0)
          {
            var dist = yakus[k];
            toKoi += 1/(dist*dist) / 10;
            
            var text = "card " + getCardType(hand[i]) + " + "+ getCardType(bestCard) + " yields dist " + dist + " away from a ";
            if      (k == 0)
              text+="plain yaku";
            else if (k == 1)
              text+="ribbon yaku";
            else if (k == 2)
              text+="animal yaku";
            else if (k == 3)
              text+="RoShamBo yaku";
            else if (k == 4)
              text+="red ribbon yaku";
            else if (k == 5)
              text+="blue ribbon yaku";
            else if (k == 6)
              text+="bright yaku";
            else if (k == 7)
              text+="loop yaku";
            else if (k == 8)
              text+="sacrifice yaku";
            else
              text="card " + getCardType(hand[i]) + " on "+ getCardType(bestCard) +" gives a wet yaku";
            if (1/(dist*dist)/10 >= .03)
              koiReasons.push(new Reason(text,Math.round(100/(dist*dist))/1000));
          }
      }
    }
  }
}
 //perform the same check on field cards (with even lower likelihoods)
 for (var i=0;i<playField.length;i++)
 {
    if (givesYaku(yourCards, playField[i].num))
    {
      if      (guaranteed(playField[i]) > 0)         { toKoi += 5;  koiReasons.push(new Reason("Guaranteed a yaku",5)); }
      else if (hasMonth(hand, playField[i].month))   { toKoi+=1;    koiReasons.push(new Reason("likely to get a yaku (2 cards visible that will give a yaku if taken)",1)); }
      else                                           { toKoi += .4; koiReasons.push(new Reason("possible yaku available if a month match is drawn",.4)); }
    }
    
    //get all possible cards in the deck cards that can match
    var cardsAvail = getMonthCards(playField[i].month)   
    if (cardsAvail)
    {
      //get values for unseen cards
      for (var k = 0;k<cardsAvail.length;k++)
        cardsAvail[k].value = getValue(cardsAvail[k]);
      var bestCard = getHighestValue(cardsAvail)
        
      //at this point, this should always be true
      if (playField[i] && bestCard)
      {  
        var yakus = getYakus(yourCards, enemyCards, playField[i], bestCard);
        for (var k=0;k<10;k++)
          if (yakus[k] > 0)
          {
            var dist = yakus[k];
            toKoi += 1/(dist*dist) / 10;
            
            var text = "card " + playField[i].num + " + "+ bestCard.num + " yields dist " + dist + " away from a ";
            if      (k == 0)
              text+="plain yaku";
            else if (k == 1)
              text+="ribbon yaku";
            else if (k == 2)
              text+="animal yaku";
            else if (k == 3)
              text+="RoShamBo yaku";
            else if (k == 4)
              text+="red ribbon yaku";
            else if (k == 5)
              text+="blue ribbon yaku";
            else if (k == 6)
              text+="bright yaku";
            else if (k == 7)
              text+="loop yaku";
            else if (k == 8)
              text+="sacrifice yaku";
            else
              text="card " + playField[i].num + " on "+ bestCard.num +" gives a wet yaku";
            if (1/(dist*dist)/10 >= .03)
              koiReasons.push(new Reason(text,Math.round(100/(dist*dist))/1000));
          }
      }
    }
 }

  var checkList = []
  for (var gg = 0;gg<hand.length;gg++)
    checkList.push(hand[gg]);
  for (var gg = 0;gg<playField.length;gg++)
    checkList.push(playField[gg]);
 //check enemy yakus
 toBank += listHasYakus(enemyCards);
 if (toBank > 0)
  bankReasons.push(new Reason("Enemy Already Has Yakus", toBank));

 for (var i=0;i<checkList.length;i++)
 {
    if (guaranteed(checkList[i].num) > 0)
      continue;
    var yakus = [], total = 0;
    var possibleCards = getAvailable(checkList[i].month);
    var storedBankReasons = [];
    if (possibleCards)
    {
      for (var j = 0;j<possibleCards.length;j++)
      {
        if (possibleCards[j].num != checkList[i].num)
        {
          var tmpList = [];
          var enemyYakus = 0;
          tmpList.push(possibleCards[j]);
          tmpList.push(checkList[i]);
          enemyYakus = listGivesYaku(enemyCards, tmpList);
          if (enemyYakus > 0)
          {
            bankReasons.push(new Reason("If the enemy plays " + getCardType(checkList[i])+ " with " + getCardType(possibleCards[j]) + " he can get a yaku", enemyYakus));
            toBank += enemyYakus;
            break;
          }
          else
          {
            var count = 0;
            yakus = getYakus(enemyCards, yourCards, possibleCards[j], checkList[i]);
            var tmpBankReasons = [];
            for (var k=0;k<10;k++)
              if (yakus[k] > 0)
              {
                var dist = yakus[k];
                count += 3/(dist*dist) / 10;
                
                var text = "card " + getCardType(checkList[i]) + " + "+ getCardType(possibleCards[j]) + " yields dist " + dist + " away from a ";
                if      (k == 0)
                  text+="plain yaku";
                else if (k == 1)
                  text+="ribbon yaku";
                else if (k == 2)
                  text+="animal yaku";
                else if (k == 3)
                  text+="RoShamBo yaku";
                else if (k == 4)
                  text+="red ribbon yaku";
                else if (k == 5)
                  text+="blue ribbon yaku";
                else if (k == 6)
                  text+="bright yaku";
                else if (k == 7)
                  text+="loop yaku";
                else if (k == 8)
                  text+="sacrifice yaku";
                else
                  text="card " + getCardType(checkList[i]) + " with "+ getCardType(possibleCards[j]) +"gives a wet yaku";
                if (3/(dist*dist)/10 >= .03)
                  tmpBankReasons.push(new Reason(text,Math.round(300/(dist*dist))/1000));
              }
            if (count > total)
            {
              total = count;
              storedBankReasons = tmpBankReasons;
            }
          }
        }
      }
    }
    if (total > 0)
    {
      for (var bb = 0;bb < storedBankReasons.length;bb++)
        bankReasons.push(storedBankReasons[bb]);
      threshold += total;
      total = 0;
    }
 }
 if (getYourScoreToWin() - getScore() <= 0)
 {
   if (toBank > 0 || !gYaku)
   {
     bankReasons.push(new Reason("If you bank now, you win and this game is not guaranteed",""));
     return false;
   }
 }
 if (toBank >= 2)
 {
   bankReasons.push(new Reason("Since the enemy is close to obtaining 2 yakus, I've decided to bank",""));
   return false;
 }
 
  if (getScore() < 7)
  {
    toKoi += .5;
    koiReasons.push(new Reason("Your point score is low, and not as much to lose by koikoi",.3));
  }
  if (getScore() >= 7)
  {
    toBank += (getScore()-7)/2;
    bankReasons.push(new Reason("You've exceeded the 2x multiplier, its best to bail before you lose big",Math.round(100*(getScore()-7)/3)/100));
  }
  
 var reason1 = new Reason("The total sum of weighted distances to enemy yakus is " + Math.round((threshold + toBank)*100)/100,"");
 var reason2 = new Reason("The total sum of weighted distances to your yakus is " + Math.round(toKoi*100)/100,"");
 koiReasons.push(reason2);
 bankReasons.push(reason1);

  if (toKoi < (threshold + toBank))
  {
    bankReasons.push(new Reason("Since the enemy has been calculated to have a high chance of reaching a yaku, I think its best if you bank now",""));
    return false;
  }
 koiReasons.push(new Reason("Since the enemy seems much further from reaching a yaku then you, I would suggest koikoi",""));
 return true;
}
function showCardList(List)
{
var sum = "";
for (var i=0;i<List.length;i++)
sum = sum + " " + List[i].num;
alert(sum)
}
//Debug method for displaying a list of card values in BVS Daily (for a card list)
function showCardValues(List)
{
var sum = "";
for (var i=0;i<List.length;i++)
sum = sum + " " + List[i].value;
alert(sum)
}
//returns an array distance values from yakus
function getYakus(list, blockList, card1, card2)
{
  if (!card2)
    card2 = new Card(-1,null)
  if (!card1)
    card1 = new Card(-1,null)
  
  var yaku = [];
  if (isPlain(card1.num)    || isPlain(card2.num   )) yaku[0] = Math.max(1, 9 - plainCount(list)    ); else yaku[0] = 0;
  if (isPlain(card1.num)    && isPlain(card2.num   )) yaku[0] = Math.max(1, 8 - plainCount(list)    ); else yaku[0] = 0;
  if (isRibbon(card1.num)   || isRibbon(card2.num  )) yaku[1] = Math.max(1, 4 - ribbonCount(list)   ); else yaku[1] = 0;
  if (isAnimal(card1.num)   || isAnimal(card2.num  )) yaku[2] = Math.max(1, 4 - animalCount(list)   ); else yaku[2] = 0;
  if (isRoShamBo(card1.num) || isRoShamBo(card2.num)) yaku[3] = Math.max(1, 2 - roCount(list)       ); else yaku[3] = 0;
  if (isRribbon(card1.num)  || isRribbon(card2.num )) yaku[4] = Math.max(1, 2 - rRibbonCount(list)  ); else yaku[4] = 0;
  if (isBribbon(card1.num)  || isBribbon(card2.num )) yaku[5] = Math.max(1, 2 - bRibbonCount(list)  ); else yaku[5] = 0;
  if (isBright(card1.num)   || isBright(card2.num  )) yaku[6] = Math.max(1, 2 - brightCount(list)   ); else yaku[6] = 0;
  if (isLoop(card1.num)     || isLoop(card2.num    )) yaku[7] = Math.max(1, 1 - loopCount(list)     ); else yaku[7] = 0;
  if (isSac(card1.num)      || isSac(card2.num     )) yaku[8] = Math.max(1, 1 - sacrificeCount(list)); else yaku[8] = 0;
  if (   (isWet(card1.num)  || isWet(card2.num     )) &&
                               brightCount(list) > 2) yaku[9] = 1; else yaku[9] = 0; 
  if (has2Bri(blockList))   yaku[6] = 0;
  if (hasRo(blockList))     yaku[3] = 0;
  if (hasRed(blockList))    yaku[4] = 0;
  if (hasBlue(blockList))   yaku[5] = 0;
  if (hasSac(blockList))    yaku[8] = 0;
  if (hasLoop(blockList))   yaku[7] = 0;
  
  return yaku;
}
//returns the card with the highest value from a list
function getHighestValue(cardList)
{
  if (!cardList)
    return null;
  //find the best highest valued card that matches
  var bestCard = cardList[0];
  for (var k = 1;k<cardList.length;k++)
    if (cardList[k].value > bestCard.value)
      bestCard = cardList[k];
  return bestCard;
}
function getLowestValue(cardList)
{
  if (!cardList)
    return null;
  //find the best highest valued card that matches
  var worst=cardList[0];
  for (var k = 1;k<cardList.length;k++)
    if (cardList[k].value < worst.value)
      worst = cardList[k];
  return worst;
}
function playDeck()
{
 var playOn = [];

 //handle playing a card off deck if necessary
 for (var i=0;i<playField.length;i++)
    if (playField[i].month == deckCard.month)
        playOn.push(playField[i]);

 for (var i=0;i<playOn.length;i++)
    playOn[i].playable = true;
     
 //find the best card and pick it
  var bestCard = getHighestValue(playOn)
  if (bestCard)
    clickRadioButton(bestCard.element);
  else
    clickRadioButton(emptySlot);
}
function playCard()
{
//if a yaku is guaranteed, let this function handle it, and do nothing
if (playGuaranteedYaku())
  return true;

//get a list of cards in hand with matching months to cards on field
var playList = [];
var playOn = [];
//get a list of cards in month/hand with matching months

for (var k = 1;k<13;k++) //for all the months
{
  var list1 = getMonthFromList(hand,k);
  var list2 = getMonthFromList(playField,k);

  if (list1.length == 0 || list2.length == 0 || noPlayMonth == k || cheatMonth == k)
    continue;
  for (var i=0;i<list1.length;i++)
  {
    list1[i].playable = true;
    playList.push(list1[i]);
  }
  for (var i=0;i<list2.length;i++)
  {
    list2[i].playable = true;
    playOn.push(list2[i]);
  }
}


  if (playOn.length == 0)
    return false;
 var newPlayList = [];
 for (var i=0;i<playList.length;i++)
 {
    if (guaranteed(playList[i])>0)
      newPlayList.push(playList[i]);
    else
    {
      //get all possible deck cards that can match
      var cardsAvail = getMonthCards(playList[i].month)
      
      //get values (and half them) for unseen cards
      for (var k = 0;k<cardsAvail.length;k++)
        cardsAvail[k].value /= 2;
      
      //find the best matching field card
      bestCard=null, omit = false;
      for (var k = 0;k<playField.length;k++)
        if (playField[k].month == playList[i].month)
        {
          if (!bestCard)
            bestCard = playField[k];
          else if (playField[k].value > bestCard.value)
            bestCard = playField[k];
        }

      for (var k = 0;k<cardsAvail.length;k++)
        if (bestCard && bestCard.value < cardsAvail[k].value)
          omit = true;

      //if the unseen card is worth more than double a known card, wait (remove it from possiblities)
      if (!omit)
        newPlayList.push(playList[i]);
    }
 }
 playList = newPlayList;
 
var handCard = null;
var fieldCard = null;
//loop and find the best pair
for (var i=0;i<playList.length;i++)
  for (var j=0;j<playOn.length;j++)
  {
    if (playList[i].month != playOn[j].month)
      continue;
    if (!handCard || !fieldCard)
    {
      handCard = playList[i];
      fieldCard = playOn[j];
    }
    else if ((playList[i].value + playOn[j].value) > (handCard.value + fieldCard.value))
    {
      handCard = playList[i];
      fieldCard = playOn[j];
    }
  }

 if (!handCard || !fieldCard)
   return false;
   
 if (cheatCard.value > (handCard.value + fieldCard.value))
   return false;

 //click the form radio buttons
 clickRadioButton(handCard.element);
 clickRadioButton(fieldCard.element);
 return true;
}
//returns -1 if it made a play, 0 if no guaranteed yakus (continue game)
// otherwise it returns a month value (to protect if forced koi)
function playGuaranteedYaku()
{
  //for all months
  for (var i = 1;i < 13;i++)
  {
    var yakuList = [];
    var handMonths = getMonthFromList(hand, i);
    var fieldMonths = getMonthFromList(playField, i);
    if (!handMonths)
      continue;
    var combineCards = handMonths.concat(fieldMonths);
    if (!listGivesYaku(yourCards, combineCards) || handMonths.length < 1)
      continue;
    //get a list of all pairs that can give yakus
    for (var j=0;j<combineCards.length;j++)
      for (var k=0;k<combineCards.length;k++)
        if (j != k && guaranteed(combineCards[j])>0 && guaranteed(combineCards[j])>0)
        {
          var tmpList = [];
          tmpList.push(combineCards[j]);
          tmpList.push(combineCards[k]);
          if (listGivesYaku(yourCards, tmpList))
            yakuList.push(new cardPair(combineCards[j],combineCards[k]));
        }
    //for all the pairs, skip it if its not possible
    for (var b=0;b<yakuList.length;b++)
    {
      var inHand = 0;
      var onField = 0;
      if (hasCard(hand,      yakuList[b].card1.num)) inHand++;
      if (hasCard(hand,      yakuList[b].card2.num)) inHand++;
      if (hasCard(playField, yakuList[b].card1.num)) onField++;
      if (hasCard(playField, yakuList[b].card2.num)) onField++;
      
      //this is the easiest case, simply play the yaku
      if (inHand == 1 && onField == 1 && onField)
      { 
        if (forceKoi && !enemyHasKoiKoi && guaranteed(yakuList[b].card1)>0 && guaranteed(yakuList[b].card2)>0)
        {
          if (hasCard(hand, yakuList[b].card1.num))
          {
            yakuHandCard = yakuList[b].card1;
            yakuFieldCard = yakuList[b].card2;
          }
          else
          {
            yakuHandCard = yakuList[b].card2;
            yakuFieldCard = yakuList[b].card1;
          } 
          noPlayMonth = i;
          return false;
        }
        clickRadioButton(yakuList[b].card1.element);
        clickRadioButton(yakuList[b].card2.element);
        return true;
      }
      // this is the harder case, you must first play 2 cards, so just pick the 2 highest value cards
      else if (monthCount(yakuList[b].card1.month, playField) > 0)
        continue;
      else if (inHand == 2 && fieldMonths == 0)
      {
        //discard either one (both are guaranteed)
        clickRadioButton(yakuList[b].card1.element);
        clickRadioButton(emptySlot);
        return true;
      }
    }
  }

  //run a second check to see if there is a guaranteed yaku made up of 2+ guaranteed cards
  var gList = [], card1, card2;
  for (var i=0;i<hand.length;i++)
    if (guaranteed(hand[i])>0)
      gList.push(hand[i]);
  for (var i=0;i<playField.length;i++)
    if (guaranteed(playField[i])>0)
      gList.push(playField[i]);
  //this runs if you're playing towards 1 card from a guaranteed yaku
  

  var playCard = null;
  if (sacCount(yourCards)    + sacCount(gList)    == 3 && sacCount(gList)    > 1)   playCard = findSac(gList);
  if (loopCount(yourCards)   + loopCount(gList)   == 3 && loopCount(gList)   > 1)   playCard = findLoop(gList);
  if (redCount(yourCards)    + redCount(gList)    == 3 && redCount(gList)    > 1)   playCard = findRed(gList);
  if (blueCount(yourCards)   + blueCount(gList)   == 3 && blueCount(gList)   > 1)   playCard = findBlue(gList);
  if (roCount(yourCards)     + roCount(gList)     == 3 && roCount(gList)     > 1)   playCard = findRo(gList);
  if (brightCount(yourCards) + brightCount(gList) == 3 && brightCount(gList) > 1)   playCard = findBright(gList);

  if (!playCard)
    return false;
  //find playcard, and match it with another card
  var month = playCard.month;
  var otherCard = null;
  if      (hasCard(hand, playCard.num))
  {
    for (var i=0;i<playField.length;i++)
      if (playField[i].month == month)
      {
        otherCard = playField[i];
        break;
      }
  }
  else if (hasCard(playField, playCard.num))
  {
    for (var i=0;i<hand.length;i++)
      if (hand[i].month == month)
      {
        otherCard = hand[i];
        break;
      }
  }
  if (!playCard || !otherCard)
    return false;
  clickRadioButton(playCard.element);
  clickRadioButton(otherCard.element);
}
function cardPair(card1, card2)
{
  this.card1 = card1;
  this.card2 = card2;
}
function getMonthFromList(list, month)
{
  var cardList = [];
  for (var h = 0;h < list.length;h++)
    if (list[h].month == month)
      cardList.push(list[h]);
  return cardList;
}
function getMonthCards(month)
{
  var cardList = [];
  for (var h = 0;h < 4;h++)
    if (isAvailable(h+(month-1)*4+1))
      cardList.push(new Card(h+(month-1)*4+1,null));
  return cardList;
}
function discard()
{
  var worstCard = null;
  if ((cheatMonth > 0 && !hasMonth(playField, cheatMonth) && hasMonth(hand, cheatMonth)))
    worstCard = cheatCard;
  else
  {
    // calculate card values for cards in hand
    for (var i=0;i<hand.length;i++)
    {
      if (guaranteed(hand[i]) == -1)
      {
        worstCard = hand[i];
        break;
      }
      hand[i].playable=true;
      var month = hand[i].month;
      
      // this is designed to help with the selection of guaranteed cards
      // (the best guaranteed card will be discarded to be taken)
      if (guaranteed(hand[i])>0)
        hand[i].value = 0.01 - hand[i].value;
      //add the value of the highest valued card (for that month) to the discard value
    
      else if (!guaranteed(hand[i])>0)
      {
        var cardsAvail = getAvailable(month);
        var bestVal=0
        for (var k=0;k<cardsAvail.length;k++)
        {  
          var newVal = cardsAvail[k].value;
          if (newVal > bestVal)
           bestVal = newVal;
        }
        hand[i].value += bestVal;
      }
    }
    //find the worst card and drop it
    worstCard = null;
    for (var k = 0;k<hand.length;k++)
      if ((worstCard == null || hand[k].value < worstCard.value) && hand[k].month != noPlayMonth)
        worstCard = hand[k];
  }
 
  if (worstCard)
  {
    clickRadioButton(worstCard.element);
    clickRadioButton(emptySlot);
    var otherCard=null;
    //in case we have a matching month check here
    for (var g =0;g<playField.length;g++)
      if (playField[g].month == worstCard.month)
      {
        playField[g].playable = true;
        if(!otherCard)
          otherCard = playField[g];
        else if (otherCard.value > playField[g].value)
          otherCard = playField[g];
      }
    if (otherCard)
      clickRadioButton(otherCard.element);
 }
 else
 {
    if (yakuHandCard && yakuFieldCard)
    {
      clickRadioButton(yakuHandCard.element);
      clickRadioButton(yakuFieldCard.element);
    }
  }
}
function updateMultipliers()
{
  //check for conflicting cards
  var conflictBlue = false;
  var conflictRed  = false;
  var conflictRo   = false;
  var conflictBright = 0;
  var conflictLoop = false;
  var conflictSac = false;
 
  //update card multipliers from cards possesed by you and opponent
  for (var i=0;i<yourCards.length;i++)
  {
    num = yourCards[i].num;
    if (isRoShamBo(num))  conflictRo     = true; 
    if (isRribbon(num) )  conflictRed    = true; 
    if (isBribbon(num) )  conflictBlue   = true; 
    if (isBright(num)  )  conflictBright += 1; 
    if (isLoop(num)    )  conflictLoop   = true; 
    if (isSac(num)     )  conflictSac    = true; 
  }
  var chkBright = 0;
  for (var i=0;i<enemyCards.length;i++)
  {
    num = enemyCards[i].num;
    if (isRoShamBo(num) && conflictRo        ) RoShamBo  = 0;
    if (isRribbon(num)  && conflictRed       ) Rribbon   = 0;
    if (isBribbon(num)  && conflictBlue      ) Bribbon   = 0;
    if (isBright(num)   && conflictBright > 1) chkBright ++;
    if (isLoop(num)     && conflictLoop      ) loop      = 0;
    if (isSac(num)      && conflictSac       ) sacrifice = 0;
  }
  if (chkBright == 2)
    brights   = 0;
  ////for all cards in the deck, add a block factor based on enemy yakus
  for (var k =1;k<13;k++)
  {
    possibleCards = getMonthCards(k);
    for (var i = 0;i<possibleCards.length;i++)
    {
      var ccard = possibleCards[i];
      if (isRoShamBo(ccard.num))  monthMult[k] += (RoShamBo  * roCount(enemyCards))        / monthBlock / 3;
      if  (isRribbon(ccard.num))  monthMult[k] += (Rribbon   * rRibbonCount(enemyCards))   / monthBlock / 3;
      if  (isBribbon(ccard.num))  monthMult[k] += (Bribbon   * bRibbonCount(enemyCards))   / monthBlock / 3;
      if   (isBright(ccard.num))  monthMult[k] += (brights   * brightCount(enemyCards))    / monthBlock / 3;
      if     (isLoop(ccard.num))  monthMult[k] += (loop      * loopCount(enemyCards))      / monthBlock / 2;
      if      (isSac(ccard.num))  monthMult[k] += (sacrifice * sacrificeCount(enemyCards)) / monthBlock / 2;
      if   (isRibbon(ccard.num))  monthMult[k] += (ribbon    * ribbonCount(enemyCards))    / monthBlock / 5;
      if   (isAnimal(ccard.num))  monthMult[k] += (animal    * animalCount(enemyCards))    / monthBlock / 5;
      if    (isPlain(ccard.num))  monthMult[k] += (plain     * plainCount(enemyCards))     / monthBlock / 10;
    }
  }  
}

function getCardType(card)
{
  var num = card.num;
  retString = "";
  if (card.month == 1 ) retString += "Jan";
  if (card.month == 2 ) retString += "Feb";
  if (card.month == 3 ) retString += "Mar";
  if (card.month == 4 ) retString += "Apr";
  if (card.month == 5 ) retString += "May";
  if (card.month == 6 ) retString += "Jun";
  if (card.month == 7 ) retString += "jul";
  if (card.month == 8 ) retString += "Aug";
  if (card.month == 9 ) retString += "Sep";
  if (card.month == 10) retString += "Oct";
  if (card.month == 11) retString += "Nov";
  if (card.month == 12) retString += "dec";
  if       (isRoShamBo(num)) retString += " A(Ro)";
  else if  (isRribbon (num)) retString += " R(Red)";
  else if  (isBribbon (num)) retString += " R(Blue)";
  else if  (isWet     (num)) retString += " B(wet)";
  else if  (isBright  (num)) retString += " B(dry)";
  else if  (isLoop    (num)) retString += " P(loop)";
  else if  (isSac     (num)) retString += " A(sac)";
  else if  (isRibbon  (num)) retString += " R";
  else if  (isAnimal  (num)  
         && isPlain   (num)) retString += " P+A";
  else if  (isAnimal  (num)) retString += " A";
  else if  (isPlain   (num)) retString += " P";
  return retString;
}

function hasCard(list, num)
{
  for (var i = 0;i<list.length;i++)
    if (list[i].num == num)
      return true;
  return false;
}

function clickRadioButton(element)
{
  if (!element)
    return false;
  var strXPath = "";
  strXPath += '//form[@name=\'' + "placecard" + '\']';
  strXPath += '//input[@id=\'' + element.getAttribute("for") + '\']';
  var elem = document.evaluate(strXPath, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
  elem.checked = true;
}

function submitForm(formName)
{
  if (document.forms.namedItem(formName))
    location.assign('javascript:' + formName + '.submit()');
}

function getMultipliers(card, isField)
{
  var num = card.num;
  var month = card.month;
  var multList = []
  
  if (isPlain(num)    ) multList.push(new Mult("is a member of plain yaku",           Math.round(plainMult   () *1000)/1000));
  if (isRibbon(num)   ) multList.push(new Mult("is a member of ribbon yaku",          Math.round(ribbonMult  () *1000)/1000));                      
  if (isAnimal(num)   ) multList.push(new Mult("is a member of animal yaku",          Math.round(animalMult  () *1000)/1000));
  if (isRribbon(num)  ) multList.push(new Mult("is a member of red ribbon yaku",      Math.round(RribbonMult () *1000)/1000));
  if (isBribbon(num)  ) multList.push(new Mult("is a member of blue ribbon yaku",     Math.round(BribbonMult () *1000)/1000));
  if (isRoShamBo(num) ) multList.push(new Mult("is a member of roshambo yaku",        Math.round(RoShamBoMult() *1000)/1000));
  if (isBright(num)   ) multList.push(new Mult("is a member of bright yaku",          Math.round(brightMult  () *1000)/1000));
  if (isLoop(num)     ) multList.push(new Mult("is a member of loop yaku",            Math.round(loopMult    () *1000)/1000));
  if (isSac(num)      ) multList.push(new Mult("is a member of sacrifice yaku",       Math.round(sacMult     () *1000)/1000));
  if (isWet(num)      ) multList.push(new Mult("can combine with 3+ brights",         Math.round(wetMult     () *1000)/1000));
  if (givesYaku(yourCards, num)) multList.push(new Mult("This card gives you a yaku", Math.round(yakuMult       *1000)/1000));
    
  if (monthMult[month] > 0)
    multList.push(new Mult("Month Deny (this value is added after 2/3 card negative multiplyers)", Math.round(monthMult[month]*1000)/1000)) 
  if (isField)
    multList.push(new Mult("Card is on field", "+" + ((Math.round(onFieldMult*1000)/1000) * 100) + "%"))
  if (guaranteed(card)>0)
    multList.push(new Mult(" of normal value (card is guaranteed)", guaranteeMult *100 + "%"))
  
  if (discarding && monthCount(month, hand) > 1)
    multList.push(new Mult("2 of a kind in hand", "-" +((Math.round((1- twoInHand)*1000)/1000) * 100) + "%"))
  if (discarding && monthCount(month, hand) > 2)
    multList.push(new Mult("3 of a kind in hand (stacks with 2 of a kind)", "-" + ((Math.round((1- threeInPlay)*1000)/1000) * 100) + "%"))
  return multList;
}

//initiate a card object
function Mult(Name, Value)
{
  this.name = Name;
  this.value = Value;
}

function Reason(Text, Value)
{
  this.text = Text;
  this.value = Value;
}

function getScore()
{
var mtch = /: <b><i>(\d+)\S+?;Points<\/i><\/b><ta/.exec(document.body.innerHTML);
if (!mtch)
  return -1;
return parseInt(mtch[1]);
}

	this.debugBtn = document.createElement("a");
	this.debugWindow1 = document.createElement("db1");
  this.debugWindow2 = document.createElement("db2");
     
  var forfForm = document.forms.namedItem("forfeit");
  
	// add the debug popup button
  insertAfter(this.debugBtn, forfForm);
	this.debugBtn.style.color = "#000066";
	this.debugBtn.style.fontSize = "25px";
  if (document.forms.namedItem("bankpoints") || document.forms.namedItem("koikoi"))
    this.debugBtn.href = "javascript:document.getElementById('debugWindow2').style.display = ''; void(0);";
  else
	  this.debugBtn.href = "javascript:document.getElementById('debugWindow1').style.display = ''; void(0);";
	this.debugBtn.innerHTML = "<b>debug script &gt;</b>";
	insertAfter(document.createElement("br"), forfForm);

	// add the debug window information
	this.debugWindow1.id = "debugWindow1"              ; this.debugWindow2.id = "debugWindow2"
	this.debugWindow1.style.display = "none"           ; this.debugWindow2.style.display = "none"           
	this.debugWindow1.style.fontFamily = "arial"       ; this.debugWindow2.style.fontFamily = "arial"       
	this.debugWindow1.style.fontSize = "20px"          ; this.debugWindow2.style.fontSize = "20px"          
	this.debugWindow1.style.position = "fixed"         ; this.debugWindow2.style.position = "fixed"         
	this.debugWindow1.style.bottom = "0px"             ; this.debugWindow2.style.bottom = "0px"             
	this.debugWindow1.style.right = "0px"              ; this.debugWindow2.style.right = "0px"              
  this.debugWindow1.style.width = "400px"            ; this.debugWindow2.style.width = "600px"            
  this.debugWindow1.style.height = "500px"           ; this.debugWindow2.style.height = "550px"           
  this.debugWindow1.style.textalign = "center"       ; this.debugWindow2.style.textalign = "center"       
	this.debugWindow1.style.backgroundColor = "#B5D7E0"; this.debugWindow2.style.backgroundColor = "#B5D7E0"
  if (document.forms.namedItem("bankpoints") || document.forms.namedItem("koikoi"))
  {
    var tmpList = [
      "<span style=\"float: right; cursor: pointer;\" onclick=\"document.getElementById('debugWindow2').style.display='none';\"><b>Close [X]</b></span><br/>",
      "<b>Reasons to KoiKoi&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspReasons to Bank</b>",
      "<table style=\"z-index: 50; width: 600px; font-size: 10px; height: 12px;\">",
        "<tr>"].join("");
      var currKoi=0;
      var currBank=0;
      while (currKoi < koiReasons.length || currBank < bankReasons.length)
      {
        if (currKoi < koiReasons.length)
        {
          tmpList+= "<td style=\"left: 0px;\"><b>"+koiReasons[currKoi].value+"</b></td>";
          tmpList+= "<td style=\"left: 30px;\"><b>"+koiReasons[currKoi].text+"</b></td>";
          currKoi++;
        }
        else
        {
          tmpList+= "<td style=\"left: 0px;\"><b></b></td>";
          tmpList+= "<td style=\"left: 30px;\"><b></b></td>";
        }
        if (currBank < bankReasons.length)
        {
          tmpList+= "<td style=\"left: 400px;\"><b>"+bankReasons[currBank].value+"</b></td>";
          tmpList+= "<td style=\"left: 430px;\"><b>"+bankReasons[currBank].text+"</b></td>";
          currBank++;
        }
        else
        {
          tmpList+= "<td style=\"left: 0px;\"><b></b></td>";
          tmpList+= "<td style=\"left: 30px;\"><b></b></td>";
        }
        tmpList+="</tr>";
      }
      tmpList+="</table>";
      
      this.debugWindow2.innerHTML = tmpList;
    document.body.appendChild(this.debugWindow2);
  }
  else
  {
    var tmpList = [
      "<span style=\"float: right; cursor: pointer;\" onclick=\"document.getElementById('debugWindow1').style.display='none';\"><b>Close [X]</b></span><br/>",
      "<b>Hand</b>",
      "<table style=\"z-index: 50; width: 400px; font-size: 10px; height: 12px;\">",
        "<tr>",
          "<td style=\"left: 0px;\"><b>Card</b></td>",
          "<td style=\"left: 80px;\"><b>Value</b></td>",
          "<td style=\"left: 160px;\"><b>Point BreakDown</b></td>",
          "</tr>"].join("");
      for (var g = 0;g < hand.length;g++)
      {
        if (hand[g].playable)
        {
          tmpList+= [ "<tr>",
          "<td style=\"left: 0px;\"><b>" + getCardType(hand[g]) + "</b></td>",
          "<td style=\"left: 80px;\"><b>" + Math.round(hand[g].value*1000)/1000 + "</b></td>",
          "<td style=\"left: 160px;\"><b>" ].join("");
          var mults = getMultipliers(hand[g], false);
          if (mults)
          {
            for (var d = 0;d < mults.length;d++)
              tmpList += mults[d].value + " " + mults[d].name + "<BR>";
          }
          tmpList += ["</b></td></tr>"].join("");
        }
       }
      tmpList += "</table>";
      
      tmpList += "<b>Field</b>" +
                 "<table style=\"z-index: 50; width: 400px; font-size: 10px; height: 12px;\">" +
                 "<tr>" +
                 "<td style=\"left: 0px;\"><b>Card</b></td>"+
                 "<td style=\"left: 80px;\"><b>Value</b></td>"+
                 "<td style=\"left: 160px;\"><b>Point BreakDown</b></td>"+
                 "</tr>";
      for (var g = 0;g < playField.length;g++)
      {
        if (playField[g].playable)
        {
          tmpList+= [ "<tr>",
          "<td style=\"left: 0px;\"><b>" + getCardType(playField[g]) + "</b></td>",
          "<td style=\"left: 80px;\"><b>" + Math.round(playField[g].value*1000)/1000 + "</b></td>",
          "<td style=\"left: 160px;\"><b>" ].join("");
          var mults = getMultipliers(playField[g], true);
          if (mults)
          {
            for (var d = 0;d < mults.length;d++)
              tmpList += mults[d].value + " " + mults[d].name + "<BR>";
          }
          tmpList += ["</b></td></tr>"].join("");
        }
       }
      tmpList += "</table>";
      this.debugWindow1.innerHTML = tmpList;
    document.body.appendChild(this.debugWindow1);
  }

function getYourScoreToWin()
{
  var mtches = /You \((Dealer - )?Current Score: (\d+) :: (\d+) to win\)/.exec(document.body.innerHTML);
  return parseInt(mtches[3]) - parseInt(mtches[2]);
}
function getEnemyScoreToWin()
{
  var mtches = /Them \((Dealer - )?Current Score: (\d+) :: (\d+) to win\)/.exec(document.body.innerHTML);
  return parseInt(mtches[3]) - parseInt(mtches[2]);
}

function setCheat(inStr)
{
  var defaultChoice;
  if (inStr == "koi") 
    defaultChoice = /value="(\d)">Force Koi-Koi/.exec(document.body.innerHTML)[1];
  if (inStr == "topCard") 
    defaultChoice = /value="(\d)">View top of deck/.exec(document.body.innerHTML)[1];
  if (inStr == "minusCard") 
    defaultChoice = /value="(\d)">Opp. -1 Take/.exec(document.body.innerHTML)[1];
  if (inStr == "redraw") 
    defaultChoice = /value="(\d)">Shuffle \+ Redraw/.exec(document.body.innerHTML)[1];
  if (inStr == "bottom")
    defaultChoice = /value="(.*)">Top Card to Bottom/.exec(document.body.innerHTML)[1];

  if (!defaultChoice)
    defaultChoice = "none";
  if (defaultChoice != "none")
    useCheat = inStr;
  var elems = document.forms.namedItem("cheat").elements;
  for (var i=0;i<elems.length;i++)
    if (elems[i].getAttribute("name") == "hanacheat")
      elem = elems[i];
  elem.value = defaultChoice;
}

function processEvent(event) 
{
  var input = event.keyCode;
  if(input==67)
  {
    if (useCheat)
      submitForm("cheat");
    else  //change the keycode to run regular script choice
      input = 68;
  }
	if(input==68)
  {
    if(document.forms.namedItem("nextround"))
    {
      //disable forced koi flag at end of round
      GM_setValue("forcedKoi", false);
      submitForm("nextround");
    }
    else if (document.forms.namedItem("bankpoints") && !document.forms.namedItem("koikoi"))
      submitForm("bankpoints");
    else if (document.forms.namedItem("bankpoints") && document.forms.namedItem("koikoi"))
    {
      if (koikoi())
        submitForm("koikoi");
      else
        submitForm("bankpoints");
    }
    else
      submitForm("placecard");
  }
  if(input==86)
  {
    if (document.forms.namedItem("bankpoints") || document.forms.namedItem("koikoi"))
    {
      if (document.getElementById('debugWindow2').style.display == '')
        document.getElementById('debugWindow2').style.display = 'none'
      else
        document.getElementById('debugWindow2').style.display = '';
    }
    else
    {
      if (document.getElementById('debugWindow1').style.display == '')
        document.getElementById('debugWindow1').style.display = 'none'
      else
        document.getElementById('debugWindow1').style.display = '';
    }
  }
}
window.addEventListener("keyup", processEvent, false);
