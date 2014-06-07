// ==UserScript==
// @name          Text Highlighter
// @namespace     erosman
// @description   Highlights User-defined Text
// @updateURL     https://userscripts.org/scripts/source/292083.meta.js
// @downloadURL   https://userscripts.org/scripts/source/292083.user.js
// @exclude       *
// @grant         GM_registerMenuCommand
// @grant         GM_setValue
// @grant         GM_getValue
// @author        erosman
// @version       1.7
// ==/UserScript==

/* --------- Note ---------
  This script highlights User-defined case-insensitive Text on a page.

  It can run on any page but that adds unnecessary load to your computer.
  I have set it not to run on any page for now

  Go to Add-ons - User Scripts ('Ctrl+ Shift + a' on Firefox)
  Click on the Script's Option
  Under User Settings Tab, Add Included/Excluded Pages that you want the script to run on
  Click OK

  Setting Keywords & Highlight Style:
  Click on GreaseMonkey Icon
  User Scripts Commands...

      Set Keywords
      Input keywords separated by comma
      Example: word 1,word 2,word 3

      Set Highlight Style
      Input the Highlight Style (use proper CSS)
      Example: color: #f00; font-weight: bold; background-color: #ffe4b5;

  Note: If you find that another script clashes with this script, set Text Highlighter to Execute first.
  Go to Add-ons - User Scripts ('Ctrl+ Shift + a' on Firefox)
  Right Click on the Script
  On the context menu click: Execute first

  On Add-ons - User Scripts, you can also Click on the Execution Order (top Right) and
  change the execution order so that Text Highlighter runs before those scripts that clashes with it.


  --------- History ---------

  1.7 Changed script from matching whole words to do partial word match 
      similar to browser's FIND + escaped RegEx Quantifiers in keywords
  1.6 Code Improvement, using test()
  1.5 Code Improvement
  1.4 Code Improvement + Added support for non-English Words
  1.3 Code Improvement, 10x speed increase
  1.2 Added User Script Commands, script can now be auto-updated without losing User Data
  1.1 Total Code rewrite, Xpath pattern
  1.0 Initial release

*/


(function() { // anonymous function wrapper, used for error checking & limiting scope
'use strict';

if (window.self !== window.top) { return; } // end execution if in a frame

// setting User Preferences
function setUserPref(varName, defaultVal, menuText, promtText, sep){

  GM_registerMenuCommand(menuText, function() {

    var val = prompt(promtText, GM_getValue(varName, defaultVal));
    if (val === null)  { return; }  // end execution if clicked CANCEL

    // prepare string of variables separated by the separator
    if (sep && val){
      var pat1 = new RegExp('\\s*' + sep + '+\\s*', 'g'); // trim space/s around separator & trim repeated separator
      var pat2 = new RegExp('(?:^' + sep + '+|' + sep + '+$)', 'g'); // trim starting & trailing separator

      val = val.replace(pat1, sep).replace(pat2, '');
    }

    val = val.replace(/\s{2,}/g, ' ').trim();    // remove multiple spaces and trim
    GM_setValue(varName, val);
    location.reload();                           // reload the page with the new changes
  });
}

// prepare UserPrefs
setUserPref(
'keywords',
'word 1,word 2,word 3',
'Set Keywords',
'Set keywords separated by comma\t\t\t\t\t\t\t\r\n\r\nExample:\r\nword 1,word 2,word 3',
','
);

setUserPref(
'highlightStyle',
'color: #f00; background-color: #ffebcd;',
'Set Highlight Style',
'Set the Highlight Style (use proper CSS)\r\n\r\nExample:\r\ncolor: #f00; font-weight: bold; background-color: #ffe4b5;'
);

var highlightStyle = GM_getValue('highlightStyle');
var keywords = GM_getValue('keywords');
if(!keywords || !highlightStyle)  { return; }  // end execution if not found

var rQuantifiers = /[-\/\\^$*+?.()|[\]{}]/g;
var keywords = keywords.replace(rQuantifiers, '\\$&').split(',').join('|');
var pat = new RegExp('(' + keywords + ')', 'gi');
var span = document.createElement('span');

// getting all text nodes with a few exceptions
var snapElements = document.evaluate(
    './/text()[normalize-space() != "" ' +
    'and not(ancestor::style) ' +
    'and not(ancestor::script) ' +
    'and not(ancestor::textarea) ' +
    'and not(ancestor::code) ' +
    'and not(ancestor::pre)]',
    document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (!snapElements.snapshotItem(0)) { return; }  // end execution if not found

for (var i = 0, len = snapElements.snapshotLength; i < len; i++) {

  var node = snapElements.snapshotItem(i);

  // check if it contains the keywords
  if (pat.test(node.nodeValue)) {

    // create an element, replace the text node with an element
    var sp = span.cloneNode(true);
    sp.innerHTML = node.nodeValue.replace(pat, '<span style="' + highlightStyle + '">$1</span>');
    node.parentNode.replaceChild(sp, node);
  }
}

})(); // end of anonymous function
