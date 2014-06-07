/* This greasemonkey script adds 'Unlabelled' at the end of the labels list 
 * to search for unlabelled conversations
 *
 * Author: Jaidev K Sridhar mail<AT>jaidev<DOT>info
 * Version: v20110607-3
 *
 * Copyright (c) 2005-2011, Jaidev K Sridhar
 * Released under the GPL license
 * http://www.gnu.org/copyleft/gpl.html
 */

// ==UserScript==
// @name            Gmail Unlabelled 2.0
// @namespace       http://jaidev.info/home/hacks/gmailUnlabelled
// @description     This script adds 'Unlabelled' at the end of the labels list to search for unlabelled conversations. This version is for the "new" version of gmail (Nov 2007).
// @include         http*://mail.google.com/*
// @version         v20110607-3
// less
// ==/UserScript==
// Control parameters -- tweak in about:config
// logging = 0-3 : Set log level (0-Disable, 1-Errors, 2-Warnings, 3-Verbose)
var logging = 0;
var L_ERR = 1;
var L_WAR = 2;
var L_VER = 3;
var gu_retries = 0;
var MMC = "LrBjie";
var LC = "n0"
var SID = ":re";
var SID2 = ":rf";
var SIDC = "GcwpPb-hsoKDf nr";
var exclude = new Array (
  "INBOX",
  "BUZZ",
  "CHATS",
  "SENT MAIL",
  "DRAFTS",
  "ALL MAIL",
  "STARRED",
  "PRIORITY",
  "IMPORTANT",
  "SPAM",
  "TRASH"
);
function doLog (level, logmsg) {
  if (logging == 0) {
    logging = GM_getValue ('logging');
    if (logging == undefined) {
      logging = 1;
      GM_setValue ('logging', logging);
    }
  }
  if (logging >= level) {
    var d = new Date();
    GM_log ("<" + level + ">[" + d.toLocaleTimeString() + "] " + logmsg);
  }
}
function gmailUnlabelled () {
  try {
    var root = document;
    if (!root.getElementById ("label_none")) {
      var expr = ".//div[contains (concat (' ', @class, ' '), ' " + MMC 
          + " ')]";
      var menu_div = root.evaluate (expr, root, null, 
          XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext ();
      if (!menu_div) {
        if (gu_retries < 3) {
          gu_retries ++;
          doLog (L_VER, "Triggering retry.");
          window.setTimeout (gmailUnlabelled, 250);
        }
        else {
          doLog (L_VER, "Failed to initialize - Retry limit exceeded.");
        }
        return;
      }
      var label_none = menu_div.firstChild.lastChild.cloneNode (true);
      var lna = label_none.firstChild.lastChild.firstChild;
      lna.setAttribute ("id", "label_none");
      lna.innerHTML = "<b>Unlabelled</b>";
      lna.href = "";
      lna.addEventListener ("click", function (event) {
        event.stopPropagation ();
        event.preventDefault ();
        var lexpr = ".//a[contains (concat (' ', @class, ' '), ' " + LC 
            + " ')]";
        var res = root.evaluate (lexpr, root, null, 
            XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        var QS = "";
        var lname = "";
        var excludes = ":" + exclude.join (":") + ":";
        if (res) {
          while (labs = res.iterateNext ()) {
            lname = labs.getAttribute ('title');
            lname = lname.toUpperCase ();
            if (lname.indexOf ("(") != -1) {
                lname = lname.substr (0, lname.indexOf ("(") - 1);
            }
            if (excludes.indexOf (":" + lname + ":") == -1) {
                var href = labs.getAttribute ('href');
                var qs = href.substr (href.indexOf ("#", href) + 7);
                qs = qs.replace ("\%2F", "-");
                qs = qs.replace ("\%5B", "[");
                qs = qs.replace ("\%5D", "]");
                QS = QS + ' -label:' + 
                        qs.replace (/[/\ &]/g, '-').replace(/-\(\d+\)$/, "");
            }
          }
        }
        var srch_ip = this.ownerDocument.getElementById (SID);
        if (!srch_ip || srch_ip.getAttribute ('class') != SIDC) {
            srch_ip = this.ownerDocument.getElementById (SID2);
        }
        srch_ip.value = QS;
        srch_ip.focus ();
        var evt = srch_ip.ownerDocument.createEvent ("KeyboardEvent");
        if (typeof (evt.initKeyboardEvent) != 'undefined') {
            evt.initKeyboardEvent ("keypress", true, false, null,
                "Enter", 0);
        }
        else {
            evt.initKeyEvent ("keypress", true, false, null,
                false, false, false, false, 0x0D, 0);
        }
        srch_ip.dispatchEvent (evt);
      }, true);
      menu_div.firstChild.insertBefore (label_none, null);
      var srch_ip = root.getElementById (SID);
      if (!srch_ip || srch_ip.getAttribute ('class') != SIDC) {
        srch_ip = root.getElementById (SID2);
      }
      srch_ip.addEventListener ("keypress", function (event) {
        if (event.keyCode == 0x0D && event.charCode == 0 && 
            "-label" == this.value) { 
          var lexpr = ".//a[contains (concat (' ', @class, ' '), ' " + LC 
              + " ')]";
          var res = root.evaluate (lexpr, root, null, 
              XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
          var QS = "";
          var lname = "";
          var excludes = ":" + exclude.join (":") + ":";
          if (res) {
            while (labs = res.iterateNext ()) {
                lname = labs.getAttribute ('title');
                lname = lname.toUpperCase ();
                if (lname.indexOf ("(") != -1) {
                    lname = lname.substr (0, lname.indexOf ("(") - 1);
                }
                if (excludes.indexOf (":" + lname + ":") == -1) {
                    var href = labs.getAttribute ('href');
                    var qs = href.substr (href.indexOf ("#", href) + 7);
                    qs = qs.replace ("\%2F", "-");
                    qs = qs.replace ("\%5B", "[");
                    qs = qs.replace ("\%5D", "]");
                    QS = QS + ' -label:' + 
                            qs.replace (/[/\ &]/g, '-').replace(/-\(\d+\)$/, "");
                }
            }
          }
          this.value = QS;
          this.focus ();
          var evt = this.ownerDocument.createEvent ("KeyboardEvent");
          if (typeof (evt.initKeyboardEvent) != 'undefined') {
            evt.initKeyboardEvent ("keypress", true, false, null,
                "Enter", 0);
          }
          else {
              evt.initKeyEvent ("keypress", true, false, null,
                  false, false, false, false, 0x0D, 0);
          }
          this.dispatchEvent (evt);
        }
      }, true);
      srch_ip.addEventListener ("change", function (event) {
        if ("-label" == this.value || "-label " == this.value) { 
          var lexpr = ".//a[contains (concat (' ', @class, ' '), ' " + LC 
              + " ')]";
          var res = root.evaluate (lexpr, root, null, 
              XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
          var QS = "";
          var lname = "";
          var excludes = ":" + exclude.join (":") + ":";
          if (res) {
            while (labs = res.iterateNext ()) {
                lname = labs.getAttribute ('title');
                lname = lname.toUpperCase ();
                if (lname.indexOf ("(") != -1) {
                    lname = lname.substr (0, lname.indexOf ("(") - 1);
                }
                if (excludes.indexOf (":" + lname + ":") == -1) {
                    var href = labs.getAttribute ('href');
                    var qs = href.substr (href.indexOf ("#", href) + 7);
                    qs = qs.replace ("\%2F", "-");
                    qs = qs.replace ("\%5B", "[");
                    qs = qs.replace ("\%5D", "]");
                    QS = QS + ' -label:' + 
                            qs.replace (/[/\ &]/g, '-').replace(/-\(\d+\)$/, "");
                }
            }
          }
          this.value = QS;
          var evt = this.ownerDocument.createEvent ("KeyboardEvent");
          if (typeof (evt.initKeyboardEvent) != 'undefined') {
            evt.initKeyboardEvent ("keypress", true, false, null,
                "Enter", 0);
          }
          else {
              evt.initKeyEvent ("keypress", true, false, null,
                  false, false, false, false, 0x0D, 0);
          }
          this.dispatchEvent (evt);
        }
      }, true);
      doLog (L_VER, "Script initialized");
    }
  }
  catch (ex) {
    GM_log ("gmailUnlabelled: Exception '" + ex.message);
  }
}
window.setTimeout (gmailUnlabelled, 500);

