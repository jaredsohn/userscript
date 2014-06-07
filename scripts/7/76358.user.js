// vim: ts=2 sts=2 sw=2 et
//
// ==UserScript==
// @name           Multiple Sentence Saver
// @namespace      http://www.arthaey.com
// @description    Save multiple selected texts while reading a page
// @include        *
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://usocheckup.redirectme.net/76358.js
// @author         Arthaey Angosii <arthaey@gmail.com>
// ==/UserScript==

if (window.top != window.self)  // don't run on frames or iframes
    return;

/* VARIABLES *****************************************************************/

// global variables :(
var g_shiftKey = false;
var g_typingText = false;

// DOM element IDs
var SAVED_TEXT_ID = "saved-text";
var TO_COPY_ID = "saved-text-to-copy";
var CLOSE_BUTTON_ID = "saved-text-close";
var STATUS_NOTE_ID = "status-note";

// GM_get and setValue keys
var VIEW_INSTRUCTIONS = "hasSeenInstructions";
var SAVE_KEY = "keyForSave";
var VIEW_KEY = "keyForView";

// preferences & saved data, plus their default values
var g_savedValues = {};
g_savedValues[VIEW_INSTRUCTIONS] = GM_getValue(VIEW_INSTRUCTIONS, true);
g_savedValues[SAVE_KEY] = GM_getValue(SAVE_KEY, "S");
g_savedValues[VIEW_KEY] = GM_getValue(VIEW_KEY, "V");

// the following sites already define their own Shift-key commands
var g_keyConflicts = {
  A: [ "www.google.com/reader" ],
  S: [ "www.google.com/reader" ],
};

// keeps saved text in sync between windows / tabs / sessions
var SavedText = {

  SAVED_TEXT: "savedText",
  SAVED_TEXT_DELIM: " -DELIM- ",

  retrieve: function () {
    var texts = GM_getValue(this.SAVED_TEXT, null);
    texts = (texts) ? texts.split(this.SAVED_TEXT_DELIM) : [];
    return texts;
  },

  add: function(text) {
    var texts = this.retrieve();
    texts.push(text);
    GM_setValue(this.SAVED_TEXT, texts.join(this.SAVED_TEXT_DELIM));
  },

  remove: function(text) {
    var texts = this.retrieve();
    var ndx = $.inArray(text, texts);
    texts.splice(ndx, 1);
    GM_setValue(this.SAVED_TEXT, texts.join(this.SAVED_TEXT_DELIM));
  },

  clear: function() {
    GM_deleteValue(this.SAVED_TEXT);
  },

  toHTML: function () {
    var texts = this.retrieve();
    var html = "";
    $.each(texts, function(i, text) {
      html += "<div class='sentence'>" + text + "</div>";
    });
    return html;
  }

};

/* SETUP *********************************************************************/

setup();

/* MAIN FUNCTIONALITY ********************************************************/

function saveSelectedText() {
  var text = new String(window.getSelection());
  if (text.match(/^\s*$/)) {
    showStatus("No selected text to save");
  }
  else {
    SavedText.add(text);
    showStatus("Saved text");
    refreshSavedTextView();
  }
}

function viewSavedText() {
  var div = $("#" + SAVED_TEXT_ID);
  var textToCopy = $("#" + TO_COPY_ID);
  textToCopy.html(SavedText.toHTML());

  // allow deleting of individual sentences
  $("#" + TO_COPY_ID + " .sentence").click(function() {
    var sentence = $(this).text();
    if (confirm("Delete this sentence?\n\n" + sentence)) {
      SavedText.remove(sentence);
      viewSavedText();
    }
  });
  $("#" + TO_COPY_ID + " .sentence").hover(
    function() {
      $(this).addClass("highlight");
      $(this).attr("title", "Click to delete");
    },
    function() {
      $(this).removeClass("highlight");
      $(this).removeAttr("title");
    }
  );

  div.show();

  // select text so it's ready for Ctrl-C to copy it
  var range = document.createRange();
  range.selectNode(textToCopy[0]);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
}

function clearSavedText() {
  SavedText.clear();
  refreshSavedTextView();
}

function handleCommands(event) {
  if (g_typingText) return;
  event.shift = isShiftPlusKey;

  var saveKey = g_savedValues[SAVE_KEY];
  var viewKey = g_savedValues[VIEW_KEY];

  if (event.keyCode == 16) { // shift key
    g_shiftKey = true;
  }
  else if (event.shift(saveKey)) {
    saveSelectedText();
  }
  else if (event.shift(viewKey)) {
    viewSavedText();
  }
  else {
    g_shiftKey = false;

    if (event.keyCode == 27) { // escape key
      $("#" + SAVED_TEXT_ID).hide();
    }
  }
}

