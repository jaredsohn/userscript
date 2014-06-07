// ==UserScript==
// @name          Google.de Scholar Monitor
// @namespace     http://knbknb.greasemonkey.org
// @description   Make your own scholar searches persistent
// @include       http://scholar.google.*/
// @include       http://scholar.google.*/scholar?*

// ==/UserScript==
// Google.de Scholar Monitor
//
// international Users: you can adapt this script to your language, see SCHOLAR_* declarations below
//
// Original Authors: Mihai Parparita <mihai@persistent.info>, Sung Kim <hunkim@cs.ucsc.edu>
// Author: Knut Behrends
// Added different type of event listeners; fixed minor typos. Now it works again...for me, at least!
// License: a Creative Commons, http://creativecommons.org/licenses/by-sa/2.0/
// $Id: googlescholarmonitor.user.js 80 2007-04-10 10:10:12Z knut $

//(function() {

    //international users: you can adapt these 
    var SCHOLAR_URL = "http://scholar.google.de/scholar?";
    var SCHOLAR_QUERY_STRING = "hl=de&q=";
    var SCHOLAR_RESULTS_INDICATOR = 'Results|Ergebnisse';


// Utility functions
function getObjectMethodClosure(object, method) {
  return function() {
    return object[method](); 
  };
}

function getObjectMethodClosure1(object, method) {
  return function(arg) {
    return object[method](arg); 
  };
}

function getObjectMethodClosure2(object, method) {
  return function(arg) {
    return object[method](arg)[0]; 
  };
}

function getDateString(date) {
  return date.getFullYear() + "/" +
         (date.getMonth() + 1) + "/" +
         date.getDate();
}

function getCookie(name) {
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value !== null) ? unescape(value[1]) : null;
}

function setCookie(name, value) {
  var today = new Date();
  // plus 28 years
  var expiry = new Date(today.getTime() + 28 * 365.24 * 24 * 60 * 60 * 1000);   
  
  document.cookie = name + "=" + escape(value) +
            "; expires=" + expiry.toGMTString() +
            "; path=/";
}

// Shorthand
var newNode = getObjectMethodClosure1(document, "createElement");
var newText = getObjectMethodClosure1(document, "createTextNode");
var getNode = getObjectMethodClosure1(document, "getElementById");
var getTag = getObjectMethodClosure1(document, "getElementsByTagName");

