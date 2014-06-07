// ==UserScript==
// @name OTN Reply Quicklinks
// @version 0.7
// @description Provide links to include frequently used pieces of text in replies.
// @include http://forums.oracle.com/forums/post!*
// @include http://forums.oracle.com/forums/edit!*
// ==/UserScript==

// Copyright (c) 2010 Joachim Sauer
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.

(function() {

var links = [
  [ 'SSCCE', 'SSCCE', 'http://www.sscce.org/' ],
  [ 'Unicode', 'The Absolute Minimum Every Software Developer Absolutely, Positively Must Know About Unicode and Character Sets (No Excuses!)', 'http://www.joelonsoftware.com/articles/Unicode.html' ],
  [ 'Floating-Point', 'What Every Computer Scientist Should Know About Floating-Point Arithmetic', 'http://docs.sun.com/source/806-3568/ncg_goldberg.html' ],
  [ 'Runtime.exec()', 'When Runtime.exec() won&#39;t', 'http://www.javaworld.com/javaworld/jw-12-2000/jw-1229-traps.html' ],
  [ 'Start Writing', 'So, You Need to Write a Program but Don&#39;t Know How to Start', 'http://home.earthlink.net/~patricia_shanahan/beginner.html' ],
  [ 'Smart Questions', 'How To Ask Questions The Smart Way', 'http://www.catb.org/~esr/faqs/smart-questions.html' ],
  [ 'SQ Write Well', 'Write in clear, grammatical, correctly-spelled language', 'http://www.catb.org/~esr/faqs/smart-questions.html#writewell' ],
  [ 'SQ Urgent', 'Don&#39;t flag your question as &#34;Urgent&#34;, even if it is for you', 'http://www.catb.org/~esr/faqs/smart-questions.html#urgent' ],
  [ 'SQ Subject', 'Use meaningful, specific subject headers', 'http://www.catb.org/~esr/faqs/smart-questions.html#bespecific' ],
];

// copied from http://stackoverflow.com/questions/1621931/insert-text-on-the-current-place-of-the-cursor-in-the-browser and modified for my need
// Author: http://alexking.org/blog/2003/06/02/inserting-at-the-cursor-using-javascript
// Modified so it's safe across browser windows
function insertAtCursor(myValue) {
  var myField = document.getElementById('textEditor');
  var doc = myField.ownerDocument;
  //IE support
  if (doc.selection) {
    myField.focus();
    sel = doc.selection.createRange();
    sel.text = myValue;
  }
  //FF, hopefully others
  else if (myField.selectionStart || myField.selectionStart == '0') {
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;
    myField.value = myField.value.substring(0, startPos) + 
                    myValue + myField.value.substring(endPos, myField.value.length);
  } 
  // fallback to appending it to the field
  else {
    myField.value += myValue;
  }
}

buildStyleTag = function() {
  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  var css = '#sdn-reply-quicklinks { background-color: #E8F1F8; padding: 3pt; }';
  style.appendChild(document.createTextNode(css));
  return style;
}

buildLinkToFunc = function(label, func) {
  var a = document.createElement('a');
  a.setAttribute('href','#');
  a.addEventListener('click', func, true);
  a.appendChild(document.createTextNode(label));
  return a;
}

buildLinkToLinkInsertion = function(label, linkText, url) {
  var text=' [url=' + url + ']' + linkText + '[/url]';
  var element = buildLinkToFunc(label, function() { insertAtCursor(text) });
  element.title='Insert link to "' + linkText + '"';
  return element;
}

buildLinkDiv = function() {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode('[ '));
  for (var i=0; i<links.length; i++) {
    if (i!=0) {
      div.appendChild(document.createTextNode(' | '));
    }
    var link=links[i];
    div.appendChild(buildLinkToLinkInsertion(link[0], link[1], link[2]));
  }
  div.appendChild(document.createTextNode(' ]'));
  return div;
}

buildOuterDiv = function() {
  var outerDiv = document.createElement('div');
  outerDiv.setAttribute('id', 'sdn-reply-quicklinks');
  outerDiv.appendChild(buildStyleTag());
  var div = buildLinkDiv();
  outerDiv.appendChild(div);
  return outerDiv;
}

init = function() {
  var bodybox = document.getElementById('jive-post-bodybox');
  var div = buildOuterDiv();
  bodybox.parentNode.insertBefore(div, bodybox.nextSibling);
}

init();

})();