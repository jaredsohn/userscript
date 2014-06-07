// Clip Art sorter by Johnny Treehugger (#1427059)
//
// ==UserScript==
// @name           Clip Art sorter
// @namespace      http://kol.coldfront.net/thekolwiki/index.php/User:Johnny_Treehugger
// @description    Version 1.0 - Sorts clip arts by type
// @include        http://*kingdomofloathing.com/campground.php*
// ==/UserScript==

/*
Allows user sorting of the list of previously summoned items for the Summon Clip Art ability.  Want your clip arts grouped by type?  Done.  Want to eliminate everything but your favorite summons?  Done.  

To make your own list, edit the script, create an array of strings like the ones below, then add your list to variable clipArtListList and your list's name to clipArtNameList.  Put it first on the list to make it show up by default. 
 */

// Version 0.0	07/20/2012	IT BEGINS!
// Version 1.0	07/20/2012	Well, that was quick

// TODO: Collapseable sections?

var fullArtList = [
['4,4,4,977325030', 'bucket of wine', 'pail.gif', 'Booze'],
['1,4,4,320019527', 'Beignet Milgranet', 'wine2.gif', 'Booze'],
['10,4,4,489995659', 'Bordeaux Marteaux', 'wine2.gif', 'Booze'],
['5,4,4,892840469', 'Fromage Pinotage', 'wine2.gif', 'Booze'],
['6,4,4,170016949', 'Lumineux Limnio', 'wine2.gif', 'Booze'],
['8,4,4,809104289', 'Morto Moreto', 'wine2.gif', 'Booze'],
['3,4,4,538079522', 'Muschat', 'wine2.gif', 'Booze'],
['9,4,4,454309090', 'Temps Tempranillo', 'wine2.gif', 'Booze'],

['5,5,5,599765578', 'ultrafondue', 'fonduepot.gif', 'Food'],
['1,1,1,517311708', 'Ur-Donut', 'powderdonut.gif', 'Food'],
['5,5,6,512458370', 'toasted brie', 'toastedbrie.gif', 'Food'],
['1,10,3,402774947', 'blunt cat claw', 'catclaw.gif', 'Food'],
['1,3,8,863518314', 'shadowy cat claw', 'catclaw.gif', 'Food'],
['1,3,7,385514539', 'cool cat claw', 'catclaw.gif', 'Food'],
['5,1,10,488549848', 'smashed danish', 'paste2.gif', 'Food'],
['5,1,8,984027975', 'forbidden danish', 'danish.gif', 'Food'],
['5,1,7,718294550', 'frozen danish', 'danish.gif', 'Food'],
['1,10,4,603567625', 'shrapnel jelly donut', 'jellydonut.gif', 'Food'],
['1,8,4,621283004', 'occult jelly donut', 'jellydonut.gif', 'Food'],
['1,7,4,249351840', 'cool jelly donut', 'jellydonut.gif', 'Food'],
['9,1,4,635915672', 'thyme jelly donut', 'jellydonut.gif', 'Food'],
['5,5,3,929836778', 'cheezburger', 'burger.gif', 'Food'],

['3,3,4,865033460', 'potion of the field gar', 'potion3.gif', 'Potions'],
['7,7,4,514757905', 'cold-filtered water', 'waterbottle.gif', 'Potions'],
['6,6,4,231547639', 'Bright Water', 'waterbottle.gif', 'Potions'],
['9,3,4,159447368', 'potion of punctual companionship', 'potion7.gif', 'Potions'],
['10,10,4,495788949', 'potion of the captain\'s hammer', 'potion2.gif', 'Potions'],
['3,7,4,944132814', 'cool cat elixir', 'potion9.gif', 'Potions'],
['8,7,4,213000900', 'graveyard snowglobe', 'meatglobe.gif', 'Potions'],
['3,8,4,569104824', 'potion of animal rage', 'potion6.gif', 'Potions'],
['5,3,4,270866829', 'potion of the litterbox', 'potion5.gif', 'Potions'],
['6,8,4,411693111', 'potion of X-ray vision', 'potion4.gif', 'Potions'],
['9,10,4,897208811', 'too legit potion', 'potion7.gif', 'Potions'],

['8,8,8,364690120', 'crystal skull', 'crystalskull.gif', 'Combat Items'],
['6,6,6,580600083', 'unbearable light', 'light.gif', 'Combat Items'],
['2,2,2,779127476', 'The Bomb', 'bigbomb.gif', 'Combat Items'],
['2,2,9,682959289', '4:20 bomb', 'clockbomb.gif', 'Combat Items'],
['2,3,3,693382999', 'bobcat grenade', 'grenade.gif', 'Combat Items'],
['2,2,4,738824353', 'boozebomb', 'bomb.gif', 'Combat Items'],
['2,10,6,306831208', 'broken glass grenade', 'grenade.gif', 'Combat Items'],
['2,1,1,687495019', 'chocolate frosted sugar bomb', 'bigbomb.gif', 'Combat Items'],
['2,6,6,157921711', 'holy bomb, batman', 'bomb.gif', 'Combat Items'],
['2,5,3,254069397', 'noxious gas grenade', 'grenade.gif', 'Combat Items'],
['7,7,7,734400982', 'oversized snowflake', 'snowflake.gif', 'Combat Items'],
['2,2,8,111476543', 'skull with a fuse in it', 'skullbomb.gif', 'Combat Items'],

['3,3,3,197797892', 'box of Familiar Jacks', 'famjacks.gif', 'Usable Items'],
['9,9,9,202359698', 'borrowed time', 'watch.gif', 'Usable Items'],
['10,10,10,644838641', 'box of hammers', 'hammerbox.gif', 'Usable Items'],

['1,6,6,256581155', 'shining halo', 'lighthalo.gif', 'Accessories'],
['1,3,3,942102010', 'furry halo', 'furhalo.gif', 'Accessories'],
['1,7,7,690053378', 'frosty halo', 'frosthalo.gif', 'Accessories'],
['9,9,1,277862470', 'time halo', 'timehalo.gif', 'Accessories'],
['9,9,10,375503738', 'broken clock', 'neckclock.gif', 'Accessories'],
['9,9,8,950023220', 'dethklok', 'neckclock.gif', 'Accessories'],
['9,9,7,624410226', 'glacial clock', 'neckclock.gif', 'Accessories'],

['10,10,7,436192270', 'blunt icepick', 'blunticepick.gif', 'Weapons'],
['10,10,8,833394012', 'hammerus', 'bone.gif', 'Weapons'],
['2,10,10,602806795', 'blammer', 'clawhammer.gif', 'Weapons'],
['9,10,10,336085167', 'clock-cleaning hammer', 'clawhammer.gif', 'Weapons'],
['10,10,6,922506096', 'fluorescent lightbulb', 'fluobulb.gif', 'Weapons'],
['1,2,3,858773065', 'oyster egg', 'eggpaisley.gif', 'Weapons'], 
];

