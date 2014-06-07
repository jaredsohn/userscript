// ==UserScript==
// @name           Gmail Drafts & Spam count Hide
// @namespace      http://userscripts.org/scripts/show/38204
// @description    Hide the Spam & Drafts count in Gmail.
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// @version        2.4 2008-12-21
// ==/UserScript==
/*
 * Version 2.4 
 *  Bugfixes for hiding the spam count always. Disabling Gmonkey user script command as it is not required
 *  anymore 
 *
 * Version 2.3
 *  Disabling gmonkey integration by default until further investigation to see if it causes 
 *  gmail javascript to hang. You can enable it via user script commands.
 *  Support for non English languages .
 *
 *Version 2.2
 *   Spam count was being shown if the user naviagted to spam view and read messages
 *   or deleted read messages. Using the gmonkey object these events are trapped and used to 
 *   hide count again
 *
 *Version 2.1
 *   Fixed high cpu usage by caused by settimeout calls
 *
 *Version 2.0
 *   Complete rewrite. Drafts and Spam links maintain the original style properties.
 *   Ability to hide spam count. Configurable via user script commands
 *
 *Version 1.0
 *   Initial Version. Based on Hide Spam Count.
 *
 */

/* Written 2008 by Manu http://www.manu-j.com/blog/
 */

var draft_link;
var spam_link;
var new_spam_link 
var hide_spam_count = Boolean(GM_getValue('hide_spam_count',true));
var hide_draft_count = Boolean(GM_getValue('hide_draft_count',true));
var enable_gmonkey  = Boolean(GM_getValue('enable_gmonkey',false));
var counter = 1;
var original_draft_word = null;
var original_spam_word = null;
var timeoutId = null;



function spam_preferences() {
    GM_setValue('hide_spam_count', hide_spam_count ? false : true );
    document.location.reload();
}


function draft_preferences() {
    GM_setValue('hide_draft_count', hide_draft_count ? false : true );
    document.location.reload();
}

function toggle_gmonkey() {
    GM_setValue('enable_gmonkey', enable_gmonkey ? false : true );
    document.location.reload();
}

GM_registerMenuCommand((hide_spam_count ? "Show" : "Hide") + ' Spam Count', spam_preferences);
GM_registerMenuCommand((hide_draft_count ? "Show" : "Hide") + ' Draft Count', draft_preferences);
//GM_registerMenuCommand((enable_gmonkey ? "Disable" : "Enable") + ' Gmonkey', toggle_gmonkey);




function init() {
    timeoutID = null;
    var i_doc;
    var i_frame = window.document.getElementById("canvas_frame");
    if(i_frame != null) { 
       i_doc = window.document.getElementById("canvas_frame").contentDocument;
    }else {
       i_doc = window.document;
    }
    draft_link = i_doc.evaluate("//a[contains(@href,'#drafts')]", i_doc, null, XPathResult.ANY_TYPE, null).iterateNext();
    spam_link = i_doc.evaluate("//a[contains(@href,'#spam')]", i_doc, null, XPathResult.ANY_TYPE, null).iterateNext();
    
    if(draft_link == null || spam_link == null) {
      setTimeout(arguments.callee, 50 * counter);
      counter = counter + 1;
      if (counter > 1000000) 
        counter = 100;
      return;
    } else {
      if(original_draft_word == null){ 
        original_draft_word = draft_link.innerHTML.match(/\w+/)[0];
      }
      if(original_spam_word == null){ 
        original_spam_word = spam_link.innerHTML.match(/\w+/)[0];
      }


      if(hide_spam_count) {
        modify_spam_link();
      }
      if(hide_draft_count) {
         modify_draft_link(); 
      }
      if(enable_gmonkey) {
      loadGmonkey()
      }
      i_doc.addEventListener("DOMNodeInserted",re_modify, false)
    }
}

// From https://developer.mozilla.org/en/DOM/window.clearTimeout#Example

function re_modify() {
    if(typeof timeoutID == "number") {
      window.clearTimeout(timeoutID);
      timeoutID = null;
    }
    timeoutID = window.setTimeout(init, 700);
}

function modify_draft_link(){
        draft_link.innerHTML = original_draft_word;
        draft_link.style.fontWeight = "normal";
}

function modify_spam_link(){
        spam_link.innerHTML = original_spam_word;
        spam_link.style.fontWeight = "normal";
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
