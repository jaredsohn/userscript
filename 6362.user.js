// gtd-gmail-macro.js
//
// Copyright (c) 2005, Jim Lawton
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ----------------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "GMail Mark Read Button", and click Uninstall.
//
// Based on the gmail-macro script by http://persistent.info/
//
// ----------------------------------------------------------------------------
// WHAT IT DOES:
// This script is based on the gmail-macro script and extends that functionality to include
// the GTDGmail labels. 
// ----------------------------------------------------------------------------
// HISTORY:
//  2006-11-10  0.1  Initial version.
// ----------------------------------------------------------------------------

// ==UserScript==
// @name          GTDGmail Macros
// @author        Mark Blakey <mark dot blakey at gmail dot com>
// @namespace     http://temporary.com/gtdgmailmacro
// @description   Extends the Gmail keyboard shortcuts for GTDGmail labels.
// @include       http://mail.google.com/mail*
// @include       https://mail.google.com/mail*
// @date          2006-11-10
// @version       0.1
// @GM_version    0.6.6.20061017.0
// ==/UserScript==/

// Constants

const LABEL_PREFIX = "sc_";
const SELECT_PREFIX = "sl_";
const GTD_LABEL_PREFIX = "sgtdc_"

// Maps human readable names to DOM node IDs
const SPECIAL_LABELS = {
  "Inbox": "ds_inbox",
  "Starred": "ds_starred",
  "Chats": "ds_chats",
  "Sent Mail": "ds_sent",
  "Drafts": "ds_drafts",
  "All Mail": "ds_all",
  "Spam": "ds_spam",
  "Trash": "ds_trash",
  "Contacts": "cont"
};

// Command Names
const MARK_AS_READ = "rd";
const MARK_AS_UNREAD = "ur";

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
  68: [MARK_AS_READ, ARCHIVE], // D: Discard
  69: [ARCHIVE], // E: always archivE (Y's context-dependent behavior is annoying)
  82: [MARK_AS_READ], // R: mark as Read
  84: [MOVE_TO_TRASH],// T: move to Trash
  90: [MARK_AS_UNREAD] // Z: mark as Unread (undo read similar to Ctrl+Z)
};

const LABEL_ACTIONS = {
  // g: go to label
  71: function(labelName) {
    var labelDiv = getLabelNode(labelName);
    
    var eventType;
    if (gtdlabels.indexOf(labelName) > -1) {
      eventType = "click";
    } else {
      eventType = "mousedown";
    }

    simulateClick(labelDiv, eventType);
  },
  // l: apply label
  76: function (labelName) {
    // we don't do special labels (there's other commands, like "archive" for
    // that)
    if (labelName in SPECIAL_LABELS) {
      return;
    }
    
    runCommands([APPLY_LABEL + labelName]);
  },
  // b: remove label
  66: function (labelName) {
    // we don't do special labels (there's other commands, like "archive" for
    // that)
    if (labelName in SPECIAL_LABELS) {
      return;
    }

    runCommands([REMOVE_LABEL + labelName]);
  }
};

const SELECT_KEY_VALUES = {
  65: ['a','All'],
  78: ['n','None'],
  82: ['r','Read'],
  83: ['s','Starred'],
  84: ['t','Unstarred'],
  85: ['u','Unread']
};

const SELECT_ACTIONS = {
  // shift-x: select
  88: function(selectionName) {
    var selectDiv = getNode(SELECT_PREFIX + selectionName);
    simulateClick(selectDiv, "mousedown");
  },
  // h: show help
  72: function() {
    banner.show(true);
    banner.update(getHelpHtml());
  }
};

const SIMPLE_ACTIONS = {
  // o: expand/collapse all
  79: function(selectionName) {
    if(getNode("ec")){
      simulateClick(getNode("ec"), "mousedown");
    }
    if(getNode("ind")){
      simulateClick(getNode("ind"), "mousedown");
    }
  }
};

const BUILTIN_KEYS_HELP = {
    "C*" : "<b>C</b>ompose",
    "/" : "Search",
    "Q" : "<b>Q</b>uick contacts",
    "J/K" : "Move to an older/newer conversation",
    "N/P" : "<b>N</b>ext/<b>P</b>revious message",
    "&lt;Enter&gt;" : "Open*, expand/collapse, press button",
    "U" : "Return to the conversation list",
    "Y" : "Archive/remove from current view",
    "X" : "Select a conversation",
    "S" : "<b>S</b>tar a message or conversation",
    "!" : "Report Spam<b>!</b>",
    "R*" : "<b>R</b>eply",
    "A*" : "Reply <b>A</b>ll",
    "F*" : "<b>F</b>orward"
};

