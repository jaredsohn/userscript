// ==UserScript==
// @name           Gmail Hide Read Nested Labels
// @namespace      http://www.milessabin.com/gmscripts
// @description    Only show unread nested labels in Gmail
// @version        1.0.0
// @author         milessabin
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://gmail.google.com/*
// @include        https://gmail.google.com/*
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

/**
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

if(document.location != top.location) return;

(function ()
{
  var interval = window.setInterval(tryToHideLabels, 1000);

  function tryToHideLabels() {
    var canvas = document.getElementById('canvas_frame');
    if (canvas && canvas.contentDocument) {
	    hideLabels(canvas.contentDocument);
    }
  }

  function hasClass(element, cls) {
    var pattern = new RegExp("(^| )" + cls + "( |$)");
    return pattern.test(element.className) ? true : false;
  };

  function hideLabels(parentItem) {
    var labelsXpath = "/descendant::div[@class='zw'][1]//div[@class='TO']";
    var labels = parentItem.evaluate(labelsXpath, parentItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var numLabels = labels.snapshotLength;
    for (var i = 0; i < numLabels; i++) {
      var label = labels.snapshotItem(i);
      var labelText = label.textContent;
      var span = label.firstChild.firstChild.nextSibling.nextSibling.firstChild;
      var unread = hasClass(span, 'n1');
      if (unread) {
        label.style.display = '';
      } else {
        label.style.display = 'none';
      }
    }
  }
})();