var shortArtList = [
['4,4,4,977325030', 'bucket of wine', 'pail.gif', 'Booze'],
['9,4,4,454309090', 'Temps Tempranillo', 'wine2.gif', 'Booze'],

['5,5,5,599765578', 'ultrafondue', 'fonduepot.gif', 'Food'],
['1,1,1,517311708', 'Ur-Donut', 'powderdonut.gif', 'Food'],

['3,3,4,865033460', 'potion of the field gar', 'potion3.gif', 'Potions'],
['7,7,4,514757905', 'cold-filtered water', 'waterbottle.gif', 'Potions'],
['6,6,4,231547639', 'Bright Water', 'waterbottle.gif', 'Potions'],
['9,3,4,159447368', 'potion of punctual companionship', 'potion7.gif', 'Potions'],

['8,8,8,364690120', 'crystal skull', 'crystalskull.gif', 'Combat Items'],
['6,6,6,580600083', 'unbearable light', 'light.gif', 'Combat Items'],
['2,2,2,779127476', 'The Bomb', 'bigbomb.gif', 'Combat Items'],

['3,3,3,197797892', 'box of Familiar Jacks', 'famjacks.gif', 'Usable Items'],
['9,9,9,202359698', 'borrowed time', 'watch.gif', 'Usable Items'],
['10,10,10,644838641', 'box of hammers', 'hammerbox.gif', 'Usable Items'],

['1,6,6,256581155', 'shining halo', 'lighthalo.gif', 'Accessories'],
['1,3,3,942102010', 'furry halo', 'furhalo.gif', 'Accessories'],
];

