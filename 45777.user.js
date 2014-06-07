// ==UserScript==
// @name           TicTacGo
// @namespace      http://distilledb.com
// @description    Converts hashtags (like "#twitter") into clickable Twitter links for the corresponding searches.
// @include        http://twitter.com/*
// @exclude        http://search.twitter.com/*
// @exclude        http://twitter.com/search*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js  
// ==/UserScript==

// Replacements for IE since Node.ELEMENT_NODE and Node.TEXT_NODE are not defined there.
const nodeElementType = 1;   // Node.ELEMENT_NODE
const nodeTextType = 3;      // Node.TEXT_NODE

// URI to use for searching.
const twitterBaseSearchUri = "http://search.twitter.com/search?q=%23";

// Regex that matches a string of alphanumeric characters preceded by a hash, while
//  excluding anything that's not preceded by the beginning of the string or whitespace.
//  (This avoids messy complications if you embed a URI containing an anchor, like
//  http://foo.com/bar#xyz.)
var hashword = /(^|\W)(#\w+\b)/g;

// Do it, Rockapella!
processHashtagsAsLinks();

function processHashtagsAsLinks() {
  $ = unsafeWindow.jQuery;

  $('.entry-content').each(function() {
      wrapWordsInDescendants(this, 'a', 'tic-tac-go');
  });
}

function wrapWordsInDescendants(element, tagName, className) {
  for (var i = element.childNodes.length; i-- > 0;) {
    var child = element.childNodes[i];
    if (child.nodeType == nodeElementType) {
      wrapWordsInDescendants(child, tagName, className);
    }
    else if (child.nodeType == nodeTextType) {
      wrapWordsInText(child, tagName, className);
    }
  }
}

function wrapWordsInText(node, tagName, className) {
  var indices = [];
  var match;
  while (match = hashword.exec(node.data)) {
    // Push a tuple containing two values into the indices list:
    //   The first value is the index of the beginning of the hashtag (the index of the '#').
    //   The second value is the end of the hashtag.
    indices.push([match.index + (match[0].length - match[2].length),
      match.index + match[0].length]);
  }

  for (var i = indices.length; i-- > 0;) {
    var element = document.createElement(tagName);
    element.className = className;

    node.splitText(indices[i][1]);
    element.appendChild(node.splitText(indices[i][0]));

    var searchTarget = element.firstChild.data;
    element.setAttribute("href", twitterBaseSearchUri +
      searchTarget.toLowerCase().replace(" ", "").replace("#", ""));

    node.parentNode.insertBefore(element, node.nextSibling);
  }
}