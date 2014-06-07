// ==UserScript==
// @name        Linkify WDK
// @description Turn plain text URLs on WDK into clikable links. 
// @namespace   http://userscripts.org/scripts/show/158701
// @version		0.2
// @include     http://warez-dk.org/*
// ==/UserScript==
//
// Based on script: http://userscripts.org/scripts/show/1352
// Copyright (c) 2011, Anthony Lieuallen
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// * Redistributions of source code must retain the above copyright notice,
//   this list of conditions and the following disclaimer.
// * Redistributions in binary form must reproduce the above copyright notice,
//   this list of conditions and the following disclaimer in the documentation
//   and/or other materials provided with the distribution.
// * Neither the name of Anthony Lieuallen nor the names of its contributors
//   may be used to endorse or promote products derived from this software
//   without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//
 
var notInTags = [
          'a', 'head', 'noscript', 'option', 'script', 'style',
          'title', 'textarea'];
var textNodeXpath =
        ".//text()[not(ancestor::"+notInTags.join(') and not(ancestor::')+")]";
// Built based on:
//  - http://en.wikipedia.org/wiki/URI_scheme
//  - http://www.regular-expressions.info/regexbuddy/email.html
var urlRE = new RegExp(
    '('
    // leading scheme:// or "www."
    + '\\b([a-z][-a-z0-9+.]+://|www\\.)'
    // everything until non-URL character
    + '[^\\s\'"<>()]+'
    + '|'
    // email
    + '\\b[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}\\b'
    + ')', 'gi');
var queue = [];
 
var noHTTPSLinks = true //if true, turn HTTPS into HTTP
 
/******************************************************************************/
 
linkifyContainer(document.body);
document.body.addEventListener('DOMNodeInserted', function(event) {
        linkifyContainer(event.target);
}, false);
 
/******************************************************************************/
 
function linkifyContainer(container) {
        // Prevent infinite recursion, in case X(HT)ML documents with namespaces
        // break the XPath's attempt to do so.  (Don't evaluate spans we put our
        // classname into.)
        if (container.className && container.className.match(/\blinkifyplus\b/)) {
          return;
        }
 
        var xpathResult = document.evaluate(
                  textNodeXpath, container, null,
                  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
 
        var i = 0;
        function continuation() {
                var node = null, counter = 0;
                while (node = xpathResult.snapshotItem(i++)) {
                  var parent = node.parentNode;
                  if (!parent) continue;
 
                  // Skip styled <pre> -- often highlighted by script.
                  //if ('PRE' == parent.tagName && parent.className) continue;
                 
                        linkifyTextNode(node);
 
                        if (++counter > 50) {
                                return setTimeout(continuation, 0);
                        }
                }
        }
        setTimeout(continuation, 0);
}
 
function linkifyTextNode(node) {
        var i, l, m;
        var txt = node.textContent;
        var span = null;
        var p = 0;
        while (m = urlRE.exec(txt)) {
                if (null == span) {
                        // Create a span to hold the new text with links in it.
                        span = document.createElement('span');
                        span.className = 'linkifyplus';
                }
 
                //get the link without trailing dots
                l = m[0].replace(/\.*$/, '');
                var lLen = l.length;
                //put in text up to the link
                span.appendChild(document.createTextNode(txt.substring(p, m.index)));
                //create a link and put it in the span
                a = document.createElement('a');
                a.className = 'linkifyplus';
                a.appendChild(document.createTextNode(l));
                if (l.indexOf(":/") < 0) {
                        if (l.indexOf("@") > 0) {
                                l = "mailto:" + l;
                        } else {
                                l = "http://" + l;
                  }
                }
        if (noHTTPSLinks) {
            if (l.indexOf("https") == 0) {
                l = "http" + l.slice(5,l.length)
            }
        }
                a.setAttribute('href', l);
                span.appendChild(a);
                //track insertion point
                p = m.index+lLen;
        }
        if (span) {
                //take the text after the last link
                span.appendChild(document.createTextNode(txt.substring(p, txt.length)));
                //replace the original text with the new span
                try {
                        node.parentNode.replaceChild(span, node);
                } catch (e) {
                        console.error(e);
                        console.log(node);
                }
        }
}