function changeCommandKeys() {
  var saveKey = prompt("To save selected text, press Shift + ", g_savedValues[SAVE_KEY]);
  var viewKey = prompt("To view saved text, press Shift + ", g_savedValues[VIEW_KEY]);
  saveKey = saveKey.toUpperCase();
  viewKey = viewKey.toUpperCase();

  g_savedValues[SAVE_KEY] = saveKey;
  g_savedValues[VIEW_KEY] = viewKey;

  persistValues(SAVE_KEY, VIEW_KEY);
}

function persistValues() {
  var keys = arguments;
  if (arguments.length == 0) { // save all settings
    var i = 0;
    keys = [];
    for (var key in g_savedValues) {
      keys[i++] = key;
    }
  }

  $.each(keys, function(i, key) {
    GM_setValue(key, g_savedValues[key]);
  });
}


/* HELPER FUNCTIONS **********************************************************/

function showStatus(msg) {
  if (!msg) return;
  var statusNote = $("#" + STATUS_NOTE_ID);
  statusNote.html(msg);
  showStatusBriefly(1000);
}

function showInstructionsOnce(statusNote) {
  var hasSeen = g_savedValues[VIEW_INSTRUCTIONS];
  if (!hasSeen) showStatusBriefly();
  g_savedValues[VIEW_INSTRUCTIONS] = true;
}

function showStatusBriefly(delay) {
  var delay = delay || 5000
  var statusNote = $("#" + STATUS_NOTE_ID);
  statusNote.fadeIn();
  window.setTimeout(function() { statusNote.fadeOut("slow") }, delay);
}

function refreshSavedTextView() {
  if (isVisible(SAVED_TEXT_ID)) {
    viewSavedText();
  }
}

function isVisible(id) {
  var element = $("#" + id);
  return element.is(":visible");
}

/* SIDE EFFECT: resets g_shiftKey to false if match is found */
/* "this" refers to an Event object */
function isShiftPlusKey(key) {
  var match = false;
  if (g_shiftKey) {
    if (key.charCodeAt(0) == this.keyCode) {
      g_shiftKey = false;
      match = true;
    }
  }
  return match;
}

function warnIfKeyConflicts() {
  var saveConflict = keyConflictMsg(SAVE_KEY, "Save");
  var viewConflict = keyConflictMsg(VIEW_KEY, "View");
  var conflictMsg = '';
  var conflict;

  if (saveConflict && viewConflict) {
    conflictMsg = "The " + saveConflict + " and " + viewConflict + " conflict with this site.";
  }
  else if (conflict = (saveConflict || viewConflict)) {
    conflictMsg = "The " + conflict + " conflicts with this site.";
  }

  if (conflictMsg) {
    conflictMsg += '<br><br> Use the Greasemonkey "User Script Commands" menu to <br> customize the keyboard shortcuts.';
  }

  showStatus(conflictMsg);
}

function keyConflictMsg(keyPrefName, commandName) {
  var msg = '';
  var href = location.href;
  var key = g_savedValues[keyPrefName];
  var urls = g_keyConflicts[key];

  if (urls) {
    var found = false;
    for (var i = 0; !found && i < urls.length; i++) {
      found = href.match(urls[i]);
    }
    if (found) {
      msg += commandName + " command Shift-" + g_savedValues[keyPrefName];
    }
  }

  return msg;
}

/* NASTY HTML SETUP FUNCTIONS ************************************************/

function setup() {
  var saveKey = g_savedValues[SAVE_KEY];
  var viewKey = g_savedValues[VIEW_KEY];

  // create "User Script Commands" menu items, in addition to keyborad shortcuts
  GM_registerMenuCommand("Save selected text (Shift-" + saveKey + ")", saveSelectedText);
  GM_registerMenuCommand("View saved text (Shift-" + viewKey + ")", viewSavedText);
  GM_registerMenuCommand("Delete all saved text", clearSavedText);
  GM_registerMenuCommand("Change keyboard shortcuts", changeCommandKeys);

  // listen for key presses to initiate commands
  $(document).keydown(function(event) { handleCommands(event) });

  // ignore key presses when an input field has focus
  $("input, textarea, select").focus(function() { g_typingText = true });
  $("input, textarea, select").blur( function() { g_typingText = false });

  // warn if there is a known conflict with the defined command keys
  warnIfKeyConflicts();

  // create and hide saved text div
  if ($("#" + SAVED_TEXT_ID).length == 0) {
    var savedText = createSavedTextDiv();
    savedText.hide();
  }

  // create and show (but fade out) status note div
  if ($("#" + STATUS_NOTE_ID).length == 0) {
    var statusNote = createStatusNoteDiv();
    statusNote.hide();
    showInstructionsOnce(statusNote);
  }
}