// Constants    
    var MONOSPACE_RULE = ".mb {font-family: monospace !important;}";
    var NORMAL_RULE = ".mb {}";

    var MESSAGE_BODY_FONT_RULE_INDEX = 0;

    var RULES = new Array(
  // Block in sidebar
  ".searchesBlock {-moz-border-radius: 5px; background: #dcf6db; margin: 10px 7px 0 0; padding: 3px;}",
  ".refreshButton {display: block; cursor: pointer; float: right; margin-top: -2px;}",
  ".searchesBlockList {background: #cdac11;}",
  ".listItem {color: #111199; font-size: 90%; text-decoration: underline; cursor: pointer}",
  ".editLink {text-align: right; color: #ca5c22; padding: 2px 5px 5px 0; font-size: 80%; text-decoration: underline; cursor: pointer}",
  
  // Edit page
  ".searchesContainer {-moz-border-radius: 10px; background: #fad163; padding: 10px;}",
  ".innerContainer {background: #fff7d7; text-align: center; padding: 10px;}",
  ".searchesList {width: 100%;}",
  ".searchesList th {text-align: left; font-size: 90%;}",
  ".searchesList td {padding: 10px 0 10px 0; vertical-align: bottom;}",
  ".searchesList td.divider {background: #fad163; height: 3px; padding: 0;}",
  ".editItem {font-size: 80%; }",
  ".labelCell {width: 210px;}",
  ".labelCell input {width: 200px;}",
  ".cancelButton {margin-right: 5px;}",
  ".editCell {}",
  ".editCell input {width: 100%}",
  ".saveButton {margin-left: 5px; font-weight: bold;}"
);

    var TOGGLE_FONT_IMAGE = "data:image/gif;base64,R0lGODlhEAAQAIABAAAAzP%2F%2" +
   "F%2FyH5BAEAAAEALAAAAAAQABAAAAImjI%2BJwO28wIGG1rjUlFrZvoHJVz0SGXBqymXphU5" +
   "Y17Kg%2BnixKBYAOw%3D%3D";
   
    var REFRESH_IMAGE = "data:image/gif;base64,R0lGODlhDQAPANU5AM%2BtUs6sUunDX" +
    "PfPYt65WK%2BTRaiMQvXNYfDJX9m1VtSxVIBrM7GURsKiTZqBPeS%2FWo94OZmAPebBW6WK" +
    "QbiaSdOwU35qMpV9O4t0N4NuNI12OIFsM9u3V7mbSaaLQtazVcyqUZ6EP%2BC7WX1oMbudS" +
    "semT62QRPjPYuvFXXtmMbSXR%2BK9WohyNvLKYOfBXPPLYJB4Ob6fS5R8O%2B3GXqGGQK%2" +
    "BSRauPROG9WW5cK%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADkALAAAAAANA" +
    "A8AAAZvwJxwSMzdiKcAg8YIDEyG4QPjABAUhgUuInQtAsQaDqcRwj7EUmY8yiUuReJtQInF" +
    "h5JEAXQX3mwzD305FSRGBAN3Eys5HWM4LAdDIiFCCmMbAkMcMghCBDgpEAUNKg4eL0MoFgI" +
    "tAA0AnkQHmoNBADs%3D";

    var TRIANGLE_IMAGE = "data:image/gif;base64," + 
    "R0lGODlhCwALAPEAAP///wAAAA4ODv///yH5BAEAAAAALAAAAAALAAsAAAJFBIgQIECAAAEm" +
    "BAgQIECECQECBAgwYUKAAAEiTJgQIECACRMmBAgQYcKEAAECVJgQIECACBMCBAgQYEKAAAEC" +
    "RAgQIEAUADs="; 
    
    var OPEN_TRIANGLE_IMAGE = "data:image/gif;base64,"+
    "R0lGODlhCwALAKEAAP///wAAAA4ODv///yH5BAEAAAAALAAAAAALAAsAAAIShI+pm+HiogOy" +
    "njqRVZFRDzIFADs=";
    
    var RESULT_SIZE_RE = new RegExp("(?:" + SCHOLAR_RESULTS_INDICATOR + ")\\D+(\\d+)\\D+(\\d+)\\D+([0-9,]+)");

    var DEFAULT_SEARCHES = {
  "author:knuth Art": "Donald E. Knuth",
  "Malaria  year:2007": "Malaria 2007",
  "author:Weizenbaum artificial intelligence": "AI Weizenbaum"   
};

    var SEARCHES_COOKIE = "ScholarPersistentSearches";
    var SEARCHES_TOGGLE_COOKIE = "ScholarPersistentSearchesToggle";

    var ONE_DAY = 24 * 60 * 60 * 1000;
    var ONE_HOUR = 60 * 60 * 1000;

// Globals
var mbStyleSheet = null;
var currentRule = NORMAL_RULE;

// To check previous items
var oldSearches;
var searches = new Array();
var searchesBlock = null;
var searchesBlockHeader = null;
var searchesBlockList = null;
var editLink = null;

var hiddenNodes = null;
var searchesContainer = null;
var searchesList = null;

