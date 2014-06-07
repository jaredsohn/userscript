// ==UserScript==
// @name          Gmail Box for Google Reader
// @namespace     http://romansends.blogspot.com
// @description	  Adds Google Reader subscriptions to Gmail
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://www.google.com/reader/*
// ==/UserScript==
// This was originally two scripts written by Mihai at persistent.info.
// TODO: sort the array of feeds?

// Utility functions
function getObjectMethodClosure(object, method) {
  return function() {
    return object[method].apply(object, arguments);
  }
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

function hasClass(node, className) {
  return className in getClassMap(node);
}

function addClass(node, className) {
  if (hasClass(node, className)) return;
  
  node.className += " " + className;
}

function removeClass(node, className) {
  var classMap = getClassMap(node);

  if (!(className in classMap)) return;
  
  delete classMap[className];
  var newClassList = [];
  
  for (var className in classMap) {
    newClassList.push(className);
  }
  
  node.className = newClassList.join(" ");
}

function getClassMap(node) {
  var classMap = {};
  var classNames = node.className.split(/\s+/);
  
  for (var i = 0; i < classNames.length; i++) {
    classMap[classNames[i]] = true;
  }
  
  return classMap;
}

// Shorthand
var newNode = getObjectMethodClosure(unsafeWindow.document, "createElement");
var newText = getObjectMethodClosure(unsafeWindow.document, "createTextNode");
var getNode = getObjectMethodClosure(unsafeWindow.document, "getElementById");

// Contants

const GMAIL_STYLES = [
  "#reader-frame {",
  "  width: 100%;",
  "  border: 0;",
  "}",
  
  ".reader-embedded #ft {",
    "display: none",
  "}",
  
  // Make currently selected item appear normal
  ".reader-embedded table.cv * {",
  "  background: #fff;",
  "  font-weight: normal",
  "}",
  
  // Make the feeds link appear selected
  ".reader-embedded #feeds-container {",
  "  background: #c3d9ff;",
  "  -moz-border-radius: 5px 0 0 5px;",
  "  font-weight: bold;",
  "  color: #00c;",
  "}",
].join("\n");

const READER_STYLES = [
  "body {",
  "  background: #fff",  
  "}",
  
  "#nav,",
  "#logo-container,",
  "#global-info,",
  "#viewer-header {",
  "  display: none !important;",
  "}",
  "",
  "#main {",
  "  margin-top: 0;",
  "}",
  "",
  "#chrome {",
  "  margin-left: 0;",
  "}"
].join("\n");

const RULES = new Array(
  // Block in sidebar
  ".feedsBlock {-moz-border-radius: 5px; background: #C3D9FF; margin: 10px 7px 0 0; padding: 3px;}",
  ".refreshButton {display: block; cursor: pointer; float: right; margin-top: 2px;}",
  ".feedsBlockList {padding-left: 5px; background: #E1ECFE; overflow: hidden; display: none;}",
  ".feedListItem {color: #6666CC; padding: 2px 0px 2px 0;}",
  ".feedListItemUnread {color: #0000CC; font-weight: bold; padding: 2px 0px 2px 0;}",
  ".showAllLink {background: #C3D9FF; text-align: right; font-size: 7pt; color: #0000CC; padding: 5px 0px 5px 0;}"
);
   
const READER_COLLAPSED_COOKIE = "GmailReaderCollapsedCookie";
const READER_SHOW_ALL_FEEDS_COOKIE = "GmailReaderShowAllFeedsCookie";

const KEY_PREFIX = "gmailss";
const POSITION = KEY_PREFIX + "pos";
const READER_UNREAD_COUNT_URL = 
  "http://www.google.com/reader/api/0/unread-count?" +
  "all=true&output=json&client=gm";
const READER_SUBSCRIPTIONS_URL =
"http://www.google.com/reader/api/0/subscription/list?output=json&client=gm";
const READER_LIST_VIEW_URL_START = "http://www.google.com/reader/view/";
const READER_LIST_VIEW_URL_END = "?gmail-embed=true&view=list";

// Globals
var styleSheet = null;

var feedsBlock = null;
var feedsBlockHeader = null;
var feedsBlockList = null;

var hiddenNodes = null;

var subscriptions = {};
var readerFrameNode = null;
var hiddenNodes = [];
var feeds = [];
var feeds_loaded = false;
var rest_loaded = false;
var showAllFeeds = true;
var showAllLink = null;
var showAllLinkText = null;

function clearFeeds() {
  for (var i=0; i < feeds.length; i++) {
    var feed = feeds[i].getListItem();
    if (feed && feed.parentNode) {
      feed.parentNode.removeChild(feed);
    }
  }
  feeds = [];
}

function getCounts() {
  GM_xmlhttpRequest({
    method: "GET",
    url: READER_UNREAD_COUNT_URL,
    onload: function(details) {
      if (details.status != 200) {
        window.setTimeout(updateUnreadCount, 1000);
        return;
      }

      var data = eval("(" + details.responseText + ")");
      clearFeeds();
      
      for (var i = 0, unreadCountPair; 
           unreadCountPair = data.unreadcounts[i]; 
           i++) {
        var count = unreadCountPair.count;
	var title = subscriptions[unreadCountPair.id];

	if (unreadCountPair.id.indexOf("reading-list") != -1) {
	  title = "All Items";
	}

	if (title) {
	  var label = title + " (" + count + (count == data.max ? "+" : "") +
	  ")";
	  addFeed(new Feed(unreadCountPair.id, label, count));
	}
      }
      feeds_loaded = true;
      if (getCookie(READER_COLLAPSED_COOKIE) == "1") {
        toggleFeeds();
      }
    }
  });
}

function updateUnreadCount() {
  GM_xmlhttpRequest({
    method: "GET",
    url: READER_SUBSCRIPTIONS_URL,
    onload: function(details) {
      var data = eval("(" + details.responseText + ")");
      subscriptions = {};
      
      for (var i = 0, sub; 
           sub = data.subscriptions[i]; 
           i++) {
	var categories = sub.categories;
        
	if (categories.length == 0) {
	  subscriptions[sub.id] = sub.title;
	} else {
	  for (var j = 0, cat; cat = categories[j]; j++) {
	    subscriptions[cat.id] = cat.label;
	  }
	}
      }
      getCounts();
    }
  });
}

function resizeReaderFrame() {
  if (!readerFrameNode) return;
  
  readerFrameNode.style.height = 
      (window.innerHeight - readerFrameNode.offsetTop) + "px";  
}

function initializeReader() {
  var labelsBlock = getNode("nb_0");
  
  if (!labelsBlock) {
    return;
  }
    
  window.addEventListener("resize", resizeReaderFrame, false);

  feedsBlock = newNode("div");
  feedsBlock.id = "nb_9";
  feedsBlock.className = "feedsBlock";

  // header  
  feedsBlockHeader = newNode("div");
  feedsBlockHeader.className = "s h";
  feedsBlock.appendChild(feedsBlockHeader);
    
  feedsBlockHeader.triangleImage = newNode("img");
  feedsBlockHeader.triangleImage.src = "/mail/images/opentriangle.gif";
  feedsBlockHeader.triangleImage.width = 11;
  feedsBlockHeader.triangleImage.height = 11;
  feedsBlockHeader.triangleImage.addEventListener("click",
                                                     toggleFeeds,
                                                     false);
  feedsBlockHeader.appendChild(feedsBlockHeader.triangleImage);
  
  var readerText = newNode("span");
  readerText.appendChild(newText(" Google Reader"));
  readerText.addEventListener("click",
                                toggleFeeds,
                                false);
  feedsBlockHeader.appendChild(readerText);

  feedsBlockList = newNode("div");
  feedsBlockList.className = "feedsBlockList";

  feedsBlock.appendChild(feedsBlockList);

  showAllLink = newNode("div");
  if (getCookie(READER_SHOW_ALL_FEEDS_COOKIE) == "0") {
    showAllLinkText = newText("Show all");
    showAllFeeds = false;
  } else {
    showAllLinkText = newText("Show updated");
    showAllFeeds = true;
  }
  showAllLink.appendChild(showAllLinkText);
  showAllLink.className = "lk cs showAllLink";
  showAllLink.addEventListener("click", toggleShowAllFeeds, false);
  feedsBlock.appendChild(showAllLink);
  
  updateUnreadCount();
  
  insertFeedsBlock();  
  
  rest_loaded = true;
  if (getCookie(READER_COLLAPSED_COOKIE) == "1") {
    toggleFeeds();
  }
  
  checkFeedsBlockParent();
  window.setInterval(updateUnreadCount, 30*1000);
}

function insertFeedsBlock() {
  var labelsBlock = getNode(GM_getValue(POSITION, "nb_2"));
  
  if (!labelsBlock) {
    labelsBlock = getNode("nb_0");
    if (!labelsBlock) {
      return;
    }
  }

  getNode("nav").insertBefore(feedsBlock, labelsBlock);
}

// For some reason, when naving back to the Inbox after viewing a message, we seem
// to get removed from the nav section, so we have to add ourselves back. This only
// happens if we're a child of the "nav" div, and nowhere else (but that's the place
// where we're supposed to go, so we have no choice)
function checkFeedsBlockParent() {
  if (feedsBlock.parentNode != getNode("nav")) {
    insertFeedsBlock();
  }
  
  window.setTimeout(checkFeedsBlockParent, 500);
}

function addFeed(feed) {
  feeds.push(feed);

  var node = feed.getListItem();
  if (node)
    feedsBlockList.appendChild(node);
  feedsBlockList.style.display = "block";
}

function toggleFeeds() {
  if (feeds_loaded && rest_loaded) {
    if (feedsBlockList.style.display == "none") {
       feedsBlockList.style.display = "block";
       feedsBlockHeader.triangleImage.src = "/mail/images/opentriangle.gif";
       showAllLink.style.display = "";
       setCookie(READER_COLLAPSED_COOKIE, "0");
    } else {
       feedsBlockList.style.display = "none";
       feedsBlockHeader.triangleImage.src = "/mail/images/triangle.gif";
       showAllLink.style.display = "none";
       setCookie(READER_COLLAPSED_COOKIE, "1");
    }
  }
  
  return false;
}

function toggleShowAllFeeds() {
  for (var i=0; i < feeds.length; i++) {
    var node = feeds[i].getListItem();
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }

  if (showAllFeeds) {
    showAllLinkText.nodeValue = "Show all";
    showAllFeeds = false;
    setCookie(READER_SHOW_ALL_FEEDS_COOKIE, "0");
  } else {
    showAllLinkText.nodeValue = "Show updated";
    showAllFeeds = true;
    setCookie(READER_SHOW_ALL_FEEDS_COOKIE, "1");
  }

  for (var i=0; i < feeds.length; i++) {
    var node = feeds[i].getListItem();
    if (node) {
      feedsBlockList.appendChild(node);
    }
  }
  return false;
}

function Feed(feed, label, unread) {  
  this.feed = feed;
  this.label = label;
  
  this.unread = unread || 0;

  this.feedListItem = null;
}

Feed.prototype.showReaderFrame = function(event) {
  var container = getNode("co");
  
  addClass(document.body, "reader-embedded");
  
  hiddenNodes = [];
  
  for (var i = container.firstChild; i; i = i.nextSibling) {
    hiddenNodes.push(i);
    i.style.display = "none";
  }
  
  readerFrameNode = newNode("iframe");
  readerFrameNode.src = READER_LIST_VIEW_URL_START + this.feed +
  READER_LIST_VIEW_URL_END;
  readerFrameNode.id = "reader-frame";
  
  container.appendChild(readerFrameNode);
  
  container.parentNode.style.paddingRight = "0";
  container.parentNode.style.paddingBottom = "0";
  
  resizeReaderFrame();
  
  // Make clicks outside the content area hide it  
  getNode("nav").addEventListener("click", hideReaderFrame, false);
  
  // Since we're in a child of the "nav" element, the above handler will get
  // triggered immediately unless we stop this event from propagating
  event.stopPropagation();  
  
  return false;
}

function hideReaderFrame() {
  var container = getNode("co");

  container.removeChild(readerFrameNode);    
  readerFrameNode = null;
  
  for (var i=0; i < hiddenNodes.length; i++) {
    hiddenNodes[i].style.display = "";
  }
  getNode("nav").removeEventListener("click", hideReaderFrame, false);  
                                     
  removeClass(document.body, "reader-embedded");      
  
  container.parentNode.style.paddingRight = "1ex";
  container.parentNode.style.paddingBottom = "1ex";
  
  return true;
}

Feed.prototype.getListItem = function() {
  if (!showAllFeeds && this.unread == 0)
    return null;

  if (!this.feedListItem) {
    this.feedListItem = newNode("div");
    if (this.unread > 0)
      this.feedListItem.className = "lk cs feedListItemUnread";
    else
      this.feedListItem.className = "lk cs feedListItem";
    this.feedListItem.appendChild(newText(this.label));
    this.feedListItem.onclick = getObjectMethodClosure(this, "showReaderFrame");
  }
  
  return this.feedListItem;
}

function initialize() {
  if (document.location.hostname == "mail.google.com") {
    var styleNode = newNode("style");
  
    GM_addStyle(GMAIL_STYLES);

    document.body.appendChild(styleNode);

    styleSheet = document.styleSheets[document.styleSheets.length - 1];

    for (var i=0; i < RULES.length; i++) {
      styleSheet.insertRule(RULES[i], 0);
    }  
    initializeReader();
  } else if (document.location.hostname == "www.google.com" &&
             document.location.search.indexOf("gmail-embed") != -1) {
    GM_addStyle(READER_STYLES);  
  }           
}

initialize();
