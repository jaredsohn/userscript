// ==UserScript==
// @name          Stretch-to-fit Textareas
// @namespace     http://jmason.org/software
// @description   Cause textareas to "stretch" to fit their contents, as you type.  This behaviour was inspired by that of textareas in FogBugz.  Can be inhibited by turning off the checkbox to the right of each textarea.
// @author        Justin Mason - http://jmason.org/
// @include       *
// ==/UserScript==

// settings: min/max lines in the textarea; and "breathing room" in addition
// to what may already be there
var minLines      = 4;
var extraLines    = 5;
var maxLines      = 40;

// ---------------------------------------------------------------------------

// we use these arrays as state
var textAreas = new Array();
var origRows = new Array();
var origStyle = new Array();
var controlButtons = new Array();

// do all the hard work after the page is loaded, and from a timer
window.addEventListener("load", init, false);
setInterval(checkTextarea, 500);


function init() 
{
  // find each textarea; we'll be adding our new nodes after
  // that one.

  var nodes = document.evaluate(
        "//textarea",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  //var styleFixerRe = new RegExp("^(|.*[:;\\s])height:[^;]*?;(.*)$");

  for(area = null, i = 0; (area = nodes.snapshotItem(i)); i++) {
    textAreas[i] = area;
    origRows[i] = area.rows;
    origStyle[i] = area.getAttribute("style");

    // FogBugz textareas do their own stretching; don't resize them
    var inhibitResize = false;
    if (area.getAttribute("onkeyup") != null) { inhibitResize = true; }

    // the control checkbox
    ctrl = document.createElement("input");
    ctrl.type = "checkbox";
    if (inhibitResize) {
      ctrl.checked = false;
    } else {
      ctrl.checked = true;
    }
    ctrl.setAttribute("style",
            "width: 0.8em;"+
            "height: 0.8em;"+
            "margin: 1px 1px 1px 0px;"+
            "vertical-align: top; "+
            "opacity: .5;");

    // a nifty trick to put the control checkbox directly after the
    // textarea; replace it, then re-insert the replaced textarea before it.
    parent = area.parentNode;
    parent.replaceChild(ctrl, area);
    parent.insertBefore(area, ctrl);

    controlButtons[i] = ctrl;
  }

  // and now, all that stuff is saved for when checkTextarea() runs
}

function checkTextarea() 
{
  // have we got the data we need yet?
  if (textAreas.length == 0) { return; }

  for (i = 0; i < textAreas.length; i++) {
    if (!controlButtons[i].checked) {
      continue;     // only ones for which the control button is set
    }

    var contents = textAreas[i].value;

    var nlCount = 0;
    var idx = contents.indexOf("\n");
    while (nlCount < 50 && idx >= 0) { 
      nlCount++;

      var lastidx = idx;
      idx = contents.indexOf("\n", idx+1);

      // consider lines of length > 60 chars to be equivalent to a newline,
      // too, since they cause wrapping. (TODO: examine the textarea's
      // attributes to determine the correct value, instead of assuming 60)
      if (idx - lastidx > 60) {
        nlCount += Math.round ((idx - lastidx) / 60);
      }
    }

    if (minLines < origRows[i]) {
      minLines = origRows[i];
    }

    nlCount = (nlCount + extraLines);
    if (nlCount > maxLines) { nlCount = maxLines; }
    if (nlCount < minLines) { nlCount = minLines; }

    textAreas[i].setAttribute("rows", nlCount);

    var style = origStyle[i];
    if (style == null) { style = ""; }

    if (nlCount != origRows[i]) {
      // override the existing style, so that row-count can take precedence
      // as to how big the textbox becomes
      textAreas[i].setAttribute("style", style+";height: auto;");
    }
    else {
      textAreas[i].setAttribute("style", style);        // revert to default
    }

    //GM_log("area "+i+": nlcount="+nlCount+" - "+textAreas[i]);
  }
}

