// ==UserScript==
// @name	  Estiah Gear Manager
// @description	  Gear Manager Version 1.6.  Adds links for saving and loading gears.  Direct questions/comments to Gitface in Estiah or email 'theoneandonlygitface@gmail.com'.
// @author        Gitface
// @license	  (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include http://www.estiah.com/character/deck*

// ==/UserScript==

//-----------------------------
// Known Issues/Limitations
//-----------------------------
// - Gear names that are too long will extend out of the gear box
// - Gears that have been removed still leave a greasemonkey variable around
//   that is empty and shows up in "about:config".
//

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  Page parsing functions
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//---------------------------------------------------------------
function cleanGearname(name) {
  // remove leading/trailing whitespace
  name = name.replace(/^\s+/,'');
  name = name.replace(/\s+$/,'');
  // no { or } allowed
  name = name.replace(/{/g,'');
  name = name.replace(/}/g,'');
  return name;
}

//---------------------------------------------------------------
// get username
//---------------------------------------------------------------
function getUsername() {
  var dropdownnodes = document.evaluate("//div[@class='entry BV_menu_dropdown']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i = 0; i < dropdownnodes.snapshotLength; i++) {
    var node = dropdownnodes.snapshotItem(i);
    var thehtml = node.innerHTML.replace(/\n/g, '');

    //<a href="/character" class="nolink">Gitface (L.<strong class="PT_update_level">17</strong>)</a>
    if (thehtml.indexOf("<a href=\"/character\"") >= 0) {
      thehtml = thehtml.replace(/.*<a href="\/character"[^>]+>([^< ]+) \(L.*/,'$1');
      return thehtml;
    } 
  }
  return "unknown";
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  Greasemonkey variable manipulation
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//---------------------------------------------------------------
//  read gear value
//---------------------------------------------------------------
function readGearValue(name) {
  return GM_getValue("estiah_gear_manager " + name);
}

//---------------------------------------------------------------
//  save gear value
//---------------------------------------------------------------
function saveGearValue(name, gear) {
  return GM_setValue("estiah_gear_manager " + name, gear);
}

//---------------------------------------------------------------
//  return first token in a list of {} tokens
//---------------------------------------------------------------
function firstToken(str) {
  var token = str.replace(/^{([^{}]+)}.*/,'$1');
  return token;  
}

//---------------------------------------------------------------
//  return last token in a list of {} tokens
//---------------------------------------------------------------
function lastToken(str) {
  var token = str.replace(/.*{([^{}]+)}$/,'$1');
  return token;  
}

//---------------------------------------------------------------
//  return str with last token popped off
//---------------------------------------------------------------
function popLastToken(str) {
  var newstr = str.replace(/(.*){[^{}]+}$/,'$1');
  return newstr;
}

//---------------------------------------------------------------
//  return str with first token popped off
//---------------------------------------------------------------
function popFirstToken(str) {
  var newstr = str.replace(/^{[^{}]+}(.*)$/,'$1');
  return newstr;
}

//---------------------------------------------------------------
//  return a list of all saved gears in the master list.
//---------------------------------------------------------------
function getGearList() {
  var allgears = GM_getValue("estiah_gear_manager_list", "");
  //DEBUG alert(allgears); //DEBUG
  gearlist = [];
  while(allgears.length != 0) {
    //DEBUG alert(allgears); //DEBUG
    gearlist.push(firstToken(allgears));
    allgears = popFirstToken(allgears);
  }
  return gearlist;
}

//---------------------------------------------------------------
function caseInsensitiveSort(x,y) { 
  var a = String(x).toUpperCase(); 
  var b = String(y).toUpperCase(); 
  if (a > b) 
    return 1 
  if (a < b) 
    return -1 
  return 0; 
}

//---------------------------------------------------------------
//  return a SORTED list of all saved gears in the master list.
//---------------------------------------------------------------
function getSortedGearList() {
  var gearlist = getGearList();
  gearlist.sort(caseInsensitiveSort);
  return gearlist;
}

//---------------------------------------------------------------
//  return true if the gear is already saved.  false otherwise
//---------------------------------------------------------------
function gearExists(name) {
  var allgears = getGearList();
  for (var i = 0; i < allgears.length; i++) {
    if (allgears[i] == name) {
      // only non-empty gears are in the getGearList
      return true;
    }
  }
  return false;
}

//---------------------------------------------------------------
//  add a gear to the GM master list
//---------------------------------------------------------------
function addGearToMasterList(name) {
  if (! gearExists(name)) {
    var allgears = GM_getValue("estiah_gear_manager_list", "");
    if (allgears.length == 0) {
      allgears = "{" + name + "}";
    }
    else {
      allgears = allgears + "{" + name + "}";
    }
    GM_setValue("estiah_gear_manager_list", allgears);
  }
}

//---------------------------------------------------------------
//  remove a saved gear from the GM master list
//---------------------------------------------------------------
function removeGearFromMasterList(name) {
  var allgears = getGearList();
  var newgears = "";
  for (var i = 0; i < allgears.length; i++) {
    if (allgears[i] != name) {
      if (newgears.length == 0) {
        newgears = "{" + allgears[i] + "}";
      }
      else {
        newgears = newgears + "{" + allgears[i] + "}";
      }
    }
  }
  GM_setValue("estiah_gear_manager_list", newgears);
}

//---------------------------------------------------------------
//  add a gear to the GM master list and save the gear
//---------------------------------------------------------------
function addGearToGreaseMonkey(deckname, deck) {
  saveGearValue(deckname, deck);
  addGearToMasterList(deckname);
}

//---------------------------------------------------------------
//  remove a gear from the GM master list and clear the gear var
//---------------------------------------------------------------
function removeGearFromGreaseMonkey(deckname) {
  saveGearValue(deckname, "");
  removeGearFromMasterList(deckname);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  General Functions
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//---------------------------------------------------------------
// Add an option to a selectbox
//---------------------------------------------------------------
function addOptionToSlotSel(selectbox,text,value) {
  var optn = document.createElement("option");
  optn.text = text;
  optn.value = value;
  selectbox.options.add(optn);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  Removing decks from file
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//---------------------------------------------------------------
//  rename a saved gear
//---------------------------------------------------------------
function estiahRenameGear() {
  var deckname = this.id.replace(/gearnameanchor (.*)/,'$1');
 
  var newname = prompt("Rename Gear", deckname);
  if (newname) {
    var re = new RegExp("^\\s*$");
    if (re.exec(newname)) return; // don't save names full of whitespace
    newname = cleanGearname(newname);
    if (newname == deckname) return;  // no real name change

    // get the deck from original variable
    var deck = readGearValue(deckname);

    if (gearLinksExist(newname)) {
      var overwrite = confirm("Overwrite existing gear '" + newname + "'?");
      if (overwrite) {
        // remove original variable (old gear), and overwrite new
        removeGearFromGreaseMonkey(deckname);
        addGearToGreaseMonkey(newname, deck);
        addAllGearOptions();
      }
    }
    else {
      // new name doesn't exist
      // remove original variable (old gear), and write new
      removeGearFromGreaseMonkey(deckname);
      addGearToGreaseMonkey(newname, deck);
      addAllGearOptions();
    }
  }
}

//---------------------------------------------------------------
//  remove a saved gear
//---------------------------------------------------------------
function estiahRemoveGear() {
  var deckname = this.id.replace(/remove (.*)/,'$1');

  var answer = confirm("Are you sure you want to remove gear '" + deckname + "'?");
  if (answer) {
    var i = document.getElementById('gear ' + deckname);
    i.parentNode.removeChild(i);

    // remove the saved gear from GreaseMonkey
    removeGearFromGreaseMonkey(deckname);
  }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  Loading decks from file
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//---------------------------------------------------------------
//  Get the Deck from File and munge to deck.load syntax
//---------------------------------------------------------------
function readDeckFromFile(deckname, deckid) {
  var deck = readGearValue(deckname);
  //DEBUG alert('readdeck ' + deck); //DEBUG

  // munge back into deck.load syntax
  deck = deck.replace(/{([^,}]+),([^,}]+),([^,}]+),([^,}]+),([^,}]+),([^,}]+)}/g,'{\"id\":$1,\"name\":\"$2\",\"count\":\"$3\",\"rarity\":\"$4\",\"rune\":\"$5\",\"rune2\":\"$6\"}');
  deck = deck.replace(/}{/g,'},{');
  deck = deck.replace(/ /g,'&nbsp;');

  // compute total
  var total = 0;
  var ca = deck.split('\"count\":');
  for(var i=1;i < ca.length;i++) {
    var c = ca[i].substr(1,2);
    total = total + parseInt(c);
  }

  var start = "\"total\":" + total + ",\"cardlist\":[";
  var end = "]})";
  deck = start.concat(deck).concat(end);

  // create the deckload script
  deck = "Deck.load({\"name\":\"" + deckname + "\",\"id\":\"" + deckid + "\"," + deck + ";";

  //DEBUG alert(deck);
  return deck;
}

