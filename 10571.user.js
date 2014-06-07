// ==UserScript==
// @name          Power Gmail Tweaks
// @namespace     http://norman.rasmussen.co.za/powergmailtweaks
// @description   Adds cross-computer persistent seaches (stored in a contact) and a fixed font size button (has support for Google Apps)
// @include       http://mail.google.tld/mail/*
// @include       https://mail.google.tld/mail/*
// @include       http://mail.google.tld/a/*
// @include       https://mail.google.tld/a/*
// @exclude       http://mail.google.tld/support/*
// @exclude       https://mail.google.tld/support/*
// ==/UserScript==

(function() {

const CONTACT_NAME = "zzqqzzqqzzqqzzqqzzqqzzqqzzqqzzqqzzqqzzqq";
const CONTACT_ID_RE = /\["\w+","(\w+)","zzqqzzqqzzqqzzqqzzqqzzqqzzqqzzqqzzqqzzqq","zzqqzzqqzzqqzzqqzzqqzzqqzzqqzzqqzzqqzzqq",/;
const CONTACT_NOTE_RE = /\["\w+","\w+","zzqqzzqqzzqqzzqqzzqqzzqqzzqqzzqqzzqqzzqq","zzqqzzqqzzqqzzqqzzqqzzqqzzqqzzqqzzqqzzqq","[^"]+","[^"]+",\[\]\n,\["n","([^"]+)"\]/;

function getCookie(name) {
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}

function getSid() {
  var baseUrl = getBaseUrl();
  if (baseUrl.slice(0,6) == '/mail/')
  {
    var gmailsid = getCookie("GX");
  }
  else if (baseUrl.slice(0,3) == '/a/')
  {
    var gmailsid = getCookie("GXAS");
	var domain = baseUrl.slice(3,-1);
    var re = new RegExp(domain + "=([^;]+)");
    var value = re.exec(gmailsid);
    gmailsid = (value != null) ? value[1] : null;
  }
  else
  {
    alert("Unknown baseurl: " + baseUrl);
	return "powergmailtweak";
  }
  // too long, let's shorten it
  var wanted_size = 32;
  var sid = "";
  var chunk = 0;
  for (var i=0; i < gmailsid.length; i++) {
    chunk += gmailsid.charCodeAt(i);
    if ((i+1) % Math.ceil(gmailsid.length / wanted_size) == 0) {
      if (i % 2 == 0) {
        sid += String.fromCharCode((chunk % 26) + 65);
      }
      else {
        sid += String.fromCharCode((chunk % 26) + 97);
      }
    }
  }
  return (sid != "") ? sid : "powergmailtweak";
}
                                                                                
function setCookie(name, value) {
  var today = new Date();
  // plus 3 minutes
  var expiry = new Date(today.getTime() + 3 * 60 * 1000);
                                                                                
  document.cookie = name + "=" + escape(value) +
            "; expires=" + expiry.toGMTString() +
            "; path=/";
}


function getGmailCookie(name) {
  //var gmailUid = getCookie("GMAIL_AT");
  var gmailUid = getSid();
  var gmailData = unescape(getCookie(gmailUid));

  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(gmailData);
  return (gmailUid != null && gmailData != null && value != null) ? unescape(value[1]) : null;
}

function setGmailCookie(name, value) {
  //var gmailUid = getCookie("GMAIL_AT");
  var gmailUid = getSid();
  var gmailData = unescape(getCookie(gmailUid));
  var gmailCookieData = getGmailCookie(name);
  var contactID = getGmailCookie("contact_id");
  // nothing to do if old and new value are the same
  if (gmailCookieData == value) { return; }
  name = name + "=";
  if (gmailCookieData != null) {
    var newData = gmailData.replace(name + gmailCookieData + ";", name + value + ";");
    setCookie(gmailUid, newData);
    editContact(contactID, escape(newData), null);
  }
  else {
    if (gmailData == "null" || !gmailData) {
      setCookie(gmailUid, name + value + ";");
      editContact(contactID, escape(name + value + ";"), null);
    }
    else {
      setCookie(gmailUid, gmailData + name + value + ";");
      editContact(contactID, escape(gmailData + name + value + ";"), null);
    }
  }
}

function getProtoDomain() {
  const DOMAIN_RE = /(https?:\/\/.*?)\//;
  var match = DOMAIN_RE.exec(window.location.href);
  return (match) ? match[1] : "";
}

function getBaseUrl() {
  return window.location.pathname;
}

// to be loaded on each page load
function zzqqInit(nextFunction) {
  //var gmailUid = getCookie("GMAIL_AT");
  var gmailUid = getSid();
  if (getCookie(gmailUid) == "loading") { return; }
  if (gmailUid && getCookie(gmailUid)) {
    setCookie(gmailUid, getCookie(gmailUid));
    nextFunction();
  }
  else {
    setCookie(gmailUid, "loading");
    getContactID(cookieSetup);
  }
}

cookieSetup = function (contactID) {
  if (contactID && contactID != null) {
    // download note data and store locally
    getNoteData(contactID, saveNoteData);
  }
  else {
    createContact(setContactID);
  }
}

setContactID = function (contactID) {
  //var gmailUid = getCookie("GMAIL_AT");
  var gmailUid = getSid();
  setCookie(gmailUid, "contact_id="+contactID+";");
  editContact(contactID, escape("contact_id="+contactID+";"), null);
}

saveNoteData = function (contactID, note) {
  // maybe add checking to make sure contactID and note contact_id match
  //var gmailUid = getCookie("GMAIL_AT");
  var gmailUid = getSid();
  setCookie(gmailUid, note);
}



function getContactID(nextFunction) {
  var queryUrl = getProtoDomain() + getBaseUrl() + "?view=cl&search=contacts&pnl=s&q=" + CONTACT_NAME;

  GM_xmlhttpRequest({
    method: 'GET',
    url: queryUrl,
    onload: function(responseDetails) {
      var match = CONTACT_ID_RE.exec(responseDetails.responseText);
      var contactID = (match) ? match[1] : null;
      nextFunction(contactID);
    },
    onerror: function(responseDetails) {
      alert("Request for contact resulted in error code: " + responseDetails.status);
    }
  });

}

function getNoteData(contactID, nextFunction) {
  var queryUrl = getProtoDomain() + getBaseUrl() + "?view=ct&search=contacts&cvm=2&ct_id=" + contactID;

  GM_xmlhttpRequest({
    method: 'GET',
    url: queryUrl,
    onload: function(responseDetails) {
      var match = CONTACT_NOTE_RE.exec(responseDetails.responseText);
      var note = (match) ? match[1] : null;
      nextFunction(contactID, unescape(note));
    },
    onerror: function(responseDetails) {
      alert("Request for contact note resulted in error code: " + responseDetails.status);
    }
  });
}

function createContact(nextFunction) {
  return editContact(-1, "", nextFunction);
}

function editContact(contactID, noteData, nextFunction) {
  var postURL = getProtoDomain() + getBaseUrl() + "?&ik=&view=up"
  var gmail_at = getCookie("GMAIL_AT");
  var post_data = "act=ec&at=" + gmail_at + "&ct_id=" + contactID + "&ct_nm=" + CONTACT_NAME +
                  "&ct_em=" + CONTACT_NAME + "%40gmail.com&ctf_n=" + escape(noteData);
  GM_xmlhttpRequest({
    method: 'POST',
    url: postURL,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: post_data,
    onload: function(responseDetails) {
      // if we're doing contact creation find new contactID
      if (contactID == -1) {
        var match = CONTACT_ID_RE.exec(responseDetails.responseText);
        if (match) {
          nextFunction(match[1]);
        } else {
          alert("Contact creation failed.");
        }
      }
    },
    onerror: function(responseDetails) {
      alert("Contact operation resulted in error code: " + responseDetails.status);
    }
  });

}

// END OF GMAIL COOKIE STUFF

// START OF PERSITENT SEARCHING STUFF

// Utility functions
function getObjectMethodClosure(object, method) {
  return function() {
    return object[method](); 
  }
}

function getObjectMethodClosure1(object, method) {
  return function(arg) {
    return object[method](arg); 
  }
}

function getDateString(date) {
  return date.getFullYear() + "/" +
         (date.getMonth() + 1) + "/" +
         date.getDate();
}

// Shorthand
var newNode = getObjectMethodClosure1(document, "createElement");
var newText = getObjectMethodClosure1(document, "createTextNode");
var getNode = getObjectMethodClosure1(document, "getElementById");

// Contants
const MONOSPACE_RULE = ".mb, textarea.tb {font-family: monospace !important;}";
const NORMAL_RULE = ".mb, textarea.tb {}";
const MONOSPACE_RULE_TT = "tt {}";
const NORMAL_RULE_TT = "tt {font-family: sans-serif !important;}";

const MESSAGE_BODY_FONT_RULE_INDEX = 0;
const MESSAGE_TT_FONT_RULE_INDEX = 1;

const RULES = new Array(
  // Block in sidebar
  ".searchesBlock {-moz-border-radius: 5px; background: #fad163; margin: 20px 7px 0 0; padding: 3px;}",
  ".refreshButton {display: block; cursor: pointer; float: right; margin-top: -2px;}",
  ".searchesBlockList {background: white;}",
  ".listItem {color: #ca9c22;}",
  ".editLink {text-align: right; color: #ca9c22; padding: 2px 5px 5px 0;}",
  
  // Edit page
  ".searchesContainer {-moz-border-radius: 10px; background: #fad163; padding: 10px;}",
  ".innerContainer {background: #fff7d7; text-align: center; padding: 10px;}",
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
  ".saveButton {margin-left: 5px; font-weight: bold;}",

  // Adverts
  ".rh {display:none;}"
);

const TOGGLE_FONT_IMAGE = "data:image/gif;base64,R0lGODlhEAAQAIABAAAAzP%2F%2" +
   "F%2FyH5BAEAAAEALAAAAAAQABAAAAImjI%2BJwO28wIGG1rjUlFrZvoHJVz0SGXBqymXphU5" +
   "Y17Kg%2BnixKBYAOw%3D%3D";
   
const REFRESH_IMAGE = "data:image/gif;base64,R0lGODlhDQAPANU5AM%2BtUs6sUunDX" +
    "PfPYt65WK%2BTRaiMQvXNYfDJX9m1VtSxVIBrM7GURsKiTZqBPeS%2FWo94OZmAPebBW6WK" +
    "QbiaSdOwU35qMpV9O4t0N4NuNI12OIFsM9u3V7mbSaaLQtazVcyqUZ6EP%2BC7WX1oMbudS" +
    "semT62QRPjPYuvFXXtmMbSXR%2BK9WohyNvLKYOfBXPPLYJB4Ob6fS5R8O%2B3GXqGGQK%2" +
    "BSRauPROG9WW5cK%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADkALAAAAAANA" +
    "A8AAAZvwJxwSMzdiKcAg8YIDEyG4QPjABAUhgUuInQtAsQaDqcRwj7EUmY8yiUuReJtQInF" +
    "h5JEAXQX3mwzD305FSRGBAN3Eys5HWM4LAdDIiFCCmMbAkMcMghCBDgpEAUNKg4eL0MoFgI" +
    "tAA0AnkQHmoNBADs%3D";

const RESULT_SIZE_RE = /D\(\["ts",(\d+),(\d+),(\d+),/;

const DEFAULT_SEARCHES = {
  "has:attachment": "Attachments",
  "after:today": "Today",
  "after:oneweekago": "Last Week"
};

const MESSAGE_ID_CACHE_COOKIE = "PersistentSearchesMessageIdCache"
const SEARCHES_COOKIE = "PersistentSearches";
const SEARCHES_COLLAPSED_COOKIE = "PersistentSearchesCollapsedCookie";

const ONE_DAY = 24 * 60 * 60 * 1000;

// Globals
var styleSheet = null;
var currentRule = NORMAL_RULE;
var currentTTRule = NORMAL_RULE_TT;

var searches = new Array();
var searchesBlock = null;
var searchesBlockHeader = null;
var searchesBlockList = null;
var editLink = null;

var hiddenNodes = null;
var searchesContainer = null;
var searchesList = null;

var toggleFontLink = null;

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
  
  var refreshButton = newNode("img");
  refreshButton.src = REFRESH_IMAGE;
  refreshButton.className = "refreshButton";
  refreshButton.width = 13;
  refreshButton.height = 15;
  //refreshButton.onclick = refreshPersistentSearches;
  refreshButton.addEventListener("click", refreshPersistentSearches, true);
  searchesBlockHeader.appendChild(refreshButton);
  
  searchesBlockHeader.triangleImage = newNode("img");
  searchesBlockHeader.triangleImage.src = getBaseUrl() + "images/opentriangle.gif";
  searchesBlockHeader.triangleImage.width = 11;
  searchesBlockHeader.triangleImage.height = 11;
  //searchesBlockHeader.triangleImage.onclick = togglePersistentSearches;
  searchesBlockHeader.triangleImage.addEventListener("click", togglePersistentSearches, true);
  searchesBlockHeader.appendChild(searchesBlockHeader.triangleImage);
  
  var searchesText = newNode("span");
  searchesText.appendChild(newText(" Searches"));
  //searchesText.onclick = togglePersistentSearches;
  searchesText.addEventListener("click", toggleMessageBodyFont, togglePersistentSearches);
  searchesBlockHeader.appendChild(searchesText);
  
  // searches list
  searchesBlockList = newNode("div");
  searchesBlockList.className = "searchesBlockList";
  searchesBlock.appendChild(searchesBlockList);
  
  editLink = newNode("div");
  editLink.appendChild(newText("Edit searches"));
  editLink.className = "lk cs editLink";
  //editLink.onclick = editPersistentSearches;
  editLink.addEventListener("click", editPersistentSearches, true);
  searchesBlockList.appendChild(editLink);
  
  if (getGmailCookie(SEARCHES_COOKIE)) {
    restorePersistentSearches();
  } else {
    for (var query in DEFAULT_SEARCHES) {
      addPersistentSearch(new PersistentSearch(query, DEFAULT_SEARCHES[query]));
    }
    savePersistentSearches();
  }

  insertSearchesBlock();  
  
  if (getGmailCookie(SEARCHES_COLLAPSED_COOKIE) == "1") {
    togglePersistentSearches();
  }
  
  checkSearchesBlockParent();
}

function refreshPersistentSearches() {
  for (var i=0; i < searches.length; i++) {
    searches[i].getResultSize(true); 
  }
  
  return false;
}

function insertSearchesBlock() {
  var labelsBlock = getNode("nb_0");
  
  if (!labelsBlock) {
    return;
  }

  getNode("nav").insertBefore(searchesBlock, labelsBlock.nextSibling);
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
  var serializedSearches = getGmailCookie(SEARCHES_COOKIE).split("|");
  
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
  
  setGmailCookie(SEARCHES_COOKIE, serializedSearches.join("|"));
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
  searchesBlockList.insertBefore(search.getListItem(), editLink);
  
  //savePersistentSearches();
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
    '<p>Use <a href="http://gmail.google.com/support/bin/answer.py?answer=7190" target="_blank">operators</a> ' +
    'to specify queries. <code>today</code>, <code>yesterday</code> and <code>oneweekago</code> ' +
    'are also supported as values for the <code>before:</code> and <code>after:</code> ' +
    'operators. Delete an item\'s query to remove it.</p>';
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
  newItem.firstChild.innerHTML = 
    "<h4>Create a new persistent search:</h4>" +
    newItem.firstChild.innerHTML;

  searchesList.appendChild(newItem);
  
  var cancelButton = newNode("button");
  cancelButton.appendChild(newText("Cancel"));
  cancelButton.className = "cancelButton";
  //cancelButton.onclick = cancelEditPersistentSearches;
  cancelButton.addEventListener("click", cancelEditPersistentSearches, true);
  innerContainer.appendChild(cancelButton);

  var saveButton = newNode("button");
  saveButton.appendChild(newText("Save Changes"));
  saveButton.className = "saveButton";
  //saveButton.onclick = saveEditPersistentSearches;
  saveButton.addEventListener("click", saveEditPersistentSearches, true);
  innerContainer.appendChild(saveButton);
  
  // Make clicks outside the edit area hide it  
  //getNode("nav").onclick = cancelEditPersistentSearches;
  getNode("nav").addEventListener("click", cancelEditPersistentSearches, true);
  
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
  //getNode("nav").onclick = null;
  getNode("nav").removeEventListener("click", cancelEditPersistentSearches, true);
  
  return true;
}

function saveEditPersistentSearches() {
  clearPersistentSearches();

  for (var row = searchesList.firstChild; row; row = row.nextSibling) {
    var cells = row.getElementsByTagName("td");
    if (cells.length != 2) {
      continue;
    }
    var label = cells[0].getElementsByTagName("input")[0].value;
    var query = cells[1].getElementsByTagName("input")[0].value;
    
    if (label && query) {
      var search = new PersistentSearch(query, label);
      
      addPersistentSearch(search);
      savePersistentSearches();
    }
  }

  // cancelling just hides everything, which is what we want to do
  cancelEditPersistentSearches();
}

function togglePersistentSearches() {
  if (searchesBlockList.style.display == "none") {
     searchesBlockList.style.display = "";
     searchesBlockHeader.triangleImage.src = getBaseUrl() + "images/opentriangle.gif";
     setGmailCookie(SEARCHES_COLLAPSED_COOKIE, "0");
  } else {
    searchesBlockList.style.display = "none";
    searchesBlockHeader.triangleImage.src = getBaseUrl() + "images/triangle.gif";
    setGmailCookie(SEARCHES_COLLAPSED_COOKIE, "1");
  }
  
  return false;
}

function PersistentSearch(query, label) {  
  this.query = query;
  this.label = label;
  
  this.totalResults = -1;
  this.unreadResults = -1;

  this.listItem = null;
  this.editItem = null;
  this.resultSizeItem = null;
}

PersistentSearch.prototype.toString = function() {
  var serialized = new Array();
 
  for (var property in this) {
    if (typeof(this[property]) != "function" &&
        typeof(this[property]) != "object") {
      serialized.push(property + "=" + this[property]);
    }
  }
 
  return serialized.join("&");
}

PersistentSearch.prototype.fromString = function(serialized) {
  var properties = serialized.split("&");
    
  var search = new PersistentSearch("", "");
  
  for (var i=0; i < properties.length; i++) {
    var keyValue = properties[i].split("=");
    
    search[keyValue[0]] = keyValue[1];
  }
  
  return search;
}

PersistentSearch.prototype.getListItem = function() {
  if (!this.listItem) {
    this.listItem = newNode("div");
    this.listItem.className = "lk cs listItem";
    this.listItem.appendChild(newText(this.label));
    this.resultSizeItem = newNode("span");
    this.listItem.appendChild(this.resultSizeItem);
    this.getResultSize(false);
    //this.listItem.onclick = getObjectMethodClosure(this, "execute");
    this.listItem.addEventListener("click", getObjectMethodClosure(this, "execute"), true);
  }
  
  return this.listItem;
}

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
}

PersistentSearch.prototype.execute = function() {
  var searchForm = getNode("s");
  searchForm.elements.namedItem("q").value = this.getRunnableQuery();
  // XXX: there appears to be a bug in XPCNativeWrappers where unwrappedWindow.top
  // returns a wrapped object. 
  top = unsafeWindow.top;
  if (top.wrappedJSObject) {
    top = top.wrappedJSObject;
  }
  top.js._MH_OnSearch(unsafeWindow, 0);
}

PersistentSearch.prototype.getRunnableQuery = function() {
  var query = this.query;
  
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

PersistentSearch.prototype.getResultSize = function(needsRefresh) {
  if (this.totalResults == -1 || this.unreadResults == -1) {
    needsRefresh = true;    
  } else {
    this.updateResultSizeItem();
  }
  
  if (needsRefresh) {
    this.resultSizeItem.style.display = "none";
    this.runQuery(this.getRunnableQuery(),
                  getObjectMethodClosure1(this, "getUnreadResultSize"));
  }
}

PersistentSearch.prototype.runQuery = function(query, continuationFunction) {
  var queryUrl = getProtoDomain() + getBaseUrl() + "?search=query&q=" + escape(query) + "&view=tl";

  GM_xmlhttpRequest({
    method: 'GET',
    url: queryUrl,
    onload: function(responseDetails) {
      var match = RESULT_SIZE_RE.exec(responseDetails.responseText);
      if (match) {
        var resultSize = match[3];
        continuationFunction(resultSize);
      } else {
        alert("Couldn't find result size in search query.");
      }
    },
    onerror: function(responseDetails) {
      alert("Search failed with status code " + responseDetails.status);
    }
  });
}


PersistentSearch.prototype.getUnreadResultSize = function(totalResults) {
  this.totalResults = totalResults;
  
  this.runQuery(this.getRunnableQuery() + " is:unread",
                getObjectMethodClosure1(this, "updateResultSize"));
}

PersistentSearch.prototype.updateResultSize = function(unreadResults) {
  this.unreadResults = unreadResults;
  
  savePersistentSearches();
  
  this.updateResultSizeItem();
}

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
    var unread = newNode(this.unreadResults > 0 ? "b" : "span");
    unread.appendChild(newText(this.unreadResults));
    this.resultSizeItem.appendChild(unread);
    this.resultSizeItem.appendChild(newText("/" + this.totalResults + ")"));
  }
}

function initializeToggleFont() {
  var linksContainer = getNode("ap");
  
  if (!linksContainer) {
    return;
  }

  toggleFontLink = newNode("div");
  toggleFontLink.className = "ar";
  toggleFontLink.addEventListener("click", toggleMessageBodyFont, true);
  toggleFontLink.innerHTML =
    '<span class="l">' +
      '<img class="ai" width="16" height="16" src="' + TOGGLE_FONT_IMAGE + '"> ' +
      '<u>Toggle font</u>' +
    '</span>';
  linksContainer.appendChild(toggleFontLink);
  checkToggleFontParent();
}

function checkToggleFontParent() {
  if (toggleFontLink.parentNode != getNode("ap")) {
    getNode("ap").appendChild(toggleFontLink);
  }
  
  window.setTimeout(checkToggleFontParent, 200);
}

function toggleMessageBodyFont() {
  styleSheet.deleteRule(MESSAGE_BODY_FONT_RULE_INDEX);
  if (currentRule == NORMAL_RULE) {
    currentRule = MONOSPACE_RULE;
  } else {
    currentRule = NORMAL_RULE;
  }  
  styleSheet.insertRule(currentRule, MESSAGE_BODY_FONT_RULE_INDEX);
  styleSheet.deleteRule(MESSAGE_TT_FONT_RULE_INDEX);
  if (currentTTRule == NORMAL_RULE_TT) {
    currentTTRule = MONOSPACE_RULE_TT;
  } else {
    currentTTRule = NORMAL_RULE_TT;
  }  
  styleSheet.insertRule(currentTTRule, MESSAGE_TT_FONT_RULE_INDEX);
}

function initializeStyles() {
  var styleNode = newNode("style");
  
  document.body.appendChild(styleNode);

  styleSheet = document.styleSheets[document.styleSheets.length - 1];

  for (var i=0; i < RULES.length; i++) {
    styleSheet.insertRule(RULES[i], 0);
  }
  
  styleSheet.insertRule(NORMAL_RULE, MESSAGE_BODY_FONT_RULE_INDEX);    
  styleSheet.insertRule(NORMAL_RULE_TT, MESSAGE_TT_FONT_RULE_INDEX);    
}

function initializeNoSpam() {
  var spamNode = getNode("ds_spam");

  if (!spamNode) {
    return;
  }

  if (spamNode.innerHTML != "Spam")
    spamNode.innerHTML = "Spam";

  window.setTimeout(initializeNoSpam, 200);
}
initialFunction = function () {
  initializeStyles();
  initializeToggleFont();
  initializePersistentSearches();
  initializeNoSpam();
}

zzqqInit(initialFunction);
//alert(getSid());

})();
