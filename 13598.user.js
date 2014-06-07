// ==UserScript==
// @name           FR Posting Form Enhancer
// @namespace      http://cynwoody.googlepages.com/fr_posting_form_enhancer.html
// @description    Makes the posting page easier to use.
// @date           2009-11-03
// @include        http://*.freerepublic.com/perl/post*
// @include        http://freerepublic.com/perl/post*
// ==/UserScript==

const INPUT_FRACTION = 0.5; // of window height to give to the main input box

function $(id) {return document.getElementById(id);}

function $x(xpath, contextNode, resultType)
{
    contextNode = contextNode || document.body;
    resultType = resultType || XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
    return document.evaluate(xpath, contextNode, null, resultType, null);
}

function $xFirst(xpath, contextNode)
{
    var xpr = $x(xpath, contextNode, XPathResult.FIRST_ORDERED_NODE_TYPE);
    return xpr.singleNodeValue;
}

// Removes those extra blank lines that seem to crop up at the end
// of certain posts.

function removeBlankLines(doc)
{
    var list = $x('.//br[@clear="all"]', doc);
    for (var x=0, limit=list.snapshotLength; x<limit; ++x) {
        var br = list.snapshotItem(x);
        br.parentNode.removeChild(br);
    }
}

// Adds a button to the HTML toolbar. Parameters are the name on the
// button, the button's handler function, the title text to display
// when the mouse hovers over the button, and the control key to
// trigger the button's handler via the keyboard.

function addButton(name, handler, title, key)
{
    var b = document.createElement('input');
    b.type = 'button';
    b.value = name;
    if (title.slice(-1) != '.')
        title += ' the selection.';
    var keyCode;
    if (key) {
        keyCode = key.charCodeAt(0);
        if (key.match(/^enter$/i))
            keyCode = 13;
        else if (key == '<')
            keyCode = ','.charCodeAt(0);
        var keyName = 'Ctrl-';
        if (key.match(/^[A-Z<]/)) {
            keyName += 'Shift-';
            keyCode = -keyCode;
        }
        if (key.match(/^.\+/)) {
        	key = key[0];
        	keyName += 'Alt-';
        	keyCode |= 1024;
        }
        keyName += key;
        title += '[' + keyName + ']';
    }
    b.title = title;
    b.style.cssText = 'padding-left:0px;padding-right:0px';
    if (typeof handler == 'string') {
        if (handler.charAt(0) == '<')
            handler = wrap(addTag, handler);
        else
            handler = wrap(enTag, handler);
    }
    addKeyHandler(key, keyCode, handler);
    b.addEventListener('click', handler, false);
    buttons.appendChild(b);
    return b;
}

// Adds a keyboard shortcut to the key handler table.

function addKeyHandler(key, keyCode, handler)
{
    if (keyCode) {
        if (keyHandlers[keyCode])
            alert('Duplicate shortcut key: ' + key);
        keyHandlers[keyCode] = handler;
    }
}

// Returns a closure that invokes the handler with the supplied arg.

function wrap(handler, arg)
{
    return function() {handler(arg)};
}

// Adds an extra space between buttons in the HTML toolbar.

function addSpacer()
{
    var spacer = document.createElement('span');
    spacer.innerHTML = '&nbsp';
    buttons.appendChild(spacer);
}

// Generates HTML to quote from a post. Italicizes the quote and adds
// a <p> tag to leave a line before the reply begins.

function quote()
{
    var end = enTag('i');
    var ss = replyBox.selectionStart;
    var se = replyBox.selectionEnd;
    setSelection(end);
    addOnOwnLine('<p>');
    if (ss == se)
        setSelection(ss);
}

// Surrounds the selection with a pair of <blockquote> tags.

function blockQuote()
{
    enclose('<blockquote>\n', '\n</blockquote>');
}

// Link-enables the selection, using a URL supplied via a prompt.

function link()
{
    var url = window.prompt('Enter link URL:', 'http://');
    if (!url)
        return;
    enclose('<a href="' + url + '">', '</a>');
}

// Adds an image, using a URL supplied via a prompt.

function image()
{
    var url = window.prompt('Enter image URL:', 'http://');
    if (!url)
        return;
    addTag('<img border=0 src="' + url + '">');
}

// Adds a table with a single cell (which contains the selection, if any).