function createSavedTextDiv() {
  var savedText = $("<div/>");
  savedText.attr("id", SAVED_TEXT_ID);

  // close button
  var closeButton = $("<div id='" + CLOSE_BUTTON_ID + "'>x</div>");
  closeButton.click(function() { $("#" + SAVED_TEXT_ID).hide() });

  // close the view of saved sentences once they're copied to the clipboard
  document.addEventListener("copy", function() {
    var savedText = $("#" + SAVED_TEXT_ID);
    savedText.hide();
  }, true);

  // add elements to saved text div
  savedText.append(closeButton);
  savedText.append("<h1>Saved Text</h1>");
  savedText.append("<p>Press <b>Ctrl-C</b> (or <b>Cmd-C</b>) to copy these sentences to the clipboard, or <a id='clearSavedTextLink' href='#'>delete all saved text</a>.</p>");
  savedText.append("<div id='" + TO_COPY_ID + "' />");

  // style and add to the DOM
  GM_addStyle(savedTextCSS());
  $("body").append(savedText);

  // define behavior for "clear saved text" link above
  $("#clearSavedTextLink").click(clearSavedText);

  return savedText;
}

function createStatusNoteDiv() {
  var statusNote = $("<div/>");
  statusNote.attr("id", STATUS_NOTE_ID);

  // default content: instructions
  var note = "Save text with <b>Shift-" + g_savedValues[SAVE_KEY] + "</b>. " +
             "View text with <b>Shift-" + g_savedValues[VIEW_KEY] + "</b>." +
             "<br><br>Use the Greasemonkey \"User Script Commands\" menu to " +
             "<br>access these commands or to customize the keyboard shortcuts.";
  statusNote.html(note);

  // style and add to the DOM
  GM_addStyle(statusNoteCSS());
  $("body").append(statusNote);

  return statusNote;
}

function savedTextCSS() {
  return "" +
    // container div
    "#" + SAVED_TEXT_ID + " {" +
    "  color: black;" +
    "  background-color: #eff6ff;" +
    "  position: fixed;" +
    "  top: 1em;" +
    "  left: 1em;" +
    "  padding: 0.5em 1em;" +
    "  z-index: 1000;" +
    "  border: 2px solid black;" +
    "  line-height: 1em;" +
    "  text-align: left;" +
    "  font-size: 11pt;" +
    "}" +
    // heading
    "#" + SAVED_TEXT_ID + " h1 {" +
    "  margin-top: 0;" +
    "  font-size: 150%;" +
    "  float: none;" +
    "  padding: 0.5em 0;" +
    "}" +
    // list of sentences
    "#" + TO_COPY_ID + " {" +
    "  counter-reset: text-num;" +
    "  overflow-y: auto;" +
    "  line-height: 1.2em;" +
    "}" +
    "#" + TO_COPY_ID + " .sentence:before {" +
    "  content: counter(text-num) '. ';" +
    "  counter-increment: text-num;" +
    "}" +
    "#" + TO_COPY_ID + " .sentence.highlight {" +
    "  cursor: pointer;" +
    "  color: red;" +
    "}" +
    // close button
    "#" + CLOSE_BUTTON_ID + " {" +
    "  float: right;" +
    "  display: inline;" +
    "  border: 1px solid gray;" +
    "  width: 1em;" +
    "  background-color: #ffcfd1;" +
    "  color: red;" +
    "  font-weight: bold;" +
    "  -moz-border-radius: 3px;" +
    "  text-align: center;" +
    "}" +
    "#" + CLOSE_BUTTON_ID + ":hover {" +
    "  cursor: pointer;" +
    "  background-color: red;" +
    "  color: white;" +
    "}"
  ;
}

function statusNoteCSS() {
  return "" +
    "#" + STATUS_NOTE_ID + " {" +
    "  color: black;" +
    "  background-color: yellow;" +
    "  position: fixed;" +
    "  top: 0;" +
    "  right: 0;" +
    "  padding: 0.5em 1em;" +
    "  z-index: 1000;" +
    "  border: 2px solid black;" +
    "  line-height: 1em;" +
    "  text-align: center;" +
    "}"
  ;
}
