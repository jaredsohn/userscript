// Naltrexone's KoL Scripts
// 
// ==UserScript==
// @name           Naltrexone's KoL Scripts - WikiLink
// @namespace      http://www.batmantis.com/kol
// @include        *kingdomofloathing.com/desc_item.php*
// @include        *127.0.0.1:600*/desc_item.php*
// @include        *kingdomofloathing.com/desc_familiar.php*
// @include        *127.0.0.1:600*/desc_familiar.php*
// @include        *kingdomofloathing.com/desc_effect.php*
// @include        *127.0.0.1:600*/desc_effect.php*
// @include        *kingdomofloathing.com/inventory.php*
// @include        *127.0.0.1:600*/inventory.php*
// @include        *kingdomofloathing.com/hermit.php*
// @include        *127.0.0.1:600*/hermit.php*
// @include        *kingdomofloathing.com/store.php*
// @include        *127.0.0.1:600*/store.php*
// @include        *kingdomofloathing.com/mallstore.php*
// @include        *127.0.0.1:600*/mallstore.php*
// @include        *kingdomofloathing.com/searchmall.php*
// @include        *127.0.0.1:600*/searchmall.php*
// @include        *kingdomofloathing.com/galaktik.php*
// @include        *127.0.0.1:600*/galaktik.php*
// @include        *kingdomofloathing.com/mrstore.php*
// @include        *127.0.0.1:600*/mrstore.php*
// @include        *kingdomofloathing.com/fight.php*
// @include        *127.0.0.1:600*/fight.php*
// @include        *kingdomofloathing.com/charpane.php*
// @include        *127.0.0.1:600*/charpane.php*
// @include        *kingdomofloathing.com/familiar.php*
// @include        *127.0.0.1:600*/familiar.php*
// @include        *kingdomofloathing.com/adventure.php*
// @include        *127.0.0.1:600*/adventure.php*
// @include        *kingdomofloathing.com/dungeon.php*
// @include        *127.0.0.1:600*/dungeon.php*
// @include        *kingdomofloathing.com/campground.php*
// @include        *127.0.0.1:600*/campground.php*
// @include        *kingdomofloathing.com/shore.php*
// @include        *127.0.0.1:600*/shore.php*
// @include        *kingdomofloathing.com/council.php*
// @include        *127.0.0.1:600*/council.php*
// @include        *kingdomofloathing.com/main.php*
// @include        *127.0.0.1:600*/main.php*
// @include        *kingdomofloathing.com/sewer.php*
// @include        *127.0.0.1:600*/sewer.php*
// @include        *kingdomofloathing.com/charsheet.php*
// @include        *127.0.0.1:600*/charsheet.php*
// @include        *kingdomofloathing.com/showplayer.php*
// @include        *127.0.0.1:600*/showplayer.php*
// @include        *kingdomofloathing.com/displaycollection.php*
// @include        *127.0.0.1:600*/displaycollection.php*
// @include        *kingdomofloathing.com/rats.php*
// @include        *127.0.0.1:600*/rats.php*
// @include        *kingdomofloathing.com/restaurant.php*
// @include        *127.0.0.1:600*/restaurant.php*
// @description    Version 2.1
// ==/UserScript==


/********************************** Recent Changes **********************************************
Recent Updates:

2.1  Prevented double-tagging of familiars in Full Mode
2.0  Added wikification to restaurants and user pages.
     Support for kolmafia relay browser (thanks macman104!)
     Added wikification to compact mode charpane-- (most of the work done by Picklish (#841340)--Thanks!!)
1.9  Fixes to the Character Page (correct wikifying of effects and items)
     Fixed extraneous linebreak in familiar name on left-hand character pane
1.8: Fixed line-break in wikified familiar name in charpane.
     Handled familiar names with parentheses in them.  Yes, really.
     Fixes to bad wiki links on charpage when events or results are displayed.
     Updates to some patterns for some HTML changes in KoL.
1.7: Fixed collision with MonsterStats script
     Set info box on main page to only show if there's a problem


********************************************************************************************/
GM_setValue("scriptVer","2.1");
GM_setValue("scriptName","WikiLink");
GM_setValue("scriptURL","http://batmantis.com/kol/WikiLink.user.js");

const wikiWrapperPre = '<font size=1>&nbsp;<sup><a tabindex="-1" href="http://kol.coldfront.net/thekolwiki/index.php/';
const wikiWrapperPost = '" TARGET="_blank">w</a></sup></font>&nbsp;';  