function makeTable()
{
    enclose('<table><tbody align=center>\n<tr>\n<td>',
            '</td>\n</tr>\n</tbody></table>');
}

// Adds a table row.

function makeRow()
{
    enclose('<tr>\n<td>', '</td>\n</tr>');
}
// Turns the selection into an ordered or unordered list, depending
// on the tagName. Changes any leading asterisks in the selection into
// <li> tags.

function makeList(tagName)
{
    startTag = '<' + tagName + '>\n';
    endTag = '\n</' + tagName + '>';
    var s = replyBox.selectionStart;
    var e = replyBox.selectionEnd;
    if (e <= s) {
        enclose(startTag, endTag);
        return;
    }
    var t = replyBox.value;
    var selection = t.slice(s, e);
    selection = selection.replace(/^\s*\*/gm, '<li>');
    setText(t.slice(0, s) + selection + t.slice(e));
    setSelection(s, s + selection.length);
    enclose(startTag, endTag);
}

// Makes opening and closing tags for the supplied tag name and encloses
// the selection between them.

function enTag(tagName)
{
    var startTag = '<' + tagName + '>';
    var endTag = '</' + tagName + '>';
    return enclose(startTag, endTag);
}

// Encloses the selection between the two supplied tags. If there is
// no selection, the cursor is left positioned to add content.

function enclose(startTag, endTag)
{
    var s = replyBox.selectionStart;
    var e = replyBox.selectionEnd;
    var t = replyBox.value;
    var selection = t.slice(s, e);
    var replacement;
    replacement = startTag + selection + endTag;
    setText(t.slice(0, s) + replacement + t.slice(e));
    replyBox.focus();
    if (selection.length > 0)
        setSelection(s, s + replacement.length);
    else
        setSelection(s + startTag.length);
    return s + replacement.length;
}

// Adds a tag at the cursor and leaves the cursor after it.

function addTag(tag)
{
    var s = replyBox.selectionStart;
    var p = replyBox.selectionEnd;
    var t = replyBox.value;
    replyBox.focus();
    setText(t.slice(0, s) + tag + t.slice(p));
    setSelection(p + tag.length);
}

// Adds the supplied tag on a line by itself in the reply box.

function addOnOwnLine(tag)
{
    var p = replyBox.selectionEnd;
    var t = replyBox.value;
    if (t.length > 0 && p > 0 && t.charAt(p-1) != "\n")
        tag = "\n" + tag;
    if (p >= t.length || t.charAt(p) != '\n')
        tag += "\n";
    addTag(tag);
    if (t.charAt(p) == "\n") {
        ++replyBox.selectionStart;
    }
}

// Sets which text in the reply box is selected. Begins with the character
// indexed by start and ends with the character at end-1. If start == end,
// there is no selection.

function setSelection(start, end)
{
    end = end || start;
    replyBox.selectionStart = start;
    replyBox.selectionEnd = end;
}

// Replaces the current contents of the reply box with the supplied
// new content, restores the reply box's scroll position, and
// unchecks the "I've previewed" checkbox.

function setText(newText)
{
    var scrollTop = replyBox.scrollTop;
    replyBox.value = newText;
    replyBox.scrollTop = scrollTop;
    elements.namedItem('safety').checked = false;
}

// Monitors keystrokes in the reply box and dispatches the proper
// handler if one has been defined.

function onKeyPress(event)
{
    if (event.ctrlKey) {
        var key = event.charCode || event.keyCode;
        if (event.shiftKey)
            key = -key;
        if (event.altKey)
            key += 1024;
        var handler = keyHandlers[key];
        if (handler) {
            handler(event);
            event.preventDefault();
        }
    }
}

// Adds a Ctrl-Alt keyboard shortcut to go to the Spell, Preview, or
// Post button.

function addShortcut(name, key)
{
    var button = document.forms[0].elements.namedItem(name);
    if (!button)
        return;
    button.title = '[Ctrl-Alt-' + key + ']';
    var keyCode = key.charCodeAt(0);
    if (key == 'enter')
        keyCode = 13;
    keyCode += 1024;
    addKeyHandler(key, keyCode, wrap(press, button));
}

// Handles a keyboard shortcut to the Spell, Preview, or Post buttons.

function press(button)
{
    button.click();
}

