// ==UserScript==
// @name           file clearer
// @namespace      aeosynth
// @description    clears the file field input
// @include        *
// @version        0.0.1
// @copyright      2011 James Campos <james.r.campos@gmail.com>
// @license        MIT; http://en.wikipedia.org/wiki/Mit_license
// ==/UserScript==

/* LICENSE
 *
 * Copyright (c) 2011 James Campos <james.r.campos@gmail.com>
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

var $, addButtons, clear, d;

$ = {
  after: function(root, node) {
    root.parentNode.insertBefore(node, root.nextSibling);
  },
  addStyle: function(css) {
    var style = d.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    d.head.appendChild(style);
  },
  bind: function(root, eventType, handler) {
    root.addEventListener(eventType, handler, false);
  }
};

addButtons = function(e) {
  var button, i, input, l, list, span;
  if (!e.target.querySelectorAll) return;//text nodes
  list = e.target.querySelectorAll('input[type=file]');
  for (i = 0, l = list.length; i < l; i++) {
    input = list[i];
    span = d.createElement('span');
    $.after(input, span);
    span.appendChild(input);

    button = d.createElement('a');
    button.textContent = 'X';
    button.className = 'clearbutton';
    $.bind(button, 'click', clear);
    $.after(span, button);
  }
};

clear = function(e) {
  // XXX input.value = ''; doesn't work on opera
  span = this.previousSibling;
  span.innerHTML = span.innerHTML;
};

d = document;

$.addStyle('\
.clearbutton {\
  text-decoration: none;\
  cursor: pointer;\
}');
addButtons({target: d.body});
$.bind(d.body, 'DOMNodeInserted', addButtons);
