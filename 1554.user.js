// ==UserScript==
// @name          Gmail Conversation Preview
// @namespace     http://persistent.info/greasemonkey
// @description   Right-click on any conversation to get a preview bubble.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*

// ==/UserScript==

// TODO(mihaip): fix up list after archive
// TODO(mihaip): make arrow keys scroll the bubble

// Shorthand
function newNode(type) {return unsafeWindow.document.createElement(type);}
function newText(text) {return unsafeWindow.document.createTextNode(text);}
function getNode(id) {return unsafeWindow.document.getElementById(id);}

// Contants
const POINT_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAtCA" +
  "YAAABWHLCfAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFk" +
  "eXHJZTwAAAKaSURBVHjaxJgxqFJRGMevpiWkYfiQhEgIHBycQhcnoUFoDpdcXQPByTEnCbcGlz" +
  "eLmxHYYhA%2BCgfFMi1DNA1RrEiJDJ%2Fe9%2FV9l3vgJfW693o8%2FuHPOSqc3znn417%2FfC" +
  "YAkA4hk8lkMR0CjmAajg8Fv4fDM%2BFwBB%2Fh8IXmZsFg4lVpHo1GJYlOLsKqHqPB7XavZ7MZ" +
  "iISHCWw2m%2BVKpQIgEHwNvSJ4Op0GJhFgeq5eEzgcDsubzUYoPE1gp9O5Hg6HcF77Bt8hMLlU" +
  "KsG29gm%2Biv5B4GQyCX%2FTPuv8ksDBYFBerVZC4Q8J7HA41v1%2BH%2F6lfYD9rM6FQgEuEm" +
  "%2FwFfQ3AicSCfifeL8%2BnxLY7%2FfLy%2BVSKPwBgW02m9xut0GLeIFvsTrn83nQKh5gC3pE" +
  "4FgsBnrEo87HBPZ6vev5fC4UTnEIrFarXKvVQK92AR%2BxOmezWTAio%2BBL6PcExjgERmW0zk" +
  "8I7PF4lDgkEn6XxaFqtQq7SC%2F4OotDmUwGdpUeMMXeNwSORCJ%2FxCER8EcEdrlc68lkAjyk" +
  "FRxij1W5XAZe0hWHUqkU8BSXOLQvuKY4xB2uJw5xheuNQ9zgRuIQT7juOMQFjrptJA4ZleVc1%" +
  "2BAyDq9oHo%2FHJaw1167EYrGQer2e1Ol0pPF4LA0GA0npyajdoQI65vP5No1Gw2K323UDaFFy" +
  "s9lUFqc5wQhK8G2xk98nMMahs2KxeCG42%2B1Ko9FIWbzVaikA%2Blyv17Xs77P60jpBf7LgqW" +
  "%2FgpEi%2F5HI5cyAQUBaiBcls5wQhsAbRLt6iX6B76Bl6iv4FW60vuu%2BbtKNQKKTAptOpFs" +
  "Bz9e%2F1nQr6iqboutTVnWLwre9P1dugxT%2BiP6i7%2F4mAU26tMRXO9F29njMRfbnfAgwAHZ" +
  "MoiqxU6iwAAAAASUVORK5CYII%3D";

const SCROLLER_PADDING = 2 * 5;
const BUTTON_BAR_PADDING = 2 * 6;

const SHOW_PREVIEW_KEY = 86; // V

// Equivalents to values in the "More Actions..." menu
const ARCHIVE_COMMAND = "rc_^i";
const MARK_UNREAD_COMMAND = "ru";
const TRASH_COMMAND = "tr";

const CONVERSATION_DATA_MAP = [
  "id",
  "isUnread",
  "isStarred",
  "time",
  "people",
  "personalLevelIndicator",
  "subject",
  "snippet",
  "labels",
  "attachments",
  "id2",
  "isLongSnippet",
  "date"
];

const MESSAGE_INFO_DATA_MAP = [
  "ignored",
  "unknown",
  "unknown",
  "id",
  "unknown",
  "unknown",
  "senderFullName",
  "senderShortName",
  "senderEmail",
  "recipients",
  "date",
  "to",
  "cc",
  "unknown",
  "replyTo",
  "date",
  "subject",
  "unknown",  
  "unknown",
  "unknown",
  "unknown",
  "unknown",
  "date",
  "snippet",
  "snippet"
];