const ADDED_KEYS_HELP = {
    "H" : "What are the keyboard commands<b>?</b>",
    "T" : "<b>T</b>rash conversation(s)",
    "E" : "Archiv<b>E</b> conversations(s) (always)",
    "R" : "Mark conversation(s) as <b>R</b>ead",
    "Z" : "Mark conversation(s) as unread (vs. Ctrl+<b>Z</b> undo)",
    "D" : "<b>D</b>iscard (read & archive) conversation(s)",
    "O" : "Expand/collapse all messages in a conversation",
    
    " " : " ",
    "V" : "Pre<b>V</b>iew a conversation<br>(requires Gmail Conversation Preview)",
    "&nbsp;" : " ",
    
    "G+<i>label</i>" : "<b>G</b>o to label (including inbox/starred/trash/etc.)",
    "L+<i>label</i>" : "<b>L</b>abel conversation(s) as label",
    "B+<i>label</i>" : "Remove label from conversation(s)",
    
    "&lt;Shift&gt;-X+<i>key</i>" : "Select " +
                       "A - <b>A</b>ll, " +
                       "N - <b>N</b>one, " +
                       "R - <b>R</b>ead,<br>" +
                       "U - <b>U</b>nread, " +
                       "S - <b>S</b>tarred, " +
                       "T - Uns<b>T</b>arred"
};

// Utility functions
function simulateClick(node, eventType) {
    var event = node.ownerDocument.createEvent("MouseEvents");
    event.initMouseEvent(eventType,
                         true, // can bubble
                         true, // cancellable
                         window,
                         1, // clicks
                         50, 50, // screen coordinates
                         50, 50, // client coordinates
                         false, false, false, false, // control/alt/shift/meta
                         0, // button,
                         node);
    node.dispatchEvent(event);
}

function getHelpHtml() {
  var html = 
    '<table style="color: #fff;font-size:12px;width:100%">' +
      '<caption style="font-size:32; font-weight:normal">' +
        'Available Keyboard Commands' +
      '</caption>' +
      '<tr>' +
        '<th colspan="2">Standard</th><th colspan="2">Extended</th>' +
      '</tr>';

  var base = [];
  for (var key in BUILTIN_KEYS_HELP) {
    base.push("<th>" + key + "</th><td>" + BUILTIN_KEYS_HELP[key] + "</td>");
  }

  var added = [];
  for (var key in ADDED_KEYS_HELP) {
    added.push("<th>" + key + "</th><td>" + ADDED_KEYS_HELP[key] + "</td>");
  }
  
  for(var i = 0; i < base.length; i++) {
    html += "<tr>" + base[i] + added[i] + "</tr>";
  }
  
  html += 
    '<tr>' +
      '<td colspan="4">' +
        '<i><b>*</b> Hold <b>&lt;Shift&gt;</b> for action in a new window</i>' +
      '</td>' +
    '</tr>' +
    '</table>';
    
  return html;
}

// Shorthand
function bind(func, thisObject) {
  return function() {
    return func.apply(thisObject, arguments);
  }
}

var newNode = bind(unsafeWindow.document.createElement, unsafeWindow.document);
var getNode = bind(unsafeWindow.document.getElementById, unsafeWindow.document);

// Globals

var banner;

var dispatchedActionTimeout = null;
var activeLabelAction = null;
var activeSelectAction = null;
var labels = new Array();
var gtdlabels = new Array(); // GTD Labels
var selectedLabels = new Array();
var labelInput = null;

if (isLoaded()) { 
  banner = new Banner();
  window.addEventListener('keydown', keyHandler, false);
  
  GM_addStyle(".banner b {font-weight: normal; color: yellow;}");
}

function isLoaded() {
  // Action or contacts menus is present
  return (getActionMenu() != null) || (getNode("co") != null);
}

function getActionMenu() {
  const ACTION_MENU_IDS = ["tam", "ctam", "tamu", "ctamu"];

  for (var i = 0, id; id = ACTION_MENU_IDS[i]; i++) {
    if (getNode(id) != null) {
      return getNode(id);
    }
  }

  return null;
}

