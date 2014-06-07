// ==UserScript==
// @name           IMP mail
// @namespace      ~impMail
// @description    Enhance highlighting in IMP mail reader. <a href="http://www.horde.org/imp/about/">IMP</a> (maybe v2.2.7) uses nasty little check boxes to mark actions on messages. When you visually scan a mailbox, IMP is hard to use because your eyes constantly have to jump between the check box column and the subject column. This script 1) colors the subject lavender when the mouse is inside the checkbox, and 2) colors the subject yellow if its box has been checked. Most eye jitter problems are solved.
// @include        https://webmail.telerama.com/horde-2.2.7/imp/mailbox.php*
// ==/UserScript==


// CHANGE the above include to your IMP mail host.

HoverColor = 'rgb(240,220,255)';    // ~lavender
CheckedColor = 'rgb(255,255,220)';  // ~yellow
CheckToSubjectPath = '../../td[6]';

// patch the IMP function MakeSelection so it updates colors.
var impMakeSelection = unsafeWindow.makeSelection;
 unsafeWindow.makeSelection = function (n){impMakeSelection(n); colorChecked();};

function colorChecked(){
 for (var i=0; i < CheckBoxes.length; i++)
  {var cb = CheckBoxes[i];
    var td = XPFirst(cb, CheckToSubjectPath);
     if (cb.checked) td.style.backgroundColor = CheckedColor;
     else td.style.backgroundColor = '';
  }
}
function XPFirst(node, xpath){
 return document.evaluate(xpath, node, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function XPOrderedSnap(node, xpath){
 return document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
CheckBoxes = new Array();
BoxesPath = "/html/body/table/tbody/tr[4]/td/form/table/tbody/tr/td[1]/input";

function Main(e){
 var snap = XPOrderedSnap(document, BoxesPath);
  for (var i=0; i < snap.snapshotLength; i++){
   var cb = snap.snapshotItem(i);
    CheckBoxes[i] = cb;
    cb.addEventListener('mouseover', overBox, false);
    cb.addEventListener('mouseout', outBox, false);
   }
}
function overBox(e){
 var box = e.target;
  var td = XPFirst(box, CheckToSubjectPath);
   td.style.backgroundColor = HoverColor;
}
function outBox(e){
 var box = e.target;
  var td = XPFirst(box, CheckToSubjectPath);
   if (box.checked) td.style.backgroundColor = CheckedColor;
   else td.style.backgroundColor = '';
}
// this may just be superstition, but I've had problems with
// XPath giving out-of-memory errors, and this sort of delay
// seems to fix them.
window.addEventListener('load', Main, false);
