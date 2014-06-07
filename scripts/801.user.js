// ==UserScript==
// @name          Gmail Saved Searches
// @namespace     http://www.google.com/~mihaip
// @description	  Adds saved and recent seaches.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*

// ==/UserScript==

// Utility functions
function getObjectMethodClosure(object, method) {
  return function() {
    return object[method].apply(object, arguments);
  }
}

function getDateString(date) {
  return date.getFullYear() + "/" +
         (date.getMonth() + 1) + "/" +
         date.getDate();
}

function getCookie(name) {
  if (GM_getValue(name)) {
    return GM_getValue(name);
  }
  
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}

function setCookie(name, value) {
  GM_setValue(name, value);
}

// Shorthand
var newNode = getObjectMethodClosure(unsafeWindow.document, "createElement");
var newText = getObjectMethodClosure(unsafeWindow.document, "createTextNode");
var getNode = getObjectMethodClosure(unsafeWindow.document, "getElementById");

// Contants

const RULES = new Array(
  // Block in sidebar
  ".searchesBlock {-moz-border-radius: 5px; background: #fad163; margin: 10px 7px 0 0; padding: 3px;}",
  ".refreshButton {display: block; cursor: pointer; float: right; margin-top: -2px;}",
  ".searchesBlockList {padding-left: 5px; background: white; overflow: hidden; display: none;}",
  ".searchesBlockList h5 {margin: 0 0 1px -4px; color: #999; font-size: 12px; font-weight: bold;}",
  ".listItem {color: #ca9c22;}",
  ".editLink {background: white; text-align: right; color: #ca9c22; padding: 2px 0px 5px 0;}",
  
  // Edit page
  ".searchesContainer {-moz-border-radius: 10px; background: #fad163; padding: 10px;}",
  ".innerContainer {background: #fff7d7; text-align: left; padding: 10px;}",
  ".buttonContainer {text-align: center;}",
  ".searchesList {width: 100%;}",
  ".searchesList th {text-align: left; font-size: 90%;}",
  ".searchesList td {padding: 10px 0 10px 0; vertical-align: bottom;}",
  ".searchesList td.divider {background: #fad163; height: 3px; padding: 0;}",
  ".editItem {font-size: 80%;}",
  ".labelCell {width: 210px;}",
  ".labelCell input {width: 200px;}",
  ".cancelButton {margin-right: 5px;}",
  ".editCell {}",
  ".editCell input {width: 100%}",
  ".saveButton {margin-left: 5px; font-weight: bold;}"
);
   
const REFRESH_IMAGE = "data:image/gif;base64,R0lGODlhDQAPANU5AM%2BtUs6sUunDX" +
    "PfPYt65WK%2BTRaiMQvXNYfDJX9m1VtSxVIBrM7GURsKiTZqBPeS%2FWo94OZmAPebBW6WK" +
    "QbiaSdOwU35qMpV9O4t0N4NuNI12OIFsM9u3V7mbSaaLQtazVcyqUZ6EP%2BC7WX1oMbudS" +
    "semT62QRPjPYuvFXXtmMbSXR%2BK9WohyNvLKYOfBXPPLYJB4Ob6fS5R8O%2B3GXqGGQK%2" +
    "BSRauPROG9WW5cK%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADkALAAAAAANA" +
    "A8AAAZvwJxwSMzdiKcAg8YIDEyG4QPjABAUhgUuInQtAsQaDqcRwj7EUmY8yiUuReJtQInF" +
    "h5JEAXQX3mwzD305FSRGBAN3Eys5HWM4LAdDIiFCCmMbAkMcMghCBDgpEAUNKg4eL0MoFgI" +
    "tAA0AnkQHmoNBADs%3D";

const UP_TRIANGLE_IMAGE = "data:image/gif;base64,R0lGODlhCwALAKEAAP///wAAAA4" +
    "ODv///yH5BAEAAAMALAAAAAALAAsAAAITnI+pGmsBF5xp2mPzmCJHB4ZJAQA7";

const DEFAULT_SEARCHES = {
  "has:attachment": "Attachments",
  "after:today": "Today",
  "after:oneweekago": "Last Week"
};

const SEARCHES_COOKIE = "PersistentSearches";
const SEARCHES_COLLAPSED_COOKIE = "PersistentSearchesCollapsedCookie";

