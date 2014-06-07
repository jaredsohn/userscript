// Based (totally!) on the Gmail + Google Reader script by Mihai Parparita
// Copyright 2006 Mihai Parparita. All Rights Reserved.

// ==UserScript==
// @name           Gmail + Google Calendar
// @namespace      http://menjatallarins.com/
// @description    Embeds Google Calendar into Gmail by adding a "Calendar" link
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @include        http://www.google.com/calendar/*
// ==/UserScript==

var calendarFrameNode = null;
var calendarContainerNode = null;
var hiddenNodes = [];

// Position of the calendar link from 0 (before the Inbox link)
// to 9 (right after the Trash link)
const CALENDAR_LINK_POSITION = 2;

const GMAIL_STYLES = [
  "#calendar-frame {",
  "  width: 100%;",
  "  border: 0;",
  "}",
  
  ".calendar-embedded #ft {",
    "display: none",
  "}",
  
  // Make currently selected item appear normal
  ".calendar-embedded table.cv * {",
  "  background: #fff;",
  "  font-weight: normal",
  "}",
  
  // Make the calendar link appear selected
  ".calendar-embedded #calendar-container {",
  "  background: #c3d9ff;",
  "  -moz-border-radius: 5px 0 0 5px;",
  "  font-weight: bold;",
  "  color: #00c;",
  "}",
].join("\n");

const CALENDAR_STYLES = [
"body {",
"  background: #fff;",
"  margin:0px !important;",
"}",
"#topBar,",
"#gbar,",
"#gbarl,",
"#guser,",
"table.bookmarks {",
"  display: none !important;",
"}",
/* 
"#co {",
" position:absolute;",
" left:0px;",
" width:84.5%;",
"}",
"#nav {",
" position:absolute;",
" width: 15%;",
" right:2px;",
"}",
"#nb_0 {",
" position:absolute;",
" right: 2px;",
"}"*/,

].join("\n");

const CALENDAR_VIEW_URL =
  "http://www.google.com/calendar/render?" +
  "gmail-embed=true";

if (document.location.hostname == "mail.google.com") {
  injectGmail();
} else if (document.location.hostname == "www.google.com" &&
           document.location.search.indexOf("gmail-embed") != -1) {
  injectCalendar();
}           

function injectGmail() {
  if (!getNode("nds") || !getNode("ds_inbox")) return;
  
  GM_addStyle(GMAIL_STYLES);
  
  var calendarNode = newNode("span");
  calendarNode.className = "lk";
  calendarNode.innerHTML = 
      'Calendar';
  calendarNode.onclick = showCalendarFrame;
  
  calendarContainerNode = newNode("div");
  calendarContainerNode.className = "nl";
  calendarContainerNode.id = "calendar-container";
  calendarContainerNode.appendChild(calendarNode);
  
  var navNode = getNode("nds");
  
  navNode.insertBefore(calendarContainerNode, navNode.childNodes[CALENDAR_LINK_POSITION]);
  
  window.addEventListener("resize", resizeCalendarFrame, false);
  
  window.setInterval(checkFeedsParent, 1000);
}

function checkFeedsParent() {
  var navNode = getNode("nds");
  
  if (calendarContainerNode.parentNode != navNode) {
    navNode.insertBefore(calendarContainerNode, navNode.childNodes[CALENDAR_LINK_POSITION]);
  }  
}

function resizeCalendarFrame() {
  if (!calendarFrameNode) return;
  
  calendarFrameNode.style.height = 
      (window.innerHeight - calendarFrameNode.offsetTop) + "px";  
}

function showCalendarFrame(event) {
  var container = getNode("co");
  
  addClass(document.body, "calendar-embedded");
  
  hiddenNodes = [];
  
  for (var i = container.firstChild; i; i = i.nextSibling) {
    hiddenNodes.push(i);
    i.style.display = "none";
  }
  
  calendarFrameNode = newNode("iframe");
  calendarFrameNode.src = CALENDAR_VIEW_URL;
  calendarFrameNode.id = "calendar-frame";
  
  container.appendChild(calendarFrameNode);
  
  container.parentNode.style.paddingRight = "0";
  container.parentNode.style.paddingBottom = "0";
  
  resizeCalendarFrame();
  
  // Make clicks outside the content area hide it  
  getNode("nav").addEventListener("click", hideCalendarFrame, false);
  
  // Since we're in a child of the "nav" element, the above handler will get
  // triggered immediately unless we stop this event from propagating
  event.stopPropagation();  
  
  return false;
}

function hideCalendarFrame() {
  var container = getNode("co");

  container.removeChild(calendarFrameNode);    
  calendarFrameNode = null;
  
  for (var i=0; i < hiddenNodes.length; i++) {
    hiddenNodes[i].style.display = "";
  }
  getNode("nav").removeEventListener("click", hideCalendarFrame, false);  
                                     
  removeClass(document.body, "calendar-embedded");      
  
  container.parentNode.style.paddingRight = "1ex";
  container.parentNode.style.paddingBottom = "1ex";
  
  return true;
}

function injectCalendar() {
  GM_addStyle(CALENDAR_STYLES);  
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
