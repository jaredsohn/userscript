// Cricinfo de-Framer
// version 0.1
// 2007-04-18
// Copyright (c) 2007, Binand Sethumadhavan
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Cricinfo de-Framer", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Cricinfo de-Framer
// @namespace      cricinfo_deframer
// @description    Allows one to open the live scorecard frame in its own window or tab
// @include        *cricinfo.com/*engine/current/match*
// ==/UserScript==

// function copied from http://www.faqts.com/knowledge_base/view.phtml/aid/11698
function addHTML (ele, html) {
  if (document.all)
    ele.insertAdjacentHTML('beforeEnd', html);
  else if (document.createRange) {
    var range = document.createRange();
    range.setStartAfter(ele.lastChild);
    var docFrag = range.createContextualFragment(html);
    ele.appendChild(docFrag);
  }
  else if (document.layers) {
    var l = new Layer(window.innerWidth);
    l.document.open();
    l.document.write(html);
    l.document.close();
    l.top = document.height;
    document.height += l.document.height;
    l.visibility = 'show';
  }
}

cricinfo_js = 
    "<script language='javascript'>\n" + 
    "<!-- \n" + 
    "self.check_frameset = function () {\n" +
    "    return false;\n" +
    "}\n" +
    "-->\n" + 
    "</script>\n";
addHTML(document.body, cricinfo_js);
