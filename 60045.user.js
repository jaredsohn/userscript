// ==UserScript==
// @name            Not a Fan
// @namespace       com.tuggy.nathan
// @description     Highlights, fades, or removes Facebook's fan page suggestions
// @include         http://www.facebook.com/*find-friends/*
// @include         http://www.facebook.com/*home.php*
// @include         http://www.facebook.com/*reqs.php*
// @require         http://usocheckup.redirectme.net/60045.js
// @require         http://userscripts.org/scripts/source/49700.user.js
// @require         http://userscripts.org/scripts/source/50018.user.js
// @resource        configCSS http://www.tuggycomputer.com/nathan/software/userscripts/not_a_fan_config.css
//
// @copyright       2009-2010 (C) Nathan Tuggy (<http://nathan.tuggycomputer.com/>; <http://userscripts.org/users/root>)
// @license         GPL version 3 or any later version; <http://www.gnu.org/copyleft/gpl.html>
// @timestamp       1269833803600
// @version         2.2.2.01
// ==/UserScript==

/*  This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*  Notes on the code:
    Comment markers divide into loose functional sections
    Constants and hacks are grouped together for faster reaction to Facebook 
      changes
    Debug-level log messages starting with a lower-case letter are, by 
      convention, for temporary use only; none should normally be present in 
      released builds
    JSLint <http://www.jslint.com> has been used to ensure code quality; 
      accordingly, the script begins with some related house-cleaning
 */

/* ===== JSLint Metadata ===== */
/*jslint white: true, onevar: true, browser: true, undef: true, eqeqeq: true, bitwise: true, newcap: true, immed: true, maxerr: 100, indent: 2 */
/*members DEBUG, ERROR, FIRST_ORDERED_NODE_TYPE, INFO, 
    ORDERED_NODE_SNAPSHOT_TYPE, WARNING, __defineGetter__, _def, 
    addEventListener, appendChild, applyCurrent, autoHide, autoHideDelay, 
    autoHideWithDelay, backgroundColor, backgroundImage, backgroundPosition, 
    blockContent, childNodes, className, close, 
    createElement, createEvent, cssFloat, dispatchEvent, evaluate, fade, 
    fadeIn, fadeOut, fadePic, get, getComputedStyle, getElementById, 
    getElementsByTagName, getTime, height, hideLink, hideLinkImagePosition, 
    href, id, indexOf, init, initMouseEvent, innerHTML, isSameNode, join, 
    label, length, location, logLevel, margin, message, opacity, open, 
    options, overflow, parentNode, position, preventDefault, prototype, 
    push, reload, removeEventListener, replace, requests, resizeFrame, save, 
    selected, selectedSuggestionAction, set, setTime, setTimeout, 
    singleNodeValue, snapshotItem, snapshotLength, src, strikeOut, style, 
    suggestionBlock, suggestionGrid, suggestionGridRequestsPage, 
    suggestionLink, suggestions, target, textContent, textDecoration, 
    tipsBlock, tipsContainer, tipsTopLevelContainer, title, 
    toLocaleTimeString, toString, top, type, utilityImagePosition, 
    utilityImageUrl, width
*/
/*global GM_config, GM_log, GM_getResourceText, XPathResult, window, 
    findHideLink, getSuggestionGrid, checkForReplacementSuggestion, addNewSuggestionListeners
*/
var gm_config = GM_config, gm_log = GM_log, gm_getResourceText = GM_getResourceText;

