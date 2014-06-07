// colored-stacktraces.user.js
// version 0.1
// 2012-10-10
// Copyright (c) 2012, Michal Hruby
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name           	Colored Stacktraces on Launchpad.net
// @description	Colored Stacktraces colors stacktraces on Launchpad
// @namespace	http://gmail-colored-diffs.devs.bellingard.fr
// @include        	https://launchpadlibrarian.net/*Stacktrace.txt
// @include        	https://launchpadlibrarian.net/*StacktraceSource.txt
// @include        	https://*.restricted.launchpadlibrarian.net/*Stacktrace.txt*
// @include        	https://*.restricted.launchpadlibrarian.net/*StacktraceSource.txt*
// @version        	0.1
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// History:
//
// 0.1 - 2012/10/10 - First version, needs to be widely tested.
//
// --------------------------------------------------------------------

if (document.location.href.search(/Stacktrace.*txt/) != -1)
{
  var preNode = evalXPath("//pre", document.body)[0];
  var content = preNode.innerText;

  var lines = content.split("\n");
  //              "#12       0x012abcdef87c0 in       method_name"
  var pattern = /^(#[\d]+\s+(0x[\dA-Fa-f]+\s+in\s+)?)(\S+)/;
  for (var i = 0; i < lines.length; i++)
  {
    lines[i] = lines[i].replace(pattern,
        "$1<pre style='display: inline; color: blue;'>$3</pre>").replace(
        /<(?!\/?pre)/g, "&lt;"); // FIXME: replace '>' too
  }
  preNode.innerHTML = lines.join("\n");
}

function trim (str) {
	return str.replace(/^\s*/, "").replace(/\s*$/, "");
}

// 
// The following code has been copied/adapted from some various other GM scripts
//

function debug() {
	if (console) {
		console.log(this, arguments);
	}
}

function getNodesByTagNameAndClass(rootNode, tagName, className) {
	var expression = ".//" + tagName + "[contains(concat(' ', @class, ' '), ' " + className + " ')]";
	return evalXPath(expression, rootNode);
}

function getFirstVisibleNode(nodes) {
	for (var i = 0, node; node = nodes[i]; i++) {
		return node;
	}
	return null;
}

function evalXPath(expression, rootNode) {
	try {
		var xpathIterator = rootNode.ownerDocument.evaluate(
			expression,
			rootNode,
			null,
			XPathResult.ORDERED_NODE_ITERATOR_TYPE,
			null);
	} catch (err) {
		GM_log("Error when evaluating XPath expression '" + expression + "'" + ": " + err);
		return null;
	}
	var results = [];
	for (var xpathNode = xpathIterator.iterateNext(); 
		xpathNode; 
		xpathNode = xpathIterator.iterateNext()) {
		results.push(xpathNode);
	}
	return results;
}
