// ==UserScript==
// @name           GMail Remove Trailing Quote
// @namespace      google
// @description    Removes "trailing" quoted text at the end of the email you're composing.
// @include        http*://mail.google.com/*
// ==/UserScript==

// Published at http://snarfed.org/greasemonkey_gmail_remove_trailing_quote
// and http://userscripts.org/scripts/show/86600
//
// TODO: get rid of the global vars and use an object that stores the textarea
// reference.

// Use GM_log() to print to the error console (message section).
// Components.utils.reportError() and
// getService(Components.interfaces.nsIConsoleService.logStringMessage()
// need permissions that they don't have when running in the mail.google.com
// and/or greasemonkey context, and i couldn't get window.dump() (should write
// to stderr or stdout) to work.

var remove_trailing_quotes_textarea;
var remove_trailing_quotes_last_value;
var remove_trailing_quotes_last_cursor_pos;

function remove_trailing_quotes() {
  textarea = remove_trailing_quotes_textarea;
  remove_trailing_quotes_last_value = textarea.value;
  remove_trailing_quotes_last_cursor_pos = get_cursor_pos(textarea);

  /* trim whitespace at beginning and end */
  textarea.value = textarea.value.replace(/^\s*/, '').replace(/\s*$/, '');

  var lines = textarea.value.split('\n');
  var first = null;
  var last = null;

  for (i = 0; i < lines.length; ++i) {
    /* trim whitespace at beginning and end */
    line = lines[i].replace(/^\s*/, '').replace(/\s*$/, '');

    /* preserve whole quotes */
    if (line.match(/^[ >]*On .+, .+ wrote:$/) &&
        (i == 0 || lines[i - 1][0] != '>')) {
      first = last = null;
      /* skip ahead to the next non-whole-quote line */
      do { ++i } while (i < lines.length && lines[i][0] == '>');
    } else if (!line || line[0] == '>') {
      last = i;
      if (first == null)
        first = i;
    } else if (line == '--') {
      break;
    } else {
      first = last = null;
    }
  }

  if (first != null && last != null) {
    lines.splice(first, last - first + 1, '' /* replacement element(s) */);
    textarea.value = lines.join('\n');
  }
}

function remove_trailing_quotes_undo() {
  if (remove_trailing_quotes_last_value) {
    remove_trailing_quotes_textarea.value = remove_trailing_quotes_last_value;
    set_cursor_pos(remove_trailing_quotes_textarea,
                   remove_trailing_quotes_last_cursor_pos);
  }
}

function remove_trailing_quotes_on_load(event) {
  canvas_frame = document.getElementById("canvas_frame");
  if (canvas_frame != null) {
    // old compose UI. drop old when new UI is pushed to external GMail.
    canvas_doc = canvas_frame.contentDocument;
  } else {
    // new compose UI.
    canvas_doc = document;
  }

  canvas_doc.removeEventListener("DOMNodeInserted", remove_trailing_quotes_node_inserted, false);
  canvas_doc.addEventListener("DOMNodeInserted", remove_trailing_quotes_node_inserted, false);
}

window.addEventListener("load", remove_trailing_quotes_on_load, false);

function remove_trailing_quotes_node_inserted(event) {
  textarea = canvas_doc.getElementsByClassName('Ak')[0];

  // reset, but only if this is truly a new composition. (sometimes the text box
  // for an existing composition gets reloaded, e.g. if you blur the text box
  // and then bring up the labels menu. we don't want to reset in those cases
  // because it destroys the undo history.)
  if (textarea != remove_trailing_quotes_textarea) {
    remove_trailing_quotes_textarea = textarea;
    remove_trailing_quotes_last_value = null;

    textarea.removeEventListener("blur", remove_trailing_quotes, false);
    textarea.addEventListener("blur", remove_trailing_quotes, false);

    textarea.removeEventListener("focus", remove_trailing_quotes_undo, false);
    textarea.addEventListener("focus", remove_trailing_quotes_undo, false);
  }
}

function get_cursor_pos(object) {
  if (document.selection) {  // IE
    object.focus ();
    range = document.selection.createRange();
    range.moveStart('character', -object.value.length);
    return range.text.length;
  } else if (object.selectionStart || object.selectionStart == '0') {  // Firefox
    return object.selectionStart;
  }
}   
   
function set_cursor_pos(object, pos) {
  if (object.setSelectionRange) {  // IE
    object.focus();
    object.setSelectionRange(pos, pos);
  } else if (object.createTextRange) {  // Firefos
    range = object.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}