const SENDER_COLOR_MAP = [
  "#00681c", "#cc0060", "#008391", "#009486", "#5b1094", "#846600", "#670099", 
  "#790619"
];

const RULES = [ 
  ".PV_bubble {position: absolute; width: 600px; border: solid 2px #000; " +
    "background: #fff; font-size: 12px; margin: 0; padding: 0;}",
  ".PV_bubble.PV_loading {width: auto; height: auto;}",
  ".PV_bubble.PV_loading .PV_scroller {text-align: center; color: #999; " +
    "font-style: italic; padding: 2em;}",
  ".PV_bubble .PV_scroller {overflow: auto; padding: 5px; margin: 0;}",
  // Hide quoted portions, signatures and other non-essential bits
  ".PV_bubble .q, .PV_bubble .ea, .PV_bubble .sg, .PV_bubble .gmail_quote, " +
    ".PV_bubble .ad {display: none}",
  ".PV_bubble h1 {font-size: 12px; font-weight: normal; margin: 0;}",
  ".PV_bubble h1 .sender {font-weight: bold}",
  ".PV_bubble .PV_message {border-bottom: solid 2px #ccc; margin: 0;}",
  ".PV_bubble .PV_message:last-child {border-bottom: 0}",
  ".PV_bubble .PV_message .PV_message-body {margin: 0; padding: 0}",
  ".PV_bubble .PV_point {position: absolute; top: 10px; " + 
    "left: 0; margin-left: -31px; width: 31px; height: 45px;}",
  ".PV_bubble .PV_buttons {padding: 6px; border-bottom: solid 1px #616c7f; " +
    "border-left: solid 1px #616c7f; white-space: nowrap; margin: 0 0 0 7px; " +
    "background: #c3d9ff; -moz-border-radius: 0 0 0 7px;}",
  ".PV_bubble .PV_button {padding: 3px 5px 3px 5px; margin-right: 4px; " +
     "border-right: solid 1px #616c7f}",
  ".PV_bubble span.PV_button:last-child {border-right: 0;}"
];

gCurrentConversationList = [];
unsafeWindow.gCurrentWindow = null;
unsafeWindow.gCurrentContextMenuHandler = null;

// All data received from the server goes through the function top.js.P. By
// overriding it (but passing through data we get), we can be informed when
// new sets conversations arrive and update the display accordingly.
try {
  if (unsafeWindow.P && typeof(unsafeWindow.P) == "function") {
    var oldP = unsafeWindow.P;
    var thisWindow = window;
    
    unsafeWindow.P = function(window, data) {
      // Only override if it's a P(window, data) signature that we know about
      if (arguments.length == 2) {
        hookData(data);
      }
      oldP.apply(thisWindow, arguments);
    }
  }  
} catch (error) {
  // ignore;
}

function hookData(data) {
  var mode = data[0];
  
  switch (mode) {
    // start of conversation list
    case "ts":
      gCurrentConversationList = [];
      break;
    // conversation data
    case "t":
      for (var i = 1; i < data.length; i++) {
        var conversationData = data[i];    
        var conversation = {};
      
        for (var index in CONVERSATION_DATA_MAP) {
          var field = CONVERSATION_DATA_MAP[index];
          
          conversation[field] = conversationData[index];
        }
        
        gCurrentConversationList.push(conversation);
      }
      break;
    // end of conversation list
    case "te":
      window.setTimeout(function() {
        triggerHook(gCurrentConversationList);
      }, 0);
      break;
  }
}

function triggerHook(conversationList) {
  if (unsafeWindow.top.gCurrentWindow) {
    try {
    unsafeWindow.top.gCurrentWindow.PreviewBubble.hook(conversationList);
    } catch (error) {
      alert("exception: " + error);
    }
  } else {
    window.setTimeout(function() {
      triggerHook(conversationList);
    }, 10);
  }
}

if (getNode("tbd")) {
  initializeStyles();

  unsafeWindow.top.gCurrentWindow = unsafeWindow;
  unsafeWindow.top.gCurrentWindow.PreviewBubble = PreviewBubble;
  unsafeWindow.top.gCurrentBubble = null;
  unsafeWindow.top.gCurrentContextMenuHandler = null;    
}

