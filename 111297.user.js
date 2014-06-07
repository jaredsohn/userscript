/*

 This is a collection of small scripts for Estiah (http://www.estiah.com)
 
 - Filter (search) charms on the gears page
 - Show bounty on players on the pvp pages
 - Hide charms of which you already have 5 (in shops, auction, guild showcase)
 - Hide extra text on dungeon pages
 - Hide exchange rates on the market page

 Code by:
 - WL (http://wl.attrib.org/estiah/allinone) - HideCharms
 - Walbur (http://userscripts.org/scripts/show/68502) - FindCard
 - Gitface (http://userscripts.org/scripts/show/69552) - ShowBounty
 - Ant - HideText

*/

// ==UserScript==
// @name           Estiah - Scriptlets
// @description    FindCard, Show Bounty, Hide charm and Hide rates in one script
// @include        http://www.estiah.com/*
// @version        110826
// ==/UserScript==


////////////////////////////////////////////////////////////////////////
// SETTINGS
////////////////////////////////////////////////////////////////////////

//
// Turn modules on/off
//
Find_Cards = 1;         // Filter (search) charms on the gears page
Show_Bounty = 1;        // Show bounty on players on the pvp pages
Hide_Charms = 1;        // Hide charms of which you have 5 (in shops, auction, guild showcase)
Hide_Dungeon_Text = 1;  // Hide extra text on dungeon pages
Hide_Market_Rates = 1;  // Hide exchange rates on the market page


////////////////////////////////////////////////////////////////////////
// FUNCTIONS & VARIABLES
////////////////////////////////////////////////////////////////////////

//
// function for HideText
//
function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

//
// functions for ShowBounty
//
function getBountyAmount(userid) {
  var e = document.evaluate("//div[@id='SystemInfoCharacter" + userid + "']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  if (! e) return 0;
  var thehtml = e.singleNodeValue.innerHTML.replace(/\n/g, '');
  if (thehtml.indexOf("WANTED") >= 0) {
    return parseInt(thehtml.replace(/.*WANTED\!\s*(\d+)g.*/,'$1'));
  }
  return 0;
}

function addBountyToMobList() {
  var mobnodes = document.getElementsByClassName("mob opacity outline BV_system_highlight");
  for (var i = 0; i < mobnodes.length; i++) {
    var thehtml = mobnodes[i].innerHTML.replace(/\n/g, '');
    var charid = thehtml.replace(/.*character\/(\d+).*/,'$1');
    bounty = getBountyAmount(charid);
    if (bounty) {
      var classdiv = mobnodes[i].getElementsByClassName("name");
      if (classdiv.length != 1) continue;
      var text = document.createElement("text");
      text.className = "pow"; // red
      text.style.fontSize = "smaller";
      text.innerHTML = bounty + "g";
      classdiv[0].appendChild(text);
    }
  }
}

function ShowBounty() {
  // cache a pointer to the original VsList.change function
  var origVsListChangeFunction = unsafeWindow.VsList.change;
  var delay = 100; // milliseconds
  // create my new VsList.change function
  var myVsListChangeFunction = function() {
    // call the original change function then do my stuff
    origVsListChangeFunction();
    // Wait for moblist to get cleared and says 'loading'
    // Then call the next function after that happens
    setTimeout(myVsListChangeFunctionMid, delay)
  };
  // second part of my new VsList.change function
  var myVsListChangeFunctionMid = function() {
    // poll the VsMoblist to see if it still says "loading..."
    var thediv = document.getElementById("VsMobList");
    if (thediv.innerHTML.indexOf("loading...") >= 0) {
      setTimeout(myVsListChangeFunctionMid, delay);
      return;
    }
    // give a delay to finish update of moblist
    setTimeout(myVsListChangeFunctionEnd, delay);
  }
  // last part of my new VsList.change function
  var myVsListChangeFunctionEnd = function() {
    // VsMoblist has updated - add my stuff to the mob list
    addBountyToMobList();
  }
  // overwrite existing VsList.change to point to mine
  unsafeWindow.VsList.change = myVsListChangeFunction;
  addBountyToMobList();
}

//
// functions for FindCard
//
var match;

function updateCards() {
  var userinput = document.getElementById('findcharm_userinput').value;
  var property = document.getElementById('findcharm_property').selectedIndex;
  var gt = document.getElementById('findcharm_gt').checked;
  var lt = document.getElementById('findcharm_lt').checked;
  var eq = document.getElementById('findcharm_eq').checked;
  var compval = parseInt(document.getElementById('findcharm_compval').value);
  var op;
  if (gt == 1) {
    op = 0;
  }
  else if (lt == 1) {
    op = 1;
  }
  else if (eq == 1) {
    op = 2;
  }

  var cardFWs = document.getElementsByClassName('common_file floating opacity bd1');	// floating windows
  for (var i = 0; i < cardFWs.length; i++) {
    var cardFW = cardFWs[i];
    var card = document.getElementById('CollectionCard' + cardFW.id.substring(14))
    if (card != null) {
      var properties = new Array();
      var title1    = cardFW.getElementsByClassName('title ccraft');
      var title2    = cardFW.getElementsByClassName('title ctreasure');
      var title3    = cardFW.getElementsByClassName('title crare');
      var title4    = cardFW.getElementsByClassName('title cclass');
      var title5    = cardFW.getElementsByClassName('title cvendor');
      var title6    = cardFW.getElementsByClassName('title cepic');
      properties[0] = cardFW.getElementsByClassName('melee');
      properties[1] = cardFW.getElementsByClassName('magic');
      properties[2] = cardFW.getElementsByClassName('spirit');
      properties[3] = cardFW.getElementsByClassName('armor');
      properties[4] = cardFW.getElementsByClassName('ward');
      properties[5] = cardFW.getElementsByClassName('willpower');
      var special   = cardFW.getElementsByClassName('special');
      var desc   = cardFW.getElementsByClassName('description');

      match = 0;
      testString(title1, userinput);
      testString(title2, userinput);
      testString(title3, userinput);
      testString(title4, userinput);
      testString(title5, userinput);
      testString(title6, userinput);
      testString(desc, userinput);
      
      if (property != 0 && match == 1) {
        if (property <= 6) {
          if (properties[property - 1] == null || properties[property - 1].length == 0) {
            match = 0;
          } else {
            testCompare(properties[property - 1], op, compval);
          }
        }
        if (property == 7) // % pierce
          match = match & testValue(desc, /([0-9]+)% P\)/, op, compval);
      }
      

      if (!match) {
        card.style.display = 'none';
      } else {
        card.style.display = '';
      }
    }
  }
}