// *****************************************************************************

// Use the full width of the browser window.

var keyHandlers = {};

$xFirst('//table[@border=0]').width = '100%';

removeBlankLines(document.body);

// Lighten up the borders on the tables having them.

var tables = $x('//table[@border=1]');
for (var x=0; x<tables.snapshotLength; ++x) {
    var table = tables.snapshotItem(x);
    table.cellPadding = '3';
    table.cellSpacing = '0';
    table.style.borderCollapse = 'collapse';
}

// Replace the To: input TEXTAREA with an INPUT field. Wastes less vertical
// room. Make it extend clear across the window.

var elements = document.forms[0].elements;
var nameField = elements.namedItem('name');
var newNameField = document.createElement('input');
newNameField.name = nameField.name;
newNameField.value = nameField.value;
newNameField.style.width = '100%';
nameField.parentNode.replaceChild(newNameField, nameField);

// Give the reply box more vertical space and make it use the full width.

var replyBox = elements.namedItem('reply');
replyBox.style.cssText = 'width:100%;height:' +
               (window.innerHeight*INPUT_FRACTION) + 'px';

// Let the Tagline field extend clear across.

elements.namedItem('sig').style.width = '100%';

// Add an HTML toolbar

var buttons = document.createElement('div');
buttons.style.cssFloat = 'left';
replyBox.parentNode.insertBefore(buttons, replyBox);
addButton('Quote', quote, 'Quotes', 'q');
addButton('BlockQuote', blockQuote, 'Block-quotes', 'Q');
addSpacer();
addButton('B', 'b', 'Bolds', 'b');
addButton('I', 'i', 'Italicizes', 'i').style.paddingLeft = '1px';
addButton('U', 'u', 'Underlines', 'u');
addButton('S', 's', 'Strikes out', 's');
addButton('Q', 'q', 'Curly-quotes', 'q+');
addButton('Small', 'small', 'Sets the selection in smaller font.', 'S');
addButton('Big', 'big', 'Sets the selection in larger font.', 'B');
addButton('<', wrap(addTag, '&lt;'), 'Adds a < as text.', '<');
addSpacer();
addButton('Font', 'font', 'Encloses the selection in <font> tags', 'F');
addButton('Pre', 'pre', 'Encloses the selection in preformat tags.', 'P');
addSpacer();
addButton('UL', wrap(makeList, 'ul'),
                           'Makes the selection a bulleted list.', 'U');
addButton('OL', wrap(makeList, 'ol'),
                           'Makes the selection a numbered list.', 'O');
addButton('HR', wrap(addOnOwnLine, '<hr width=97%>'),
                           'Adds a horizontal rule at the cursor.', 'h');
addSpacer();
addButton('Table', makeTable, 'Adds a single-cell table at the cursor.', 'T');
addButton('TR', makeRow, 'Adds a table row at the cursor.', 'R');
addButton('TH', 'th', 'Adds a table header cell at the cursor.', 'H');
addButton('TD', 'td', 'Adds a table cell at the cursor.', 'C');
addSpacer();
addButton('Image', image, 'Adds an image tag at the cursor.', 'I');
addButton('Link', link, 'Link-enables', 'L');
addSpacer();
addButton('BR', wrap(addOnOwnLine, '<br>'),
                      'Adds a <br> tag at the cursor.', 'Enter');
addButton('P', wrap(addOnOwnLine, '<p>'),
                      'Adds a <p> tag at the cursor.', 'enter');

// Finish adding keyboard shortcuts and install the reply box's
// keyboard listener.

addShortcut('spell', 's');
addShortcut('preview', 'p');
addShortcut('post', 'enter');
replyBox.addEventListener('keypress', onKeyPress, true);

// Add a documentation link over to the right of the HTML toolbar

var help = document.createElement('div');
help.style.cssFloat = 'right';
help.innerHTML = '<a ' +
     'href="http://cynwoody.googlepages.com/fr_posting_form_enhancer.html" ' +
     'target=help>Help</a>';
replyBox.parentNode.insertBefore(help, replyBox);

// Compensate for strange effects seen when using the buttons to insert
// HTML before the reply box has first received the focus.

if (replyBox.value == '') {
    replyBox.value = '?';
    replyBox.value = '';
}
replyBox.focus();