function PreviewBubble(conversationRow) {
  this.conversationRow = conversationRow;
  this.conversationCheckbox = conversationRow.getElementsByTagName("input")[0];
  this.initialConversationSelectionState = this.conversationCheckbox.checked;
  
  // bubble
  this.bubbleNode = newNode("div");
  this.bubbleNode.className = "PV_bubble PV_loading";
  unsafeWindow.document.body.appendChild(this.bubbleNode);
  
  // buttons
  this.buttonsNode = newNode("div");
  this.buttonsNode.className = "PV_buttons";
  this.bubbleNode.appendChild(this.buttonsNode);
  
  this.buttonBarWidth = BUTTON_BAR_PADDING;

  var self = this;
  this.addButton("Close", function() {self.close();});
  this.addButton("Archive", bind(this, this.archive));
  this.addButton("Leave Unread", bind(this, this.markUnread));
  this.addButton("Trash", bind(this, this.trash));
   
  // point
  this.pointNode = newNode("img");
  this.pointNode.src = POINT_IMAGE;
  this.pointNode.className = "PV_point";
  this.bubbleNode.appendChild(this.pointNode);  
  
  // scroller
  this.scrollerNode = newNode("div");
  this.scrollerNode.className = "PV_scroller";
  this.scrollerNode.innerHTML = "Loading...";  
  this.bubbleNode.appendChild(this.scrollerNode);

  var conversationPosition = getAbsolutePosition(conversationRow);
  this.bubbleNode.style.top = (conversationPosition.top - 
    conversationRow.offsetHeight/2 - 30) + "px";
  var peopleNode = conversationRow.getElementsByTagName("span")[0];
  var peopleNodePosition = getAbsolutePosition(peopleNode);
  this.bubbleNode.style.left = (peopleNodePosition.left + 
    peopleNode.offsetWidth * 0.1 + this.pointNode.offsetWidth) + "px";

  this.bubbleNode.style.display = "none";
  this.bubbleNode.style.display = "block";
}

PreviewBubble.hook = function PreviewBubble_hook(conversationList) {
  // The bubble can be shown in response to a right click
  if (unsafeWindow.top.gCurrentContextMenuHandler) {
    window.removeEventListener("contextmenu", 
                               unsafeWindow.top.gCurrentContextMenuHandler, 
                               false);
  }

  // Since contextMenuHandler is an inner function, there are several
  // instances of it. We must keep track of the one that we install so that
  // we can remove it later (when the conversation list gets refreshed)
  unsafeWindow.top.gCurrentContextMenuHandler = function(event) {
    return PreviewBubble.contextMenuHandler(event, conversationList);
  };
  window.addEventListener("contextmenu", 
                          unsafeWindow.top.gCurrentContextMenuHandler,
                          false);

  // Or by pressing V.
  if (unsafeWindow.top.gCurrentKeyHandler) {
    window.removeEventListener("keydown",
                               unsafeWindow.top.gCurrentKeyHandler,
                               false);
  }
  unsafeWindow.top.gCurrentKeyHandler = function(event) {
    return PreviewBubble.keyHandler(event, conversationList);
  }
  window.addEventListener('keydown', 
                          unsafeWindow.top.gCurrentKeyHandler,
                          false);
}

PreviewBubble.contextMenuHandler = 
    function PreviewBubble_contextMenuHandler(event, conversationList) {
  var target = event.target;
      
  while (target && target.id.indexOf("w_") != 0) {
    target = target.parentNode;
   }
      
  if (target) {
    event.preventDefault();
    event.stopPropagation();
        
    var index = parseInt(target.id.substring(2));
        
    PreviewBubble.showBubble(target, conversationList[index]);
  }
}