function testValue(desc, pat, op, thresh) {
  var res = desc[0].innerHTML.match(pat);
  var prop = parseInt(res);
  if (res == null || prop == -1 || prop == null)
    return 0;
  if (op == 0 && prop < thresh && prop >= 0)
    return 0;
  if (op == 1 && prop > thresh && prop >= 0)
    return 0;
  if (op == 2 && prop != thresh && prop >= 0)
    return 0;
  GM_log(res);
  return 1;
}

function testString(toTest, pattern) {
  patternLC = pattern.toLowerCase();
  pats = patternLC.split(" ");
  for (var p = 0; p < toTest.length; p ++) {
    toTestLC = toTest[p].innerHTML.toLowerCase();

    var miss = 0;
    for (var i = 0; i < pats.length; i ++) {
      var end = toTestLC.indexOf(pats[i]);
      if (end < 0) {
        miss = 1;
      }
    }
    if (miss == 0) {
      match = 1;
    }
  }
}

function testCompare(str, op, compval) {
  var prop = -1;
  var end = str[0].innerHTML.indexOf('</strong>');
  if (end > -1) {
  	var findStart = end - 12;
  	if (findStart < 0) findStart = 0;
  	var start = str[0].innerHTML.indexOf('<strong>', findStart);
  	if (start > -1) {
  		prop = parseInt(str[0].innerHTML.substring(start + 8, end));
    }
  }
  if (prop == -1)
    match = 0;
  if (op == 0 && prop < compval && prop >= 0)
    match = 0;
  if (op == 1 && prop > compval && prop >= 0)
    match = 0;
  if (op == 2 && prop != compval && prop >= 0)
    match = 0;
}

