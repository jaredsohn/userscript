// ==UserScript==
// @name          Gmail Fixed Font Toggle
// @namespace     http://persistent.info/greasemonkey
// @description	  Adds a fixed font size toggle button.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*

// ==/UserScript==

// Utility functions
function getObjectMethodClosure(object, method) {
  return function() {
    return object[method].apply(object, arguments);
  }
}

// Shorthand
var newNode = getObjectMethodClosure(document, "createElement");
var getNode = getObjectMethodClosure(document, "getElementById");

// Contants
const MONOSPACE_RULE = ".mb, textarea.tb {font-family: monospace !important;}";
const NORMAL_RULE = ".mb, textarea.tb {}";

const TOGGLE_FONT_IMAGE = "data:image/gif;base64,R0lGODlhEAAQAIABAAAAzP%2F%2" +
   "F%2FyH5BAEAAAEALAAAAAAQABAAAAImjI%2BJwO28wIGG1rjUlFrZvoHJVz0SGXBqymXphU5" +
   "Y17Kg%2BnixKBYAOw%3D%3D";

// Globals
var styleSheet = null;
var currentRule = NORMAL_RULE;

var toggleFontLink = null;

function initializeToggleFont() {
  var linksContainer = getNode("ap");
  
  if (!linksContainer) {
    return;
  }

  toggleFontLink = newNode("div");
  toggleFontLink.className = "ar";
  toggleFontLink.addEventListener("click", toggleMessageBodyFont, false);
  toggleFontLink.innerHTML =
    '<span class="l">' +
      '<img class="ai" width="16" height="16" src="' + TOGGLE_FONT_IMAGE + '">' +
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
  styleSheet.deleteRule(0);
  if (currentRule == NORMAL_RULE) {
    currentRule = MONOSPACE_RULE;
  } else {
    currentRule = NORMAL_RULE;
  }  
  styleSheet.insertRule(currentRule, 0);
}

function initializeStyles() {
  var styleNode = newNode("style");
  
  document.body.appendChild(styleNode);

  styleSheet = document.styleSheets[document.styleSheets.length - 1];

  styleSheet.insertRule(NORMAL_RULE, 0);    
}

initializeStyles();
initializeToggleFont();