PreviewBubble.keyHandler = function PreviewBubble_keyHandler(event, conversationList) {
  // Apparently we still see Firefox shortcuts like control-T for a new tab
  // and checking for modifiers lets us ignore those
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    return false;
  }
      
  // We also don't want to interfere with regular user typing
  if (event.target && event.target.nodeName) {
    var targetNodeName = event.target.nodeName.toLowerCase();
    if (targetNodeName == "textarea" ||
        (targetNodeName == "input" &&
         (!event.target.getAttribute("type") ||
          event.target.getAttribute("type").toLowerCase() == "text"))) {
      return false;
     }
  }
      
  if (event.keyCode != SHOW_PREVIEW_KEY) {
    if (unsafeWindow.top.gCurrentBubble) {
      // We don't close the bubble straight away since we want the
      // conversation to still be selected so that built-in keyboard
      // shortcuts still work
      window.setTimeout(function() {
        unsafeWindow.top.gCurrentBubble.close();
      }, 100);
    }

    return false;
  }
      
  var currentConversation = PreviewBubble.getCurrentConversation();
      
  if (currentConversation == -1) {
    return false;
  }
      
  PreviewBubble.showBubble(getNode("w_" + currentConversation),
                           conversationList[currentConversation]);
      
  return true;
}


PreviewBubble.getCurrentConversation = function PreviewBubble_getCurrentConversation() {
  var chevron = getNode("ar");
  var conversationTable = getNode("tb");
  var row = getNode("w_0");
      
  if (!row || !chevron || !conversationTable) {
    return -1;
  }
      
  return (chevron.offsetTop - conversationTable.offsetTop - 5)/
    row.offsetHeight;
}

PreviewBubble.showBubble = 
    function PreviewBubble_showBubble(conversationRow, conversation) {
  if (unsafeWindow.top.gCurrentBubble) {
    var sameRow = unsafeWindow.top.gCurrentBubble.conversationRow == 
                  conversationRow;
    unsafeWindow.top.gCurrentBubble.close();
    if (sameRow) {
      return;
    }
  }
      
  hideTooltips();
  var bubble =
    unsafeWindow.top.gCurrentBubble = 
    new PreviewBubble(conversationRow);
      
  bubble.selectConversation();
  bubble.installGlobalHideHandler();
  bubble.fill(conversation);          
}


PreviewBubble.prototype.selectConversation = 
    function PreviewBubble_selectConversation() {
  if (!this.conversationCheckbox.checked) {
    fakeMouseEvent(this.conversationCheckbox, "click");
    // We have to reset the classname for the conversation to be displayed as
    // read, since clicking on the checkbox causes it to be redrawn, and
    // according to Gmail's internal state it's still unread
    this.conversationRow.className = "rr sr";
  }
}

PreviewBubble.prototype.deselectConversation = 
    function PreviewBubble_deselectConversation(leaveUnread) {
  if (!this.initialConversationSelectionState) {
    fakeMouseEvent(this.conversationCheckbox, "click");    
  }
  
  if (!leaveUnread) {
    this.conversationRow.className = "rr";
  }
}

PreviewBubble.prototype.addButton = 
    function PreviewBubble_addButton(buttonTitle, action) {
  var buttonNode = newNode("span");
  buttonNode.innerHTML = buttonTitle;
  buttonNode.className = "PV_button lk";
  buttonNode.addEventListener("click", action, true);
  this.buttonsNode.appendChild(buttonNode);
  
  this.buttonBarWidth += buttonNode.offsetWidth;
}

PreviewBubble.prototype.fill = function PreviewBubble_fill(conversation) {      
  this.conversation = conversation;
  
  var self = this;      
  GM_xmlhttpRequest({
    'method': 'GET',
    'url' : getParentUrl() + "?&view=cv&search=all&th=" + 
              conversation.id + "&lvp=-1&cvp=2&qt=",
    'onload': function(details) {
      var messages = parseMessages(details.responseText);
      self.setContents(messages);
      self.shrinkToFit();
    }
  });
}

PreviewBubble.prototype.setContents = 
    function PreviewBubble_setContents(messages) {
  var senderColors = {};
  var senderColorCount = 0;
      
  this.scrollerNode.innerHTML = "";
      
  for (var i=0; i < messages.length; i++) {
    var m = messages[i];
        
    if (!m.body) {
      continue;
    }
        
    var sender = m.senderFullName;
    if (!senderColors[sender]) {
      senderColors[sender] = 
        SENDER_COLOR_MAP[senderColorCount % SENDER_COLOR_MAP.length];
      senderColorCount++;
    }
        
    this.scrollerNode.innerHTML += 
      '<div class="PV_message">' +
        "<h1>" + 
          '<span class="PV_sender" style="color: ' + senderColors[sender] + 
            '">' + sender + "</span>" +
          " to " + m.to +
        "</h1>" +
        '<div class="PV_message-body">' + m.body + "</div>" +
      '</div>';
  }

  // Remove PV_loading CSS class
  this.bubbleNode.className = "PV_bubble";  
}

