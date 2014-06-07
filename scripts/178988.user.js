// ==UserScript==
// @name        reconnect
// @namespace   fritzbox
// @include     http://fritz.box/internet/inetstat_monitor.lu*
// @version     1
// ==/UserScript==

// bug fix for Fritz!Box Firmware-Version: 117.05.51
// display reconnect button and IP address

genericXPathAction(
  "//div[@id='uiReconnection_Btn']",
  "object.style.display='block'");

genericXPathAction(
  "//div[@id='logqueries']",
  "myObject = object");

ipString = myObject.innerHTML

//  ["connection0:status/ip"] = "w.x.y.z",
startPosition = ipString.indexOf("connection0:status/ip") + 27
endPosition = ipString.indexOf("\"", startPosition)
ipAddress = ipString.substr(startPosition, endPosition - startPosition)

// alert("IP address: " + ipAddress);

genericXPathAction(
  "//input[@id='uiReconnectBtn']",
  "object.value=ipAddress + ' Neu verbinden'");


// a generic function for xpath actions
function genericXPathAction(xpathExpression, xpathAction) {
  var objects = document.evaluate(
    xpathExpression, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i = 0; i < objects.snapshotLength; i++) {
    object = objects.snapshotItem(i);
    eval(xpathAction);
  }
}