function initializePersistentSearches() {
	//delete old blocks we inserted previously
	/* 
	var ns1 = gm_xpath("nb_1");
    var len = ns1.snapshotLength;
    if (len > 0 ){
	    for(var i = 0; i < len; i++){
	      delete ns1.snapshotItem(i);
	    }
    } */
    
  // FIXME: Do we need any other condition to check?
  searchesBlock = newNode("div");
  searchesBlock.id = "nb_1";
  searchesBlock.className = "searchesBlock";

  // header  
  searchesBlockHeader = newNode("div");
  searchesBlockHeader.className = "s_h";
  searchesBlock.appendChild(searchesBlockHeader);
  
  var refreshButton = newNode("img");
  refreshButton.src = REFRESH_IMAGE;
  refreshButton.className = "refreshButton";
  refreshButton.height = 13;
  refreshButton.height = 15;
  refreshButton.addEventListener("click", refreshPersistentSearches, true);
  searchesBlockHeader.appendChild(refreshButton);
  
  searchesBlockHeader.triangleImage = newNode("img");
  searchesBlockHeader.triangleImage.src = OPEN_TRIANGLE_IMAGE;
  searchesBlockHeader.triangleImage.width = 11;
  searchesBlockHeader.triangleImage.height = 11;
//  searchesBlockHeader.triangleImage.onclick = togglePersistentSearches;
  searchesBlockHeader.triangleImage.addEventListener("click",togglePersistentSearches, true);
  searchesBlockHeader.appendChild(searchesBlockHeader.triangleImage);
  
  var searchesText = newNode("span");
  searchesText.appendChild(newText(" Scholar Monitor "));
//  searchesText.onclick = togglePersistentSearches;
  searchesText.addEventListener("click" , togglePersistentSearches, true);
  searchesBlockHeader.appendChild(searchesText);
  
  // searches list
  searchesBlockList = newNode("div");
  searchesBlockList.className = "searchesBlockList";
  searchesBlock.appendChild(searchesBlockList);
  
  editLink = newNode("div");
  editLink.appendChild(newText("Edit monitor items"));
  editLink.className = "editLink";
//  editLink.onclick = editPersistentSearches;
  editLink.addEventListener("click", editPersistentSearches, false);
  searchesBlockList.appendChild(editLink);

  // Check if the box is closed
  var toggleStatus = getCookie(SEARCHES_TOGGLE_COOKIE);
  
  if (toggleStatus=="closed") {
    searchesBlockList.style.display = "none";
    searchesBlockHeader.triangleImage.src = TRIANGLE_IMAGE;
  }
  
  // Check Moniroting Item
  if (getCookie(SEARCHES_COOKIE)) {
    restorePersistentSearches();
  } else {
    for (var query in DEFAULT_SEARCHES) {
      addPersistentSearch(new PersistentSearch(query, DEFAULT_SEARCHES[query]));
    }
  }

  
  // FIXME: Find the right place to add the monitor box?
  var body = document.getElementsByTagName('table')[2];
  
  // Not many table, probably the first page
  if (!body) {
    body = document.getElementsByTagName('table')[0];
  }
  
  body.appendChild(searchesBlock);  
}

function refreshPersistentSearches() {
  for (var i=0; i < searches.length; i++) {
    searches[i].getResultSize(true); 
  }
  
  return false;
}


function restorePersistentSearches() {
  var serializedSearches = getCookie(SEARCHES_COOKIE).split("|");
  
  for (var i=0; i < serializedSearches.length; i++) {
    var search = PersistentSearch.prototype.fromString(serializedSearches[i]);
    
    addPersistentSearch(search);
  }
}

