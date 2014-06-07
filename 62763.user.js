// ==UserScript==
// @name          ceviewdest
// @namespace     ce
// @description   highlight les destinations dans les jump gate pour ce
// @include       http://www.core-exiles.com/*/index.php
// @include       http://www.core-exiles.com/*/process_view_ashar.php
// ==/UserScript==
function highlight()
{
  var dests = GM_getValue("destination", "null");
  if (dests != "null")
  {
    destsTab = dests.split("|");
    for (var t = 0; t < destsTab.length; t++)
    {
      dest = destsTab[t];
      var obj = document.evaluate("//td/font[text()='" + dest + "']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      for (var i = 0; i < obj.snapshotLength; i++)
      {
        obj.snapshotItem(i).setAttribute("style", "font-weight: bold; color: red;");
      }
    }
  }
}

var dests = GM_getValue("destination", "null");
var d = document.evaluate("/html/body/div", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
elem = d.snapshotItem(3);
var newElem = document.createElement("div");
newElem.setAttribute("align", "center");
var br = document.createElement("br");
newElem.insertBefore(br, null);
var label = document.createElement("font");
label.innerHTML = "Destinations : ";
newElem.insertBefore(label, null);
var textInput = document.createElement("input");
textInput.setAttribute("type", "text");
textInput.setAttribute("name", "destInput");
textInput.setAttribute("value", dests);
textInput.setAttribute("width", 200);
newElem.insertBefore(textInput, null);
var button = document.createElement("input");
button.setAttribute("type", "button");
button.setAttribute("value", "Set");
button.addEventListener('click', function(event) {
    // do whatever you want here
    GM_setValue("destination", document.getElementsByName("destInput")[0].value);
    highlight();
}, true);
newElem.insertBefore(button, null);
elem.parentNode.insertBefore(newElem, elem);

highlight();