PreviewBubble.prototype.shrinkToFit = function PreviewBubble_shrinkToFit() {
  var bubblePosition = getAbsolutePosition(this.bubbleNode);
  var rowPosition = getAbsolutePosition(this.conversationRow);
  
  // We first try to find the ideal width. We do a binary between the maximum
  // (all the way to the right edge of the conversation list) and the minimum
  // (the button bar's width). 
  this.bubbleNode.style.width = 
    (rowPosition.left + this.conversationRow.offsetWidth - bubblePosition.left - 
    4) + "px";

  var maxWidth = this.scrollerNode.offsetWidth - SCROLLER_PADDING;
  var minWidth = this.buttonBarWidth;
  // We use the height of the scroller node as the conditional, since if the
  // bubble gets too narrow the height will increase. We use the clientHeight
  // attribute as opposed to the offsetHeight one because we want to detect
  // the case where horizontal scrollbars show up (for HTML messages that
  // don't wrap)
  var startHeight = this.scrollerNode.clientHeight;
  
  while (maxWidth - minWidth > 1) {
    var currentWidth = Math.round((maxWidth + minWidth)/2);
    this.scrollerNode.style.width = currentWidth + "px";
    
    var currentHeight = this.scrollerNode.clientHeight;
    
    if (currentHeight == startHeight) {
      maxWidth = currentWidth;
    } else {
      minWidth = currentWidth;
    }
  }
  
  this.scrollerNode.style.width = "auto";
  this.bubbleNode.style.width = maxWidth + SCROLLER_PADDING;
  
  if (this.scrollerNode.innerHTML == "") {
    this.scrollerNode.style.display = "none";
  }

  // We want the bubble to be no taller than the window height (minus some
  // padding). We also don't want to shift up the bubble more than necessary,
  // so that the action links stay as close to the user's cursor as possible.
  var newBubbleTop = -1;
  var maxHeight = window.innerHeight - 20;
  var minTop = window.scrollY + 10;
  
  if (this.bubbleNode.offsetHeight > maxHeight) {
    this.scrollerNode.style.height = 
      (maxHeight - SCROLLER_PADDING - this.buttonsNode.offsetHeight - 4) + "px";
    newBubbleTop = minTop;
  } else {
    var bubblePosition = getAbsolutePosition(this.bubbleNode);
    var bubbleBottom = bubblePosition.top + this.bubbleNode.offsetHeight;
    
    if (bubbleBottom > window.scrollY + 10 + maxHeight) {
      newBubbleTop = 
        window.scrollY + 10 + maxHeight - this.bubbleNode.offsetHeight;
    }
  }  
    
  if (newBubbleTop != -1) {
    var oldTop = this.bubbleNode.offsetTop;
    this.bubbleNode.style.top = newBubbleTop + "px";
    var delta = this.bubbleNode.offsetTop - oldTop;
    this.pointNode.style.marginTop = (-delta) + "px";
  }
}

PreviewBubble.prototype.installGlobalHideHandler = 
    function PreviewBubble_installGlobalHideHandler() {
  if (this.bodyClickClosure) {
    this.removeGlobalHideHandler();
  }
  
  this.bodyClickClosure = bind(this, 
    function(event) {
      var insideBubble = false;
      var node = event.target;
      while (node) {
        if (node == this.bubbleNode) {
          insideBubble = true;
          break;
        }
        node = node.parentNode;
      }
      
      if (!insideBubble) {
        this.close();
      }
    });
  
  document.body.addEventListener("click", this.bodyClickClosure, true);
}

PreviewBubble.prototype.removeGlobalHideHandler = 
    function PreviewBubble_removeGlobalHideHandler() {
  if (this.bodyClickClosure) {
    document.body.removeEventListener("click", this.bodyClickClosure, true);  
    
    this.bodyClickClosure = null;
  }
}

PreviewBubble.prototype.close = function PreviewBubble_close(leaveUnread) {
  this.bubbleNode.parentNode.removeChild(this.bubbleNode);
      
  this.removeGlobalHideHandler();
  this.deselectConversation(leaveUnread);
  
  showTooltips();
  
  unsafeWindow.top.gCurrentBubble = null;
}

