// ==UserScript==
// @name     Estiah Collection Tools
// @description     Version 1.2 Helps view unusable charms all at once, for determining when you can meet the requirements.  Can apply filters to collection too. Includes contributions by Sheira.  Direct questions/comments to Moldar in Estiah.
// @author        Moldar
// @author        Sheira
// @license     (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include http://www.estiah.com/character/card

// ==/UserScript==

//----------------------------
// Known Issues/Limitations
//----------------------------
// - The "All" Rune looks lame.  Make a better one?  Let me know and I can include it and give you credit.
// - No sorting or rearranging of charms (ie by usable/unusable) - yet - just need to figure out how to rearrange the charms
// - Filter textbox triggers on hitting <enter> *or* clicking out of the box
// - Filter looks in all the text of the charm's HTML which means some common words (ie class, br) will trigger "false" positive matches
// - No advanced Boolean search exists - but you can still type "lose life" and find charms that have "lose 20 life"

//Embedded image for showing all charms at once!
var allRuneImage = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAABGdBTUEAALGPC/xhBQAABDtJREFU WEfFmHsoZVscx9fBnVt3zHXn1tzCPG73MfevWzMjijyi5P2KQ4x3yCPjcRwHec8lj46iPKMOIUQe eYQIkUeR1x9K8iwkXSVE5H6dPX6cw9yumfa5q91u/X577fVZv99vrbV/awva2trU1NTU5eVuhfR4 pKGhwbXh6p97C48EAgFa4s7+pbS0tLx7/VzF1+XlJWtqalIxFbgrcENDw/8DrqurI3Bra2tHR0d3 d3dfX9/AwMDw8PDo6OjExMTU1NTMzMz8/Pzy8vLm5ub6+vrq6ioqu7u7f8vLwcHB4eHh8fHx2dnZ xcUFDLq3EOjK4pqaGpKbm5uHeCuAKYBlMhnJjY2NvHGHlMFVVVUErq+vVx24oqKCwHC76sBlZWUE httVBy4pKSFwZWWl6sBFRUUAv/lV+8+ff8IgVAPGkmO5ubm/PPvu5Q/f6GgKUFcNGMudpaenaz9m 3JWVlcUf+Pz8nGJ6cnLCUlJSCJyRkXEPWCYWStuv9e1S4fUX50Z7r1K5p9PT03evX3Dso6MjlpiY SODU1NQ7YHmnt8hDQ3c1eOlepUJn2FDJYuyvLD4+nsBJSUnKYJlUKDdRfLPQvhAMGIGxvbO4uDgC SyQSRbBMDCDnSCXHKvjgP1kMGIH39/dZTEzMFVhTgLtIJLoNvhW62+QvtHhvb4/AqLPIyEggsZa0 HwuioqJuwO1SMc0pbgif3K0IhnSlv1ep4L7t7e03v+lw7J2dHRYREQGqrpb68+/VY0Wx1FYsn7xy 1o3lQilirpxHfUZJC+FTlxsbGy+fPnr7uy7AW1tbLDQ0FBbrPlF79fRRYkICf+sYuQNAr378FmAk ESw4OJibXC+0NMLDw/kDI3vhQH9oa62trbHAwEBO1tFUCwwI4A+8tLREy2dlZYX5+fldgwW+vr78 gRcXFwmMQTBvb2+Svd6/5w88NzdHoIWFBebp6Umyu7s7f+Dp6WkCzc7OMsBIdnV15Q88OTlJIAyC AUayk5MTf+CxsTECIVFnzs7OJNvb2/MHHhkZIdD4+DhzcHAg2dramj/w4OAggWA9s7W1JdnS0pI/ cH9/P4FwOGJWVlYkm5ub8wfu6ekhEKxnsJJkExMT/sCdnZ0EgvUMVpJsaGjIHxi/HgjU29vLTE1N STYwMDAyMoIGo4EnbGxsMPVcXFyEQiH2GR8fH39//6CgoNCwsA+RH2JjRBJJQmpq2se/PiI9zczM zM7OzsvLKygoKCwsLC4uLi8vx8GsuroaJ2EcB/HrgUBdXV3M2NiY5AdVdJ4I8DHlUpeHXjiFM7j3 oa99fXu4nenr6399Rw/tAW5nenp6YMNu+NzMzMzCwgLRxU5iZ2fn6OiIALu5uXl4eHh5eSHGAQEB iHFISEhYWBiStejoaOSHYrEYyXlycnJaWhoijXjn5OTk5+dTsEtLS3EY5uJdW1uLUzhC/g8gkbU4 dgKeEQAAAABJRU5ErkJggg==";

