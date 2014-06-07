// ==UserScript==
// @name          Gmail Macros
// @namespace     http://persistent.info/greasemonkey
// @description	  Extra (customizable) keyboard shortcuts and macros.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

(function() {

// Constants

const LABEL_PREFIX = "sc_";
const SPECIAL_LABEL_PREFIX = "ds_";

// maps human readable names to div IDs
const SPECIAL_LABELS = {
  "Inbox": "inbox",
  "Starred": "starred",
  "Sent Mail": "sent",
  "Drafts": "drafts",
  "All Mail": "all",
  "Spam": "spam",
  "Trash": "trash"
};

// Command Names
const MARK_AS_READ = "rd";
const MARK_AS_UNREAD = "ru";

const ARCHIVE = "rc_^i";
const MOVE_TO_INBOX = "ib";
const ADD_STAR = "st";
const REMOVE_STAR = "xst";

const APPLY_LABEL = "ac_"; // Followed by label name
const REMOVE_LABEL = "rc_"; // Followed by label name

const MOVE_TO_TRASH = "tr";
const DELETE_FOREVER = "dl"; // Only works when in trash and spam views

const REPORT_SPAM = "sp";
const NOT_SPAM = "us";

const HANDLERS_TABLE = {
  69: [ARCHIVE], // E: always archivE (Y's context-dependent behavior is annoying)
  80: [MARK_AS_READ, ARCHIVE], // P: Purge
  82: [MARK_AS_READ], // R: mark as Read
  84: [MOVE_TO_TRASH] // T: move to Trash
};

const LABEL_ACTIONS = {
  // g: go to label
  71: function(labelName) {
    var labelDiv = getLabelNode(labelName);
    
    var event = unsafeWindow.document.createEvent("MouseEvents");
    
    event.initMouseEvent("mousedown",
                         true, // can bubble
                         true, // cancellable
                         window,
                         1, // clicks
                         50, 50, // screen coordinates
                         50, 50, // client coordinates
                         false, false, false, false, // control/alt/shift/meta
                         0, // button,
                         labelDiv);
    // event.target gets set to the document (and is read-only, so we can't set
    // it by hand). Unfortunately, labelDiv.createEvent doesn't work either. 
    // However, Gmail checks for both srcElement and target, so we can fake
    // it this way.
    event.srcElement = labelDiv;
    document.dispatchEvent(event);
  },
  // l: apply label
  76: function (labelName) {
    // we don't do special labels (there's other commands, like "archive" for
    // that)
    if (labelName in SPECIAL_LABELS) {
      return;
    }
    
    runCommands([APPLY_LABEL + labelName]);
  }
};

// Utility functions
function getObjectMethodClosure1(object, method) {
  return function(arg) {
    return object[method](arg); 
  }
}

// Shorthand
var newNode = getObjectMethodClosure1(unsafeWindow.document, "createElement");
var getNode = getObjectMethodClosure1(unsafeWindow.document, "getElementById");

// Globals

var banner;

var dispatchedActionTimeout = null;
var activeLabelAction = null;
var labels = new Array();
var selectedLabels = new Array();
var labelInput = null;

if (isLoaded()) { 
  banner = new Banner();
  window.addEventListener('keydown', keyHandler, false);
}

function isLoaded() {
  // Action menu is present
  return getNode("tamu") || getNode("ctamu");
}

function keyHandler(event) {
  // Apparently we still see Firefox shortcuts like control-T for a new tab - 
  // checking for modifiers lets us ignore those
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    return false;
  }
  
  // We also don't want to interfere with regular user typing
  if (event.target && event.target.nodeName) {
    var targetNodeName = event.target.nodeName.toLowerCase();
    if (targetNodeName == "textarea" ||
        (targetNodeName == "input" && event.target.type &&
         event.target.type.toLowerCase() == "text")) {
      return false;
    }
  }

  if (event.keyCode in LABEL_ACTIONS) {
    if (activeLabelAction) {
      endLabelAction();
      return false
    } else {
      activeLabelAction = LABEL_ACTIONS[event.keyCode];
      beginLabelAction();
      return true;
    }
  }
    
  if (event.keyCode in HANDLERS_TABLE) {
    runCommands(HANDLERS_TABLE[event.keyCode]);
    return true;
  }
  
  return false;
}

function beginLabelAction() {
  var divs = getNode("nb_0").getElementsByTagName("div");
  labels = new Array();

  for (var i=0; i < divs.length; i++) {
    if (divs[i].className.indexOf("cs") != -1 &&
        divs[i].id.indexOf(LABEL_PREFIX) == 0) {
      labels.push(divs[i].id.substring(LABEL_PREFIX.length));
    }
  }
  
  for (var specialLabel in SPECIAL_LABELS) {
    labels.push(specialLabel);
  }
  
  banner.show();
  
  labelInput = newNode("input");
  labelInput.type = "text";
  with (labelInput.style) {
    position = "fixed"; // We need to use fixed positioning since we have ensure
                        // that the input is not scrolled out of view (since
                        // Gecko will scroll for us if it is).
    top = "0";
    left = "-300px";
    width = "200px";
    height = "20px";
    zIndex = "1000";
  }

  dispatchedActionTimeout = null;
  
  unsafeWindow.document.body.appendChild(labelInput);
  labelInput.focus();
  labelInput.value = "";
  labelInput.addEventListener("keyup", updateLabelAction, false);
  // we want escape, clicks, etc. to cancel, which seems to be equivalent to the
  // field losing focus
  labelInput.addEventListener("blur", endLabelAction, false);
}

function endLabelAction() {

  banner.hide();

  if (labelInput) {
    labelInput.parentNode.removeChild(labelInput);
    labelInput = null;
  }
  activeLabelAction = null;
}

function updateLabelAction(event) {
  // We've already dispatched the action, the user is just typing away
  if (dispatchedActionTimeout) {
    return;
  }
  
  selectedLabels = new Array();
  
  // We need to skip the label shortcut that got us here
  var labelPrefix = labelInput.value.substring(1).toLowerCase();

  banner.update(labelPrefix);
  
  if (labelPrefix.length == 0) {
    return;
  }
  
  for (var i=0; i < labels.length; i++) {
    if (labels[i].toLowerCase().indexOf(labelPrefix) == 0) {
      selectedLabels.push(labels[i]);
    }
  }
  
  if (selectedLabels.length == 1) {
    // Tell the user what we picked
    banner.update(selectedLabels[0]);

    // We don't invoke the action straight away, if the user wants to keep 
    // typing and/or admire the banner
    dispatchedActionTimeout = window.setTimeout(
      function () {
        activeLabelAction(selectedLabels[0]);
        endLabelAction();
      }, 400);
  }
}


function getLabelNode(labelName) {
  if (labelName in SPECIAL_LABELS) {
    return getNode(SPECIAL_LABEL_PREFIX + SPECIAL_LABELS[labelName]);
  } else {
    return getNode(LABEL_PREFIX + labelName);
  }
}

function runCommands(commands) {
  for (var i=0; i < commands.length; i++) {
    var command = commands[i];
    
    // A one second pause between commands seems to be enough for LAN/broadband
    // connections
    setTimeout(getCommandClosure(commands[i]), 100 + 1000 * i);
  }
}

function getCommandClosure(command) {
  return function() {
    // We create a fake action menu, add our command to it, and then pretend to
    // select something from it. This is easier than dealing with the real
    // action menu, since some commands may be disabled and others may be
    // present as buttons instead
    var actionMenu = newNode("select");
    var commandOption = newNode("option");
    commandOption.value = command;
    commandOption.innerHTML = command;
    actionMenu.appendChild(commandOption);  
    actionMenu.selectedIndex = 0;
    
    if (getNode("tamu")) {
      var onchangeHandler = getNode("tamu").onchange;
    } else if (getNode("ctamu")) {
      var onchangeHandler = getNode("ctamu").onchange;    
    } else {
      GM_log("Not able to find a 'More Actions...' menu");
      return;
    }
    
    onchangeHandler.apply(actionMenu, null);    
  }
}

function Banner() {
  this.backgroundNode = getNodeSet();
  this.backgroundNode.style.background = "#000";
  this.backgroundNode.style.MozOpacity = "0.5";
  this.backgroundNode.style.zIndex = 100;
  for (var child = this.backgroundNode.firstChild; 
       child; 
       child = child.nextSibling) {
    child.style.visibility = "hidden";
  }
  
  this.foregroundNode = getNodeSet();
  this.foregroundNode.style.zIndex = 101;
}

function getNodeSet() {
  var boxNode = newNode("div");
  with (boxNode.style) {
    display = "none";
    position = "fixed";
    top = "50%";
    left = "10%";
    margin = "0 10% 0 10%";
    width = "60%";
    textAlign = "center";
    MozBorderRadius = "10px";
    padding = "10px";
    color = "#fff";
  }
  
  var messageNode = newNode("div");
  with (messageNode.style) {
    fontSize = "24px";
    fontWeight = "bold";
    fontFamily = "Lucida Grande, Trebuchet MS, sans-serif";
    margin = "0 0 10px 0";
  }
  boxNode.appendChild(messageNode);

  var taglineNode = newNode("div");
  with (taglineNode.style) {
    fontSize = "13px";
    margin = "0";
  }
  taglineNode.innerHTML = 'LabelSelector<span style="color:red">9000</span>';
  boxNode.appendChild(taglineNode);
  
  return boxNode;
}

Banner.prototype.hide = function() {
  this.backgroundNode.style.display = 
    this.foregroundNode.style.display = "none";
}

Banner.prototype.show = function() {
  this.update("");
  document.body.appendChild(this.backgroundNode);
  document.body.appendChild(this.foregroundNode);
  this.backgroundNode.style.display = 
    this.foregroundNode.style.display = "block";
}

Banner.prototype.update = function(message) {
  if (message.length) {
    this.backgroundNode.firstChild.style.display = 
      this.foregroundNode.firstChild.style.display = "inline";
  } else {
    this.backgroundNode.firstChild.style.display = 
      this.foregroundNode.firstChild.style.display = "none";
  }
    this.backgroundNode.firstChild.innerHTML = 
      this.foregroundNode.firstChild.innerHTML = message;
}

})();