//
// searchbox for FindCard
//
var OperationDiv = document.createElement("div");
OperationDiv.innerHTML = ' \
<div class="common_filter outline"> \
 <div class="group_title lhp">Filter by</div> \
 <div class="content"> \
  <form id="PatternForm"> \
    charm text: <input name="pat" value="" id="findcharm_userinput" size="30" /> <br>\
    property: <select name="prop" class="select" id="findcharm_property"> \
      <option label="none" value="none" selected="selected">none</option> \
      <option label="melee" value="melee">melee</option> \
      <option label="magic" value="magic">magic</option> \
      <option label="spirit" value="spirit">spirit</option> \
      <option label="armor" value="armor">armor</option> \
      <option label="ward" value="ward">ward</option> \
      <option label="willpower" value="willpower">willpower</option> \
      <option label="% pierce" value="pierce">% pierce</option> \
    </select> \
    <label><input type="radio" name="cond" value="0" id="findcharm_gt" checked="checked" class="radio" />&gt=</label>&nbsp; \
    <label><input type="radio" name="cond" value="1" id="findcharm_lt" class="radio" />&lt=</label>&nbsp; \
    <label><input type="radio" name="cond" value="2" id="findcharm_eq" class="radio" />=</label>&nbsp; \
    <input name="compval" value="0" id="findcharm_compval" size="5"/> \
  </form> \
 </div> \
</div>';


////////////////////////////////////////////////////////////////////////
// MODULES
////////////////////////////////////////////////////////////////////////

//
// Hide charms of which you already have 5 (in shops, auction, guild showcase)
//
// Code by WL (http://wl.attrib.org/estiah/allinone)
//
if (Hide_Charms) {
  if (top.document.title == "Craft - Estiah" || top.document.title == "Auction - Estiah" || top.document.title == "Showcase - Estiah") {
    var temp = document.evaluate('//div[substring-before(@class, " ")="card_lr" and div[substring-before(@class, " ")="count"]=5]/../..', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < temp.snapshotLength; i++) {
      temp.snapshotItem(i).parentNode.removeChild(temp.snapshotItem(i));
    }
  }
}

//
// Hide extra text on dungeon pages
//
if (Hide_Dungeon_Text) {
  if (top.document.title == "Dungeon - Estiah") {
//    addGlobalStyle(".section_text { display: none ! important}");
    addGlobalStyle(".paragraph_text { display: none ! important }");
  }
}

//
// Hide exchange rates on the market page
//
if (Hide_Market_Rates) {
  if (top.document.title == "Market - Estiah") {
    addGlobalStyle(".paragraph_text { display: none ! important }");
    addGlobalStyle(".ratelist { display: none ! important }");
  }
}

//
// Show bounty on players on the pvp pages
//
// Code by Gitface (http://userscripts.org/scripts/show/69552)
//
if (Show_Bounty) {
  if (top.document.title == "Player Versus Player - Estiah") {
    window.addEventListener('load', ShowBounty, false);
  }
}

//
// Filter (search) charms on the gears page
//
// Code by Walbur (http://userscripts.org/scripts/show/68502)
//
if (Find_Cards) {
  if (top.document.title == "Gear - Estiah") {
    OperationDiv.id = "PatternDiv";
    var cardlist = document.getElementsByClassName("common_filter");    // was "cardlist"
    cardlist[1].parentNode.insertBefore(OperationDiv, cardlist[1]);
    var input_desc = document.getElementById("findcharm_userinput");
    input_desc.addEventListener("keyup",updateCards,false);
    var input_comp = document.getElementById("findcharm_compval");
    input_comp.addEventListener("keyup",updateCards,false);
    var input_prop = document.getElementById("findcharm_property");
    input_prop.addEventListener("change",updateCards,false);
    var input_gt = document.getElementById("findcharm_gt");
    input_gt.addEventListener("click",updateCards,false);
    var input_lt = document.getElementById("findcharm_lt");
    input_lt.addEventListener("click",updateCards,false);
    var input_eq = document.getElementById("findcharm_eq");
    input_eq.addEventListener("click",updateCards,false);
  }
}

////////////////////////////////////////////////////////////////////////
// END OF FILE
////////////////////////////////////////////////////////////////////////