//used to tell when to react to onchange of textbox filter
var usingCustomFilter = false;

//----------------------------
// Helper Functions
//----------------------------

//May want to change how we look for text in a Charm so have a function
function estiahCharmDivContains(CharmDiv, SearchString) {
  if (CharmDiv.innerHTML.toUpperCase().indexOf(SearchString.toUpperCase()) > -1) return true;
  return false;
}

//Sheira
function estiahCharmIsUsable(CharmDiv) {
  if (CharmDiv.getAttribute("class").indexOf("cardbg_lr_common") > -1) return true;
  return false;
}
//Sheira

function estiahCharacterCollectionUpdateCustomFilter() {
  if (usingCustomFilter) estiahCharacterCollectionApplyCustomFilter();
}

//Sheira: New Filter method
function estiahApplyCharmFilter(SearchString) {
  var charms, charm, search, i, j;

  var SearchListTemp = SearchString.split(" ");
  //kick empty ones
  var SearchList = new Array();
  while (search = SearchListTemp.shift())
  {
		if (search != "")
			SearchList.push(search);
	}

  charms = document.evaluate("//div[contains(@class,'cardframe_lr')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  //hide everything so the user does not see anything till it's done
  charms.snapshotItem(0).parentNode.parentNode.style.display = "none";
  L1: for (i = 0; i < charms.snapshotLength; i++)
  {
		charm = charms.snapshotItem(i);
		//show it
		charm.style.display = "";
		//if any filter does not match: hide it
		for (j = 0; j < SearchList.length; j++)
		{
			if (SearchList[j].substring(0, 2) == "$$")
			{
				if (((SearchList[j] == "$$UNUSABLE$$") && (estiahCharmIsUsable(charm))) || ((SearchList[j] == "$$USABLE$$") && (!estiahCharmIsUsable(charm))))
				{
					charm.style.display = "none";
					continue L1;
				}
				continue;
			}
			if (!estiahCharmDivContains(charm, SearchList[j]))
			{
				charm.style.display = "none";
				continue L1;
			}
		}
	}
	//show result
	charms.snapshotItem(0).parentNode.parentNode.style.display = "";
}
//Sheira

//Removed to use the function by Sheira
function estiahApplyCharmFilter3(SearchString) {
  var charms, charm;

  var SearchList = SearchString.split(" ");
  if (SearchString == " ") SearchList = "Zoom".split(" ");  //something on all cards.


  //Look at all charms, set them to visible, then hide any charms that don't match
  //Start with Unusable Charms, then move to Usable charms
  charms = document.evaluate("//div[contains(@class,'cardbg_ld_common')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

     for (var i = 0; i < charms.snapshotLength; i++)
     {
         charm = charms.snapshotItem(i);
          charm.style.display = "inline";
       for (var j = 0; j < SearchList.length; j++)
         if (!estiahCharmDivContains(charm,SearchList[j])) charm.style.display = "none";
          if (SearchString == "$$UNUSABLE$$") charm.style.display = "inline";
     }



  //Usable charms invisible
  charms = document.evaluate("//div[contains(@class,'cardbg_lr_common')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

     for (var i = 0; i < charms.snapshotLength; i++)
     {
         charm = charms.snapshotItem(i);
          charm.style.display = "inline";
       for (var j = 0; j < SearchList.length; j++)
         if (!estiahCharmDivContains(charm,SearchList[j])) charm.style.display = "none";
          if (SearchString == "$$USABLE$$") charm.style.display = "inline";
     }

}

function estiahCharacterCollectionRemoveFilters() {

  usingCustomFilter = false;
  estiahApplyCharmFilter(" ");

}



function estiahCharacterCollectionApplyCustomFilter() {

  var finalValue;
  finalValue = document.getElementById('customcharmfilter').value;
  if (finalValue == "") finalValue = " ";

  usingCustomFilter = true;
  estiahApplyCharmFilter(finalValue);
  document.getElementById('customcharmfilter').focus();

}



//---------------------------------------------------------------
// Only show unusable charms
//---------------------------------------------------------------
function estiahCharacterCollectionShowAllUnusable() {

  usingCustomFilter = false;
  estiahApplyCharmFilter("$$UNUSABLE$$");

}


//---------------------------------------------------------------
// Only show usable charms
//---------------------------------------------------------------
function estiahCharacterCollectionShowAllUsable() {

  usingCustomFilter = false;
  estiahApplyCharmFilter("$$USABLE$$");

}

//---------------------------------------------------------------
// Show *all* charms
//---------------------------------------------------------------
function estiahCharacterCollectionShowAll() {

var groups, group;


var runes, rune;
runes = document.evaluate("//div[contains(@class,'BV_card_index')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

   for (var i = 0; i < runes.snapshotLength; i++)
   {
       rune = runes.snapshotItem(i);
        rune.style.opacity = 0.3;
   }



  var e = document.evaluate("//div[@id='usable_charms_div']",
   document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  var ImageDiv;
  ImageDiv = e.singleNodeValue;
  ImageDiv.style.opacity = 1;



//Make all the groups of cards visible
groups = document.evaluate("//div[contains(@class,'BV_tab_content')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

   for (var i = 0; i < groups.snapshotLength; i++)
   {
       group = groups.snapshotItem(i);
        group.style.display = "inline";
   }

}



//---------------------------------------------------------------
// Add interface for changing which Charms are shown
//---------------------------------------------------------------
function estiahCharacterCollectionSetup() {

//Add links to show all usable or all unusable

//Locate place to add our new features
  var e = document.evaluate("//div[@id='Tab20']",
   document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

  var newAllRuneImg;
  var ImageDiv = document.createElement("div");
  ImageDiv.innerHTML = '<div class="tab" id="Tab21"><img id="ALLRUNEIMG" src="'+ allRuneImage + '"></div>';
  ImageDiv.id = "usable_charms_div";
  ImageDiv.style.opacity = 0.3;
  e.singleNodeValue.parentNode.appendChild(ImageDiv);

//Sheira: gray out/mouse over
	function addCSS(css)
	{
		var style = top.document.createElement("style");
		style.setAttribute("type", "text/css");
		style.innerHTML = css;
		top.document.getElementsByTagName("head")[0].appendChild(style);
	}
	addCSS('#usable_charms_div:hover { opacity: 1 ! important; }');
	e.singleNodeValue.parentNode.addEventListener("click", function(event)
	{
		if (ImageDiv != event.target.parentNode.parentNode)
			ImageDiv.style.opacity = 0.3;
	}, false)
//Sheira

  var x = document.evaluate("//img[@id='ALLRUNEIMG']",
   document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

  newAllRuneImg = x.singleNodeValue;
  newAllRuneImg.addEventListener('click',estiahCharacterCollectionShowAll,true);

  var AllDiv = document.createElement("div");
  AllDiv.innerHTML = '<br>&nbsp;&nbsp;&nbsp;&nbsp;Filters:<br>&nbsp;&nbsp;&nbsp;&nbsp;<label><input id=charmfilter name=charmfilter type=radio checked>No Filter</input></label>';
  AllDiv.id = "all_charms_div";
  var e = document.evaluate("//div[@class='runetab']",
   document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  e.singleNodeValue.appendChild(AllDiv);
  AllDiv.addEventListener("click",estiahCharacterCollectionRemoveFilters,false);



  var UsableDiv = document.createElement("div");
  UsableDiv.innerHTML = '<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<label><input name=charmfilter type=radio>All Usable Charms</input></label>';
  UsableDiv.id = "usable_charms_div";
  var e = document.evaluate("//div[@class='runetab']",
   document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  e.singleNodeValue.appendChild(UsableDiv);
  UsableDiv.addEventListener("click",estiahCharacterCollectionShowAllUsable,false);



  var UnusableDiv = document.createElement("div");
  UnusableDiv.innerHTML = '<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<label><input name=charmfilter type=radio>All Unusable Charms</input></label>';
  UnusableDiv.id = "unusable_charms_div";
  e.singleNodeValue.appendChild(UnusableDiv);
  UnusableDiv.addEventListener("click",estiahCharacterCollectionShowAllUnusable,false);

  var AllDiv = document.createElement("div");
  AllDiv.innerHTML = '<br>&nbsp;&nbsp;&nbsp;&nbsp;<label><input name=charmfilter type=radio>Custom:&nbsp;<input id=customcharmfilter name=customcharmfilter value=""></label>';
  AllDiv.id = "all_charms_div";
  e.singleNodeValue.appendChild(AllDiv);
  AllDiv.addEventListener("click",estiahCharacterCollectionApplyCustomFilter,false);


  document.getElementById('customcharmfilter').addEventListener("change",estiahCharacterCollectionUpdateCustomFilter,false);


//First - locate and grok player level and stats.  Skills are out of scope for now
var PlayerLevel, PlayerPow, PlayerInt, PlayerDex, PlayerCon;


//Player Level
e = document.evaluate("//div[contains(@class,'PT_update_level')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
 if (!e.singleNodeValue) {
    PlayerLevel = 0;  //Panic?
 }
 else {
   PlayerLevel = e.singleNodeValue.innerHTML;
  }

//Player Int
e = document.evaluate("//div[contains(@class,'PT_update_int')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
 if (!e.singleNodeValue) {
    PlayerInt = 0;  //Panic?
 }
 else {
   PlayerInt = e.singleNodeValue.innerHTML;
  }

//Player Dex
e = document.evaluate("//div[contains(@class,'PT_update_dex')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
 if (!e.singleNodeValue) {
    PlayerDex = 0;  //Panic?
 }
 else {
   PlayerDex = e.singleNodeValue.innerHTML;
  }

//Player Con
e = document.evaluate("//div[contains(@class,'PT_update_con')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
 if (!e.singleNodeValue) {
    PlayerCon = 0;  //Panic?
 }
 else {
   PlayerCon = e.singleNodeValue.innerHTML;
  }

//Player Pow
e = document.evaluate("//div[contains(@class,'PT_update_pow')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
 if (!e.singleNodeValue) {
    PlayerPow = 0;  //Panic?
 }
 else {
   PlayerPow = e.singleNodeValue.innerHTML;
  }



//Then, for each charm requirement (ie - <span class="lhp">)

    charmspans = document.evaluate("//span[contains(@class,'lhp')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

   for (var j = 0; j < charmspans.snapshotLength; j++)
   {
       charmspan = charmspans.snapshotItem(j);
       //for each of those, see if it contains a stat requirement or level requirement (via REs)
       //if (j < 2) alert(charmspan.innerHTML);

       //Possible spans to match:
       //<span class="data lhp"><strong>49</strong> Dex&nbsp;&nbsp; <strong>54</strong> Pow</span>
       //<span class="lhp">Requires Level 14</span>

       var thehtml = charmspan.innerHTML.replace(/\n/g, '');
       thehtml = thehtml.replace(/&nbsp;/g, ' ');
       thehtml = thehtml.replace(/<[^>]*>/g, '');
       thehtml = thehtml.replace(/  /g, ' ');

       //Now, thehtml is either a stat req list, or a level req

       //Find, Match, and color the Level Req.
       var re = new RegExp("Requires Level (\\d+)", "g");
       var LevelReq;
       if (LevelReq = re.exec(thehtml)) {
      LevelReq = LevelReq[1];
      if (parseInt(LevelReq) > parseInt(PlayerLevel)) {
         charmspan.style.color = "#DC143C";
      }
       }

       //Find, Match, and note the stat req.
       re = new RegExp("(\\d+) (...)", "g");
       var StatReq;
       while (StatReq = re.exec(thehtml)) {
          if (StatReq[2] == 'Pow') {
             if (parseInt(StatReq[1]) > parseInt(PlayerPow))
           charmspan.innerHTML = charmspan.innerHTML + '<br /><font color="#DC143C">' + "Need " + (parseInt(StatReq[1]) - parseInt(PlayerPow)) + " more Pow</font>";

          }
          if (StatReq[2] == 'Dex') {
             if (parseInt(StatReq[1]) > parseInt(PlayerDex))
           charmspan.innerHTML = charmspan.innerHTML + '<br /><font color="#DC143C">' + "Need " + (parseInt(StatReq[1]) - parseInt(PlayerDex)) + " more Dex</font>";

          }
          if (StatReq[2] == 'Con') {
             if (parseInt(StatReq[1]) > parseInt(PlayerCon))
           charmspan.innerHTML = charmspan.innerHTML + '<br /><font color="#DC143C">' + "Need " + (parseInt(StatReq[1]) - parseInt(PlayerCon)) + " more Con</font>";

          }
          if (StatReq[2] == 'Int') {
             if (parseInt(StatReq[1]) > parseInt(PlayerInt))
           charmspan.innerHTML = charmspan.innerHTML + '<br /><font color="#DC143C">' + "Need " + (parseInt(StatReq[1]) - parseInt(PlayerInt)) + " more Int</font>";

          }
       }

   }
}

//---------------------------------------------------------------
// Execute script
//---------------------------------------------------------------
window.addEventListener('load',estiahCharacterCollectionSetup,false);