// Based (totally!) on the Gmail + Google Calendar script by Pau Tomàs, which is
// Based (totally!) on the Gmail + Google Reader script by Mihai Parparita
// Copyright 2006 Mihai Parparita. All Rights Reserved.

// ==UserScript==
// @name           Gmail + Netvibes
// @namespace      http://pile0nades.wordpress.com/
// @description    Embeds Netvibes into Gmail by adding a "Netvibes" link
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==


// Page to embed in Gmail
const VIEW_URL = "http://www.netvibes.com?gmail-embed=true";


// Text of the link that appears in the menu
const LINK_TEXT = "Netvibes";


// Position of the link from 0 (before the Inbox link)
// to 9 (right after the Trash link)
const LINK_POSITION = 2;




const GMAIL_STYLES = [
  "#inserted-frame {",
  "  width: 100%;",
  "  border: 0;",
  "}",
  
  ".frame-embedded #ft {",
    "display: none",
  "}",
  
  // Make currently selected item appear normal
  ".frame-embedded table.cv * {",
  "  background: #fff;",
  "  font-weight: normal",
  "}",
  
  // Make the link appear selected
  ".frame-embedded #frame-container {",
  "  background: #c3d9ff;",
  "  -moz-border-radius: 5px 0 0 5px;",
  "  font-weight: bold;",
  "  color: #00c;",
  "}",
].join("\n");





var FrameNode = null;
var ContainerNode = null;
var hiddenNodes = [];


injectGmail();
function injectGmail() {
  if (!getNode("nds") || !getNode("ds_inbox")) return;
  
  GM_addStyle(GMAIL_STYLES);
  
  var linkNode = newNode("span");
  linkNode.className = "lk";
  linkNode.innerHTML = LINK_TEXT;
  linkNode.addEventListener("click", showFrame, false);
  
  ContainerNode = newNode("div");
  ContainerNode.className = "nl";
  ContainerNode.id = "frame-container";
  ContainerNode.appendChild(linkNode);
  
  var navNode = getNode("nds");
  
  navNode.insertBefore(ContainerNode, navNode.childNodes[LINK_POSITION]);
  
  window.addEventListener("resize", resizeFrame, false);
  
  window.setInterval(checkNavParent, 1000);
}

function checkNavParent() {
  var navNode = getNode("nds");
  
  if (ContainerNode.parentNode != navNode) {
    navNode.insertBefore(ContainerNode, navNode.childNodes[LINK_POSITION]);
  }  
}

function resizeFrame() {
  if (!FrameNode) return;
  
  FrameNode.style.height = 
      (window.innerHeight - FrameNode.offsetTop) + "px";  
}

function showFrame(event) {
  var container = getNode("co");
  
  addClass(document.body, "frame-embedded");
  
  hiddenNodes = [];
  
  for (var i = container.firstChild; i; i = i.nextSibling) {
    hiddenNodes.push(i);
    i.style.display = "none";
  }
  
  FrameNode = newNode("iframe");
  FrameNode.src = VIEW_URL;
  FrameNode.id = "inserted-frame";
  
  container.appendChild(FrameNode);
  
  container.parentNode.style.paddingRight = "0";
  container.parentNode.style.paddingBottom = "0";
  
  resizeFrame();
  
  // Make clicks outside the content area hide it  
  getNode("nav").addEventListener("click", hideFrame, false);
  
  // Since we're in a child of the "nav" element, the above handler will get
  // triggered immediately unless we stop this event from propagating
  event.stopPropagation();  
  
  return false;
}

function hideFrame() {
  var container = getNode("co");

  container.removeChild(FrameNode);    
  FrameNode = null;
  
  for (var i=0; i < hiddenNodes.length; i++) {
    hiddenNodes[i].style.display = "";
  }
  getNode("nav").removeEventListener("click", hideFrame, false);  
                                     
  removeClass(document.body, "frame-embedded");      
  
  container.parentNode.style.paddingRight = "1ex";
  container.parentNode.style.paddingBottom = "1ex";
  
  return true;
}


// Shorthand
function newNode(type) {return document.createElement(type);}
function newText(text) {return document.createTextNode(text);}
function getNode(id) {return document.getElementById(id);}

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