PreviewBubble.prototype.archive = function PreviewBubble_archive() {
  doCommand(ARCHIVE_COMMAND);
  this.close();
}

PreviewBubble.prototype.markUnread = function PreviewBubble_markUnread() {
  if (this.conversation) {
    var postData = "act=ur&at=" + getCookie("GMAIL_AT") + 
                   "&vp=&msq=&ba=false&t=" + this.conversation.id;
    GM_xmlhttpRequest({
      'method': 'POST',
      'url': getParentUrl() + "?&search=inbox&view=tl&start=0" + 
               this.conversation.id + "&lvp=-1&cvp=2&qt=",
      'headers': {
        'Content-Length': postData.length,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      'data': postData,
      // TODO(mihaip): check for success?
      'onload': function() {}
    });
  }

  this.close(true);
}

PreviewBubble.prototype.trash = function PreviewBubble_trash() {
  doCommand(TRASH_COMMAND);
  this.close();
}


// Utility functions

function initializeStyles() {
  var styleNode = newNode("style");
  
  document.body.appendChild(styleNode);

  var styleSheet = document.styleSheets[document.styleSheets.length - 1];

  for (var i=0; i < RULES.length; i++) {
    styleSheet.insertRule(RULES[i], 0);
  }  
}

function hideTooltips() {
  var styleNode = newNode("style");
  styleNode.id = "tooltipHider";
  
  document.body.appendChild(styleNode);

  var styleSheet = document.styleSheets[document.styleSheets.length - 1];
  
  styleSheet.insertRule("#pop {display: none !important}", 0);
  styleSheet.insertRule("#tip {display: none !important}", 0);
}

function showTooltips() {
  var styleNode = getNode("tooltipHider");
  
  styleNode.parentNode.removeChild(styleNode);
}

function doCommand(command) {      
  // Command execution is accomplished by creating a fake action menu and
  // faking a selection from it (we can't use the real action menu since the
  // command may not be in it, if it's a button)
  var actionMenu = newNode("select");
  var commandOption = newNode("option");
  commandOption.value = command;
  commandOption.innerHTML = command;
  actionMenu.appendChild(commandOption);  
  actionMenu.selectedIndex = 0;
  
  // Different onselect handlers for thread view and conversation view
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

function fakeMouseEvent(node, eventType) {
  var event = node.ownerDocument.createEvent("MouseEvents");
    
  event.initMouseEvent(eventType,
                       true, // can bubble
                       true, // cancellable
                       node.ownerDocument.defaultView,
                       1, // clicks
                       50, 50, // screen coordinates
                       50, 50, // client coordinates
                       false, false, false, false, // control/alt/shift/meta
                       0, // button,
                       node);

  node.dispatchEvent(event);
}

function bind(object, func) {
  return function() { 
    return func.apply(object, arguments); 
  }
}

function getAbsolutePosition(node) {
  var top = node.offsetTop;
  var left = node.offsetLeft;
  
  for (var parent = node.offsetParent; parent; parent = parent.offsetParent) {
    top += parent.offsetTop;
    left += parent.offsetLeft;
  }

  return {top: top, left: left};
}

const DATA_BLOCK_RE = new RegExp('(D\\(\\["[\\s\\S]*?\n\\);\n)', 'gm');

function parseMessages(conversationText) {
  // Unfortunately we can't parse the text to a DOM since it's HTML and
  // DOMParser can only deal with XML. RegExps it is.
  
  var parsedText = "";
  
  var matches = conversationText.match(DATA_BLOCK_RE);
  
  var messages = [];
  var currentMessage = null;
  
  function D(data) {
    mode = data[0];
    switch (mode) {
      case "mi": 
        currentMessage = {};
        for (var i=1; i < data.length; i++) {
          currentMessage[MESSAGE_INFO_DATA_MAP[i]] = data[i];
        }
        currentMessage.body = "";
        messages.push(currentMessage);
        break;
      case "mb": 
        currentMessage.body += data[1];
        break;
    }
  }
  
  eval(matches.join(""));
  
  return messages;
}

function getCookie(name) {
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}

function getParentUrl() {
  return window.location.href.replace(/\?.*/, '');
}