// ==UserScript==
// @name          WF Known Universe Helper
// @namespace     sk.seko
// @description   Adds distance to displayed systems; adds buttons to select option groups
// @include       http://*.war-facts.com/empire_known_universe.php
// @version       1.2
// ==/UserScript==

// Version 1.0 = Initial version
// Version 1.1 = Added links for (big) and (res)
// Version 1.2 = Copper fixed

// compute and display distance
var tab = document.evaluate("//div[@class='centerspace']/center/table", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
if (tab) {
  var xyz = document.evaluate("//input[@name='xyz']",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  var coords = (xyz && xyz.value) ? xyz.value.match(/[^\-\d]*(\-*\d+)[,;\s]*(\-*\d+)[,;\s]*(\-*\d+)/) : [0,0,0,0,0];
  if (coords) {
    var rows = tab.rows;
    for (var row = 0; row < rows.length; row++) {
      var cols = rows[row].cells;
      if (cols.length >= 2) {
        var str = cols[1].innerHTML;
        var regx = new RegExp(".*\\((.*),(.*),(.*)\\)");
        if (regx.test(str)) {
          var xx = str.match(regx)[1];
          var yy = str.match(regx)[2];
          var zz = str.match(regx)[3];
          var difx1 = xx - coords[1];
          var dify1 = yy - coords[2];
          var difz1 = zz - coords[3];
          var dist1 = Math.ceil(0.004012 * Math.sqrt(difx1*difx1 + dify1*dify1 + difz1*difz1));
          var tooltip = 'Distance from ' + ((xyz && xyz.value) ? xyz.value : 'default');
          cols[1].innerHTML = str + '&nbsp;&nbsp;&nbsp;<small><span title="' + tooltip + '" style="color:yellow">(' + dist1 + 'mkm)</span></small>';
        }
      }
    }
  }
}

// find 'View' button
var title = document.evaluate("//div[@class='centerspace']//table/tbody/tr/td/input[@value='View']/..",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (title) {
  // select big and habitable planets; sort them by landmass, from descending
  unsafeWindow.checkBigHab = function(val) {
    document.getElementsByName('landmass')[0].selectedIndex = 2;
    document.getElementsByName('habit')[0].selectedIndex = 9;
    document.getElementsByName('orderType')[0].selectedIndex = 2;
    document.getElementsByName('orderDirection')[0].selectedIndex = 2;
  }
  // select all-resource planets
  unsafeWindow.checkAllRes = function(val) {
    document.getElementsByName('ressel')[0].selectedIndex = 2;
    document.getElementsByName('carbon')[0].checked = true;
    document.getElementsByName('copper')[0].checked = true;
    document.getElementsByName('iron')[0].checked = true;
    document.getElementsByName('silver')[0].checked = true;
    document.getElementsByName('titanium')[0].checked = true;
    document.getElementsByName('gold')[0].checked = true;
    document.getElementsByName('uranium')[0].checked = true;
    document.getElementsByName('platinum')[0].checked = true;
    document.getElementsByName('oil')[0].checked = true;
    document.getElementsByName('water')[0].checked = true;
  }
  // creates link/button
  function createLink(name, command, tooltip) {
    var lnk1 = document.createElement('a');
    title.appendChild(document.createTextNode(' '));
    lnk1.appendChild(document.createTextNode(name));
    lnk1.setAttribute('href', 'javascript:void(0);');
    lnk1.setAttribute('title', tooltip);
    lnk1.setAttribute('onclick', command);
    title.appendChild(lnk1)
  }
  createLink('(big)', 'checkBigHab()', 'Select big and habitable planets; sort by landmass, descending');
  createLink('(res)', 'checkAllRes()', 'Select all-resource planets');
}