const ONE_DAY = 24 * 60 * 60 * 1000;

const KEY_PREFIX = "gmailss";
const POSITION = KEY_PREFIX + "pos";
const RECENT_NUM = KEY_PREFIX + "numrecent";
const RECENT_POS = KEY_PREFIX + "recentpos";                  
const NEW_VALUE = "NEW";

// Globals
var styleSheet = null;

var searches = new Array();
var recentSearches = new Array();
var searchesBlock = null;
var searchesBlockHeader = null;
var searchesBlockList = null;
var recentSearchesBlockList = null;
var editLink = null;

var hiddenNodes = null;
var searchesContainer = null;
var searchesList = null;

function initializePersistentSearches() {
  var labelsBlock = getNode("nb_0");
  
  if (!labelsBlock) {
    return;
  }
    
  searchesBlock = newNode("div");
  searchesBlock.id = "nb_9";
  searchesBlock.className = "searchesBlock";

  // header  
  searchesBlockHeader = newNode("div");
  searchesBlockHeader.className = "s h";
  searchesBlock.appendChild(searchesBlockHeader);
    
  searchesBlockHeader.triangleImage = newNode("img");
  searchesBlockHeader.triangleImage.src = "/mail/images/opentriangle.gif";
  searchesBlockHeader.triangleImage.width = 11;
  searchesBlockHeader.triangleImage.height = 11;
  searchesBlockHeader.triangleImage.addEventListener("click",
                                                     togglePersistentSearches,
                                                     false);
  searchesBlockHeader.appendChild(searchesBlockHeader.triangleImage);
  
  var searchesText = newNode("span");
  searchesText.appendChild(newText(" Searches"));
  searchesText.addEventListener("click",
                                togglePersistentSearches,
                                false);
  searchesBlockHeader.appendChild(searchesText);

  // recent searches list
  recentSearchesBlockList = newNode("div");
  recentSearchesBlockList.className = "searchesBlockList";
  recentSearchesBlockList.appendChild(newNode("h5")).appendChild(newText("Recent"));
    
  // saved searches list
  searchesBlockList = newNode("div");
  searchesBlockList.className = "searchesBlockList";
  searchesBlockList.appendChild(newNode("h5")).appendChild(newText("Saved"));

  var numrecent = GM_getValue(RECENT_NUM);
  if (!numrecent) {
    GM_setValue(RECENT_NUM, 5);
  }

  var recentpos = GM_getValue(RECENT_POS);
  if (!recentpos) {
    recentpos = "bottom";
    GM_setValue(RECENT_POS, recentpos);
  }
  
  if (recentpos == "top") {
    searchesBlock.appendChild(recentSearchesBlockList);
    searchesBlock.appendChild(searchesBlockList);
  } else {
    searchesBlock.appendChild(searchesBlockList);
    searchesBlock.appendChild(recentSearchesBlockList);
  }
  
  editLink = newNode("div");
  editLink.appendChild(newText("Edit searches"));
  editLink.className = "lk cs editLink";
  editLink.addEventListener("click", editPersistentSearches, false);
  searchesBlock.appendChild(editLink);
  
  if (getCookie(SEARCHES_COOKIE) != null) {
    restorePersistentSearches();
  } else {
    for (var query in DEFAULT_SEARCHES) {
      addPersistentSearch(new PersistentSearch(query, DEFAULT_SEARCHES[query]));
    }
  }
  
  checkCurrentQuery();
  
  insertSearchesBlock();  
  
  if (getCookie(SEARCHES_COLLAPSED_COOKIE) == "1") {
    togglePersistentSearches();
  }
  
  checkSearchesBlockParent();
}

function rearrangeSeachesBlock() {
  if (GM_getValue(RECENT_POS) == "top") {
    recentSearchesBlockList.parentNode.removeChild(recentSearchesBlockList);
    searchesBlock.insertBefore(recentSearchesBlockList, searchesBlockList);
  } else {
    searchesBlockList.parentNode.removeChild(searchesBlockList);
    searchesBlock.insertBefore(searchesBlockList, recentSearchesBlockList);
  }
}

