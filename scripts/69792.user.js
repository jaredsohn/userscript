// ==UserScript==
// @name           Google Search Enhanced Keyboard Navigation
// @site           http://userscripts.org/scripts/show/43131
// @namespace      http://userscripts.org/users/82018
// @description    Enables Google's experimental keyboard shortcut navigation in search results, plus additional feature for jumping to Next/Previous result pages.
// @match		   http://www.google.com/search?*
// @date           Fri Dec 18 19:43:51 HST 2009
//
// @version        1.3a
// @creator        Patrick C. McGinty
// ==/UserScript==
//
// Quick Usage Instructions
// ========================
// This script provides global access to Google's experimental keyboard
// shortcut search feature on all search results. The original feature page is
// located at: http://www.google.com/experimental/
//
// In addition to the standard Google keyboard shortcuts (J,K,O,ENTER,/), this
// script also adds the 'H' and 'L' keys (lowercase) to quickly jump to the
// Previous and Next search results page.
//
// Notes For Current Users of Google Labs Experimental Search
// ==========================================================
// This script does not require you to join Google's "Experimental" search
// feature to work properly. If this feature was previously activated in your
// user account, then you should click the "Leave" option after installing the
// script. The option is located at: http://www.google.com/experimental/
//

// Google Keyboard Shortcut JS code
var shortcut_js = "http://google.com/js/shortcuts.5.js"

var doc_items = "/html/body/div[@id='cnt']/table/tbody/tr/td/table"
var nav_items = "/html/body/div[@id='cnt']/*/table[@id='nav']/tbody/tr"
var prev_item = nav_items + "/td[1]/a"
var next_item = nav_items + "/td[last()]/a"

// Force loading of Google Shortcuts JS functions
function addJavaScript( js, onload ) {
   var head, ref;
   head = document.getElementsByTagName('head')[0];
   if (!head) { return; }
   script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = js;
   script.addEventListener( "load", onload, false );
   head.appendChild(script);
}

// Keypress handler function
function key_event( e ) {
   // ignore meta keys
   if (e.ctrlKey || e.altKey || e.metaKey)
      return;
   // ignore when focus is on search box
   // note: unsafeWindow.sc is the reference to the Google container for all
   // code from shortcuts.5.js. The variable 'a' is the position of the results
   // cursor. When the position is <0, the user may be typing a search string,
   // so do not interpret a keypress.
   if (unsafeWindow.sc.a < 0)
      return;

   // reports that the above code does not work all the time. the following was
   // addded as a secondary check
   // from http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
   var element;
   if(e.target) element=e.target;
   else if(e.srcElement) element=e.srcElement;
   if(element.nodeType==3) element=element.parentNode;
   if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;

   // not all browsers support these properties
   var code = e.charCode || e.keyCode;
   switch (code) {
   case 104: // 'h' key
      // load previous search results
      prev = document.evaluate( prev_item, document, null,
               XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null )
               .snapshotItem(0);
      if (prev) location.href=prev.href
      break;
   case 108: // 'l' key
      // load next search results
      next = document.evaluate( next_item, document, null,
               XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null )
               .snapshotItem(0);
      if (next) location.href=next.href
      break;
   }
}

// Add new features to 'shortcuts doc' page text
function add_doc() {
   var tbl, row;
   tbl = document.evaluate( doc_items, document, null,
         XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null )
         .snapshotItem(0);
   if (!tbl)
      return;
   row = tbl.insertRow(3);
   row.innerHTML="<th>L</th><td>Opens the next results page.</td>";
   row = tbl.insertRow(1);
   row.innerHTML="<th>H</th><td>Opens the previous results page.</td>";
}

function shortcut_onload() {
   // set new keypress handler
   document.addEventListener( 'keypress', key_event, false );
   // update page text
   add_doc();
}

// shift search results to the right
GM_addStyle( '#res { margin-left: 1.1em ! important; }' );
// load Google Shortctus JS code
addJavaScript( shortcut_js, shortcut_onload );