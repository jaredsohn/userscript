// GreaseMonkey user script to enhance Squirrelmail with gmail shortkeys
// Version 0.6, 2008-04-11
//
// Copyright (c) 2007-2008, Hampei
//   Hampei <hampei at hotmail dot coml>
// Released under the GPL license
//   <URL:http://www.gnu.org/copyleft/gpl.html>
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Mozilla/Firefox and revisit this script.
//
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// You should probably look at the include lines to match your squirrel install
//
// To uninstall, go to Tools/Manage User Scripts,
// select this script, and click Uninstall.
//
// --------------------------------------------------------------------

/* 
 * Version 0.6 2008-04-11
 * - shortkeys won't trigger the fast search anymore.
 * Version 0.5 2007-12-02
 * - When moving the mailpointer, the viewport will center on it when it moves out of view.
 * Version 0.4 2007-12-02
 * - onkeypress checks if alt or ctrl are not pressed, so it won't clash with global shortkeys
 * Version: 0.3 2007-11-29
 * - Adds shortkeys to squirrelmail (like in gmail)
 * - Adds unread messagecount to page-title
 * - Adds an arrow to the current mail (mail the shortcuts work on).
 * - Adds the following shortkeys to folderview and mailview
 *  - j : goto next mail
 *  - k : goto previous mail
 *  - i : goto inbox
 *  - c : compose new mail
 *  - / : search  
 * - Adds the following shortkeys to folderview:
 *  - <enter> : view current mail
 *  - d or # : delete selected mails or if none selected the current mail
 *  - x : toggle selection of current mail
 * - Adds the following shortkeys to mailview
 *  - d or # : delete the current mail
 *  - r : reply to current mail
 *  - a : reply all of current mail
 *  - f : forward current mail 
 *
 * Squirrel has some awfull html, so script may break at any time. This shouldn't affect normal operation.
 * Only works on the english version!
 */

// ==UserScript==
// @name           squirrel shortkeys
// @namespace      http://hampei.vanderveen.name
// @description    Adds usuablility features from gmail to squirrelmail.
// @include        */webmail/src/right_main.php*
// @include        */webmail/src/left_main.php
// @include        */webmail/src/read_body.php*
// ==/UserScript==



/*****     UTILITY FUNCTIONS     *****/

function elem(tag, attrs) {
 var ret = document.createElement(tag);
 for(var i=0,att; att = attrs[i++]; i++)
  ret.setAttribute(att, attrs[i]);
 if (arguments.length == 3)
  ret.innerHTML = arguments[2];
 return ret;
}

function find(xpath,xpres,context) {
  var ret = document.evaluate(xpath,context?context:document,null,xpres,null);
  switch(xpres) { 
   case XPFirst : return ret.singleNodeValue; 
   case XPString: return ret.stringValue; 
   case XPNumber: return ret.numberValue; 
   default      : return ret;
  }
}
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE, 
    XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    XPString = XPathResult.STRING_TYPE,
    XPNumber = XPathResult.NUMBER_TYPE;

function followFirstLink(text) {
 var link = find("//a[text()='"+text+"']", XPFirst);
 if (link) location.href = link.href;
}  


/*****     RIGHT_MAIN     *****/