const familiarDecoder = ["","Mosquito","Leprechaun","Levitating Potato","Angry Goat","Sabre-Toothed Lime","Fuzzy Dice",
    "Spooky Pirate Skeleton","Barrrnacle","Howling Balloon Monkey","Stab Bat","Grue","Blood-Faced Volleyball","","Ghuol Whelp",
    "Baby Gravy Fairy","Cocoabo","Star Starfish","Hovering Sombrero","Ghost Pickle on a Stick","Killer Bee","Whirling Maple Leaf",
    "Coffee Pixie","Cheshire Bat","Jill-O-Lantern","Hand Turkey","Crimbo Elf","Hanukkimbo Dreidl","Baby Yeti","Feather Boa Constrictor","Emo Squid",
    "Personal Raincloud","Clockwork Grapefruit","MagiMechTech MicroMechaMech","Flaming Gravy Fairy","Frozen Gravy Fairy",
    "Stinky Gravy Fairy","Spooky Gravy Fairy","Inflatable Dodecapede","Pygmy Bugbear Shaman","Doppelshifter","Attention-Deficit Demon",
    "Cymbal-Playing Monkey","Temporal Riftlet","Sweet Nutcracker","Pet Rock","Snowy Owl","Teddy Bear","Ninja Pirate Zombie Robot",
    "Sleazy Gravy Fairy","Wild Hare","Wind-up Chattering Teeth","Spirit Hobo"];
const familiarImageNameDecoder = [["hat2","Hovering Sombrero"],["sgfairy","Spooky Gravy Fairy"],["npzr","Ninja Pirate Robot Zombie"],
    ["slgfairy","Sleazy Gravy Fairy"],["hare","Wild Hare"],["chatteeth","Wind-up Chattering Teeth"],["ghobo","Spirit Hobo"]];    

function wikify(EntryName)
{
  return wikiWrapperPre + EntryName + wikiWrapperPost;
}

function insertWikiLink(itemElement, wikiEntryName, textToInsertAfter) {
      if ((itemElement.tagName == 'A') || (itemElement.tagName == 'IMG')) {
   
        var newElement = document.createElement("span");
        newElement.innerHTML = wikify(wikiEntryName);

        var itemParent = itemElement.parentNode;
        if (itemElement.nextSibling){
          itemParent.insertBefore(newElement,itemElement.nextSibling);        	
        }
        else{
          itemParent.appendChild(newElement);
        }
      }
      else {
        var insertionPoint = itemElement.innerHTML.indexOf(textToInsertAfter) + textToInsertAfter.length;
        var newInnerHTML = itemElement.innerHTML.substring(0, insertionPoint) +
            wikify(wikiEntryName) + itemElement.innerHTML.substring(insertionPoint);        	
        itemElement.innerHTML = newInnerHTML;
      }
}     

// Function: imgToFamiliar 
// Coded by Picklish
//
// Takes an image link and returns the full familiar name as a string.
// Returns 0 if it can't match.
//
// NOTE: Slight modifications for clarity and compactness made by Numfar

function imgToFamiliar(imgLink) {
    var imgMatch = imgLink.match(/\/familiar([0-9]+)\.gif$/);
    if (imgMatch && imgMatch[0] && parseInt(imgMatch[1]))
    {
    	  var familiarName = familiarDecoder[parseInt(imgMatch[1])];
    	  if (familiarName != "") { return familiarName; } else { return 0; }
    }
    // Not all familiars follow the above pattern.
    // I'm not quite sure why in the world that is. -Picklish
    imgMatch = imgLink.match(/\/([^\/]*)\.gif$/);
    if (!imgMatch || !imgMatch[0] || !imgMatch[1])
    {
    	  // Bail out-- this isn't an image of a familiar
    	  // or it's a new pattern we don't recognize.
        return 0;
    }
    for (decoderIndex in familiarImageNameDecoder) {
    	if (imgMatch[1] == familiarImageNameDecoder[decoderIndex] [0]) { return familiarImageNameDecoder[decoderIndex] [1]; }
    }

    // Okay we've totally struck out.  Give up.
    return 0;
}     

function trimString(targetString) {
  targetString = targetString.replace( /^\s+/g, "" );
  targetString = targetString.replace( /\s+$/g, "" );
  return targetString;
}

function updateScriptBox() {
  //if (needUpdate) {
    mainPageBody.innerHTML = addedHTML + '</table></center>' + oldHTML;
//  } 
// Only displaying the status box if there's a problem.  It was annoying people.
//  else {
//    mainPageBody.innerHTML = oldHTML + addedHTML + '</table></center>';	  	
//  }
} 

function checkForUpdate() {
	// If possible, grab the latest version of this script from Batmantis
	// and see if it's newer than this version.
	GM_xmlhttpRequest({
	  method: 'GET',
	  url: GM_getValue("scriptURL"),
	  headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/html',},
	  onload: function(responseDetails) {
			if (responseDetails.status == "200") {
				var strHTML = responseDetails.responseText;
				var newVer = strHTML.match(/description\s*Version \w+\.\w+/);
				if (newVer.length > 0) {
				  newVer[0] = newVer[0].substring(newVer[0].indexOf('Version') + 8);
				  GM_setValue("scriptWebVer",newVer[0]);
				} else {
				  GM_setValue("scriptWebVer","Error");		  
				}
			} else {
	                  GM_setValue("scriptWebVer","Error");		  
			}
	  }
	});
}

