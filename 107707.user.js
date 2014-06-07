// ==UserScript==
// @name        YouLink
// @namespace   aeosynth
// @description linkfies text, embeds youtube videos
// @version     0.1.3
// @copyright   2011 James Campos <james.r.campos@gmail.com>
// @license     MIT; http://en.wikipedia.org/wiki/Mit_license
// @include     *
// @exclude     *.google.*
// @exclude     *.youtube.*
// ==/UserScript==

/* Copyright (c) 2011 James Campos <james.r.campos@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

const STYLE = 'border: 0; width: 640px; height: 390px;';

/*
Originally written by Anthony Lieuallen of http://arantius.com/
Licensed for unlimited modification and redistribution as long as
this notice is kept intact.
*/
// start copied code
var notInTags = ['a', 'code', 'noscript', 'option', 'script', 'style', 'title', 'textarea'];
var XPATH = ".//text()[not(ancestor::"+notInTags.join(') and not(ancestor::')+")]";
// Built based on:
//  - http://en.wikipedia.org/wiki/URI_scheme
var URL_RE = new RegExp(
    // leading scheme:// or "www."
      '\\b([a-z][-a-z0-9+.]+://|www\\.)'
    // everything until non-URL character
    + '([^\\s\'"<>]+)'
    , 'i');
// end copied code

function $x(xpath, root) {
  var node, nodes, results;
  results = d.evaluate(xpath, root, null, XPathResult.ANY_TYPE, null);
  nodes = [];
  while (node = results.iterateNext())
    nodes.push(node);
  return nodes;
}
function $replace(root, node) {
  return root.parentNode.replaceChild(node, root);
}
function $$(selector, root) {
  return Array.prototype.slice.call(root.querySelectorAll(selector));
}
function $text(text) {
  return d.createTextNode(text);
}
function $el(tag) {
  return d.createElement(tag);
}
var d = document;
var YOUTUBE_RE = /^http:\/\/(?:www.youtube.com\/watch\?.*v=|youtu\.be\/)([-\w]+)/i;
var ids = [];

function linkify(root) {
  var a, i, l, left, match, node, nodes, right, span, text, urlLeft, urlRight, urlText;
  nodes = $x(XPATH, root);
  for (i = 0, l = nodes.length; i < l; i++) {
    node = nodes[i];
    text = node.textContent;
    if (match = text.match(URL_RE)) {
      urlLeft  = match[1];
      urlRight = match[2].replace(/[,.]+$/, '');
      urlText  = urlLeft + urlRight;

      if (urlLeft == 'www.')
        urlLeft = 'http://www.';

      left  = text.slice(0, match.index);
      right = text.slice(match.index + urlText.length);

      /* foo.textContent = '<foo>';
       * foo.innerHTML = foo.textContent;
       * foo.textContent == '<foo>';//false
       */
      span = $el('span');
      a = $el('a');
      a.textContent = urlText;
      a.href = urlLeft + urlRight;
      span.appendChild($text(left));
      span.appendChild(a);
      span.appendChild($text(right));
      $replace(node, span);
    }
  }
}

function embedify(root) {
  var dup, i, id, ii, l, ll, match, node, nodes;
  nodes = $$('a', root);
  for (i = 0, l = nodes.length; i < l; i++) {
    node = nodes[i];
    if (match = node.href.match(YOUTUBE_RE)) {
      id = match[1];
      dup = false;
      for (ii = 0, ll = ids.length; ii < ll; ii++)
        if (ids[ii] == id) {
          dup = true;
          break;
        }
      if (dup) continue;
      ids.push(id);

      iframe = $el('iframe');
      iframe.setAttribute('style', STYLE);
      iframe.src = 'http://www.youtube.com/embed/' + id;
      $replace(node, iframe);
    }
  };
}

linkify(d.body);
embedify(d.body);
d.body.addEventListener('DOMNodeInserted',
  function(e) {
    var root = e.target;
    if (root.nodeType !== 1) //is not an element node
      return;
    linkify(root);
    embedify(root);
  },
  false
);

/* FIXME
 * only the first url in a text node gets linkified
 * youtube time linking should be supported
 * inserted text nodes aren't linkified (the linkify function doesn't accept
 *  raw text nodes, maybe it should be split up)
 */
