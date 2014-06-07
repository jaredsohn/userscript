/*
 * Fark article relevance filter
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
// @name Fark relevance filter
// @namespace http://www.variadic.org/
// @description Fark relevance filter
// @include http://www.fark.com/*
// ==/UserScript==

(function () {
  var matches;

  // Find the insertion point for the relevance widget.
  matches = document.evaluate("//comment()[contains(., 'END index.header.html')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for(var match = null, i = 0; (match = matches.snapshotItem(i)); i++) {

    // Create the form for relevance setting.
    var relevanceNode = document.createElement('center');
    var relevanceFormNode = relevanceNode.appendChild(document.createElement('form'));
    relevanceFormNode.appendChild(document.createTextNode('Relevance: '));
    var relevanceInputNode = relevanceFormNode.appendChild(document.createElement('input'));
    relevanceNode.appendChild(document.createElement('br'));
    relevanceInputNode.setAttribute('name', 'relevance');
    relevanceInputNode.setAttribute('value', '0');
    relevanceInputNode.setAttribute('type', 'text');
    relevanceFormNode.setAttribute('onSubmit', 'relevanceSet(this.relevance.value); return false;');
    relevanceSubmitNode = document.createElement('input');
    relevanceSubmitNode.setAttribute('type', 'submit');
    relevanceSubmitNode.setAttribute('value', 'Set');
    relevanceFormNode.appendChild(relevanceSubmitNode);

    // Create the function to switch relevance.
    var scriptNode = document.createElement('script');
    scriptNode.setAttribute('type', 'text/javascript');
    scriptNode.appendChild(document.createTextNode("<!--\n\
function relevanceSet(minimumRelevance) {\n\
  var matches;\n\
  var commentsRegex = /^\\((.+)\\)$/;\n\
\n\
  matches = document.evaluate('//table[@class=\"nilink\"]/tbody/tr[position() > 1]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);\n\
  for(var match = null, i = 0; (match = matches.snapshotItem(i)); i++) {\n\
    var columns = match.getElementsByTagName('td');\n\
\n\
    // Get the number of comments.\n\
    var commentsText = columns[3].firstChild.firstChild.nodeValue;\n\
    var result = commentsRegex.exec(commentsText);\n\
    var comments;\n\
    if(result) {\n\
\n\
      // Most fark comment types are just numeric.\n\
      if(/^[0-9]+$/.exec(result[1])) {\n\
        comments = parseInt(result[1]);\n\
      }\n\
\n\
      // Some are wacky, translate.\n\
      else {\n\
        // XXX Hack - we don't know the translation of these.\n\
        //alert('Unhandled fark comment size type: ' + result[1]);\n\
        //comments = null;\n\
        comments = 99999;\n\
      }\n\
    }\n\
    else comments = null;\n\
\n\
    // If it's below our requested relevance, hide it.\n\
    if((comments != null) && (comments < minimumRelevance)) {\n\
      match.style.display = 'none';\n\
    }\n\
\n\
    // Otherwise, show it (XXX Why must this be null and not block?)\n\
    else {\n\
      match.style.display = null;\n\
    }\n\
  }\n\
}\n\
//-->"));

    // Wire in the new elements.
    match.parentNode.insertBefore(relevanceNode, match);
    match.parentNode.insertBefore(scriptNode, relevanceNode);
  }


})();
