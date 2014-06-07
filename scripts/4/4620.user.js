// BloglinesAutoSize v0.1
// (c) 2006, Oschlies
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          BloglinesAutoSize
// @namespace     http://www.oschlies.de/BloglinesAutoSize/
// @description   Hide and show the tree frame on Bloglines just by moving the mouse over the tree frame
// @include       http://www.bloglines.com/myblogs
// ==/UserScript==
function addEventHandlers() {
//   GM_log('addEventHandlers');
   var treeFrame = top.frames[0];
   treeFrame.addEventListener("mouseout", doSmallFrame, false);
   treeFrame.addEventListener("mouseover", doBigFrame, false);
   
   var toggleLink = treeFrame.document.createElement("form");
   toggleLink.innerHTML = "<form name=\"doToggleFlagForm\" action=\"\">"
      + "<input type=\"button\" name=\"ToggleAutoResizeButton\" value=\"toggle auto risize: on\" style=\"font-size:xx-small;\" "
      + "onclick=\"this.form.ToggleAutoResizeButton.value=(this.form.ToggleAutoResizeButton.value == 'toggle auto risize: on') ? 'toggle auto risize: off' : 'toggle auto risize: on'\">"
      + "</form>";
   treeFrame.document.body.insertBefore(toggleLink, treeFrame.document.body.firstChild);   
};

function doSmallFrame(Event) {
//   GM_log('doSmallFrame');
   if (top.frames[0].document.getElementsByName('ToggleAutoResizeButton')[0].value == "toggle auto risize: on") {
      document.getElementsByName('frameset')[0].cols="10,*";
   }
};

function doBigFrame(Event) {
//   GM_log('doBigFrame');
   if (top.frames[0].document.getElementsByName('ToggleAutoResizeButton')[0].value == "toggle auto risize: on") {
      document.getElementsByName('frameset')[0].cols="280,*";
   }
};

window.addEventListener("load", function() { addEventHandlers() }, false);