function checkCurrentQuery() {
  var currentQuery = getCurrentQuery();
  if (currentQuery) {
    var found = false;
    
    var recentSearch = new PersistentSearch(currentQuery, 
                                            currentQuery, 
                                            PersistentSearch.RECENT_TYPE);
    
    for (var i=0; i < searches.length; i++) {
      if (searches[i].equals(recentSearch)) {
        found = true;
        break;
      }
    }
    
    if (!found) {
      for (var i=0; i < recentSearches.length; i++) {
        if (recentSearches[i].equals(recentSearch)) {
          found = true;
          break;
        }
      }
      
      if (!found) {
        addRecentSearch(recentSearch);
      }
    }
  }
}

function getCurrentQuery() {
  var queryString = window.location.search;
  var split = queryString.split("&");
  
  var params = {};
  
  for (var i=0; i < split.length; i++) {
    var pair = split[i].split("=");
    
    params[pair[0]] = pair[1];
  }
  
  if (params["search"] && params["search"] == "query") {
    return decodeURIComponent(params["q"]);
  } else {
    return null;
  }
}

function insertSearchesBlock() {
  var labelsBlock = getNode(GM_getValue(POSITION, "nb_2"));
  
  if (!labelsBlock) {
    labelsBlock = getNode("nb_0");
    if (!labelsBlock) {
      return;
    }
  }

  getNode("nav").insertBefore(searchesBlock, labelsBlock);
}

// For some reason, when naving back to the Inbox after viewing a message, we seem
// to get removed from the nav section, so we have to add ourselves back. This only
// happens if we're a child of the "nav" div, and nowhere else (but that's the place
// where we're supposed to go, so we have no choice)
function checkSearchesBlockParent() {
  if (searchesBlock.parentNode != getNode("nav")) {
    insertSearchesBlock();
  }
  
  window.setTimeout(checkSearchesBlockParent, 200);
}

function restorePersistentSearches() {
  var serializedSearches = getCookie(SEARCHES_COOKIE).split("|");
  
  for (var i=0; i < serializedSearches.length; i++) {
    var search = PersistentSearch.prototype.fromString(serializedSearches[i]);
    
    if (search.type == PersistentSearch.RECENT_TYPE) {
      addRecentSearch(search);
    } else {
      addPersistentSearch(search);
    }
  }
}

function saveSearches() {
  var serializedSearches = new Array();
  
  for (var i=0; i < searches.length; i++) {
    serializedSearches.push(searches[i].toString());
  }
  for (var i=0; i < recentSearches.length; i++) {
    serializedSearches.push(recentSearches[i].toString());
  }
  
  setCookie(SEARCHES_COOKIE, serializedSearches.join("|"));
}

function clearPersistentSearches() {
  for (var i=0; i < searches.length; i++) {
    var item = searches[i].getListItem();
    if (item.parentNode) {
      item.parentNode.removeChild(item);
    }
  }
  searches = new Array();
}

function addPersistentSearch(search) {
  searches.push(search);  
  
  searchesBlockList.appendChild(search.getListItem());
  searchesBlockList.style.display = "block";
  
  saveSearches();
}

function removeRecentSearch(search) {
  var removedSearchItem = search.getListItem();
  if (removedSearchItem.parentNode) {
    removedSearchItem.parentNode.removeChild(removedSearchItem);
  }    
}

function addRecentSearch(search) {
  while (recentSearches.length >= GM_getValue(RECENT_NUM)) {
    removeRecentSearch(recentSearches.shift());
  }
  recentSearches.push(search);  
  
  recentSearchesBlockList.appendChild(search.getListItem());
  recentSearchesBlockList.style.display = "block";
  saveSearches();
}

function limitRecentSearch() {
  while (recentSearches.length > GM_getValue(RECENT_NUM)) {
    removeRecentSearch(recentSearches.shift());
  }
}