//---------------------------------------------------------------
//  return an array containing all the deck IDs
//---------------------------------------------------------------
function getAllDeckIds() {
  var gearnodes = document.evaluate("//div[@class='name']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  var deckIds = [];
  for (var i = 0; i < gearnodes.snapshotLength; i++) {
    var node = gearnodes.snapshotItem(i);
    var thehtml = node.innerHTML.replace(/\n/g, '');
    if (thehtml.indexOf("deck/load/id") >= 0) {
      var deckId = thehtml.replace(/.*deck_name(\d+)\s.*/,'$1');
      deckIds.push(deckId);
    }
  }
  return deckIds;
}

//---------------------------------------------------------------
//  convert the slot ID to deck ID
//---------------------------------------------------------------
function slotToDeckId(index) {
  var allIds = getAllDeckIds();
  return allIds[index - 1];
}

//---------------------------------------------------------------
//  get slot id the pulldown
//---------------------------------------------------------------
function getSlotId() {
  var i = document.getElementById("gearmgr droplist");
  return i.value;
}

//---------------------------------------------------------------
//  map slotid to the deck id
//---------------------------------------------------------------
function getDeckId(slotid) {
  return slotToDeckId(slotid);
}

//---------------------------------------------------------------
//  set the "not saved" status
//---------------------------------------------------------------
function setNotSavedStatus(id) {
  var i = document.getElementById("DeckSaveAlert");
  // When removing a card from any slot, this is not updated.
  // Can't state slot for now.
  // i.innerHTML = "Your gear in slot " + id + " is not saved yet!";
  i.innerHTML = "Your gear is not saved yet!";
  i.style.display = "";
}

//---------------------------------------------------------------
//  load a gear from file
//---------------------------------------------------------------
// This calls the deck.load function with the deck.load function.
// deck.load takes a LOT of rune, rarity stuff.  If they change syntax
// all saved decks will need to be munged to use the new syntax.
//
function estiahLoadGear() {
  var deckname = this.id.replace(/load (.*)/,'$1');

  var loaddeck = document.createElement("div");
  loaddeck.id = "gear_loaddeck_mod";

  // duplicate the scripts used to load a deck
  var scriptstart = "<script src=\"/js/prototype.js?361.1\" type=\"text/javascript\" charset=\"utf-8\"></script> <script src=\"/js/scriptaculous/effects.js?361.1\" type=\"text/javascript\" charset=\"utf-8\"></script> <script src=\"/js/default.js?361.1\" type=\"text/javascript\" charset=\"utf-8\"></script> <script src=\"/js/deck.js?361.1\" type=\"text/javascript\" charset=\"utf-8\"></script> <script type=\"text/javascript\"> ";
  var scriptend = "</script>";

  // Get the deck ID that we will load into
  var slotid = getSlotId();
  var deckid = getDeckId(slotid);

  // get deck from file
  var deckload = readDeckFromFile(deckname, deckid);

  //DEBUG alert(deckload); //DEBUG 

  // load the deck by adding the scripts to the page
  loaddeck.innerHTML = scriptstart.concat(deckload).concat(scriptend);
  var ein = document.evaluate("//div[@class='z1 format log']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  ein.singleNodeValue.parentNode.insertBefore(loaddeck, ein.singleNodeValue);

  // set the "not saved" status
  setNotSavedStatus(slotid)

  // clean up
  loaddeck.parentNode.removeChild(loaddeck);

  //DEBUG alert('loaded');  //DEBUG
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  Adding decks to file
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//---------------------------------------------------------------
//  Parse out the current deck name from the document
//---------------------------------------------------------------
function getCurrentGearName() {
  var i = document.getElementById("DeckNameInput"); 
  var str = i.value;
  str = cleanGearname(str);
  return str;
}

//---------------------------------------------------------------
//  Parse out the current deck from the document
//---------------------------------------------------------------
function getCurrentGear() {
  var i = document.getElementById("DeckCurrent"); 
  // iterate through cards in the gear
  children = i.childNodes;
  var deck = '';
  for (var i = 0; i < children.length; i++) {
    var node = children[i];
    if (node.nodeName == "DIV") {
      var thehtml = node.innerHTML.replace(/\n/g, '');
      var thehtml = thehtml.replace(/\r/g, '');

      var cardId = thehtml.replace(/.*card\/(\d+).*/,'$1');
      var cardName = thehtml.replace(/.*BV_system_file.*false;">([^<>\s]+)\s*<\/a>.*/,'$1');
      var cardCount = thehtml.replace(/.*DeckCardCount\d+">(\d+)<.*/,'$1');
      var cardType = thehtml.replace(/.*<a class=\"c([^\s]+).*/,'$1');
      var tmp = thehtml.replace(/.*minirune_([^\s"]+).*minirune_([^\s"]+).*/, '$1 $2');
      var rune1 = tmp.replace(/^([^\s]+).*/,'$1');
      var rune2 = tmp.replace(/.*\s([^\s]+)$/,'$1');

      //  removing @nbsp; for readability
      cardName = cardName.replace(/&nbsp;/g, ' ');

      if (cardCount != 0) {
        deck = deck.concat("{" + cardId + "," + cardName + "," + cardCount + "," + cardType + "," + rune1 + "," + rune2 + "}");
      }

      //DEBUG  alert(deck); //DEBUG
    }
  }

  return deck;
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  Page setup/manipulation
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//---------------------------------------------------------------
// return true if 'deckname' is already in the gearmanager box.
// return false if it isn't.
//---------------------------------------------------------------
function gearLinksExist(deckname) {
  var i = document.getElementById('gear ' + deckname);
  if (i == null) {
    return false;
  }
  return true;
}

//---------------------------------------------------------------
// Add gear option
//---------------------------------------------------------------
function addGearOption(gearName) {
  var gearListDiv = document.getElementById("gear_manager_gearlist");;

  var oneGearDiv = document.createElement("div");
  oneGearDiv.id = "gear " + gearName;
  oneGearDiv.style.width = "100%";

  // add text for the gear name
  var thediv = document.createElement("div");
  thediv.id = "gearname " + gearName;
  var anchor = document.createElement("a");
  anchor.className = "c2";
  anchor.style.textDecoration = "none";
  anchor.id = "gearnameanchor " + gearName;
  anchor.innerHTML = gearName;
  anchor.title = "Rename gear";
  anchor.addEventListener("click",estiahRenameGear,false);
  thediv.appendChild(anchor);
  thediv.style.margin = "4px 0px 2px 4px";
  thediv.style.align = "left";
  oneGearDiv.appendChild(thediv);

  // add a remove option for the gear
  var thediv = document.createElement("div");
  thediv.id = "remove " + gearName;
  thediv.className = "functions";
  thediv.style.align = "right";
  thediv.style.margin = "4px 4px 2px 4px";
  thediv.innerHTML = "<a title=\"Remove '" + gearName + "' gear from the Gear Manager\"> [Remove] </a>";
  oneGearDiv.appendChild(thediv);
  thediv.addEventListener("click",estiahRemoveGear,false);

  // add the load button for the gear
  thediv = document.createElement("div");
  thediv.id = "load " + gearName;
  thediv.className = "functions";
  thediv.style.margin = "4px 4px 2px 4px";
  thediv.innerHTML = "<a title=\"Load '" + gearName + "' into selected gear slot\"> [Load] </a>";
  thediv.style.align = "right";
  oneGearDiv.appendChild(thediv);
  thediv.addEventListener("click",estiahLoadGear,false);

  gearListDiv.appendChild(oneGearDiv);
}

//---------------------------------------------------------------
// Add all gear options
//---------------------------------------------------------------
function addAllGearOptions() {
  var gearListDiv = document.getElementById("gear_manager_gearlist");;
  gearListDiv.innerHTML = "";
  var gearlist = getSortedGearList();
  for(var i=0;i < gearlist.length; i++) {
    //DEBUG alert('found gear ' + gearlist[i]); //DEBUG 
    addGearOption(gearlist[i]);
  }
}

//---------------------------------------------------------------
//  add a gear to file
//---------------------------------------------------------------
function estiahAddGear() {
  var deckname = getCurrentGearName();
  if (!deckname) {
    alert('Cannot save with empty name');
    return;
  }
  //DEBUG alert('deckname ' + deckname); //DEBUG 
  var deck = getCurrentGear();
  //DEBUG alert('deck ' + deck); //DEBUG 
  if (deck.length == 0) {
    // empty deck - exit
    alert('Cannot save empty deck');
    return
  }

  if (gearLinksExist(deckname)) {
    // gear already exists
    var answer = confirm("Overwrite existing gear '" + deckname + "'?");
    if (answer) {
      addGearToGreaseMonkey(deckname, deck);
    }
  }
  else {
    // gear does not exist already in the page.  Add the gear option and write to GM vars
    addGearToGreaseMonkey(deckname, deck);
    addAllGearOptions();
  }
}

//---------------------------------------------------------------
//  find the number of gear slots
//---------------------------------------------------------------
function numGearSlots() {
  var allIds = getAllDeckIds();
  return allIds.length;
}

//---------------------------------------------------------------
//  share a gear code to screen
//---------------------------------------------------------------
function estiahShareGear() {
  var deckname = getCurrentGearName();
  //DEBUG alert('deckname ' + deckname); //DEBUG 
  var deck = getCurrentGear();
  //DEBUG alert('deck ' + deck); //DEBUG 
  alert("gearname:" + deckname + ",gear:" + deck);
}

//---------------------------------------------------------------
// create Slot line
//---------------------------------------------------------------
function createSlotLine(gearMgrDiv) {
  var slotdiv = document.createElement("div");
  slotdiv.className = "deck highlight";
  slotdiv.id = "gear_slot_mod";
  slotdiv.style.width = "100%";

  var thediv = document.createElement("div");
  thediv.innerHTML = "When loading, select the gear slot to fill:";
  thediv.style.margin = "5px 4px 5px 4px";
  thediv.style.align = "left";
  slotdiv.appendChild(thediv);

  // add a dropdown list box for the gear slot to load into
  thediv = document.createElement("div");
  thediv.style.margin = "5px 0px 2px 25px";
  var sel = document.createElement("select");
  sel.id = "gearmgr droplist";
  for (var i = 1; i <= numGearSlots(); i++) {
    addOptionToSlotSel(sel, i, i);
  }
  thediv.appendChild(sel);
  slotdiv.appendChild(thediv);

  gearMgrDiv.appendChild(slotdiv);
}

//---------------------------------------------------------------
// create Io line - to add/import/export current gear
//---------------------------------------------------------------
function createIOLine(gearMgrDiv) {
  var iodiv = document.createElement("div");
  iodiv.id = "gear_io_mod";
  iodiv.className = "deck highlight";
  iodiv.style.width = "100%";

  var rowone = document.createElement("div");
  rowone.style.width = "100%";

  var thediv = document.createElement("div");
  thediv.innerHTML = "Click to add the current gear to the manager:";
  thediv.style.margin = "5px 4px 5px 4px";
  rowone.appendChild(thediv);

  var thediv = document.createElement("div");
  thediv.style.align = "right";
  thediv.style.margin = "5px 4px 5px 4px";
  thediv.className = "functions";
  thediv.innerHTML = "<a title=\"Add current gear to the Gear Manager\">[Add]</a>";
  rowone.appendChild(thediv);	
  thediv.addEventListener("click",estiahAddGear,false);
  iodiv.appendChild(rowone);

  /*
  // For now we don't support export/import with text codes
  // second row for sharing deck description
  var rowtwo = document.createElement("div");
  rowtwo.style.width = "100%";
  thediv = document.createElement("div");
  thediv.innerHTML = "Click to display the current gear code:";
  thediv.style.margin = "5px 4px 5px 4px";
  rowtwo.appendChild(thediv);

  thediv = document.createElement("div");
  thediv.style.align = "right";
  thediv.style.margin = "5px 4px 5px 4px";
  thediv.className = "functions";
  thediv.innerHTML = "<a title=\"Display contents of the current gear\">[Export]</a>";
  rowtwo.appendChild(thediv);
  thediv.addEventListener("click",estiahShareGear,false);
  iodiv.appendChild(rowtwo);
  */

  gearMgrDiv.appendChild(iodiv);	
}

//---------------------------------------------------------------
// Add interface for loading/adding gears
//---------------------------------------------------------------
function estiahGearManagerSetup() {
  var gearMgrDiv = document.createElement("div");
  gearMgrDiv.style.border = "1px solid #aa7711";
  gearMgrDiv.style.margin = "15px 0px 0px 0px";
  gearMgrDiv.style.width = "100%";
  gearMgrDiv.id = "gear_manager_mod";
  var e = document.evaluate("//div[@class='entry pow']", 
	document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  e.singleNodeValue.parentNode.parentNode.appendChild(gearMgrDiv);

  // title div
  var thediv = document.createElement("div");
  thediv.style.fontSize = "larger";
  thediv.style.margin = "7px 0px 0px 0px";
  thediv.style.width = "100%";
  thediv.className = "deck highlight";
  thediv.innerHTML = "<p align=\"center\" style=\"color: #f6ba68;font-weight: bold;margin-bottom: 7px\">Gear Manager</p>";
  gearMgrDiv.appendChild(thediv);

  // setup the add and slot selection rows
  createIOLine(gearMgrDiv);
  createSlotLine(gearMgrDiv);
  
  // add saved gears into the document
  var thediv = document.createElement("div");
  thediv.style.width = "100%";
  thediv.id = "gear_manager_gearlist";
  gearMgrDiv.appendChild(thediv);

  addAllGearOptions();
}

//---------------------------------------------------------------
// Execute script
//---------------------------------------------------------------
window.addEventListener('load',estiahGearManagerSetup,false);

