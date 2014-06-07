// Autosort Netflix Queue
// version 0.1 BETA!
// 2006-02-15
// by Jim Biancolo
//
// Thanks to Mark Pilgrim for Dive Into Greasemonkey:
//   http://diveintogreasemonkey.org/
//
// Thanks to Stuart Langridge for the sorting code inspiration:
//   http://www.kryogenix.org/code/browser/sorttable/
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
// select "Autosort Netflix Queue", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Not sure how this will scale.  I've only tested it on my own queue of
// around 50 movies.
//
// ==UserScript==
// @name          Autosort Netflix Queue
// @namespace     http://www.biancolo.com
// @description   Whenever you change a movie's priority in your Netflix queue, this script automatically renumbers and resorts your queue.
// @include       http://netflix.com/Queue*
// @include       http://*.netflix.com/Queue*
// ==/UserScript==


// The Netflix queue puts grey lines between each row by using formatted empty
// rows. When I resort the queue, all these spacer rows end up lumped together.
// The following to style rules hide the spacer rows and then adds borders to the
// film rows (which is how they should have done it in the first place, IMO).
addGlobalStyle('.s { display: none; }');
addGlobalStyle('.bd td { border-bottom: 1px solid #e2e2e2; }');

var origNum;

document.addEventListener('focus', function(event) {
  if (event.target.className=='o') {  // 'o' is the class of the priority boxes
    origNum = parseInt(event.target.value);
  }
}, true);

document.addEventListener('change', function(event) {
  renumberPriorities(event.target);
}, true);

function renumberPriorities(changedTxtCtrl) {
  if (changedTxtCtrl.className=='o') {
    
    var changedNum = parseInt(changedTxtCtrl.value);
    var allTxtCtrls, currTxtCtrl;

    allTxtCtrls = document.evaluate(
      "//input[@class='o']",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);

    if (changedNum < origNum) {
      for (var i = 0; i < allTxtCtrls.snapshotLength; i++) {
        thisTxtCtrl = allTxtCtrls.snapshotItem(i);
        thisNum = parseInt(thisTxtCtrl.value);
      
        if (thisTxtCtrl.name != changedTxtCtrl.name && thisNum >= changedNum && thisNum < origNum) {
          thisTxtCtrl.value = thisNum + 1;
        }
      }
    } else if (changedNum > origNum) {
      for (var i = 0; i < allTxtCtrls.snapshotLength; i++) {
        thisTxtCtrl = allTxtCtrls.snapshotItem(i);
        thisNum = parseInt(thisTxtCtrl.value);
      
        if (thisTxtCtrl.name != changedTxtCtrl.name) {
          if (thisNum > origNum && thisNum <= changedNum) {
            thisTxtCtrl.value = thisNum - 1;
          }
        }
      }
    }
    resortQueue(thisTxtCtrl, allTxtCtrls);
  }
}

function resortQueue(thisTxtCtrl, allTxtCtrls) {

  var table = getParent(thisTxtCtrl,'TABLE');
  var rows = new Array();

  // get the rows that contain priority text boxes
  for (var i = 0; i < allTxtCtrls.snapshotLength; i++) {
    thisTxtCtrl = allTxtCtrls.snapshotItem(i);
    rows[i] = getParent(thisTxtCtrl,'TR');
  }
  
  rows.sort(sortNumeric);

  // appends sorted rows onto the table.  Not sure how it knows to replace
  // existing rows while leaving other rows like headers and such intact.
  for (i=0; i<rows.length; i++) { 
    table.tBodies[0].appendChild(rows[i]);
  }
}

function getParent(el, pTagName) {
  if (el == null) return null;
  else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase())  // Gecko bug, supposed to be uppercase
    return el;
  else
    return getParent(el.parentNode, pTagName);
}

function sortNumeric(a,b) { 
  aa = a.childNodes[0].childNodes[1].value;
  bb = b.childNodes[0].childNodes[1].value;
  return aa-bb;
}

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

