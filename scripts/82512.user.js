// ==UserScript==
// @name           Programmer's Textarea
// @namespace      http://arantius.com/misc/greasemonkey/
// @description    Add features for writing code in textareas.  Edit source to see and enable/disable features.
// @include        *
// @exclude        *mail.google.com*
// @version        2.0
// ==/UserScript==

// Version History:
// 2.0 (Aug 16, 2010):
//   Added INDENT_SELECTIONS feature.
// 1.0 (??):
//   Basic feature set.

// Edit these constants to control options.

// Set this to 0 or false to disable.  Otherwise, inserts this many spaces
// instead, when pressing the TAB key.
const INSERT_TABS_AS_SPACES = 2;
const INDENT = str_repeat(" ", INSERT_TABS_AS_SPACES);

// Jump to the first non-whitespace character when pressing HOME (unless the
// cursor is already there, then move to the very first).
const SMART_HOME = true;

// Preserve indentation level of current line, when pressing the ENTER key.
const PRESERVE_INDENTATION_NEWLINE = true;

// Apply in- and de- dent to selected lines, on TAB, Shift-TAB.
const INDENT_SELECTIONS = true;

// Don't edit below this line!

// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ //

// http://phpjs.org/functions/str_repeat:526
function str_repeat(input, multiplier) {
  return new Array(multiplier+1).join(input); 
}

function textBeforeCaret(textarea) {
  return textarea.value.substr(0, textarea.selectionStart);
}

function textAfterCaret(textarea) {
  return textarea.value.substr(textarea.selectionStart);
}

function selectedText(textarea) {
  return textarea.value.substr(textarea.selectionStart, textarea.selectionEnd);
}

function setTextarea(textarea, value, caret) {
  var scrollTop = textarea.scrollTop;
  textarea.value = value;
  textarea.scrollTop = scrollTop;
  if (caret) textarea.setSelectionRange(caret, caret);
}

// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ //

function tabToSpaces(textarea) {
  var pre = textBeforeCaret(textarea) + INDENT;
  setTextarea(textarea, pre + textAfterCaret(textarea), pre.length);
}

function preserveIndent(textarea) {
  var pre = textBeforeCaret(textarea);
	var m = pre.match(/([\s\S]*\n)?(\s*).*\n/);
	if (m) {
	  var pos = pre.length + m[2].length;
	  setTextarea(textarea, pre + m[2] + textAfterCaret(textarea), pos)
  }
}

function smartHome(textarea, event) {
	if (event.ctrlKey) return;
	
	var a = textBeforeCaret(textarea);
	var curPos = a.length;
	a += textAfterCaret(textarea).replace(/(\n[\s\S]*)/, "");
	var line = a.match(/([\s\S]*\n)(\s*)(.*)/);
	
	if (!line) return;
	var linePos = line[1].length;
	var textPos = linePos + line[2].length;
	
	var setPos = textPos;
	if (curPos == setPos) setPos = linePos;

  if (event.shiftKey) {
  	textarea.setSelectionRange(setPos, curPos);
  } else {
  	textarea.setSelectionRange(setPos, setPos);
	}

	event.preventDefault();
}

function indentSelection(textarea, event) {
  // Find length boundaries for pre, in, and post selection.
  var start = textarea.selectionStart;
  var end = textarea.selectionEnd;
  var len1 = start;
  var len2 = end - start;
  var len3 = textarea.value.length - end;

  // Find the full lines that contain the selection, and the leading and
  // trailing bits around them.
  var re_str = '^'
      + '([\\s\\S]{0,'+len1+'}(?:\\n|^))' // up to len1 characters
      + '([\\s\\S]{'+len2+',}?(?:\\n|$))' // fewest, at least len2 characters
      + '([\\s\\S]{0,'+len3+'})'  // the rest, up to least len3
      + '$';
  var m = textarea.value.match(new RegExp(re_str));
  
  // Add or remove indentation.
  if (event.shiftKey) {
    var new_content = m[2].replace(new RegExp('^' + INDENT, 'mg'), '');
    var select_offset = -1 * INSERT_TABS_AS_SPACES;
    if (m[2] == new_content) select_offset = 0;
  } else {
    var new_content = m[2].replace(/^/mg, INDENT);
    var select_offset = INSERT_TABS_AS_SPACES;
  }
  // Replace the value.
  console.log(m[2]);
  console.log(new_content);
  var num_lines = m[2].split('\n').length;
  setTextarea(textarea, m[1]+new_content+m[3]);
  textarea.selectionStart = start + select_offset;
  textarea.selectionEnd = end + select_offset * (num_lines - 1);
}

// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ //

function handleKeypress(event) {
  if (!event || !event.target || !event.target.tagName
	  || "TEXTAREA"!==event.target.tagName
  ) {
	  return;
  }

  var textarea = event.target;
  var has_selection = textarea.selectionStart != textarea.selectionEnd;
  if (9==event.keyCode && !event.ctrlKey) {
    if (INDENT_SELECTIONS && has_selection) {

      if (textarea.selectionStart != textarea.selectionEnd) {
        event.preventDefault();
        setTimeout(indentSelection, 0, textarea, event);
      }
    } else if (INSERT_TABS_AS_SPACES && !event.shiftKey) {
      event.preventDefault();
      setTimeout(tabToSpaces, 0, textarea);
    }
  } else if (PRESERVE_INDENTATION_NEWLINE
      && 13==event.keyCode && !event.ctrlKey
      && textarea.selectionStart == textarea.selectionEnd
  ) {
    setTimeout(preserveIndent, 0, textarea);
	} else if (SMART_HOME && 36==event.keyCode) {
		smartHome(textarea, event);
  }
}

// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ //

document.body.addEventListener("keypress", handleKeypress, false);