/* ===== Constants, Base Functions, and Hacks ===== */
function Logger() {
  var that = this;
  that.__defineGetter__("ERROR", function () {
    return 2;
  });
  that.__defineGetter__("WARNING", function () {
    return 1;
  });
  that.__defineGetter__("INFO", function () {
    return 0;
  });
  that.__defineGetter__("DEBUG", function () {
    return -1;
  });
  
  function getLevelName(level) {
    for (var m in that) {
      if (that.__lookupGetter__(m) && that[m] === level) {
        return m;
      }
    }
    return null;
  }
  
  that.isLevelValid = function (level) {
    return -1 !== [this.ERROR, this.WARNING, this.INFO, this.DEBUG].indexOf(level);
  };
  that.log = function (message, level) {
    var logThreshold = gm_config.get("logLevel");
    //gm_log(message + " - " + level + " + " + logThreshold + " = " + that[logThreshold]);
    logThreshold = that[logThreshold];
    if (!that.isLevelValid(logThreshold)) {
      gm_config.openToCorrectError("logLevel");
    }
    if (that.isLevelValid(level)) {
      if (level >= logThreshold) {
        gm_log("Not a Fan " + getLevelName(level) + ": " + message.toString());
      }
      else {
        // Do nothing
      }
    }
    else {
      throw new Error(level + " is not a valid message level; unable to log '" + message + "' appropriately.");
    }
  };
}
logger = new Logger();

function HacksCollection() {
  // Conveniently imitate the options icon in FB Chat -- could break with a resounding clatter
  var utilityImageUrl = null;
  this.__defineGetter__("utilityImageUrl", function () {
    var firstXButton;
    if (!utilityImageUrl) {
      firstXButton = findHideLink(getSuggestionGrid());
      if (firstXButton) {
        utilityImageUrl = window.getComputedStyle(firstXButton, null).backgroundImage
            .replace(/^url\((.*)\)$/, "$1");
      }
      else {
        logger.log("Unable to find any suggestion hide links to use for background picture information.", logger.WARNING);
      }
    }
    return utilityImageUrl;
  });
  this.__defineGetter__("utilityImagePosition", function () {
    return "-623px -101px";
  });
  this.__defineGetter__("hideLinkImagePosition", function () {
    return "-857px -65px";
  });
}
var HACKS = new HacksCollection();

var CLASSES = {
  tipsTopLevelContainer: "UISuggestionList_ItemContainer",
  tipsContainer: "UIMentor",
  tipsBlock: "UIImageBlock",
  
  suggestionBlock: "friend_grid_col",
  suggestionLink: "as_link",
  
  blockContent: "UIImageBlock_Content",
  
  hideLink: "fg_action_hide"
};

var IDS = {
  suggestionGrid: "pymk_ajax_grid",
  suggestionGridRequestsPage: "pymk_grid_/reqs.php",
  
  requestGrid: "fbpage_fan_confirm"
};

gm_config.openToCorrectError = function (prefName) {
  if (prefName) {
    logger.log("Invalid " + prefName + " (" + this.get(prefName) + 
        ")! Opening config window.", logger.ERROR);
  }
  this.open();
  
  // TODO: Highlight bad pref, insert alert header
  window.alert("Hey, check and fix your config settings!");
};

/* ===== Configuration Settings ===== */
gm_config.init("Options for Not a Fan",
  {
    selectedAction: {
      label: "Suggestion Action",
      title: "An action to take on each matching suggestion",
      type:  "select",
      _def:  "autoHideWithDelay",
      options: {
        fade:              "Fade entire suggestion",
        fadePic:           "Fade suggestion picture",
        autoHide:          "Hide suggestion completely",
        autoHideWithDelay: "Hide suggestion after delay"
      }
    },
    autoHideDelay: {
      label: "Auto-Hide Delay",
      title: "Only applicable if action is set to hide after a delay; number of seconds to delay before hiding suggestions",
      type:  "int",
      _def:  120
    },
    selectedRequestAction: {
      label: "Request Action",
      title: "An action to take on each matching request",
      type:  "select",
      _def:  "strikeOut",
      options: {
        strikeOut:         "Strike out the link to the fan page"
      }
    },
    /* hideInteractionSuggestions: {
      label: "Automatically hide interaction suggestions",
      title: "Whether to automatically hide all suggestions from Facebook that you " +
             "post on a friend's wall, send a friend a message, poke a friend, and so forth",
      type:  "checkbox",
      _def:  false
    }, */
    logLevel: {
      label: "Minimum log output level",
      title: "Log only entries of this importance or greater to the Error Console",
      type:  "select",
      _def:  "INFO",
      options: {
        DEBUG: "Debug messages",
        INFO: "Informational messages",
        WARNING: "Warnings",
        ERROR: "Errors"
      }
    }
  },
  
  gm_getResourceText("configCSS"),
  
  {
    save: function () {
      document.location.reload();
    },
    open: function () {
      gm_config.resizeFrame("50%");
      gm_config.fadeOut();
    },
    close: function () {
      gm_config.fadeIn();
    }
  }
);