if (window.location.href.match(/right_main\.php/))
(function () {

 var mailrows = findMailRows(); /* ordered list of the tr's of the mails on the page */
 var currentmail = 0; /* number of the current mail in mailrows */

 var curArrow = elem('img', ['src', 'data:image/gif;base64,R0lGODlhCQALAIAAAAAAAP///yH5BAEAAAEALAAAAAAJAAsAAAIUhBGph5rs3okBOtakuXN1nVVfUgAAOw==']);
 var spacersrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAIBTAA7';

 if (mailrows.length > 0) 
  focusRow(currentmail);

 window.addEventListener('keypress', keypressed, true);
 self.focus();

 /* handle keypresses */
 function keypressed(e) {
	if (e.altKey || e.ctrlKey) return;
	var keyHandled = true;
  switch(e.which) {
   case 99: followFirstLink("Compose"); break; // c
   case 47: followFirstLink("Search"); break; // /
   case 105: location.href = "right_main.php?mailbox=INBOX"; break; // i
   default: keyHandled = false;
  }
  if (keyHandled) e.preventDefault();

  if (mailrows.length <= 0) return; // functions below only useful if mailbox not empty
  keyHandled = true;
  switch(e.which) {
   case 13 : gotoMail(); break; // enter
   case 106: incCM(); break; // j
   case 107: decCM(); break; // k
   case 120: toggleSelect(); break; // x
   case 35: 
   case 100: deleteSelected(); break; // # d
   default: keyHandled = false;
  }
  if (keyHandled) e.preventDefault();
 }

 /* delete selected rows, if none are selected, delete currentmail */
 function deleteSelected() {
   if (getNroSelected() == 0)
    find(".//input", XPFirst, mailrows[currentmail]).checked = true;
   find("//input[@name='delete']", XPFirst).click();
 }

 /* return the number of selected mails on the page */
 function getNroSelected() {
 	 var selected = find("//input[@type='checkbox']", XPList);
 	 var ret = 0;
 	 for(var i=0,cb; cb = selected.snapshotItem(i); i++)
 	 	if (cb.checked) ++ret;
 	 return ret;
 }
 
 /* goto the mail-view of the currentmail */
 function gotoMail() {
  var t = find(".//a[starts-with(@href, 'read_body.php')]", XPFirst, mailrows[currentmail]);
  location.href=t.href;
 }

 /* toggle wether currentmail is selected */
 function toggleSelect() {
  var t = find(".//input", XPFirst, mailrows[currentmail]);
  t.checked = !t.checked;
 }

 /* increment currentmail (goto the next mail) */
 function incCM() {
  blurRow(currentmail);

  currentmail++;
  if (currentmail >= mailrows.length) currentmail = 0;

  focusRow(currentmail);
 }

 /* decrement currentmail (goto previous mail */
 function decCM() {
  blurRow(currentmail); 

  currentmail--;
  if (currentmail < 0) currentmail = mailrows.length - 1;

  focusRow(currentmail);
 }

 /* make visible which row is currentrow */
 function focusRow(row) {
  t = find(".//input", XPFirst, mailrows[row]);
//  t.setAttribute('style', 'width: 12px; height: 12px;');
  t.parentNode.insertBefore(curArrow, t);
  makeVisible();
 }

 /* Undo changes made by focusRow(row) */
 function blurRow(row) {
//  var t = find(".//input", XPFirst, mailrows[row]);
//  t.setAttribute('style', '');
//  t.parentNode.removeChild(curArrow); 
 }

 function makeVisible() {
  var pos = cumulativeOffsetTop(curArrow);
  var db = document.body;
  if(pos < db.scrollTop + 10 || pos > db.scrollTop + db.clientHeight - 20) 
   db.scrollTop = pos - Math.floor(db.clientHeight / 2);
 }
  
 function cumulativeOffsetTop(element) {
  var toffset = 0;
  do {
   toffset += element.offsetTop  || 0;
  } while (element = element.offsetParent);
  return toffset;
 }
 
 /* return the checbox-node of the currentmail */
 function getCheckbox() {
  return find(".//input", XPFirst, mailrows[currentmail]);
 }

 /* return an array with all tr's with a mail in it */
 function findMailRows() {
  var mail_list_table = find("//img[@alt='sort']/../../../..", XPFirst);
  if (find(".//b[text()='THIS FOLDER IS EMPTY']", XPFirst, mail_list_table)) return []; // empty array
  var rows = mail_list_table.getElementsByTagName('tr');
  rows[1].getElementsByTagName("td")[0].appendChild(elem('img', ['src', spacersrc, 'width', '40', 'height', '1']));
  var ret = new Array((rows.length - 1) / 2); // not +1, because of header rows
  for(var i = 0; i < ret.length; i++) 
   ret[i] = rows[(i+1)*2];
  return ret; 
 }

 /* set the style of all columns in $row to $style */
 function styleRowCols(row, style) {
  var e = row.firstChild;
  while(e != null) {
   if (e.nodeType == 1) 
    e.setAttribute('style', style);
   e = e.nextSibling;
  }
 }

})(); // end right_main.php




/*****     READ BODY     *****/

if (window.location.href.match(/read_body\.php/))
(function () {
 window.addEventListener('keypress', keypressed, true);

 function keypressed(e) {
	if (e.altKey || e.ctrlKey) return;
	var keyHandled = true;
  switch(e.which) {
   case 106: followFirstLink("Next"); break;        // j
   case 107: followFirstLink("Previous"); break;        // k
   case 100: followFirstLink("Delete"); break; // d
   case 114: followFirstLink("Reply"); break; // r
   case 97: followFirstLink("Reply All"); break; // a
   case 102: followFirstLink("Forward"); break; // f
   case 105: location.href = "right_main.php?mailbox=INBOX"; break; // i
   default: keyHandled = false;
  }
  if (keyHandled) e.preventDefault();
 }

})(); // end read_body




/*****     LEFT FRAME     *****/

if (window.location.href.match(/left_main\.php/))
(function () {
 var newmail = find("//b/a/font[text() = 'INBOX']/../../following-sibling::small/text()", XPString);
 if (newmail) {
  top.document.title = 'Mail ' + newmail;
 } else {
  top.document.title = 'Mail ' + '(0)';
 }

 window.addEventListener('keypress', keypressed, true);

 function keypressed(e) {
//  master.frames[1].window.document.body.dispatchEvent(e);
  var eCopy=document.createEvent("KeyboardEvent")
  eCopy.initKeyEvent("keypress",  true, true, null, false, false, false, false, 0, e.which); 
  top.frames[1].window.document.body.dispatchEvent(eCopy)
 }
})(); // end left_frame