function editPersistentSearches(event) {
  var container = getNode("co");
  
  hiddenNodes = new Array();
  
  for (var i = container.firstChild; i; i = i.nextSibling) {
    hiddenNodes.push(i);
    i.style.display = "none";
  }
  
  searchesContainer = newNode("div");
  searchesContainer.className = "searchesContainer";
  searchesContainer.innerHTML += "<b>Persistent Searches</b>";
  
  container.appendChild(searchesContainer);

  var innerContainer = newNode("div");
  innerContainer.className = "innerContainer";
  innerContainer.innerHTML += 
    '<p>Use <a href="http://c4.corp.google.com/support/bin/answer.py?answer=7190" target="_blank">operators</a> ' +
    'to specify queries. <code>today</code>, <code>yesterday</code> and <code>oneweekago</code> ' +
    'are also supported as values for the <code>before:</code> and <code>after:</code> ' +
    'operators. ' +
    'Prefix your search query with <code>++</code> ' +
    'to make a search that will ADD your query to the current query. ' +
    'Delete an item\'s query to remove it.</p>';
  searchesContainer.appendChild(innerContainer);
  
  searchesList = newNode("table");
  searchesList.className = "searchesList";
  innerContainer.appendChild(searchesList);
  
  var headerRow = newNode("tr");
  searchesList.appendChild(headerRow);
  headerRow.appendChild(newNode("th")).appendChild(newText("Label"));
  headerRow.appendChild(newNode("th")).appendChild(newText("Query"));
  
  for (var i=0; i < searches.length; i++) {
    if (searches[i].type != PersistentSearch.SAVED_TYPE) {
      continue;
    }
    
    searchesList.appendChild(searches[i].getEditItem(i));
    
    var dividerRow = newNode("tr");
    var dividerCell = dividerRow.appendChild(newNode("td"));
    dividerCell.className = "divider";
    dividerCell.colSpan = 3;
    searchesList.appendChild(dividerRow);
  }
  
  var newSearch = new PersistentSearch("", "");
  var newRow = newNode("tr");
  var newCell = newRow.appendChild(newNode("td"));
  newCell.colSpan = 3;
  newCell.appendChild(newText("Create a new persistent search:"));

  searchesList.appendChild(newRow);
  searchesList.appendChild(newSearch.getEditItem(-1));

  var dividerRow = newNode("tr");
  var dividerCell = dividerRow.appendChild(newNode("td"));
  dividerCell.className = "divider";
  dividerCell.colSpan = 3;
  searchesList.appendChild(dividerRow);
  
  // and give them a choice of positioning
  var newRow = newNode("tr");
  var newCell = newRow.appendChild(newNode("td"));
  newCell.colSpan = 3;
  newCell.appendChild(newText("Seaches Position:"));
  newCell.appendChild(newRadioButton("pos", "nb_2", "Top"));
  newCell.appendChild(newRadioButton("pos", "nb_0", "Under Contacts"));
  newCell.appendChild(newRadioButton("pos", "nb_1", "Under Labels"));
  
  searchesList.appendChild(newRow);

  var newRow = newNode("tr");
  var newCell = newRow.appendChild(newNode("td"));
  newCell.colSpan = 3;
  newCell.appendChild(newText("Recent Searches: Position"));
  newCell.appendChild(newRadioButton("recentpos", "top", "Above"));
  newCell.appendChild(newRadioButton("recentpos", "bottom", "Below"));
  newCell.appendChild(newText(" - Number "));
  var num = newCell.appendChild(newNode("input"));
  num.type = "text";
  num.name = "numrecent";
  num.value = GM_getValue(RECENT_NUM);
  num.size = 3;
  num.addEventListener("change", function() { 
    GM_setValue(RECENT_NUM + NEW_VALUE, num.value);
  }, false);
  
  searchesList.appendChild(newRow);

  var buttonContainer = newNode("div");
  buttonContainer.className = "buttonContainer";
  var cancelButton = newNode("button");
  cancelButton.appendChild(newText("Cancel"));
  cancelButton.className = "cancelButton";
  cancelButton.addEventListener("click", cancelEditPersistentSearches, false);
  buttonContainer.appendChild(cancelButton);

  var saveButton = newNode("button");
  saveButton.appendChild(newText("Save Changes"));
  saveButton.className = "saveButton";
  saveButton.addEventListener("click", saveEditPersistentSeaches, false);
  
  buttonContainer.appendChild(saveButton);
  innerContainer.appendChild(buttonContainer);
  
  // Make clicks outside the edit area hide it  
  getNode("nav").addEventListener("click", cancelEditPersistentSearches, false);
  
  // Since we're in a child of the "nav" element, the above handler will get
  // triggered immediately unless we stop this event from propagating
  event.stopPropagation();
   
  return false;
}