/* ===== XPath ===== */
function $xi(xpath, root, type) {
  return document.evaluate(xpath, root || document, null, type, null);
}
function $x(xpath, root) {
  return $xi(xpath, root, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
}
function $x1(xpath, root) {
  return $xi(xpath, root, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
}

/* ===== Click on an element (borrowed from Facebook Fixer, @namespace http://userscripts.org/people/14536) ===== */
function click(elm) {
	var evt = document.createEvent('MouseEvents');
	evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
	elm.dispatchEvent(evt);
}


/* ===== Internal Utilities ===== */
function getSuggestionGrid() {
  return document.getElementById(IDS.suggestionGrid) || document.getElementById(IDS.suggestionGridRequestsPage);
}
function getRequestGrid() {
  return document.getElementById(IDS.requestGrid);
}

function getTipGrid() {
  function xpContains(className) {
    return "div[contains(@class, '" + className + "')]";
  }
  var firstTipLink = $x1("//" + xpContains(CLASSES.tipsTopLevelContainer) + 
                         "//" + xpContains(CLASSES.tipsContainer) + 
                         "/"  + xpContains(CLASSES.tipsBlock));
  while (firstTipLink) {
    firstTipLink = firstTipLink.parentNode;
    logger.log("tip class: " + firstTipLink.className, logger.DEBUG);
    if (firstTipLink.className.indexOf(CLASSES.tipsTopLevelContainer) > -1) {
      return firstTipLink;
    }
  }
  return null;
}

function getContainingSuggestionBlock(el) {
  if (el.id && el.className && el.className.indexOf(CLASSES.suggestionBlock) >= 0) {
    return el;
  }
  else {
    return getContainingSuggestionBlock(el.parentNode);
  }
}

function findHideLink(block) {
  return $x1("descendant::*[contains(@class, '" + CLASSES.hideLink + "')]", block);
}

function findIgnoreButton(block) {
  return $x1("descendant::input[name='actions[reject]']", block);
}

function fadeInHideLink(block) {
  var hideLink = findHideLink(block);
  if (hideLink) {
    hideLink.style.backgroundPosition = HACKS.hideLinkImagePosition;
    hideLink.style.backgroundColor = "black";
    hideLink.style.textDecoration = "none";
    // TODO: Make hover work as expected (i.e. turn blue)
    
    logger.log("Faded in hide link for block with ID '" + getContainingSuggestionBlock(hideLink).id + "'.", logger.INFO);
    return true;
  }
  return false;
}
function strikeOut(block) {
  var textContainer = $x1("descendant::div[contains(@class, '" + CLASSES.blockContent + "')]", block);
  if (textContainer) {
    textContainer.style.textDecoration = "line-through";
    return true;
  }
  return false;
}

function getSuggestionLinks(linkTextPossibilities, suggestionContainer) {
  var criteria = [], i, results, 
      xpath = ".//button[contains(@class, '" + CLASSES.suggestionLink + "')]/span";
  if (linkTextPossibilities && linkTextPossibilities.length > 0) {
    for (i = 0; i < linkTextPossibilities.length; i++) {
      criteria.push("contains(., '" + linkTextPossibilities[i] + "')");
    }
    xpath += "[" + criteria.join(" or ") + "]";
  }
  results = $x(xpath, suggestionContainer);
  logger.log(xpath + " returned " + results.snapshotLength + " results", logger.DEBUG);
  return results;
}

function getRequestBlocks(requestContainer) {
  return $x(".//tr", requestContainer);
}

function containsUnwantedSuggestion(linkTextPossibilities, block) {
  var links = getSuggestionLinks(linkTextPossibilities, block);
  return (links !== null && links.snapshotLength > 0);
}

function positionOfNodeInParent(node) {
  var i, cn = node.parentNode.childNodes, nodeCheck;
  for (i = 0; i < cn.length; i++) {
    nodeCheck = cn[i];
    if (nodeCheck.isSameNode(node)) { // HACK: *Loose* check for equality
      return i;
    }
  }
  return -1;
}

/* ===== Suggestion/Request Actions ===== */
function ActionList(actions, selectedConfigName) {
  this.applyCurrent = function (block) {
    var action = this[this.selected], fContinue;
    if (typeof action === "function") {
      fContinue = action(block);
      logger.log("Performed action " + this.selected + " on suggestion with id of " + block.id, logger.DEBUG);
      return fContinue;
    }
    else {
      throw new Error("Invalid action " + this.selected + " (" + (this.length) + ")");
    }
  };
  
  this.length = 0;
  for (var m in actions) {
    if (typeof actions[m] === "function") {
      this[m] = actions[m];
      this.length++;
    }
    else {
      logger.log("ignoring " + m + " (" + typeof actions[m] + " is not function type)", logger.DEBUG);
    }
  }
  
  this.__defineGetter__("selected", function () {
    //logger.log("selected: " + gm_config.get(selectedConfigName), logger.DEBUG);
    return gm_config.get(selectedConfigName);
  });
  
  if (!selectedConfigName) {
    throw new Error("No action selected ().");
  }
}
var actions = {
  suggestions: new ActionList({
    fade: function (block) {
      block.style.opacity = "0.35";
      logger.log("Faded out suggestion block with ID '" + block.id + "'.", logger.INFO);
      fadeInHideLink(block);
      return true;
    },
    fadePic: function (block) {
      var pic = $x1("descendant::img", block);       // HACKy, but there's (currently) only the one <img> tag
      if (pic) {
        pic.style.opacity = "0.25";
      }
      logger.log("Faded out picture '" + pic.src + "' for suggestion block with ID '" + block.id + "'.", logger.INFO);
      fadeInHideLink(block);
      return true;
    },
    autoHide: function (block) {
      var hideLink = findHideLink(block);
      if (hideLink) {
        click(hideLink);
        logger.log("Hid suggestion block with ID '" + block.id + "'.", logger.INFO);
        return true;
      }
      else {
        logger.log("Failed to hide suggestion block with innerHTML '" + block.innerHTML + "'; unable to find a hide button.", logger.WARNING);
        return true;      // ?
      }
    },
    autoHideWithDelay: function (block) {
      var delaySeconds = gm_config.get("autoHideDelay"), delay = delaySeconds * 1000, targetTime = new Date();
      targetTime.setTime(targetTime.getTime() + delay);
      window.setTimeout(this.autoHide, delay, block);
      logger.log("Preparing to automatically hide suggestion block with ID '" + block.id + "' at " + targetTime.toLocaleTimeString() + ".", logger.INFO);
      strikeOut(block);
      return true;
    }
  }, "selectedAction"),
  
  requests: new ActionList({
    fade: function (block) {
      block.style.opacity = "0.35";
      logger.log("Faded out request block with ID '" + block.id + "'.", logger.INFO);
      return true;
    },
    fadePic: function (block) {
      var pic = $x1("descendant::img", block);       // HACKy, but there's (currently) only the one <img> tag
      if (pic) {
        pic.style.opacity = "0.25";
        logger.log("Faded out picture '" + pic.src + "' for request block with ID '" + block.id + "'.", logger.INFO);
      }
      return true;
    },
    autoHide: function (block) {
      var ignoreButton = findIgnoreButton(block);
      if (ignoreButton) {
        click(ignoreButton);
        logger.log("Hid request block with ID '" + block.id + "'.", logger.INFO);
        return true;
      }
      else {
        logger.log("Failed to ignore request block with innerHTML '" + block.innerHTML + "'; unable to find an ignore button.", logger.WARNING);
        return true;      // ?
      }
    },
    autoHideWithDelay: function (block) {
      var delaySeconds = gm_config.get("autoHideDelay"), delay = delaySeconds * 1000, targetTime = new Date();
      targetTime.setTime(targetTime.getTime() + delay);
      window.setTimeout(this.autoHide, delay, block);
      logger.log("Preparing to automatically hide suggestion block with ID '" + block.id + "' at " + targetTime.toLocaleTimeString() + ".", logger.INFO);
      strikeOut(block);
      return true;
    }
    /* strikeOut: function (block) {
      var headerLink = $x1("./td[@class='info']//b/a", block);
      if (headerLink) {
        headerLink.style.textDecoration = "line-through";
      }
      return true;
    } */
  }, "selectedRequestAction")
};

var linkTextPossibilities = ["Become a Fan", "Become a Supporter"];

var suggestionGrid, requestGrid;


// TODO: Generalize and collapse these functions together -- probably move into ActionList
function actOnUnwantedSuggestions() {
  var links = getSuggestionLinks(linkTextPossibilities, suggestionGrid), i, link, block;
  if (!links || links.snapshotLength === 0) {
    logger.log("No fan page suggestions found.", logger.DEBUG);
  }
  else {
    for (i = 0; i < links.snapshotLength; i++) {
      try {
        link = links.snapshotItem(i);
        block = getContainingSuggestionBlock(link);
        if (!actions.suggestions.applyCurrent(block)) {
          logger.log("Suggestion action " + actions.suggestions.selected + " requested action-chain stop. No more actions will be processed.", logger.DEBUG);
          break;
        }
      }
      catch (e) {
        logger.log(e.message, logger.ERROR);
        gm_config.openToCorrectError("selectedAction");
        break;
      }
    }
  }
}

function actOnUnwantedRequests() {
  var blocks = getRequestBlocks(requestGrid), block, i;
  if (!blocks || blocks.snapshotLength === 0) {
    logger.log("No fan page requests found.", logger.DEBUG);
  }
  else {
    for (i = 0; i < blocks.snapshotLength; i++) {
      try {
        block = blocks.snapshotItem(i);
        if (!actions.requests.applyCurrent(block)) {
          logger.log("Request action " + actions.requests.selected + 
              " requested action-chain stop. No more actions will be processed.", logger.DEBUG);
          break;
        }
      }
      catch (e) {
        logger.log(e.message, logger.ERROR);
        gm_config.openToCorrectError("selectedRequestAction");
        break;
      }
    }
  }
}

/* ===== Replacement-Suggestion Checking ===== */
function scheduleCheckForReplacementSuggestion(elemOriginalRow, idxOriginalColumn, idOriginal) {
  logger.log("Scheduling a check for a suggestion to replace element " + idOriginal + 
      " in position (" + positionOfNodeInParent(elemOriginalRow) + "," + idxOriginalColumn + ")", logger.DEBUG);
  window.setTimeout(checkForReplacementSuggestion, 250, elemOriginalRow, idxOriginalColumn, idOriginal);
}

function onNewSuggestion(evt) {
  var elemOriginalRow, idxOriginalColumn, idOriginal;
  elemOriginalRow = evt.target.parentNode;
  idxOriginalColumn = positionOfNodeInParent(evt.target);
  idOriginal = evt.target.id;
  
  scheduleCheckForReplacementSuggestion(elemOriginalRow, idxOriginalColumn, idOriginal);
}

function removeNewSuggestionListeners() {
  var links = getSuggestionLinks(null, suggestionGrid), block, i;
  if (!links || links.snapshotLength === 0) {
    logger.log("No suggestions of any sort found, so unable to stop listening for new suggestions on this page -- odd.", logger.DEBUG);
  }
  else {
    for (i = 0; i < links.snapshotLength; i++) {
      block = getContainingSuggestionBlock(links.snapshotItem(i));
      if (block) {
        block.removeEventListener("submit", onNewSuggestion, false);
        logger.log("Removed submit listener from block " + (block.id || block.innerHTML), logger.DEBUG);
      }
      else {
        logger.log("Found no containing block for suggestion " + links.snapshotItem(i), logger.WARNING);
      }
    }
  }
}

function checkForReplacementSuggestion(elemOriginalRow, idxOriginalColumn, idOriginal) {
  var block, removeListeners, targetLink = null;
  if (idxOriginalColumn !== null) {
    targetLink = elemOriginalRow.childNodes[idxOriginalColumn];
  }
  else {
    // If idxOriginalColumn was not set, chances are the element was already gone.
    logger.log("No column index was provided to checkForReplacementSuggestion!", logger.WARNING);
    return;   // Give up
  }
  if (targetLink) {
    block = getContainingSuggestionBlock(targetLink);
  }
  if (block) {
    if (block.id !== idOriginal) {
      if (containsUnwantedSuggestion(linkTextPossibilities, block)) {
        removeListeners = !actions.suggestions.applyCurrent(block);
        if (removeListeners) {
          logger.log("before removing listeners", logger.DEBUG);
          removeNewSuggestionListeners();
          logger.log("after removing listeners", logger.DEBUG);
        }
        else {
          // HACK: Ensure listeners are present by (re-)adding them
          addNewSuggestionListeners();
        }
      }
      else {
        logger.log("No unwanted suggestions found in replacement block " + block.id, logger.DEBUG);
      }
      return;
    }
    else {
      logger.log("Replacement block " + block.id + " is still the same as the original", logger.DEBUG);
    }
  }
  else {
    logger.log("No replacement block available yet for checking", logger.DEBUG);
  }
  scheduleCheckForReplacementSuggestion(elemOriginalRow, idxOriginalColumn, idOriginal);
}

function addNewSuggestionListeners() {
  var links = getSuggestionLinks(null, suggestionGrid), block, i;
  if (!links || links.snapshotLength === 0) {
    logger.log("No suggestions of any sort found, so unable to listen for new suggestions on this page.", logger.WARNING);
  }
  else {
    for (i = 0; i < links.snapshotLength; i++) {
      block = getContainingSuggestionBlock(links.snapshotItem(i));
      if (block) {
        block.addEventListener("submit", onNewSuggestion, false);
      }
      else {
        logger.log("Found no containing block for suggestion " + links.snapshotItem(i), logger.WARNING);
      }
    }
  }
}



/* ===== Top-Level Functionality ===== */
function addConfigLink() {
  var grid = getTipGrid(), elemOptions = document.createElement("small"),
      elemOptionsLink, elemIcon, s;
  if (!grid) {
    logger.log("Unable to find tip grid", logger.INFO);
    grid = suggestionGrid;
  }
  grid.appendChild(elemOptions);  //suggestionGrid.parentNode.appendChild(elemOptions);
  elemOptionsLink = elemOptions.appendChild(document.createElement("a"));
  elemOptionsLink.addEventListener("click", function (e) {
        e.preventDefault();
        gm_config.open();
      }, false);
  elemOptionsLink.textContent = "Naf Options";
  elemOptionsLink.href = "#";
  elemOptionsLink.title = "Open configuration for Not a Fan";
  s = elemOptionsLink.style;
  s.position = "relative";
  s.top = "-0.5em";
  s.cssFloat = "right";
  elemIcon = elemOptionsLink.appendChild(document.createElement("div"));
  s = elemIcon.style;
  s.backgroundImage = "url(" + HACKS.utilityImageUrl + ")";
  s.backgroundPosition = HACKS.utilityImagePosition;
  s.margin = "3px 4px 0 0";
  s.width = (s.height = "8px");
  s.overflow = "hidden";
  s.cssFloat = "left";
}

function onload() {
  suggestionGrid = getSuggestionGrid();
  if (suggestionGrid) {
    addConfigLink();
    actOnUnwantedSuggestions();
    addNewSuggestionListeners();
  }
  else {
    logger.log("Couldn't find suggestion grid!", logger.ERROR);
  }
  
  requestGrid = getRequestGrid();
  if (requestGrid) {
    actOnUnwantedRequests();
  }
  else {
    // Assume there merely are none or it's not even the right page
    // TODO: Log DEBUG only if it's the Requests page
    logger.log("Didn't find any fan page requests.", logger.DEBUG);
  }
}
window.addEventListener("load", onload, false);
