// ==UserScript==
// @name          ceviewtarget
// @namespace     ce
// @description   affiche les target dans ce
// @include       http://www.core-exiles.com/*/process_scan.php
// ==/UserScript==
function highlight()
{
  var targets = GM_getValue("target", "null");
  if (targets != "null")
  {
    targetsTab = targets.split("|");
    for (var t = 0; t < targetsTab.length; t++)
    {
      target = targetsTab[t];
      var obj = document.evaluate("//td/font[text()='" + target + "']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      for (var i = 0; i < obj.snapshotLength; i++)
      {
        obj.snapshotItem(i).setAttribute("style", "font-weight: bold; color: red;");
      }
    }
  }
}

var targets = GM_getValue("target", "null");
var d = document.evaluate("/html/body/div", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
elem = d.snapshotItem(3);
var newElem = document.createElement("div");
newElem.setAttribute("align", "center");
var br = document.createElement("br");
newElem.insertBefore(br, null);
var label = document.createElement("font");
label.innerHTML = "Targets : ";
newElem.insertBefore(label, null);
var textInput = document.createElement("input");
textInput.setAttribute("type", "text");
textInput.setAttribute("name", "targetInput");
textInput.setAttribute("value", targets);
newElem.insertBefore(textInput, null);
var button = document.createElement("input");
button.setAttribute("type", "button");
button.setAttribute("value", "Set");
button.addEventListener('click', function(event) {
    // do whatever you want here
    GM_setValue("target", document.getElementsByName("targetInput")[0].value);
    highlight();
}, true);
newElem.insertBefore(button, null);
elem.parentNode.insertBefore(newElem, elem);

highlight();