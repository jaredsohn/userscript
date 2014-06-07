// ==UserScript==
// @name           Gmail + Google Reader
// @namespace      http://persistent.info/
// @description    Embeds Google Reader into Gmail by adding a "Feeds" link
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @include        http://www.google.com/reader/*
// ==/UserScript==

var readerFrameNode = null;
var feedsContainerNode = null;
var hiddenNodes = [];

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

const READER_UNREAD_COUNT_URL = 
  "http://www.google.com/reader/api/0/unread-count?" +
  "all=true&output=json&client=gm";

const READER_LIST_VIEW_URL =
  "http://www.google.com/reader/view/user/-/state/com.google/reading-list?" +
  "gmail-embed=true&view=list";

if (document.location.hostname == "mail.google.com") {
  injectGmail();
} else if (document.location.hostname == "www.google.com" &&
           document.location.search.indexOf("gmail-embed") != -1) {
  injectReader();
}           

function injectGmail() {
  if (!getNode("nds") || !getNode("ds_inbox")) return;
  
  GM_addStyle(GMAIL_STYLES);
  
  var feedsNode = newNode("span");
  feedsNode.className = "lk";
  feedsNode.innerHTML = 
      'Feeds ' +
      '<span id="reader-unread-count"></span>';
  feedsNode.onclick = showReaderFrame;
  
  feedsContainerNode = newNode("div");
  feedsContainerNode.className = "nl";
  feedsContainerNode.id = "feeds-container";
  feedsContainerNode.appendChild(feedsNode);
  
  var navNode = getNode("nds");
  
  navNode.insertBefore(feedsContainerNode, navNode.childNodes[2]);
  
  window.addEventListener("resize", resizeReaderFrame, false);
  
  updateUnreadCount();
  
  window.setInterval(updateUnreadCount, 5 * 60 * 1000); 
  
  window.setInterval(checkFeedsParent, 1000);
}

function checkFeedsParent() {
  var navNode = getNode("nds");
  
  if (feedsContainerNode.parentNode != navNode) {
    navNode.insertBefore(feedsContainerNode, navNode.childNodes[2]);
  }  
}

function updateUnreadCount() {
  var unreadCountNode = getNode("reader-unread-count");
  
  if (!unreadCountNode) return;
  
  GM_xmlhttpRequest({
    method: "GET",
    url: READER_UNREAD_COUNT_URL,
    onload: function(details) {
      var data = eval("(" + details.responseText + ")");
      var isUnread = false;
      
      for (var i = 0, unreadCountPair; 
           unreadCountPair = data.unreadcounts[i]; 
           i++) {
        if (unreadCountPair.id.indexOf("reading-list") != -1) {
          var count = unreadCountPair.count;
          if (count == 0) break;
          
          unreadCountNode.innerHTML = 
              " (" + count + (count == data.max ? "+" : "") + ") ";
          isUnread = true;
          break;
        }
      }
      
      if (!isUnread) {
        unreadCountNode.innerHTML = "";
      }
    }
  });
}

function resizeReaderFrame() {
  if (!readerFrameNode) return;
  
  readerFrameNode.style.height = 
      (window.innerHeight - readerFrameNode.offsetTop) + "px";  
}

function showReaderFrame(event) {
  var container = getNode("co");
  
  addClass(document.body, "reader-embedded");
  
  hiddenNodes = [];
  
  for (var i = container.firstChild; i; i = i.nextSibling) {
    hiddenNodes.push(i);
    i.style.display = "none";
  }
  
  readerFrameNode = newNode("iframe");
  readerFrameNode.src = READER_LIST_VIEW_URL;
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

function injectReader() {
  GM_addStyle(READER_STYLES);  
}

// Shorthand
function newNode(type) {return unsafeWindow.document.createElement(type);}
function newText(text) {return unsafeWindow.document.createTextNode(text);}
function getNode(id) {return unsafeWindow.document.getElementById(id);}

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