var origArtList = [
['2,2,9,682959289', '4:20 bomb', 'clockbomb.gif', ''],
['1,4,4,320019527', 'Beignet Milgranet', 'wine2.gif', ''],
['2,10,10,602806795', 'blammer', 'clawhammer.gif', ''],
['1,10,3,402774947', 'blunt cat claw', 'catclaw.gif', ''],
['10,10,7,436192270', 'blunt icepick', 'blunticepick.gif', ''],
['2,3,3,693382999', 'bobcat grenade', 'grenade.gif', ''],
['2,2,4,738824353', 'boozebomb', 'bomb.gif', ''],
['10,4,4,489995659', 'Bordeaux Marteaux', 'wine2.gif', ''],
['9,9,9,202359698', 'borrowed time', 'watch.gif', ''],
['3,3,3,197797892', 'box of Familiar Jacks', 'famjacks.gif', ''],
['10,10,10,644838641', 'box of hammers', 'hammerbox.gif', ''],
['6,6,4,231547639', 'Bright Water', 'waterbottle.gif', ''],
['9,9,10,375503738', 'broken clock', 'neckclock.gif', ''],
['2,10,6,306831208', 'broken glass grenade', 'grenade.gif', ''],
['4,4,4,977325030', 'bucket of wine', 'pail.gif', ''],
['5,5,3,929836778', 'cheezburger', 'burger.gif', ''],
['2,1,1,687495019', 'chocolate frosted sugar bomb', 'bigbomb.gif', ''],
['9,10,10,336085167', 'clock-cleaning hammer', 'clawhammer.gif', ''],
['7,7,4,514757905', 'cold-filtered water', 'waterbottle.gif', ''],
['1,3,7,385514539', 'cool cat claw', 'catclaw.gif', ''],
['3,7,4,944132814', 'cool cat elixir', 'potion9.gif', ''],
['1,7,4,249351840', 'cool jelly donut', 'jellydonut.gif', ''],
['8,8,8,364690120', 'crystal skull', 'crystalskull.gif', ''],
['9,9,8,950023220', 'dethklok', 'neckclock.gif', ''],
['10,10,6,922506096', 'fluorescent lightbulb', 'fluobulb.gif', ''],
['5,1,8,984027975', 'forbidden danish', 'danish.gif', ''],
['5,4,4,892840469', 'Fromage Pinotage', 'wine2.gif', ''],
['1,7,7,690053378', 'frosty halo', 'frosthalo.gif', ''],
['5,1,7,718294550', 'frozen danish', 'danish.gif', ''],
['1,3,3,942102010', 'furry halo', 'furhalo.gif', ''],
['9,9,7,624410226', 'glacial clock', 'neckclock.gif', ''],
['8,7,4,213000900', 'graveyard snowglobe', 'meatglobe.gif', ''],
['10,10,8,833394012', 'hammerus', 'bone.gif', ''],
['2,6,6,157921711', 'holy bomb, batman', 'bomb.gif', ''],
['6,4,4,170016949', 'Lumineux Limnio', 'wine2.gif', ''],
['8,4,4,809104289', 'Morto Moreto', 'wine2.gif', ''],
['3,4,4,538079522', 'Muschat', 'wine2.gif', ''],
['2,5,3,254069397', 'noxious gas grenade', 'grenade.gif', ''],
['1,8,4,621283004', 'occult jelly donut', 'jellydonut.gif', ''],
['7,7,7,734400982', 'oversized snowflake', 'snowflake.gif', ''],
['3,8,4,569104824', 'potion of animal rage', 'potion6.gif', ''],
['9,3,4,159447368', 'potion of punctual companionship', 'potion7.gif', ''],
['10,10,4,495788949', 'potion of the captain\'s hammer', 'potion2.gif', ''],
['3,3,4,865033460', 'potion of the field gar', 'potion3.gif', ''],
['5,3,4,270866829', 'potion of the litterbox', 'potion5.gif', ''],
['6,8,4,411693111', 'potion of X-ray vision', 'potion4.gif', ''],
['1,3,8,863518314', 'shadowy cat claw', 'catclaw.gif', ''],
['1,6,6,256581155', 'shining halo', 'lighthalo.gif', ''],
['1,10,4,603567625', 'shrapnel jelly donut', 'jellydonut.gif', ''],
['2,2,8,111476543', 'skull with a fuse in it', 'skullbomb.gif', ''],
['5,1,10,488549848', 'smashed danish', 'paste2.gif', ''],
['9,4,4,454309090', 'Temps Tempranillo', 'wine2.gif', ''],
['2,2,2,779127476', 'The Bomb', 'bigbomb.gif', ''],
['9,1,4,635915672', 'thyme jelly donut', 'jellydonut.gif', ''],
['9,9,1,277862470', 'time halo', 'timehalo.gif', ''],
['5,5,6,512458370', 'toasted brie', 'toastedbrie.gif', ''],
['9,10,4,897208811', 'too legit potion', 'potion7.gif', ''],
['5,5,5,599765578', 'ultrafondue', 'fonduepot.gif', ''],
['6,6,6,580600083', 'unbearable light', 'light.gif', ''],
['1,1,1,517311708', 'Ur-Donut', 'powderdonut.gif', ''],
];