function savePersistentSearches() {
  var serializedSearches = new Array();
  
  for (var i=0; i < searches.length; i++) {
    serializedSearches.push(searches[i].toString());
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
  
  oldSearches = searches;
  searches = new Array();
}

function addPersistentSearch(search) {
  searches.push(search);  
  searchesBlockList.insertBefore(search.getListItem(), editLink);
  
  savePersistentSearches();
}

function editPersistentSearches(event) {
  var container = getNode("nb_1");
  
  hiddenNodes = new Array();
  
  for (var i = container.firstChild; i; i = i.nextSibling) {
    hiddenNodes.push(i);
    i.style.display = "none";
  }
  
  searchesContainer = newNode("div");
  searchesContainer.className = "searchesContainer";
  searchesContainer.innerHTML += "<b>Scholar Monitor Items </b>";
  
  container.appendChild(searchesContainer);

  var innerContainer = newNode("div");
  innerContainer.className = "innerContainer";
  innerContainer.innerHTML += 
    '<p>Read <a href="http://scholar.google.de/intl/de/scholar/refinesearch.html#Tips">Scholar Search Tips</a>, or Use <a href="http://www.googleguide.com/advanced_operators_reference.html" target="_blank">operators</a> ' +
    'to specify queries. Delete an item\'s query to remove it.</p>';
  searchesContainer.appendChild(innerContainer);
  
  searchesList = newNode("table");
  searchesList.className = "searchesList";
  innerContainer.appendChild(searchesList);
  
  var headerRow = newNode("tr");
  searchesList.appendChild(headerRow);
  headerRow.appendChild(newNode("th")).appendChild(newText("Label"));
  headerRow.appendChild(newNode("th")).appendChild(newText("Query"));
  
  for (var i=0; i < searches.length; i++) {
    searchesList.appendChild(searches[i].getEditItem());
    
    var dividerRow = newNode("tr");
    var dividerCell = dividerRow.appendChild(newNode("td"));
    dividerCell.className = "divider";
    dividerCell.colSpan = 3;
    
    searchesList.appendChild(dividerRow);
  }
  
  var newSearch = new PersistentSearch("", "");
  var newItem = newSearch.getEditItem();
  newItem.firstChild.innerHTML =     "<h4>Create a new monitor item:</h4>" +
    newItem.firstChild.innerHTML;

  searchesList.appendChild(newItem);
  
  var cancelButton = newNode("button");
  cancelButton.appendChild(newText("Cancel"));
  cancelButton.className = "cancelButton";
//  cancelButton.onclick = cancelEditPersistentSearches;
  cancelButton.addEventListener("click", cancelEditPersistentSearches ,true);
  innerContainer.appendChild(cancelButton);

  var saveButton = newNode("button");
  saveButton.appendChild(newText("Save Changes"));
  saveButton.className = "saveButton";
//  saveButton.onclick = saveEditPersistentSeaches;
  saveButton.addEventListener("click",saveEditPersistentSeaches ,true);
  innerContainer.appendChild(saveButton);
  
  // Make clicks outside the edit area hide it  
//  getNode("nav").onclick = cancelEditPersistentSearches;
  getNode("nav").addEventListener("click", cancelEditPersistentSearches ,true);
  // Since we're in a child of the "nav" element, the above handler will get
  // triggered immediately unless we stop this event from propagating
  event.stopPropagation();
   
  return false;
}

function cancelEditPersistentSearches() {
  searchesContainer.parentNode.removeChild(searchesContainer);
  searchesContainer = null;
  
  for (var i=0; i < hiddenNodes.length; i++) {
    hiddenNodes[i].style.display = "";
  }
  getNode("nav").removeEventListener("click");;
  
  return true;
}

// Find old search item using label and query
function findOldSearches(label, query) {
  for (var i=0; i < oldSearches.length; i++) {
    if (oldSearches[i].label == label && 
      oldSearches[i].query == query) {
        return oldSearches[i];
      }
  }
  return null;
}

// Save new items
// It resets all existing items
function saveEditPersistentSeaches() {
  clearPersistentSearches();

  for (var row = searchesList.firstChild; row; row = row.nextSibling) {
    var cells = row.getElementsByTagName("td");
    if (cells.length != 2) {
      continue;
    }
    var label = cells[0].getElementsByTagName("input")[0].value;
    var query = cells[1].getElementsByTagName("input")[0].value;
    
    if (label && query) {
      var search = findOldSearches(label, query);
      
      // Not found
      if (search==null) { 
        search = new PersistentSearch(query, label);
      }
      
      addPersistentSearch(search);
    }
  }

  // cancelling just hides everything, which is what we want to do
  cancelEditPersistentSearches();
}

function togglePersistentSearches() {
  if (searchesBlockList.style.display == "none") {
     searchesBlockList.style.display = "";
     searchesBlockHeader.triangleImage.src = OPEN_TRIANGLE_IMAGE;
     setCookie(SEARCHES_TOGGLE_COOKIE, "opened");
  } else {
    searchesBlockList.style.display = "none";
    searchesBlockHeader.triangleImage.src = TRIANGLE_IMAGE;
    setCookie(SEARCHES_TOGGLE_COOKIE, "closed");
  }
  
  return false;
}


function PersistentSearch(query, label) {  
  this.query = query;
  this.label = label;
  
  this.totalResults = -1;
  this.oldResults = -1;
  this.newSetDate = -1;
  this.setDate = -1;
 
  this.listItem = null;
  this.editItem = null;
  this.resultSizeItem = null;
}


// Used to save function or object to Cookie String
PersistentSearch.prototype.toString = function() {
  var serialized = new Array();
 
  for (var property in this) {
    if (typeof(this[property]) != "function" &&
        typeof(this[property]) != "object") {
      serialized.push(property + "=" + this[property]);
    }
  }
 
  return serialized.join("&");
};

PersistentSearch.prototype.fromString = function(serialized) {
  var properties = serialized.split("&");
    
  var search = new PersistentSearch("", "");
  
  for (var i=0; i < properties.length; i++) {
    var keyValue = properties[i].split("=");
    
    search[keyValue[0]] = keyValue[1];
  }
  
  return search;
};

PersistentSearch.prototype.getListItem = function() {
  if (!this.listItem) {
    this.listItem = newNode("div");
    this.listItem.className = "listItem";
    this.listItem.appendChild(newText(this.label));
    this.resultSizeItem = newNode("span");
    this.listItem.appendChild(this.resultSizeItem);
    this.getResultSize(false);
    this.listItem.addEventListener("click", getObjectMethodClosure(this, "execute") ,true);
  }
  
  return this.listItem;
};

PersistentSearch.prototype.getEditItem = function() {
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
  }
  
  return this.editItem;
};

