// ==UserScript==
// @name        regno. finder
// @namespace   slr.iimcal.regno
// @description Reg no. to name converter
// @include     http://student.iimcal.ac.in/bb/*
// @grant       none
// @version     1
// ==/UserScript==
/*******************************************************************************
Jd Link Generator Script by your friendly Katiyar

Loosely based (blatantly copied from) on the Linkify script located at:
  http://downloads.mozdev.org/greasemonkey/linkify.user.js

Originally written by Anthony Lieuallen of http://arantius.com/
Licensed for unlimited modification and redistribution as long as
this notice is kept intact.

*/

function getJdUrl(regNo)
{
  var jdUrl= "http://student.iimcal.ac.in/jd/#?qstr=" + regNo + "&searchType=regno";
  return jdUrl;
}


var notInTags = [
	  'a', 'code', 'head', 'noscript', 'option', 'script', 'style',
	  'title', 'textarea'];


var textNodeXpath =
  	".//text()[not(ancestor::"+notInTags.join(') and not(ancestor::')+")]";                  
             
var regNoRE = new RegExp( '(\\b[0-9]+\\/(48|49|18|19))\\b' , 'gi');
      
var queue = [];
             
linkifyContainer(document.body);
document.body.addEventListener('DOMNodeInserted', function(event) {
	linkifyContainer(event.target);
}, false);

/******************************************************************************/

function linkifyContainer(container) {
	// Prevent infinite recursion, in case X(HT)ML documents with namespaces
	// break the XPath's attempt to do so.	(Don't evaluate spans we put our
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
		  if ('PRE' == parent.tagName && parent.className) continue;
		  
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
	while (m = regNoRE.exec(txt)) {
		if (null == span) {
			// Create a span to hold the new text with links in it.
			span = document.createElement('span');
			span.className = 'linkifyplus';
		}
        
		//get the regno 
		l=m[0].replace(/\.*$/, '');

		var lLen = l.length;
		//put in text up to the link
		span.appendChild(document.createTextNode(txt.substring(p, m.index)));
		//create a link and put it in the span
		a = document.createElement('a');
		a.className = 'linkifyplus';
		a.appendChild(document.createTextNode(l));
		a.setAttribute('href', getJdUrl(l));
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