function newRadioButton(name, value, label) {
  var span = newNode("span");
  var lab = span.appendChild(newNode("label"));
  var rb1 = lab.appendChild(newNode("input"));
  rb1.type = "radio";
  rb1.name = name;
  rb1.value = value;
  rb1.addEventListener("click", function() { 
    GM_setValue(KEY_PREFIX + name + NEW_VALUE, value); 
  }, false);
  if (GM_getValue(KEY_PREFIX + name, null) == value) {
    rb1.checked = true;
  }
  lab.appendChild(newText(label));
  return span;
}
                      
function cancelEditPersistentSearches() {
  searchesContainer.parentNode.removeChild(searchesContainer);
  searchesContainer = null;
  
  for (var i=0; i < hiddenNodes.length; i++) {
    hiddenNodes[i].style.display = "";
  }
  getNode("nav").removeEventListener("click", 
                                     cancelEditPersistentSearches, 
                                     false);
  
  return true;
}

function saveEditPersistentSeaches() {
  clearPersistentSearches();

  for (var row = searchesList.firstChild; row; row = row.nextSibling) {
    var cells = row.getElementsByTagName("td");
    if (cells.length != 2 && cells.length != 3) {
      continue;
    }
    var label = cells[0].getElementsByTagName("input")[0].value;
    var query = cells[1].getElementsByTagName("input")[0].value;
    
    if (label && query) {
      var search = new PersistentSearch(query, label);
      
      addPersistentSearch(search);
    }
  }
  saveSearches();

  // cancelling just hides everything, which is what we want to do
  cancelEditPersistentSearches();

  // now move the searches box if we need to...
  var newpos = GM_getValue(POSITION + NEW_VALUE);
  if (newpos && GM_getValue(POSITION) != newpos) {
    GM_setValue(POSITION, newpos);
    searchesBlock.parentNode.removeChild(searchesBlock);
    insertSearchesBlock();
  }

  var newpos = GM_getValue(RECENT_NUM + NEW_VALUE);
  if (newpos && GM_getValue(RECENT_NUM) != newpos) {
    GM_setValue(RECENT_NUM, newpos);
    limitRecentSearch();
  }

  var newpos = GM_getValue(RECENT_POS + NEW_VALUE);
  if (newpos && GM_getValue(RECENT_POS) != newpos) {
    GM_setValue(RECENT_POS, newpos);
    rearrangeSeachesBlock();
  }
}

function moveEditPersistentSearch(oldindex, newindex) {
  var oldrow;
  var newrow;
  var idx = 0;
  for (var row = searchesList.firstChild; row; row = row.nextSibling) {
    var cells = row.getElementsByTagName("td");
    if (cells.length != 3) {
      continue;
    }
    if (idx == oldindex) {
      oldrow = cells;
    }
    if (idx == newindex) {
      newrow = cells;
    }
    idx++;
  }
  if (oldrow && newrow) {
    swapValues(oldrow[0].getElementsByTagName("input")[0],
               newrow[0].getElementsByTagName("input")[0]);
    swapValues(oldrow[1].getElementsByTagName("input")[0],
               newrow[1].getElementsByTagName("input")[0]);
  }
}

function swapValues(oldtag, newtag) {
  var tmp = oldtag.value;
  oldtag.value = newtag.value;
  newtag.value = tmp;
}

function togglePersistentSearches() {
  if (searchesBlockList.style.display == "none") {
     searchesBlockList.style.display = "block";
     recentSearchesBlockList.style.display = "block";
     editLink.style.display = "";
     searchesBlockHeader.triangleImage.src = "/mail/images/opentriangle.gif";
     setCookie(SEARCHES_COLLAPSED_COOKIE, "0");
  } else {
     searchesBlockList.style.display = "none";
     recentSearchesBlockList.style.display = "none";
     editLink.style.display = "none";
     searchesBlockHeader.triangleImage.src = "/mail/images/triangle.gif";
     setCookie(SEARCHES_COLLAPSED_COOKIE, "1");
  }
  
  return false;
}

function PersistentSearch(query, label, type) {  
  this.query = query;
  this.label = label;
  this.type = type || PersistentSearch.SAVED_TYPE;
  
  this.totalResults = -1;
  this.unreadResults = -1;

  this.listItem = null;
  this.editItem = null;
}

PersistentSearch.SAVED_TYPE = 0;
PersistentSearch.RECENT_TYPE = 1;

PersistentSearch.prototype.toString = function() {
  var serialized = new Array();
 
  for (var property in this) {
    if (typeof(this[property]) != "function" &&
        typeof(this[property]) != "object") {
      serialized.push(property + "=" + this[property]);
    }
  }
 
  return encodeURIComponent(serialized.join("&"));
}