// Monitor item link
PersistentSearch.prototype.execute = function() {
  var queryUrl = SCHOLAR_QUERY_STRING + escape(this.query);
  window.location = SCHOLAR_URL + queryUrl;
};

PersistentSearch.prototype.getRunnableQuery = function() {
  var query = this.query;  
  var today = new Date(); 
  query = query.replace(/:thisyear/g, ":" + today.getYear()); 
  return query;
};

PersistentSearch.prototype.getEditableQuery = function() {
  return this.query;
};

PersistentSearch.prototype.getResultSize = function(needsRefresh) {
  // Refresh data if it's a new item or older than a day
  if (this.totalResults == -1 || this.oldResults == -1 || 
            this.setDate < new Date()- ONE_DAY) {
    needsRefresh = true;    
  } else {
    this.updateResultSizeItem();
  }
  
  if (needsRefresh) {
    this.resultSizeItem.style.display = "none";
    this.runQuery(this.getRunnableQuery(),
                  getObjectMethodClosure1(this, "updateResultSize"));
  }
};

PersistentSearch.prototype.runQuery = function(query, continuationFunction) {
  var queryUrl = SCHOLAR_URL +  SCHOLAR_QUERY_STRING + escape(query);

  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      var match = RESULT_SIZE_RE.exec(request.responseText);
      
      if (match) {
        var resultSize = match[3];
        continuationFunction(resultSize);          
      } else {
        continuationFunction(-1);             
      }
    }
  }
  
  request.open("GET", queryUrl, true);
  request.send(null);
}

PersistentSearch.prototype.updateResultSize = function(totalResults) {
  this.totalResults = totalResults;
  
  // Update Resuls. It will set oldResult and setNewDate
  this.updateResultSizeItem();
  
  // Save Result
  savePersistentSearches();
};

PersistentSearch.prototype.updateResultSizeItem = function() {
  if (this.resultSizeItem) {
    // Clear existing contents
    var child;
    
    this.resultSizeItem.style.display = "";
    
    while (child = this.resultSizeItem.firstChild) {
      this.resultSizeItem.removeChild(child);
    }
    
    // Update with new values
    this.resultSizeItem.appendChild(newText(" ("));
    
    
    // oldResults is used for old Count
    // If oldCount is different from new onw, bold   
    var today = new Date().getTime(); 
    if (this.oldResults != this.totalResults) {
      this.newSetDate = today;
      // Syncronize
      this.oldResults = this.totalResults;
    }    
    
    // Set date
    this.setDate = today;
    
    var isNew = this.newSetDate  > today - ONE_HOUR;   
       
    var resultCount;
    if (isNew) {      
      resultCount = newNode("b");
    } else {
      resultCount = newNode("span");
    }     
    resultCount.appendChild(newText(this.totalResults));
    this.resultSizeItem.appendChild(resultCount);
    this.resultSizeItem.appendChild(newText(")"));
    
    if (isNew) {
      var newMark = newNode("sup");
      newMark.innerHTML = "<font color=red>New!</font>";
      this.resultSizeItem.appendChild(newMark);
    }      
  }
};

function initializeStyles() {
  var styleNode = newNode("style");

  document.body.appendChild(styleNode);  
  styleSheet = document.styleSheets[document.styleSheets.length - 1];

  for (var i=0; i < RULES.length; i++) {
    styleSheet.insertRule(RULES[i], 0);
  }
  styleSheet.insertRule(NORMAL_RULE, MESSAGE_BODY_FONT_RULE_INDEX);    
}

function gm_xpath(expression){
   //return document.evaluate(expression,contextNode,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   return document.evaluate(expression,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
}
// "Main Program"
initializeStyles();
initializePersistentSearches();

//})();