var clipArtListList = [fullArtList, shortArtList, origArtList];
var clipArtNameList = ['my list', 'my short list', 'original list'];

var doSectionHeaders = true;

function toggleList() {
  var whichList = GM_getValue("whichList", 0);
  whichList++;
  if (whichList>=clipArtListList.length) whichList = 0;
  GM_setValue("whichList", whichList);
  //  alert('Now using ' + clipArtNameList[whichList] + '.');
  location.reload();
}

if (document.body.innerHTML.indexOf("The Tome whispers into your mind.")>0) {
  var whichList = GM_getValue("whichList", 0);
  if (whichList>=clipArtListList.length) whichList = 0;
  var clipArtList = clipArtListList[whichList];

  var speedDial = document.getElementById('speeddial');
  var children = speedDial.childNodes;
  if (children.length<=2) return;

  var actionLog = "";

  //  alert(Math.max(children.length-2, clipArtList.length) + ", " + (children.length-2) + ", " + clipArtList.length);
  var maxItems = Math.max(children.length-2, clipArtList.length);

  for (var i=0; i<maxItems; i++) {
    if (i>=clipArtList.length) {
      //more items in KoL's list than our list, delete
      //      speedDial.removeChild(children[i+2]);
      speedDial.removeChild(children[2+clipArtList.length]);
      actionLog = actionLog + i + " remove, ";
    } else {
      var newElement = document.createElement("TABLE");
      newElement.innerHTML = '<table><tbody><tr><td><img rel="' + clipArtList[i][0] + '" alt="' + clipArtList[i][1] + '" title="' + clipArtList[i][1] + '" src="http://images.kingdomofloathing.com/itemimages/' + clipArtList[i][2] + '"></td><td><b>' + clipArtList[i][1] + '</b></td></tr><tr><td colspan="2" align="center"><input class="button" value="Touch Ingredients" type="button"></td></tr></tbody></table>';
      if (i>=children.length-2) {
	//more items in our list than KoL's list, append
	speedDial.appendChild(newElement);
	actionLog = actionLog + i + " append, ";
      } else {
	//replace
	speedDial.replaceChild(newElement, children[2+i]);
	actionLog = actionLog + i + " replace, ";
      }
    }
  }

  //  alert(actionLog);

  if (doSectionHeaders) {
    var prevType = "";
    for (var i=clipArtList.length-1; i>=0; i--) {
      var currType = clipArtList[i][3];
      if (prevType!="" && prevType!=currType) {
	newElement = document.createElement("B");
	newElement.innerHTML = "<HR/>" + prevType + "<HR/>";
	speedDial.insertBefore(newElement, children[i+3]);
      }
      prevType = currType;
    }
    if (prevType!="") {
      newElement = document.createElement("B");
      newElement.innerHTML = "<HR/>" + prevType + "<HR/>";
      speedDial.insertBefore(newElement, children[i+3]);
    }
  }

  var toggleDiv = document.createElement("DIV");
  toggleDiv.innerHTML = "Using " + clipArtNameList[whichList] + " - click here to toggle list.";
  toggleDiv.addEventListener("click", toggleList);
  speedDial.replaceChild(toggleDiv, children[1]);

  //  document.ready(ready);
}

