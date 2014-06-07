// ==UserScript==
// @name           WF Map Plotter Helper
// @namespace      sk.seko
// @description    Adds buttons to check/uncheck all options
// @include        http://*.war-facts.com/player_map.php
// @version        1.1
// ==/UserScript==

// Version 1.0 = Initial version
// Version 1.1 = Minor fixes

// checkbox names
var options = [
    'empireRallyPoints', 'empireMapData', 'colonies', 'colonames',
    'fleet', 'fleetnames', 'rally', 'rallynames', 'mapbm', 'mapbmnames'
];

// table title element
var title = document.evaluate("//div[@class='centerspace']//table/tbody/tr/td[contains(.//text(),'Map Options')]",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (title) {
  // function to check/uncheck all named checkboxes
  unsafeWindow.checkAll = function(val) {
    for (n in options) {
      var opt = document.getElementsByName(options[n]);
      if (opt && opt[0]) {
         opt[0].checked = val;
      }
    }
  }
  // creates link/button
  function createLink(name, command, tooltip) {
    var lnk1 = document.createElement('a');
    title.appendChild(document.createTextNode(' '));
    lnk1.appendChild(document.createTextNode(name));
    lnk1.setAttribute('title', tooltip);
    lnk1.setAttribute('href', 'javascript:void(0);');
    lnk1.setAttribute('onclick', command);
    title.appendChild(lnk1)
  }
  createLink('(check all)', 'checkAll(true)', 'Select all checkboxes');
  createLink('(check none)', 'checkAll(false)', 'Deselect all checkboxes');
}