function keyHandler(event) {
  // Apparently we still see Firefox shortcuts like control-T for a new tab - 
  // checking for modifiers lets us ignore those
  if (event.altKey || event.ctrlKey || event.metaKey) {
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
  
  var k = event.keyCode;
  
  if (k in SIMPLE_ACTIONS) {
    SIMPLE_ACTIONS[k]();
    return true;
  }

  if (k in LABEL_ACTIONS) {
    if (activeLabelAction) {
      endLabelAction();
      return false
    } else {
      activeLabelAction = LABEL_ACTIONS[k];
      beginLabelAction();
      return true;
    }
  }
    
  if ((k in SELECT_ACTIONS) && (k != 88 || event.shiftKey)) {
    if (activeSelectAction) {
      endSelectAction();
      return false;
    } else {
      activeSelectAction = SELECT_ACTIONS[k];
      beginSelectAction();
      return true;
    }
  }

  if (k in HANDLERS_TABLE) {
    runCommands(HANDLERS_TABLE[k]);
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
  
  // GTDGmail Labels
  var divs = getNode("GTDLabels_BucketContainer").getElementsByTagName("div");
  gtdlabels = new Array();
  
  for (var i=0; i < divs.length; i++) {
    if (divs[i].className.indexOf("cs") != -1 &&
        divs[i].id.indexOf(GTD_LABEL_PREFIX) == 0) {
      gtdlabels.push(divs[i].id.substring(GTD_LABEL_PREFIX.length));
      labels.push(divs[i].id.substring(GTD_LABEL_PREFIX.length));
    }
  }
  
  banner.show();
  
  dispatchedActionTimeout = null;

  labelInput = makeLabelInput();
  labelInput.addEventListener("keyup", updateLabelAction, false);
  // we want escape, clicks, etc. to cancel, which seems to be equivalent to the
  // field losing focus
  labelInput.addEventListener("blur", endLabelAction, false);
}

function beginSelectAction(){
  labelInput = makeLabelInput();
  labelInput.addEventListener("keyup", updateSelectAction, false);
  // we want escape, clicks, etc. to cancel, which seems to be equivalent to the
  // field losing focus
  labelInput.addEventListener("blur", endSelectAction, false);
}

function makeLabelInput(){
  labelInput = newNode("input");
  labelInput.type = "text";
  labelInput.setAttribute("autocomplete", "off");
  with (labelInput.style) {
    position = "fixed"; // We need to use fixed positioning since we have to ensure
                        // that the input is not scrolled out of view (since
                        // Gecko will scroll for us if it is).
    top = "0";
    left = "-300px";
    width = "200px";
    height = "20px";
    zIndex = "1000";
  }

  unsafeWindow.document.body.appendChild(labelInput);
  labelInput.focus();
  labelInput.value = "";
  return labelInput;
}

function endAction() {
  banner.hide();

  if (labelInput) {
    labelInput.parentNode.removeChild(labelInput);
    labelInput = null;
  }
}

function endLabelAction(){
  endAction();
  activeLabelAction = null;
}

function endSelectAction(){
  endAction();
  activeSelectAction = null;
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
  
  if (event.keyCode == 13 || selectedLabels.length == 1) {
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

function updateSelectAction(event) {
  if (event.keyCode == 88 || event.keyCode == 16) return true;
  
  if (event.keyCode in SELECT_KEY_VALUES) {
    activeSelectAction(SELECT_KEY_VALUES[event.keyCode][0]);
  } else if (event.keyCode == 72) {
    activeSelectAction();
    return true;
  }

  endSelectAction();
}

function getLabelNode(labelName) {
  if (labelName in SPECIAL_LABELS) {
    return getNode(SPECIAL_LABELS[labelName]);
  } else {
      if (gtdlabels.indexOf(labelName) > -1) {
        return getNode(GTD_LABEL_PREFIX + labelName);
      } else {
          return getNode(LABEL_PREFIX + labelName);
	  }
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
    
    var actionMenuNode = getActionMenu();
    
    if (actionMenuNode) {
      var onchangeHandler = actionMenuNode.onchange;
      
      onchangeHandler.apply(actionMenu, null);    
    } else {
      GM_log("Not able to find a 'More Actions...' menu");
      return;
    }    
  }
}

function Banner() {
  this.backgroundNode = getNodeSet();
  this.backgroundNode.style.background = "#000";
  this.backgroundNode.style.MozOpacity = "0.70";
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
  boxNode.className = "banner";
  with (boxNode.style) {
    display = "none";
    position = "fixed";
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

Banner.prototype.show = function(opt_isBottomAnchored) {
  this.update("");
  document.body.appendChild(this.backgroundNode);
  document.body.appendChild(this.foregroundNode);

  this.backgroundNode.style.bottom = this.foregroundNode.style.bottom = 
    opt_isBottomAnchored ? "10%" : "";
  this.backgroundNode.style.top = this.foregroundNode.style.top = 
    opt_isBottomAnchored ? "" : "50%";

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