if (window.location.pathname == "/main.php") {
  checkForUpdate();
  
  var needUpdate = ((GM_getValue("scriptWebVer","Error") != "Error") && ((GM_getValue("scriptWebVer")+0.0) > (GM_getValue("scriptVer") + 0.0)));
  
  if (needUpdate) {
    var boxColor = 'red';	
  } else {
    var boxColor = 'blue';
  }  
  
  var mainPageBody= document.getElementsByTagName("body")[0];
  var oldHTML = mainPageBody.innerHTML;
  var addedHTML = '<center><table style="border: 1px solid ' + boxColor + '; margin-bottom: 4px;" width=95% cellpadding=1 cellspacing=0>' +
      '<tr><td bgcolor=' + boxColor + '><font color=white size=-2><b>' + GM_getValue("scriptName") + '</b> Script ' + GM_getValue("scriptVer") + ':</font></td></tr>' +
      '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Installed and active.</font></td></tr>';
  if (GM_getValue("scriptWebVer","Error") == "Error") {
    addedHTML = addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Failed to check website for updated version of script.</font></td></tr>';	
    mainPageBody.innerHTML = oldHTML + addedHTML + '</table></center>';    
  } else {
    if (needUpdate) {
      addedHTML = addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Checked website-- script is out-of-date. Click <a href="' + GM_getValue("scriptURL") + '" TARGET="_blank">here</a> for Version ' + GM_getValue("scriptWebVer") + '</font></td></tr>';	  	
      updateScriptBox();
    } else {
      addedHTML = addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Checked website-- script is latest version.</font></td></tr>';		
      //updateScriptBox();
    }	
  }
  
	
}
/* 
   ****Charpane Handler****
   ------------------------
   The charpane appears on the left and displays the player's current familiar and any
   effects that are active.  So we identify those elements and wikify them.  Support for
   compact mode added by Picklish. (Thanks!)
*/
if (window.location.pathname == "/charpane.php") {
	  // Track whether we've already labeled the familiar so we don't double tag it in Full Mode
	  var familiarTagged = 0;
	
	
    // Both effects and familiars are helpfully wrapped in font tags, so loop through those
    // to find them.	
    var fontElements = document.getElementsByTagName("font");
    
    for (var i=0; i < fontElements.length; i++ ) {
    	
      curFontElement = document.getElementsByTagName("font")[i];
      
      // If it has a '(' in it, it's an effect (as the remaining adventures are stored 
      // after the effect in parens.
      if ((curFontElement.innerHTML.indexOf('(') != -1) &&
          (curFontElement.innerHTML.indexOf('cellpadding') == -1) &&
          (curFontElement.innerHTML.indexOf('mainpane') == -1)) { 
        var turnsLeft= curFontElement.innerHTML.substring(curFontElement.innerHTML.indexOf('(')+1,
            curFontElement.innerHTML.indexOf(')'));
      	if (("" + parseInt(turnsLeft)) == turnsLeft) {
          var EffectName = curFontElement.innerHTML.substring(0,curFontElement.innerHTML.indexOf('(')-1);     
          insertWikiLink(curFontElement, EffectName, EffectName);
        }
      }
      // If it contains a '-pound' it's a familiar (ex: 17-pound Baby Gravy Fairy).  So
      // just tack a wiki link onto the end of that.
      if (curFontElement.innerHTML.indexOf('-pound') != -1) {

        var FamiliarName = curFontElement.innerHTML.substring(curFontElement.innerHTML.indexOf('-pound')+7); 
        if (FamiliarName.indexOf('<') > 0) { FamiliarName = FamiliarName.substring(0,FamiliarName.indexOf('<')); } // Handle non fully-leveled-up familiars
        
        var curBody = document.getElementsByTagName("body")[0];
        curBody.innerHTML = curBody.innerHTML.substring(0,curBody.innerHTML.indexOf(FamiliarName) + FamiliarName.length) +
            wikiWrapperPre + FamiliarName + wikiWrapperPost +
            curBody.innerHTML.substring(curBody.innerHTML.indexOf(FamiliarName) + FamiliarName.length);
        familiarTagged = 1;
      }
    }
    	
    // Now handle compact mode, if that's what we're dealing with...
    var imgElements = document.getElementsByTagName("img");

    for (var i=0; i < imgElements.length; i++) {
        curImgElement = imgElements[i];

        var imgOnClick = curImgElement.getAttribute('onClick');
        var imgTitle = curImgElement.getAttribute('title');

        // If the image has a title and an onclick effect, then it's an effect
        if (imgTitle && imgOnClick && imgOnClick.indexOf('eff') != -1)
        {
            insertWikiLink(curImgElement, imgTitle, imgTitle);
        }
        else
        {
            var imgSrc = curImgElement.getAttribute("src");
            if (!imgSrc)
            {
                continue;
            }
    
            var famName = imgToFamiliar(imgSrc);
            if (famName)
            {
                // img is wrapped in a link to the familiar page, so
                // we should wikify after the parent to avoid weirdness
                // Also, only tag it if it hasn't previously been tagged 
                // (to prevent double tagging in Full Mode)
                if (familiarTagged == 0) {
                  insertWikiLink(curImgElement.parentNode, famName, famName);
                }
            }
        }
    }    
}
/* 
   ****Character Sheet Page Handler****
   ------------------------
   Follows none of the rules of a standard page.
   Special cases for all of it.
*/
if (window.location.pathname == "/charsheet.php") {
	
    var tableRowElements = document.getElementsByTagName("tr");
    var startElement = 3;
    if ((document.getElementsByTagName("body")[0].innerHTML.indexOf('Results:') != -1) ||
        (document.getElementsByTagName("body")[0].innerHTML.indexOf('New Events:') != -1)) { 
      startElement = 7;
    }
    
    for (var i=startElement; i < tableRowElements.length; i++ ) {
    	
      curTableRow = tableRowElements[i];
      
      //Special case handle each row that matters:
      if ((curTableRow.innerHTML.indexOf('Favorite Food:') > 0) ||
         (curTableRow.innerHTML.indexOf('Favorite Booze:') > 0) ||
         (curTableRow.innerHTML.indexOf('whichitem') > 0)) {
        var elementToWikify = curTableRow.getElementsByTagName("b")[0];
        var itemName = elementToWikify.innerHTML;       
        insertWikiLink(elementToWikify, itemName, itemName);
      }
      if (curTableRow.innerHTML.indexOf('Sign:') > 0) {
        var elementToWikify = curTableRow.getElementsByTagName("b")[0];
        var itemName = elementToWikify.innerHTML.substring(elementToWikify.innerHTML.indexOf('The ') + 4);       
        insertWikiLink(elementToWikify, itemName, itemName);
      }
      if (curTableRow.innerHTML.indexOf('eff(') != -1) {         
        var elementToWikify = curTableRow;
        var itemName = elementToWikify.innerHTML.substring(elementToWikify.innerHTML.indexOf('<td valign=')+1);
        itemName = itemName.substring(itemName.indexOf('>')+1);
        itemName = itemName.substring(0,itemName.indexOf('(')-1);
        insertWikiLink(elementToWikify, itemName, itemName);
      }
      if (curTableRow.innerHTML.indexOf('descitem(') != -1) {        
      	var itemCell = curTableRow.getElementsByTagName("td")[1];
      	var itemElement = itemCell.getElementsByTagName("b")[0];
        var itemName = itemElement.innerHTML;
        insertWikiLink(itemElement, itemName, itemName);
      }
      if (curTableRow.innerHTML.indexOf(':skill') > 0) {
        var elementsToWikify = curTableRow.getElementsByTagName("a");
        for (var j=0; j < elementsToWikify.length; j = j + 2) {         
          var itemName = elementsToWikify[j].innerHTML;       
          if (itemName.indexOf('(') > 0) { itemName = itemName.substring(0,itemName.indexOf('(')-1); }
          insertWikiLink(elementsToWikify[j], itemName, itemName);
        }
      }      
      if (curTableRow.innerHTML.indexOf('familiar.php') > 0) {
        var elementsToWikify = curTableRow.getElementsByTagName("td");
        var familiarName = elementsToWikify[1].innerHTML;       
        familiarName = familiarName.substring(familiarName.indexOf('-pound ') + 7);
        if (familiarName.indexOf('(') > 0) { familiarName = familiarName.substring(0,familiarName.indexOf('(')-1); }
        insertWikiLink(elementsToWikify[1], familiarName, familiarName);
      }      
    }	
}
if (window.location.pathname == "/showplayer.php") {
    var tableRowElements = document.getElementsByTagName("tr");
    var startElement = 3;
    if ((document.getElementsByTagName("body")[0].innerHTML.indexOf('Results:') != -1) ||
        (document.getElementsByTagName("body")[0].innerHTML.indexOf('New Events:') != -1)) { 
      startElement = 7;
    }
    
    for (var i=startElement; i < tableRowElements.length; i++ ) {
    	
      curTableRow = tableRowElements[i];
      
      if ((curTableRow.innerHTML.indexOf('descitem(') != -1) &&
         (curTableRow.innerHTML.indexOf('showfamiliars') == -1)) {        
      	var itemCell = curTableRow.getElementsByTagName("td")[1];
      	var itemElement = itemCell.getElementsByTagName("b")[0];
      	if (itemElement) {
          var itemName = itemElement.innerHTML;
          insertWikiLink(itemElement, itemName, itemName);
        }
      }
      if ((curTableRow.innerHTML.indexOf('Favorite Food:') > 0) ||
         (curTableRow.innerHTML.indexOf('Favorite Booze:') > 0) ||
         (curTableRow.innerHTML.indexOf('whichitem') > 0))  {
        var elementToWikify = curTableRow.getElementsByTagName("td")[1];
        var itemName = elementToWikify.innerHTML;       
        insertWikiLink(elementToWikify, itemName, itemName);
      }
      
    }	
}	
/* 
   ****Display Case Page Handler****
   ------------------------
   Only wikify items.  Easy...
*/
if (window.location.pathname == "/displaycollection.php") {
	
    var tableElements = document.getElementsByTagName("tr");
    
    for (var i=3; i < tableElements.length; i++ ) {
      if (tableElements[i].innerHTML.indexOf('<tr') < 0) {
        curTableElement = tableElements[i];
      
        if (curTableElement.innerHTML.indexOf('whichitem') > 0) {
          var elementToWikify = curTableElement.getElementsByTagName("b")[0];
          var itemName = elementToWikify.innerHTML;       
          insertWikiLink(elementToWikify, itemName, itemName);
        }
      }
    }	
}
/* 
   ****Effect Description Page Handler****
   ------------------------
   The description window that pops up to describe effects
   is structurally different from the ones that pop up to
   describe familiars and items.  So we handle is separately.
   Notably, the bit we use to find the effect name is probably
   the item most likely to break if anything in KoL changes.
*/
if (window.location.pathname == "/desc_effect.php") {
    
    if (document.getElementsByTagName("center").length > 0) {
      var EffectName = document.getElementsByTagName("center")[0].innerHTML;
      EffectName = EffectName.substring(EffectName.indexOf('>')+1);
      EffectName = EffectName.substring(0,EffectName.indexOf('<'));    
  
    insertWikiLink(document.getElementsByTagName("body")[0], EffectName, EffectName);
    }
}
/* 
   ****Fight Page Handler****
   ------------------------
   Remarkably and quite differently from most other pages,
   some bits of this page are marked up quite nicely.  The
   monster name, for example is helpfully tagged with a
   span with a unique ID.
*/
if (window.location.pathname == "/fight.php") {
    var MonsterName = document.getElementsByTagName("span")[0].innerHTML;
    MonsterName = MonsterName.substring(MonsterName.indexOf(' ')+1);
    if (MonsterName.indexOf('<') > 0) { MonsterName = MonsterName.substring(0,MonsterName.indexOf('<')); }
    
    MonsterName = trimString(MonsterName);

    insertWikiLink(document.getElementsByTagName("span")[0], MonsterName, MonsterName);
}
/* 
   ****Daily Dungeon Page Handler****
   ------------------------
   Because you can opt-in and opt-out of adventures in the
   Daily Dungeon, the page is different.  So we have to 
   special-case it.
*/
if (window.location.pathname == "/dungeon.php") {
	
    var itemElements = document.getElementsByTagName("b");
    	
    for (var i=0; i < itemElements.length; i++ ) {	
      var curElement  = itemElements[i];
       
      if (curElement.innerHTML.indexOf('Room 3') == 0) { insertWikiLink(document.getElementsByTagName("b")[i], 'Room_3', 'Room 3'); }
      else if (curElement.innerHTML.indexOf('Room 6') == 0) { insertWikiLink(document.getElementsByTagName("b")[i], 'Room_6', 'Room 6'); }
      else if (curElement.innerHTML.indexOf('Room 10') == 0) { insertWikiLink(document.getElementsByTagName("b")[i], 'Room_10', 'Room 10'); }
      else if ((curElement.innerHTML.indexOf('Room ') == 0) && (curElement.innerHTML.indexOf('!') < 0)) {  
      	
        var RoomName = curElement.innerHTML.substring(curElement.innerHTML.indexOf(':') + 1);

        insertWikiLink(document.getElementsByTagName("b")[i], RoomName, RoomName);
      }
    }
}
/* 
   ****Familiars Page Handler****
   ------------------------
   Anything between a "-pound" and a "(" is
   a familiar type.  Piece-of-cake.
*/
if (window.location.pathname == "/familiar.php") {

    var familiarElements = document.getElementsByTagName("td");
    
    // This page includes nested tables, which means looping on the
    // TD element will cause us to process some entries multiple times.
    // So depending on whether it's the default or result version of
    // the page, skip past those outer TDs.
    var StartElement = 2;
    
    // If you don't have any familiar equipment, the page is structured differently
    if (document.getElementsByTagName("body")[0].innerHTML.indexOf('Familiar Equipment:') < 0) {
      StartElement = StartElement + 2;	
    }
    if (document.getElementsByTagName("body")[0].innerHTML.indexOf('Results:') > 0) {
      StartElement = StartElement + 4;	
    }
    
    for (var i= StartElement; i < familiarElements.length; i++ ) {
    	
      var curFamiliar = document.getElementsByTagName("td")[i];
      if ((curFamiliar.innerHTML.indexOf('-pound') > 0)) {
        var curFamiliarName = curFamiliar.innerHTML.substring(curFamiliar.innerHTML.indexOf('-pound')+7);
        curFamiliarName = curFamiliarName.substring(0,curFamiliarName.indexOf('(')-1);
        
        insertWikiLink(document.getElementsByTagName("td")[i], curFamiliarName, curFamiliarName);
      }
    }
}