PersistentSearch.prototype.fromString = function(serialized) {
  var properties = decodeURIComponent(serialized).split("&");
    
  var search = new PersistentSearch("", "");
  
  for (var i=0; i < properties.length; i++) {
    var keyValue = properties[i].split("=");
    
    search[keyValue[0]] = keyValue[1];
  }
  
  return search;
}

PersistentSearch.prototype.equals = function(search) {
  return this.getRunnableQuery() == search.getRunnableQuery();
}

PersistentSearch.prototype.getListItem = function() {
  if (!this.listItem) {
    this.listItem = newNode("div");
    this.listItem.className = "lk cs listItem";
    this.listItem.appendChild(newText(this.label));
    this.listItem.addEventListener("click", 
                                   getObjectMethodClosure(this, "execute"),
                                   false);
  }
  
  return this.listItem;
}

PersistentSearch.prototype.getEditItem = function(pos) {
  if (!this.editItem) {
    this.editItem = newNode("tr");
    this.editItem.className = "editItem";

    var labelCell = newNode("td");
    labelCell.className = "labelCell";
    var labelInput = newNode("input");
    labelInput.value = this.label;
    labelCell.appendChild(labelInput);
    this.editItem.appendChild(labelCell);
    
    var editCell = newNode("td");
    editCell.className = "editCell";
    var queryInput = newNode("input");
    queryInput.value = this.getEditableQuery();
    editCell.appendChild(queryInput);
    this.editItem.appendChild(editCell);    

    if (pos != -1) {
      var mvCell = newNode("td");
      mvCell.className = "mvCell";
      if (pos != 0) {
        var upButton = newNode("img");
        upButton.src = UP_TRIANGLE_IMAGE
        upButton.height = 11;
        upButton.height = 11;
        upButton.addEventListener("click", 
                                  function() { 
                                    moveEditPersistentSearch(pos, pos - 1);
                                  },
                                  false);
        mvCell.appendChild(upButton);
      }
      if (pos != searches.length -1) {
        var downButton = newNode("img");
        downButton.src = "/mail/images/opentriangle.gif";
        downButton.height = 11;
        downButton.height = 11;
        downButton.addEventListener("click", 
                                  function() { 
                                    moveEditPersistentSearch(pos, pos + 1);
                                  },
                                  false);
        mvCell.appendChild(downButton);
      }
      this.editItem.appendChild(mvCell);    
    }
  }
  
  return this.editItem;
}

// Does this search represent a modifier and not a real search
// modifiers just add to the current search string
PersistentSearch.prototype.isSearchModifier = function() {
  return this.query.substring(0,2) == "++";
}

PersistentSearch.prototype.execute = function() {
  var searchForm = getNode("s");
  var queryInput = null;
  var inputs = searchForm.getElementsByTagName("input");
  for (var i=0; i < inputs.length; i++) {
    if (inputs[i].name == "q") {
      queryInput = inputs[i];
    }
  }
  if (this.isSearchModifier()) {
    queryInput.value = queryInput.value + " " + this.getRunnableQuery();
  } else {
    queryInput.value = this.getRunnableQuery();
  }
  searchForm.onsubmit();
}

PersistentSearch.prototype.getRunnableQuery = function() {
  var query = this.query;
  
  if (this.isSearchModifier()) {
    query = query.substring(2);
  }

  var today = new Date();
  var yesterday = new Date(today.getTime() - ONE_DAY);  
  var oneWeekAgo = new Date(today.getTime() - 7 * ONE_DAY);
  
  query = query.replace(/:today/g, ":" + getDateString(today));  
  query = query.replace(/:yesterday/g, ":" + getDateString(yesterday));
  query = query.replace(/:oneweekago/g, ":" + getDateString(oneWeekAgo));
  
  return query;
} 

PersistentSearch.prototype.getEditableQuery = function() {
  return this.query;
}

function initializeStyles() {
  var styleNode = newNode("style");
  
  document.body.appendChild(styleNode);

  styleSheet = document.styleSheets[document.styleSheets.length - 1];

  for (var i=0; i < RULES.length; i++) {
    styleSheet.insertRule(RULES[i], 0);
  }  
}

initializeStyles();
initializePersistentSearches();