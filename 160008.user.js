// ==UserScript==
// @name        WBB Linkifier
// @description Turn plain text URLs on WBB into clikable links. 
// @namespace   http://userscripts.org/scripts/show/160008
// @version		0.1
// @include     *warez-bb.org*
// ==/UserScript==
//
// Based on script: http://userscripts.org/scripts/show/1352
// Copyright (c) 2011, Anthony Lieuallen
// All rights reserved.
//

 
var notInTags = [
          'a', 'head', 'noscript', 'option', 'script', 'style',
          'title', 'textarea'];
var textNodeXpath =
        ".//text()[not(ancestor::"+notInTags.join(') and not(ancestor::')+")]";
// Built based on:
//  - http://en.wikipedia.org/wiki/URI_scheme
//  - http://www.regular-expressions.info/regexbuddy/email.html
var allowedTLDs = '(dk|com|org|us|st)';
var urlRE = new RegExp(
    '('
    // leading scheme:// or "www."
    + '\\b([a-z][-a-z0-9]+://|www\\.)'
    // everything until non-URL character
    + '[^\\s\'"<>\\[\\]]+'
    + '|'
    // URL without leading scheme
    + '\\b[a-zA-Z]([^\\s\'"<>\\.\\[\\]]*\\.)+' + allowedTLDs + '\\b'
    + '|'
    // email
    + '\\b[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}\\b'
    + ')', 'gi');
var queue = [];
 
//
 
linkifyContainer(document.body);
document.body.addEventListener('DOMNodeInserted', function(event) {
        linkifyContainer(event.target);
}, false);
 
//
 
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
                l = m[0].replace(/\.*$/, ''); //trailing dots at the end of the searched string
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