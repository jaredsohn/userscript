// ==UserScript==
// @name           Gmail: Open  Attachemnts in Google Viewer
// @namespace      http://userscripts.org/scripts/show/39872
// @description    Open Gmail Attachments in Google Viewer 
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// @version        0.92 2009-01-05 
// ==/UserScript==
//

/* Written 2008 by Manu http://www.manu-j.com/blog/
 */

var enable_gmonkey  = Boolean(GM_getValue('enable_gmonkey',false));
var counter = 1;
var counter2 = 1;
var timeoutId = null;
var timeoutId2 = null;




function toggle_gmonkey() {
    GM_setValue('enable_gmonkey', enable_gmonkey ? false : true );
    document.location.reload();
}

//GM_registerMenuCommand((enable_gmonkey ? "Disable" : "Enable") + ' Gmonkey', toggle_gmonkey);




function init() {
    timeoutID = null;
    counter2 = 1;
    var i_doc;
    var i_frame = window.document.getElementById("canvas_frame");
    if(i_frame != null) { 
       i_doc = window.document.getElementById("canvas_frame").contentDocument;
    }else {
       i_doc = window.document;
    }
    iterator = i_doc.evaluate("//a[contains(@href,'view=att')]", i_doc, null, XPathResult.ANY_TYPE, null);
    attachment_link = iterator.iterateNext();
    while(attachment_link) {
      if (attachment_link.innerHTML == "View as HTML")
        break;
      attachment_link = iterator.iterateNext();
    }


    if(attachment_link == null ) {
      setTimeout(arguments.callee, 50 * counter);
      counter = counter + 1;
      if (counter > 1000000) 
        counter = 100;
      return;
    } else {
      if(attachment_link.innerHTML == "View as HTML") {
      attachment_link.href = attachment_link.href.replace("view=att","view=gvatt")
      }
      if(enable_gmonkey) {
      loadGmonkey()
      }
      i_doc.addEventListener("DOMNodeInserted",re_modify, false)
    }
}

// From https://developer.mozilla.org/en/DOM/window.clearTimeout#Example

function re_modify() {
    counter2 = counter2 + 1;
    if(counter2 < 25 ) {
    if(typeof timeoutID == "number" ) {
      window.clearTimeout(timeoutID);
      timeoutID = null;
    }
    timeoutID = window.setTimeout(init, 700);
    }
}

        
        

function loadGmonkey() { 
      var gmailapi = typeof unsafeWindow != "undefined" && unsafeWindow.gmonkey 
                     || (frames.js ? frames.js.gmonkey : null);
      if (gmailapi == null) {
        setTimeout(arguments.callee, 1000);
        return;
      } else {
        gmailapi.load('1.0', addEvent);
      }
  }



 function addEvent(g) {
     g.registerViewChangeCallback(init)
 }


init();
