// ==UserScript==
// @name        Linkify Plus
// @homepage    http://www.arantius.com/article/arantius/linkify+plus/
// @version     2.0.1
// @namespace   http://www.arantius.com/misc/greasemonkey/
// @description	Turn plain text URLs into links.  Supports http, https, ftp, email addresses
// @include     *
// @exclude     http://www.google.tld/search*
// ==/UserScript==

/*******************************************************************************
Loosely based on the Linkify script located at:
  http://downloads.mozdev.org/greasemonkey/linkify.user.js

Originally written by Anthony Lieuallen of http://arantius.com/
Licensed for unlimited modification and redistribution as long as
this notice is kept intact.

If possible, please contact me regarding new features, bugfixes
or changes that I could integrate into the existing code instead of
creating a different script.  Thank you

Version history:
 Version 2.0.1:
  - Fix aberrant 'mailto:' where it does not belong.
 Version 2.0:
  - Apply incrementally, so the browser does not hang on large pages.
  - Continually apply to new content added to the page (i.e. AJAX).
 Version 1.1.4:
  - Basic "don't screw up xml pretty printing" exception case
 Version 1.1.3:
  - Include "+" in the username of email addresses.
 Version 1.1.2:
  - Include "." in the username of email addresses.
 Version 1.1:
  - Fixed a big that caused the first link in a piece of text to
    be skipped (i.e. not linkified).
*******************************************************************************/

var notInTags=[
	'a', 'head', 'noscript', 'option', 'script', 'style', 'title', 'textarea'
];
var textNodeXpath=
	".//text()[not(ancestor::"+notInTags.join(') and not(ancestor::')+")]";
var urlRE=/((?:https?|ftp):\/\/[^\s'"'<>()]+|www\.[^\s'"'<>()]+|[-\w.+]+@(?:[-\w]+\.)+[\w]{2,6})/gi;

var queue=[];

/******************************************************************************/

if ('text/xml'!=document.contentType
	&& 'application/xml'!=document.contentType
) {
	linkifyContainer(document.body);
	document.body.addEventListener('DOMNodeInserted', function(event) {
		linkifyContainer(event.target);
	}, false);
}

/******************************************************************************/

function linkifyContainer(container) {
	var xpathResult=document.evaluate(
		textNodeXpath, container, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	); 

	var i=0;
	function continuation() {
		var node, limit=0;
		while (node=xpathResult.snapshotItem(i++)) {
			linkifyTextNode(node);

			if (++limit>50) {
				return setTimeout(continuation, 0);
			}
		}
	}
	setTimeout(continuation, 0);
}

function linkifyTextNode(node) {
	var i, l, m;
	var txt=node.textContent;
	var span=null;
	var p=0;
	while (m=urlRE.exec(txt)) {
		if (null==span) {
			//create a span to hold the new text with links in it
			span=document.createElement('span');
		}

		//get the link without trailing dots
		l=m[0].replace(/\.*$/, '');
		//put in text up to the link
		span.appendChild(document.createTextNode(txt.substring(p, m.index)));
		//create a link and put it in the span
		a=document.createElement('a');
		a.className='linkifyplus';
		a.appendChild(document.createTextNode(l));
		if (0==l.indexOf('www')) {
			l='http://'+l;
		} else if (-1==l.indexOf('://')) {
			l='mailto:'+l;
		}
		a.setAttribute('href', l);
		span.appendChild(a);
		//track insertion point
		p=m.index+m[0].length;
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