// Handle the restaurant pages.
// Basically any lowest-level TD that contains a 'Meat)' is an 
// item for sale.  Grab everything before the price and wikify it.
if (window.location.pathname == "/restaurant.php") {
	var itemElements = document.getElementsByTagName("td");
	
    for (var i=0; i < itemElements.length; i++ ) {
	    if (
	         (itemElements[i].innerHTML.indexOf('<') == -1) && // not an outer wrapper
	         ((itemElements[i].innerHTML.indexOf('Meat)') != -1) ||
            (itemElements[i].innerHTML.indexOf('meat)') != -1))
	        ) {
	       // Grab everything before the price and treat that as the item name
	       var itemToWikify = itemElements[i].innerHTML.substring(0,itemElements[i].innerHTML.indexOf('(')-1);
	       insertWikiLink(itemElements[i], itemToWikify, itemToWikify);
	    }
	  }
}
	
/* 
   ****General "Items" Handler****
   ------------------------
   With startling regularity, most things
   that are bolded are items.  And the rules
   for exceptions are mostly straightforward
   and are documented below.
*/
if ((window.location.pathname != "/charpane.php")  &&
    (window.location.pathname != "/familiar.php")  &&
    (window.location.pathname != "/main.php") &&
    (window.location.pathname != "/charsheet.php") &&
    (window.location.pathname != "/displaycollection.php") &&
    (window.location.pathname != "/showplayer.php")        
    ) {  // Some KoL pages don't follow the "bolded items" standard, so don't trigger for those.

    var itemElements = document.getElementsByTagName("b");
    
    for (var i=0; i < itemElements.length; i++ ) {
    	
      curItem = document.getElementsByTagName("b")[i];
      
      // Handle Intrinsic Effect
      if (curItem.innerHTML.indexOf('Intrinsic effect:') >= 0) {
      	var IntrinsicName = curItem.innerHTML.substring(
      	  curItem.innerHTML.indexOf('Intrinsic effect:') + 17);
      	IntrinsicName = IntrinsicName.substring(0,IntrinsicName.indexOf('<br>'));
        insertWikiLink(curItem, IntrinsicName, IntrinsicName);
      }
      
      // There are a couple of elements that get bolded that aren't really *things* as such and are ignored.
      // (Most) category headers have ':' chars after them.
      // Pricing indicators are sometimes bolded but appear to always end in 'Meat.'
      // Combat messages have plenty of bangs(!) in them.
      if (((curItem.innerHTML.indexOf(':') < 0) || (curItem.innerHTML.indexOf('NOTE:') >= 0)) && // Anything with a : other than a NOTE is a header.
         (curItem.innerHTML.indexOf('Meat.') < 0) &&
         (curItem.innerHTML.indexOf('!') < 0) &&
         (curItem.innerHTML.indexOf('?') < 0) &&
         (curItem.innerHTML.indexOf(', the Shopkeeper') < 0) &&         
         (curItem.innerHTML.indexOf('Misc. Inv') < 0) &&                
         (("" + parseInt(curItem.innerHTML)) != curItem.innerHTML)  // If the "item" is just a number, ignore it.
         ) {
        var ItemName = curItem.innerHTML;
        
        // Handle Special Cases
        var wasSpecialCase = 0;
        if ((curItem.innerHTML.indexOf('+') == 0) && (window.location.pathname == "/fight.php")) { wasSpecialCase = 1; } // ignore specialized damage tags
        if (curItem.innerHTML.indexOf('Mysticality +') >= 0) { insertWikiLink(curItem, 'Mysticality Increasers','Mysticality'); wasSpecialCase = 1; }
        if (curItem.innerHTML.indexOf('Muscle +') >= 0) { insertWikiLink(curItem, 'Muscle Increasers', 'Muscle'); wasSpecialCase = 1; }
        if (curItem.innerHTML.indexOf('Moxie +') >= 0) { insertWikiLink(curItem, 'Moxie Increasers', 'Moxie'); wasSpecialCase = 1; }
        if (curItem.innerHTML.indexOf('Combat Initiative') >= 0) { insertWikiLink(curItem, 'Combat Initiative', 'Combat Initiative'); wasSpecialCase = 1; }
        if (curItem.innerHTML.indexOf(' Resistance') >= 0) { insertWikiLink(curItem, 'Elemental Resistance', ' Resistance'); wasSpecialCase = 1; }        
        if (curItem.innerHTML.indexOf('Item Drops') >= 0) { insertWikiLink(curItem, 'Maximizing Your Item Drops', 'Item Drops'); wasSpecialCase = 1; }        
        if (curItem.innerHTML.indexOf('Meat from Monsters') >= 0) { insertWikiLink('Maximizing Your Meat Drops', 'Meat from Monsters'); wasSpecialCase = 1; }        
        if (curItem.innerHTML.indexOf('Maximum HP +') >= 0) { insertWikiLink(curItem, 'Maximizing Your HP', 'Maximum HP'); wasSpecialCase = 1; }        
        if (curItem.innerHTML.indexOf('Maximum MP +') >= 0) { insertWikiLink(curItem, 'Maximizing Your MP', 'Maximum MP'); wasSpecialCase = 1; }        
        if (curItem.innerHTML.indexOf('Monster Level') >= 0) { insertWikiLink(curItem, 'Monster Level', 'Monster Level'); wasSpecialCase = 1; }     
        if (curItem.innerHTML.indexOf('All Attributes') >= 0) { insertWikiLink(curItem, 'Game_Mechanics#Character_Base_Stats', 'All Attributes'); wasSpecialCase = 1; }     
        if (curItem.innerHTML.indexOf('Melee Damage') >= 0) { insertWikiLink(curItem, 'Bonus Melee Damage', 'Melee Damage'); wasSpecialCase = 1; }     
        if (curItem.innerHTML.indexOf('Spell Damage') >= 0) { insertWikiLink(curItem, 'Bonus Spell Damage', 'Spell Damage'); wasSpecialCase = 1; }
        if (curItem.innerHTML.indexOf('Damage Absorption') >= 0) { insertWikiLink(curItem, 'Maximizing_Your_Damage_Absorption', 'Damage Absorption'); wasSpecialCase = 1; }        
        if (curItem.innerHTML.indexOf('Familiar Weight') >= 0) { insertWikiLink(curItem, 'Familiar_Weight', 'Familiar Weight'); wasSpecialCase = 1; }  
        if (curItem.innerHTML.indexOf('chance of Critical Hit') >= 0) { insertWikiLink(curItem, 'Critical_Hit_Chance', 'chance of Critical Hit'); wasSpecialCase = 1; }                        
        if (curItem.innerHTML.indexOf('Cold') >= 0) { insertWikiLink(curItem, 'Cold', 'Cold'); wasSpecialCase = 1; }                        
        if (curItem.innerHTML.indexOf('Hot ') >= 0) { insertWikiLink(curItem, 'Hot', 'Hot'); wasSpecialCase = 1; }                                
        if (curItem.innerHTML.indexOf('Fire ') >= 0) { insertWikiLink(curItem, 'Hot', 'Fire'); wasSpecialCase = 1; }                                
        if (curItem.innerHTML.indexOf('Sleaze') >= 0) { insertWikiLink(curItem, 'Sleaze', 'Sleaze'); wasSpecialCase = 1; }                                        
        if ((curItem.innerHTML.indexOf('Spooky') >= 0) && (curItem.innerHTML.indexOf('Spooky-') < 0)) { insertWikiLink(curItem, 'Spooky', 'Spooky'); wasSpecialCase = 1; }                                        
        if (curItem.innerHTML.indexOf('Stench') >= 0) { insertWikiLink(curItem, 'Stench', 'Stench'); wasSpecialCase = 1; }      
        if (curItem.innerHTML.indexOf('Adventure(s)') >= 0) { insertWikiLink(curItem, 'Extra_Rollover_Adventures', 'Adventure(s)'); wasSpecialCase = 1; }  
        if (curItem.innerHTML.indexOf(' staff)') >= 0) { insertWikiLink(curItem, 'Category:Staves', 'staff)'); wasSpecialCase = 1; }  
        if (curItem.innerHTML.indexOf(' axe)') >= 0) { insertWikiLink(curItem, 'Category:Axes', 'axe)'); wasSpecialCase = 1; }          
        if (curItem.innerHTML.indexOf(' utensil)') >= 0) { insertWikiLink(curItem, 'Category:Utensils', ' utensil)'); wasSpecialCase = 1; }                  
        if (curItem.innerHTML.indexOf(' sword)') >= 0) { insertWikiLink(curItem, 'Category:Swords', ' sword)'); wasSpecialCase = 1; }                          
        if (curItem.innerHTML.indexOf(' polearm)') >= 0) { insertWikiLink(curItem, 'Category:Polearms', ' polearm)'); wasSpecialCase = 1; }                          
        if (curItem.innerHTML.indexOf(' knife)') >= 0) { insertWikiLink(curItem, 'Category:Knives', ' knife)'); wasSpecialCase = 1; }                          
        if (curItem.innerHTML.indexOf(' accordion)') >= 0) { insertWikiLink(curItem, 'Category:Accordions', ' accordion)'); wasSpecialCase = 1; }                          
        if (curItem.innerHTML.indexOf(' club)') >= 0) { insertWikiLink(curItem, 'Category:Clubs', ' club)'); wasSpecialCase = 1; }                          
        if (curItem.innerHTML.indexOf(' crossbow)') >= 0) { insertWikiLink(curItem, 'Category:Crossbows', ' crossbow)'); wasSpecialCase = 1; }                          
        if (curItem.innerHTML.indexOf(' knife)') >= 0) { insertWikiLink(curItem, 'Category:Knives', ' knife)'); wasSpecialCase = 1; }
        if (curItem.innerHTML.indexOf(' saucepan)') >= 0) { insertWikiLink(curItem, 'Category:Saucepans', ' saucepan)'); wasSpecialCase = 1; }
        if (curItem.innerHTML.indexOf(' spear)') >= 0) { insertWikiLink(curItem, 'Category:Spears', ' spear)'); wasSpecialCase = 1; }
        if (curItem.innerHTML.indexOf(' umbrella)') >= 0) { insertWikiLink(curItem, 'Category:Umbrellas', ' umbrella)'); wasSpecialCase = 1; }
        if (curItem.innerHTML.indexOf(' whip)') >= 0) { insertWikiLink(curItem, 'Category:Whips', ' whip)'); wasSpecialCase = 1; }                        
        if (curItem.innerHTML.indexOf(' autopult)') >= 0) { insertWikiLink(curItem, 'Category:Other', ' autopult)'); wasSpecialCase = 1; }                        
        if (curItem.innerHTML.indexOf(' banjo)') >= 0) { insertWikiLink(curItem, 'Category:Other', ' banjo)'); wasSpecialCase = 1; }                        
        if (curItem.innerHTML.indexOf(' ball)') >= 0) { insertWikiLink(curItem, 'Category:Other', ' ball)'); wasSpecialCase = 1; }                        
        if (curItem.innerHTML.indexOf(' flail)') >= 0) { insertWikiLink(curItem, 'Category:Other', ' flail)'); wasSpecialCase = 1; }                        
        if (curItem.innerHTML.indexOf(' sack)') >= 0) { insertWikiLink(curItem, 'Category:Other', ' sack)'); wasSpecialCase = 1; }
        if (curItem.innerHTML.indexOf(' bow)') >= 0) { insertWikiLink(curItem, 'Category:Other', ' bow)'); wasSpecialCase = 1; }
        if (curItem.innerHTML.indexOf(' slingshot)') >= 0) { insertWikiLink(curItem, 'Category:Other', ' slingshot)'); wasSpecialCase = 1; }        
        if (curItem.innerHTML.indexOf(' wand)') >= 0) { insertWikiLink(curItem, 'Category:Other', ' wand)'); wasSpecialCase = 1; }                
        if (curItem.innerHTML.indexOf('1-handed ') >= 0) { insertWikiLink(curItem, 'Category:One-Handed_Weapons', '1-handed'); wasSpecialCase = 1; }                          
        if (curItem.innerHTML.indexOf('Successful hit weakens opponent.') >= 0) { insertWikiLink(curItem, 'Monster_Level', 'weakens opponent.'); wasSpecialCase = 1; }          
        if (ItemName == 'Food') { insertWikiLink(curItem, 'Category:Food', 'Food'); wasSpecialCase = 1; }        
        if (ItemName == 'Beverage') { insertWikiLink(curItem, 'Category:Beverages', 'Beverage'); wasSpecialCase = 1; }
        if (ItemName == 'Usable') { insertWikiLink(curItem, 'Category:Usable_Items', 'Usable'); wasSpecialCase = 1; }
        if (ItemName == 'Combat Item') { insertWikiLink(curItem, 'Category:Combat_Items', 'Combat Item'); wasSpecialCase = 1; }
        if (ItemName == 'combat / usable item') { insertWikiLink(curItem, 'Category:Combat_Items','combat'); insertWikiLink(curItem, 'Category:Usable_Items', 'usable'); wasSpecialCase = 1; }
        if (ItemName == 'Quest Item') { insertWikiLink(curItem, 'Category:Quest_Items', 'Quest Item'); wasSpecialCase = 1; }
        if (curItem.innerHTML.indexOf('100% Legal') >= 0) { insertWikiLink(curItem, '100%25_Legal', '100% Legal'); wasSpecialCase = 1; } // need to escape out the percent sign in the link.  Should handle this more generally, really.
        if (curItem.innerHTML.indexOf('NOTE:') >= 0) { wasSpecialCase = 1; } // Just act like we did something to it, but really ignore it.
        if (curItem.innerHTML.indexOf('Your Campsite') >= 0) { wasSpecialCase = 1; } // Just act like we did something to it, but really ignore it.        
           
        if ((wasSpecialCase == 0) && (ItemName != '')) {
          // In some odd cases KoL uses placeholder comment tags hidden in names and titles. 
          // We need to scrub these.
          if (ItemName.indexOf('>') > 0) {
            ItemName = ItemName.substring(ItemName.indexOf('>')+1);
          }

       
          // In some places (certain stores, mostly), item names are embedded in
          // links.  If we don't get outside of that, the wiki link will trigger
          // that link too.  So we burrow our way up a level to get out from under it.
          var curParent = curItem.parentNode;      
          if (curParent.tagName == 'A') {
   
            var newElement = document.createElement("span");
            newElement.innerHTML = wikify(ItemName);

            var parentOfParent = curParent.parentNode;
            if (curParent.nextSibling){
              parentOfParent.insertBefore(newElement,curParent.nextSibling);              
            }
            else{
              parentOfParent.appendChild(newElement);
            }
          }
          else {
            insertWikiLink(curItem, ItemName, ItemName);
          }
        }
      }
    }
}