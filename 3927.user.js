/*
 * Fark comments pictures-only filter.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 *
 * - Steven Brown <swbrown@variadic.org>
 */

// ==UserScript==
// @name Fark comments pictures-only filter
// @namespace http://www.variadic.org/
// @description Fark comments pictures-only filter
// @include http://forums.fark.com/*
// ==/UserScript==

(function () {
  var matches;

  // Find the insertion point for the pictures-only widget.
  matches = document.evaluate("//form[descendant::input[@name=\"killallhtml\"]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  //matches = document.evaluate("//form//input[@name=\"killallhtml\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for(var match = null, i = 0; (match = matches.snapshotItem(i)); i++) {

    // Create the checkbox widget.
    var picturesOnlyCenterNode = document.createElement('center');
    picturesOnlyCenterNode.appendChild(document.createTextNode('Pictures only'));
    var picturesOnlyCheckboxNode = picturesOnlyCenterNode.appendChild(document.createElement('input'));
    picturesOnlyCheckboxNode.setAttribute('type', 'checkbox');
    picturesOnlyCheckboxNode.setAttribute('onClick', 'setPostVisibility(this.checked);');

    // Create the javascript to set post visibility.
    var scriptNode = document.createElement('script');
    scriptNode.setAttribute('type', 'text/javascript');
    scriptNode.appendChild(document.createTextNode("<!--\n\
function setPostGroupVisibility(nodeSet, style) {\n\
  for(var match = null, i = 0; (match = nodeSet.snapshotItem(i)); i++) {\n\
\n\
    // table\n\
    match.previousSibling.previousSibling.previousSibling.style.display = style;\n\
    // br\n\
    match.previousSibling.style.display = style;\n\
    // div\n\
    match.style.display = style;\n\
    // br\n\
    match.nextSibling.style.display = style;\n\
  }\n\
}\n\
\n\
function setPostVisibility(imagesOnly) {\n\
\n\
  // Work on those with no images.\n\
  matches = document.evaluate(\"//div[@class=\\\"ctext\\\" and not(.//img[not(@src=\\\"http://img.fark.com/images/at.gif\\\")])]\", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);\n\
  if(imagesOnly) setPostGroupVisibility(matches, 'none');\n\
  else setPostGroupVisibility(matches, null);\n\
\n\
  // Work on those with images.\n\
  matches = document.evaluate(\"//div[@class=\\\"ctext\\\" and .//img[not(@src=\\\"http://img.fark.com/images/at.gif\\\")]]\", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);\n\
  setPostGroupVisibility(matches, null);\n\
}\n\
//-->"));

    // Wire in the new elements.
    match.parentNode.insertBefore(picturesOnlyCenterNode, match);
    match.parentNode.insertBefore(scriptNode, picturesOnlyCenterNode);
  }
})();
