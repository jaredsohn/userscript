// ==UserScript==
// @name           HAPorxy Percentage
// @namespace      eu.1wt.haproxy
// @description    Add a percentage column to the haproxy admin display
// @include        http://*
// ==/UserScript==

window.addEventListener('load',
                        function() { if (haproxyAdminPage()) { addPercentageField(); } },
                        true);

function haproxyAdminPage() {
  return document.title == "Statistics Report for HAProxy";
}

function addPercentageField() {
  var xpath = "//table[@class='tbl']";
  var xpathResult = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  if (xpathResult && xpathResult.snapshotLength > 0) {
    for (i=0; i < xpathResult.snapshotLength; i++) {
      var table = xpathResult.snapshotItem(i);
      var total = _findTotal(table);
      if (total > 0) {
        _addPerc(table, total);
      }
    }
  }
}

function _findTotal(table) {
  var total = -1;
  var xpath = ".//tr[@class='backend']/td[8]";
  var xpathResult = document.evaluate(xpath, table, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  if (xpathResult && xpathResult.snapshotLength > 0) {
    total = xpathResult.snapshotItem(0).firstChild.nodeValue;
  }

  return total;
}

function _addPerc(table, total) {
  var xpath = ".//tr[@class!='backend' and @class != 'frontend']";
  var xpathResult = document.evaluate(xpath, table, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  if (xpathResult && xpathResult.snapshotLength > 0) {
    for (i=0; i < xpathResult.snapshotLength; i++) {
      var row = xpathResult.snapshotItem(i);
      if (row.childNodes.length > 10) {
        var val = row.childNodes[7].firstChild.nodeValue;
        var perc = (val/total)*100;
        if (perc > 0) {
          row.innerHTML += "<td>" + perc.toFixed(2) + "</td>";
        } else {
          row.innerHTML += "<td>% Traffic</td>";
        }
      }
    }
  }
}