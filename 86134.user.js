// DNS Advantage to Google
// --------------------------------------------------------------------
// ==UserScript==
// @name DNS Advantage to Google
// @description   Redirects search.dnsadvantage.com to Google.com
// @include       http://search.dnsadvantage.com/*
// ==/UserScript==
// --------------------------------------------------------------------

//
// 
//   RESHAPER
//
//  Based on DumQuotes by Mark Pilgrim 
//  http://diveintogreasemonkey.org/casestudy/dumbquotes.html
//
////////////////////////////////////////////////////////////////////////////////
//
//


var replacements, regex, key, textnodes, node, s;

replacements = {
    "Sorry, \"": "document.location='http://www.google.com/search?complete=0&hl=en&tbo=1&q=",
    "\" does not exist or could not be found": "'",

	};
regex = {};
for (key in replacements) {
    regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    s = node.data;
    for (key in replacements) {
	s = s.replace(regex[key], replacements[key]);
    }
    node.data = s;
}




//
// 
//   REDIRECTOR
//
//  Based on Linkify Plus by arantius
//  http://userscripts.org/scripts/show/1352
//
////////////////////////////////////////////////////////////////////////////////
//
//




var notInTags=[
	'a', 'head', 'noscript', 'option', 'script', 'style', 'title', 'textarea'
];
var textNodeXpath=
	".//text()[not(ancestor::"+notInTags.join(') and not(ancestor::')+")]";
var urlRE=/((?:https?|document.location='http):\/\/[^\s"""<>()]+|www\.[^\s"""<>()]+|[-\w.+]+@(?:[-\w]+\.)+[\w]{2,6})/gi;

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
		a=document.createElement('body');
		a.className='linkifyplus';
		a.appendChild(document.createTextNode(l));
		if (l.match(/^www/i)) {
			l='http://'+l;
		} else if (-1==l.indexOf('://')) {
			l='mailto:'+l;
		}
		a.setAttribute('onload', l);
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